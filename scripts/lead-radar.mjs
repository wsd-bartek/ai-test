// Lead-Radar: sammelt öffentliche Gesuche ("hiring", "paid help") aus Communities,
// in denen das Antworten auf Gesuche ausdrücklich erwünscht ist.
// Gespeichert werden nur Titel, Link, Datum und Antwortanzahl, keine Nutzernamen.
// Läuft in GitHub Actions (der Agent-Container hat keinen Zugriff auf diese Seiten).
import { writeFileSync } from 'node:fs';

const UA = 'nodewise-lead-radar/1.0 (+https://wsd-bartek.github.io/ai-test/)';
const DAYS = 10;
const since = Date.now() - DAYS * 864e5;
const errors = [];

async function getJson(url) {
  const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

async function n8nJobs() {
  const out = [];
  for (const page of [0, 1]) {
    const d = await getJson(`https://community.n8n.io/c/jobs/13.json?page=${page}`);
    for (const t of d.topic_list?.topics ?? []) {
      const created = Date.parse(t.created_at);
      if (created < since || t.pinned) continue;
      out.push({
        source: 'n8n-Forum Jobs',
        title: t.title,
        url: `https://community.n8n.io/t/${t.slug}/${t.id}`,
        created,
        replies: t.reply_count ?? Math.max(0, (t.posts_count ?? 1) - 1),
      });
    }
  }
  return out;
}

async function redditRss(sub) {
  const r = await fetch(`https://old.reddit.com/r/${sub}/new/.rss?limit=100`, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} (auch RSS)`);
  const xml = await r.text();
  const unesc = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(m => ({
    title: unesc((/<title>([\s\S]*?)<\/title>/.exec(m[1]) || [])[1] || ''),
    permalink: ((/<link href="https:\/\/(?:old|www)\.reddit\.com([^"]+)"/.exec(m[1]) || [])[1]) || '',
    created_utc: Date.parse((/<updated>([^<]+)<\/updated>/.exec(m[1]) || [])[1]) / 1000,
    num_comments: '?',
    selftext: '',
  }));
}

async function reddit(sub, filter) {
  let posts;
  try {
    const d = await getJson(`https://www.reddit.com/r/${sub}/new.json?limit=100&raw_json=1`);
    posts = (d.data?.children ?? []).map(c => c.data);
  } catch (e) {
    posts = await redditRss(sub);
  }
  return posts
    .filter(p => p.created_utc * 1000 >= since && filter(p))
    .map(p => ({
      source: `r/${sub}`,
      title: p.title,
      url: `https://www.reddit.com${p.permalink}`,
      created: p.created_utc * 1000,
      replies: p.num_comments,
    }));
}

const hiring = p => /\[hiring\]|hiring|paid|budget|looking for (an? )?(n8n|automation|freelancer|developer|expert)|need (an? )?(n8n|help)/i.test(p.title + ' ' + (p.link_flair_text || ''));
const forhire = p => /^\s*\[hiring\]/i.test(p.title) && /n8n|automation|zapier|make\.com|workflow|integration|api|scrap|ai agent|chatbot/i.test(p.title + ' ' + (p.selftext || ''));

const sources = [
  ['n8n-Forum', n8nJobs],
  ['r/n8n', () => reddit('n8n', hiring)],
  ['r/forhire', () => reddit('forhire', forhire)],
  ['r/automation', () => reddit('automation', hiring)],
];

let leads = [];
for (const [name, fn] of sources) {
  try { leads.push(...await fn()); } catch (e) { errors.push(`${name}: ${e.message}`); }
}
leads.sort((a, b) => b.created - a.created);

// Angebot (Freelancer bieten sich an) vs. Nachfrage (jemand sucht Hilfe)
const isSupply = l => /\[?\s*for\s*hire\s*\]?|available for|looking for (remote )?work|open to work|i will |offering/i.test(l.title) && !/\[hiring\]/i.test(l.title);
const demand = leads.filter(l => !isSupply(l));
const supply = leads.filter(isSupply);

const fmt = ts => new Date(ts).toISOString().slice(0, 16).replace('T', ' ');
const esc = s => s.replace(/\|/g, '\\|').replace(/([\[\]])/g, '\\$1').replace(/\s+/g, ' ').trim();
const fresh = ts => Date.now() - ts < 36 * 3600e3 ? '🆕 ' : '';
const lines = [
  '# Lead-Radar',
  '',
  `Automatisch aktualisiert (GitHub Actions). Öffentliche Gesuche der letzten ${DAYS} Tage. Stand: ${fmt(Date.now())} UTC`,
  '',
  '**So nutzt du die Liste:** Passenden Eintrag öffnen, prüfen, ob er noch offen ist, und Titel und Text an den Agenten geben. Der schreibt die Antwort plus Prototyp. Nur auf echte Gesuche antworten, Forenregeln beachten (siehe `sales/proposals.md`).',
  '',
  `**Markt (${DAYS} Tage):** ${demand.length} Gesuche (Nachfrage) · ${supply.length} Selbstangebote von Freelancern (Konkurrenz)`,
  '',
  '## Gesuche (Nachfrage)',
  '',
  '| Neu | Datum (UTC) | Quelle | Gesuch | Antworten |',
  '|---|---|---|---|---|',
  ...demand.map(l => `| ${fresh(l.created)} | ${fmt(l.created)} | ${l.source} | [${esc(l.title)}](${l.url}) | ${l.replies} |`),
  '',
  demand.length ? '' : '_Keine Gesuche gefunden._',
  '<details><summary>Selbstangebote anderer Freelancer (zur Wettbewerbsbeobachtung)</summary>',
  '',
  ...supply.map(l => `- ${fmt(l.created)} · ${l.source} · [${esc(l.title)}](${l.url})`),
  '',
  '</details>',
  errors.length ? `\n> Quellen mit Fehlern: ${errors.join('; ')}` : '',
  '',
];
writeFileSync(new URL('../leads/radar.md', import.meta.url), lines.join('\n'));
console.log(`demand=${demand.length} supply=${supply.length} errors=${errors.length}`, errors);
