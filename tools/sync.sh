#!/bin/bash
# Kopiert den Stand aus dem Repo in den gemeinsamen Projektordner und baut die Vorschau ohne Code-Abfrage.
# Aufruf: tools/sync.sh <vorschau-ordner>
set -e
R="$(cd "$(dirname "$0")/.." && pwd)"; P=/mnt/project-files/lern-app; V="${1:-/tmp/bw-preview}"
mkdir -p "$V" "$P/glas/"
python3 - "$R/index.html" "$V/index.html" <<'PY'
import sys
s=open(sys.argv[1],encoding="utf-8").read()
a=s.index("<title>BWIssen</title>")
body=s[a:]
body=body.replace("</html>","").rstrip()+"\n"
# Vorschau ohne Anmeldefenster: direkt als Gast hinein
assert body.count("else loginShow()});")==1
body=body.replace("else loginShow()});","else autoEnter(\"Gast\")});")
open(sys.argv[2],"w",encoding="utf-8").write(body)
PY
cp "$V/index.html" "$P/index.html"
mkdir -p "$V/fonts" "$P/fonts"; for f in fonts/*.woff2; do cp "$R/$f" "$V/$f"; cp "$R/$f" "$P/$f"; done
for f in modul-*.html bw-ui.css bw-ui.js bw-nova.css bw-home.css bw-mesh.svg bw-tafel.js bw-tafel-data.js bg-day.jpg bg-dusk.jpg bg-dusk-inv.jpg; do cp "$R/$f" "$V/$f"; cp "$R/$f" "$P/$f"; done
cp "$R/tools/ui_mod.py" "$P/glas/ui_mod.py"
echo fertig
