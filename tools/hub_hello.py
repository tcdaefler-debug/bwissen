#!/usr/bin/env python3
# Einmal-Umbau der Startseite: neues Logo (lila Kachel = Bibos Gesicht) und neue Begrüßung
# (Logo wackelt, platzt, Bibo springt heraus und schreibt "Hallo <Name>").
import re,sys
p=sys.argv[1];s=open(p,encoding="utf-8").read()

OLD_IN='<rect x="76" y="76" width="166" height="166" rx="40" fill="#3b5bdb"/><rect x="270" y="76" width="166" height="166" rx="40" fill="#ee7418"/><rect x="76" y="270" width="166" height="166" rx="40" fill="#139a58"/><rect x="270" y="270" width="166" height="166" rx="40" fill="#7048e8"/><path d="M310 356l38 36 62-74" fill="none" stroke="#fff" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>'
NEW_IN='<rect x="76" y="76" width="166" height="166" rx="48" fill="url(#lg-b)"/><rect x="270" y="76" width="166" height="166" rx="48" fill="url(#lg-o)"/><rect x="76" y="270" width="166" height="166" rx="48" fill="url(#lg-g)"/><rect x="270" y="270" width="166" height="166" rx="48" fill="url(#lg-p)"/><circle cx="323" cy="333" r="19" fill="#fff"/><circle cx="383" cy="333" r="19" fill="#fff"/><circle cx="327" cy="336" r="9.5" fill="#1b2333"/><circle cx="387" cy="336" r="9.5" fill="#1b2333"/><path d="M322 384l22 20 40-46" fill="none" stroke="#fff" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>'
n=s.count(OLD_IN); s=s.replace(OLD_IN,NEW_IN); print("Logo ersetzt:",n)

DEFS='<svg width="0" height="0" style="position:absolute" aria-hidden="true" id="lg-defs"><defs><linearGradient id="lg-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6485ff"/><stop offset="1" stop-color="#3451d1"/></linearGradient><linearGradient id="lg-o" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffa54a"/><stop offset="1" stop-color="#ea6a0c"/></linearGradient><linearGradient id="lg-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34c780"/><stop offset="1" stop-color="#0f8f50"/></linearGradient><linearGradient id="lg-p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9a78ff"/><stop offset="1" stop-color="#6538e0"/></linearGradient></defs></svg>'
if 'id="lg-defs"' not in s:
    s=s.replace('<div id="bgimg"',DEFS+'<div id="bgimg"',1)

# ---- Begrüßung: Markup ----
a=s.index('<div id="hello"'); b=s.index('<div id="gate"')
HELLO='''<div id="hello" hidden aria-live="polite"><div class="hl-glow" aria-hidden="true"></div><div class="hl-w">
<svg class="hl-svg" viewBox="0 0 300 300" aria-hidden="true">
<circle class="hl-ring" cx="150" cy="150" r="40" fill="none" stroke="#7048e8" stroke-width="6" opacity="0"/>
<g class="hl-parts"></g>
<g class="hl-bibo" opacity="0">
<ellipse class="hl-shadow" cx="150" cy="226" rx="46" ry="7" fill="#1b2333" opacity=".14"/>
<g class="hl-body"><rect x="95" y="110" width="110" height="106" rx="37" fill="url(#lg-p)"/><path d="M112 128c10-9 26-12 42-12" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".28"/>
<g class="hl-eyes"><circle cx="131" cy="154" r="12.5" fill="#fff"/><circle cx="169" cy="154" r="12.5" fill="#fff"/><circle cx="134" cy="156" r="6.2" fill="#1b2333"/><circle cx="172" cy="156" r="6.2" fill="#1b2333"/><circle cx="136" cy="153.500" r="2" fill="#fff"/><circle cx="174" cy="153.500" r="2" fill="#fff"/></g>
<circle cx="113" cy="178" r="6.500" fill="#ff9ec7" opacity=".8"/><circle cx="187" cy="178" r="6.500" fill="#ff9ec7" opacity=".8"/>
<path class="hl-smile" d="M133 184l12 11 23-22" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>
</g>
<g class="hl-logo"><rect class="hl-t hl-tb" x="83" y="83" width="62" height="62" rx="18" fill="url(#lg-b)"/><rect class="hl-t hl-to" x="155" y="83" width="62" height="62" rx="18" fill="url(#lg-o)"/><rect class="hl-t hl-tg" x="83" y="155" width="62" height="62" rx="18" fill="url(#lg-g)"/><g class="hl-t hl-tp"><rect x="155" y="155" width="62" height="62" rx="18" fill="url(#lg-p)"/><circle cx="174.800" cy="179" r="7.100" fill="#fff"/><circle cx="197.200" cy="179" r="7.100" fill="#fff"/><circle cx="176.300" cy="180.100" r="3.500" fill="#1b2333"/><circle cx="198.700" cy="180.100" r="3.500" fill="#1b2333"/><path d="M174.400 198l8.200 7.500 15-17.200" fill="none" stroke="#fff" stroke-width="6.300" stroke-linecap="round" stroke-linejoin="round"/></g></g>
</svg>
<div class="hl-txt"><span class="hl-a" id="hl-a"><span id="hl-a1">Hallo</span> <span id="hl-n"></span></span><span class="hl-s" id="hl-s">Viel Spaß beim Lernen!</span></div>
</div></div>
'''
s=s[:a]+HELLO+s[b:]

# ---- Begrüßung: CSS ----
a=s.index('#hello{position:fixed'); b=s.index('@media (prefers-reduced-motion:reduce){.hl-a,'); b=s.index('\n',b)+1
CSS='''#hello{position:fixed;inset:0;z-index:50;background:#fff;display:grid;place-items:center;text-align:center;padding:24px;cursor:pointer;overflow:hidden;touch-action:manipulation}
#hello.go{animation:helloOut .6s cubic-bezier(.5,0,.8,.3) forwards}
#hello.go .hl-w{animation:hlShrink .6s cubic-bezier(.5,0,.8,.3) forwards}
.hl-glow{position:absolute;left:50%;top:42%;width:min(130vw,760px);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;pointer-events:none;opacity:0;background:radial-gradient(closest-side,rgba(112,72,232,.26),rgba(238,116,24,.1) 55%,transparent);transition:opacity 1.2s}
#hello.lit .hl-glow{opacity:1}
.hl-w{position:relative;display:flex;flex-direction:column;align-items:center;width:100%}
.hl-svg{width:min(74vw,330px);height:auto;overflow:visible;display:block;transition:transform .8s cubic-bezier(.2,.8,.2,1)}
#hello.txt .hl-svg{transform:translateY(-4%) scale(.86)}
.hl-svg *{transform-box:fill-box;transform-origin:center}
.hl-txt{display:flex;flex-direction:column;align-items:center;margin-top:-14px;min-height:9.5rem;max-width:100%}
.hl-a{display:inline-block;font-family:"Caveat","Bradley Hand","Segoe Print","Snell Roundhand",cursive;font-weight:700;font-size:clamp(3.2rem,17vw,5.6rem);line-height:1.02;padding:.08em .16em .14em;max-width:94vw;text-wrap:balance;overflow-wrap:anywhere;background:linear-gradient(100deg,#3b5bdb,#7048e8 30%,#e11d74 55%,#ee7418 78%,#139a58);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-clip-path:inset(-10% 100% -10% 0);clip-path:inset(-10% 100% -10% 0)}
.hl-a.long{font-size:clamp(2.5rem,12.5vw,4.6rem)}
#hello.txt .hl-a{-webkit-clip-path:inset(-10% -4% -10% 0);clip-path:inset(-10% -4% -10% 0);transition:clip-path 1.15s cubic-bezier(.45,.05,.3,1),-webkit-clip-path 1.15s cubic-bezier(.45,.05,.3,1)}
.hl-s{display:block;margin-top:6px;color:var(--muted);font-family:var(--f-body);font-weight:650;font-size:1.06rem;letter-spacing:0;opacity:0;transform:translateY(10px)}
#hello.sub .hl-s{opacity:1;transform:none;transition:opacity .6s ease,transform .6s cubic-bezier(.2,.8,.2,1)}
@keyframes hlShrink{to{transform:scale(.3);opacity:0}}
@keyframes helloOut{55%{opacity:1}to{opacity:0}}
@media (prefers-reduced-motion:reduce){#hello.go,#hello.go .hl-w{animation:none!important}.hl-a,.hl-s,.hl-svg{transition:none!important}}
'''
s=s[:a]+CSS+s[b:]

# ---- Begrüßung: Ablauf ----
a=s.index('function hello(name,first){'); b=s.index('function enter(k,keep,greet,first,inherit)')
JS=r'''function hello(name,first){const h=$("#hello"),A=(e,k,o)=>{try{return e.animate(k,Object.assign({fill:"both",easing:"cubic-bezier(.2,.8,.2,1)"},o))}catch(_){return null}};
  $("#hl-a1").textContent=first?"Willkommen":"Hallo";$("#hl-n").textContent=name||"";$("#hl-a").classList.toggle("long",((first?10:5)+String(name||"").length)>11);
  $("#hl-s").textContent=first?"Schön, dass du dabei bist. Viel Spaß beim Lernen!":["Viel Spaß beim Lernen!","Schön, dass du da bist.","Bereit für die nächste Runde?","Weiter geht's, du schaffst das."][Math.floor(Math.random()*4)];
  h.classList.remove("go","txt","sub","lit");h.hidden=false;
  const logo=h.querySelector(".hl-logo"),bibo=h.querySelector(".hl-bibo"),body=h.querySelector(".hl-body"),ring=h.querySelector(".hl-ring"),parts=h.querySelector(".hl-parts"),smile=h.querySelector(".hl-smile"),eyes=h.querySelector(".hl-eyes");
  h.querySelectorAll(".hl-svg *").forEach(e=>{(e.getAnimations?e.getAnimations():[]).forEach(a=>a.cancel())});parts.innerHTML="";
  const T=[];let done=false;const at=(ms,f)=>T.push(setTimeout(()=>{if(!done)f()},ms));
  const close=()=>{if(done)return;done=true;T.forEach(clearTimeout);h.classList.add("go");setTimeout(()=>{h.hidden=true;h.classList.remove("go","txt","sub","lit")},RM?0:620)};
  h.onclick=close;
  const tb=h.querySelector(".hl-tb"),to=h.querySelector(".hl-to"),tg=h.querySelector(".hl-tg"),tp=h.querySelector(".hl-tp");
  if(RM||!tb.animate){logo.style.opacity=0;bibo.setAttribute("opacity",1);[[tb,10.5,-11.5],[to,-36,-18.5],[tg,61.5,-83.5]].forEach(([e,x,y])=>{e.style.transform="translate("+x+"px,"+y+"px) scale(.34)"});bibo.parentNode.appendChild(logo);logo.style.opacity=1;tp.style.opacity=0;h.classList.add("txt","sub","lit");T.push(setTimeout(close,RM?1800:2600));return}
  logo.style.opacity=1;tp.style.opacity=1;[tb,to,tg].forEach(e=>e.style.transform="");bibo.setAttribute("opacity",0);
  /* 1 Logo setzt sich zusammen */
  [tb,to,tg,tp].forEach((e,i)=>A(e,[{transform:"scale(0) rotate(-25deg)",opacity:0},{transform:"scale(1.12) rotate(4deg)",opacity:1,offset:.7},{transform:"none",opacity:1}],{duration:480,delay:i*85,easing:"cubic-bezier(.3,1.4,.5,1)"}));
  at(250,()=>h.classList.add("lit"));
  /* 2 es rumort */
  at(880,()=>A(logo,[{transform:"none"},{transform:"translate(-2px,1px) rotate(-2deg) scale(1.02)"},{transform:"translate(3px,-1px) rotate(2.500deg) scale(1.05)"},{transform:"translate(-4px,2px) rotate(-3.500deg) scale(1.03)"},{transform:"translate(4px,-2px) rotate(4deg) scale(1.1)"},{transform:"translate(-5px,1px) rotate(-5deg) scale(1.06)"},{transform:"translate(5px,-1px) rotate(5deg) scale(1.16)"},{transform:"scale(.9)"}],{duration:760,easing:"ease-in"}));
  /* 3 es platzt, Bibo springt heraus */
  at(1640,()=>{
    A(logo,[{transform:"scale(.9)"},{transform:"none"}],{duration:10});
    A(ring,[{opacity:.9,transform:"scale(.4)",strokeWidth:"10px"},{opacity:0,transform:"scale(4.2)",strokeWidth:"1px"}],{duration:700,easing:"cubic-bezier(.1,.7,.3,1)"});
    const col=["#3b5bdb","#ee7418","#139a58","#7048e8","#f59e0b","#e11d74"];
    for(let i=0;i<22;i++){const sq=i%3===0,e=document.createElementNS("http://www.w3.org/2000/svg",sq?"rect":"circle"),r=3+Math.random()*4.500;
      if(sq){e.setAttribute("x",150-r);e.setAttribute("y",150-r);e.setAttribute("width",2*r);e.setAttribute("height",2*r);e.setAttribute("rx",r*.45)}else{e.setAttribute("cx",150);e.setAttribute("cy",150);e.setAttribute("r",r)}
      e.setAttribute("fill",col[i%col.length]);parts.appendChild(e);const an=i/22*6.283+Math.random()*.4,d=95+Math.random()*95;
      A(e,[{transform:"translate(0,0) scale(.4)",opacity:1},{transform:"translate("+Math.cos(an)*d*.82+"px,"+(Math.sin(an)*d*.82-18)+"px) scale(1.1) rotate(160deg)",opacity:1,offset:.55},{transform:"translate("+Math.cos(an)*d+"px,"+(Math.sin(an)*d+34)+"px) scale(.2) rotate(320deg)",opacity:0}],{duration:900+Math.random()*350,easing:"cubic-bezier(.1,.6,.3,1)"})}
    /* drei Kacheln fliegen hoch und landen als Bausteine auf Bibos Kopf */
    [[tb,-78,-96,10.5,-11.5,-200,0],[to,6,-128,-36,-18.5,160,70],[tg,92,-120,61.5,-83.5,240,140]].forEach(([e,x1,y1,x2,y2,rot,dl])=>{
      A(e,[{transform:"none",easing:"cubic-bezier(.15,.7,.3,1)"},{transform:"translate("+x1+"px,"+y1+"px) rotate("+rot+"deg) scale(.8)",offset:.42,easing:"cubic-bezier(.6,0,.9,.6)"},{transform:"translate("+x2+"px,"+(y2+5)+"px) rotate("+(rot>0?360:-360)+"deg) scale(.34,.28)",offset:.84,easing:"ease-out"},{transform:"translate("+x2+"px,"+(y2-7)+"px) rotate("+(rot>0?360:-360)+"deg) scale(.34)",offset:.92},{transform:"translate("+x2+"px,"+y2+"px) rotate("+(rot>0?360:-360)+"deg) scale(.34)"}],{duration:1050,delay:dl,easing:"linear"})});
    A(tp,[{opacity:1,transform:"none"},{opacity:0,transform:"translate(-36px,-23px) scale(1.5)"}],{duration:240,easing:"ease-out"});
    bibo.setAttribute("opacity",1);
    A(bibo,[{transform:"translate(36px,23px) scale(.5)",opacity:0},{transform:"translate(0,-34px) scale(1.08,.94)",opacity:1,offset:.42},{transform:"translate(0,6px) scale(1.1,.88)",offset:.68},{transform:"translate(0,-9px) scale(.97,1.04)",offset:.84},{transform:"none"}],{duration:900,easing:"cubic-bezier(.3,.9,.4,1)"});
    A(smile,[{strokeDasharray:"60px",strokeDashoffset:"60px"},{strokeDasharray:"60px",strokeDashoffset:"0px"}],{duration:380,delay:620,easing:"ease-out"});
    A(eyes,[{transform:"scale(1,.1)"},{transform:"none"}],{duration:200,delay:520})});
  /* 4 Bibo wippt und zwinkert, dann schreibt er */
  at(2700,()=>{A(body,[{transform:"none"},{transform:"rotate(-7deg) translateY(-6px)"},{transform:"rotate(6deg) translateY(-3px)"},{transform:"none"}],{duration:900,easing:"ease-in-out"});A(eyes,[{transform:"none"},{transform:"scale(1,.1)",offset:.5},{transform:"none"}],{duration:240,delay:520});h.classList.add("txt")});
  at(3780,()=>h.classList.add("sub"));
  at(4400,()=>A(eyes,[{transform:"none"},{transform:"scale(1,.1)",offset:.5},{transform:"none"}],{duration:220}));
  T.push(setTimeout(close,6100))}
'''
s=s[:a]+JS+s[b:]
s=s.replace('family=Lexend:wght@500;600;700&family=Nunito+Sans:opsz,wght@6..12,400;6..12,700;6..12,800&display=swap','family=Caveat:wght@700&display=swap')
open(p,"w",encoding="utf-8").write(s);print("ok")
