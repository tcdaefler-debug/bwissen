#!/usr/bin/env python3
"""Hängt die Karteikarten im Anki-Stil (bw-anki.css/.js) in ein Fach ein.
Aufruf: python3 tools/anki_mod.py modul-*.html   (mehrfach ausführbar, ändert nichts doppelt)
Nach jedem Neubau eines Fachs erneut ausführen (nach ui_mod.py)."""
import sys,re
V="20261128a"
CSS='<link rel="stylesheet" href="bw-anki.css?v=%s" data-bwanki>'%V
JS='<script src="bw-anki.js?v=%s" defer data-bwanki></script>'%V
for f in sys.argv[1:]:
    s=open(f,encoding="utf-8").read()
    s=re.sub(r'<link[^>]*data-bwanki[^>]*>\n?','',s)
    s=re.sub(r'<script[^>]*data-bwanki[^>]*></script>\n?','',s)
    s=re.sub(r'window\.BWA=\{[^\n]*\};/\*bwanki\*/\n','',s)
    m=re.search(r'let fcState=store\.get\("([a-z]+-)fc"',s)
    k=s.find('<header class="appbar"')
    if not m or k<0:
        print("übersprungen:",f);continue
    pfx=m.group(1)
    hook='window.BWA={FC:FC,CH:(typeof CHS!=="undefined"?CHS:(typeof CHF!=="undefined"?CHF:CH)),pfx:"%s"};/*bwanki*/\n'%pfx
    s=s[:m.start()]+hook+s[m.start():]
    k=s.find('<header class="appbar"')
    s=s[:k]+CSS+"\n"+s[k:]
    s=s.rstrip()+"\n"+JS+"\n"
    open(f,"w",encoding="utf-8").write(s)
    print("ok",f,pfx)
