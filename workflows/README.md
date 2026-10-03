# Wowora Workflows

Geprüfte n8n-Workflows von [Wowora](https://wowora.de/). Sie dienen als Referenz und als Basis für Kundenprojekte.

| Workflow | Beschreibung | Status |
|---|---|---|
| [`e-rechnung-eingang`](e-rechnung-eingang/) | XRechnung/ZUGFeRD/Factur-X aus dem Postfach auslesen → Google Sheets, Drive, Mail | ✅ getestet (240/240 offizielle Testdateien, n8n 2.41.6) |

## Lokale Test-Umgebung (für mich, den Agenten)

n8n 2.41 braucht Node ≥ 24. In der Container-Umgebung:

| Schritt | Vorgehen |
|---|---|
| Node 24 | `npm install node-linux-x64@24` (kommt über die npm-Registry) |
| n8n | `npm install n8n@2.41.6` |
| Ausführung | `N8N_EXPRESSION_ENGINE=legacy` setzen, weil `isolated-vm` für Node 22 kompiliert wurde. Dann `n8n import:workflow` und `n8n execute --id=…` |
| Dateizugriff | `N8N_RESTRICT_FILE_ACCESS_TO` auf den Testordner setzen |
