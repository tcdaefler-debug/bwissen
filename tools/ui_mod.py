#!/usr/bin/env python3
"""Hängt die gemeinsame Design-Schicht (bw-ui.css, bw-tafel.js, bw-ui.js) in ein Fach ein.
Aufruf: python3 ui_mod.py modul-*.html   (mehrfach ausführbar, ändert nichts doppelt)
Nach jedem Neubau eines Fachs erneut ausführen (nach skin_mod.py)."""
import sys,re
V="20261112a"
CSS='<link rel="stylesheet" href="bw-ui.css?v=%s" data-bwui>'%V
JS='<script src="bw-tafel.js?v=%s" defer data-bwui></script><script src="bw-ui.js?v=%s" defer data-bwui></script>'%(V,V)
for f in sys.argv[1:]:
    s=open(f,encoding="utf-8").read()
    s=re.sub(r'<link[^>]*data-bwui[^>]*>\n?','',s)
    s=re.sub(r'<script[^>]*data-bwui[^>]*></script>\n?','',s)
    k=s.find('<header class="appbar"')
    if k<0:
        print("übersprungen (keine Kopfleiste):",f);continue
    s=s[:k]+CSS+"\n"+s[k:]
    s=s.rstrip()+"\n"+JS+"\n"
    open(f,"w",encoding="utf-8").write(s)
    print("ok",f)
