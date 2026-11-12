/* BWIssen · Tafel (bw-tafel.js)
   Erklärungen wie an der Tafel: Schritt für Schritt mit Kreide angeschrieben, zum Mitzeichnen mit dem Finger.
   Dazu 3D-Modelle zum Drehen. Die Inhalte stehen je Fach in bw-tafel-data.js (nur Stoff aus den Fächern selbst). */
(function(){
"use strict";
var D=document,NS="http://www.w3.org/2000/svg";
var RM=false;try{RM=matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}
var COL={w:"#f4f1e6",y:"#ffe27a",b:"#8fd0ff",r:"#ff9d94",g:"#a5e6a0",o:"#ffbd80",p:"#d3b8ff"};
var W=360,HH=470;
function el(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function sv(t,a){var e=D.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);return e}
function rng(seed){var s=seed>>>0||1;return function(){s=(s*1664525+1013904223)>>>0;return s/4294967296}}

var CSS='#tafel{position:fixed;inset:0;z-index:80;display:flex;flex-direction:column;background:#17251f;color:#f4f1e6;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",system-ui,sans-serif;animation:tfIn .45s cubic-bezier(.2,.8,.2,1);touch-action:none;-webkit-user-select:none;user-select:none;overscroll-behavior:none}'
+'html.dark #tafel{filter:invert(1) hue-rotate(180deg)}'
+'#tafel.bye{animation:tfOut .3s ease forwards}'
+'@keyframes tfIn{from{opacity:0;transform:translateY(5%) scale(.97)}to{opacity:1;transform:none}}@keyframes tfOut{to{opacity:0;transform:translateY(5%) scale(.97)}}'
+'#tafel::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(120% 80% at 30% 10%,rgba(255,255,255,.07),transparent 60%),radial-gradient(90% 70% at 80% 90%,rgba(0,0,0,.28),transparent 70%),repeating-linear-gradient(97deg,rgba(255,255,255,.012) 0 3px,transparent 3px 9px)}'
+'.tf-top{position:relative;display:flex;align-items:center;gap:10px;padding:calc(10px + var(--sat,env(safe-area-inset-top,0px))) 14px 8px}'
+'.tf-top h2{flex:1;min-width:0;margin:0;font:700 1rem/1.2 inherit;color:#f4f1e6;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
+'.tf-top small{display:block;font-weight:600;font-size:.72rem;letter-spacing:.07em;text-transform:uppercase;color:rgba(244,241,230,.6)}'
+'.tf-rb{flex:none;width:40px;height:40px;border-radius:50%;border:0;background:rgba(255,255,255,.1);color:#f4f1e6;display:grid;place-items:center;cursor:pointer;transition:transform .15s,background-color .2s}'
+'.tf-rb:active{transform:scale(.9);background:rgba(255,255,255,.2)}.tf-rb svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2.3;stroke-linecap:round;stroke-linejoin:round}'
+'.tf-main{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;padding:0 10px}'
+'.tf-board{position:relative;flex:1;min-height:0;width:100%;max-width:560px;border-radius:18px;background:linear-gradient(160deg,#2b4a3c,#22392f 55%,#1e332a);box-shadow:inset 0 0 0 1px rgba(255,255,255,.07),inset 0 0 60px rgba(0,0,0,.35),0 0 0 7px #6b4a2c,0 0 0 8px #4d3520,0 18px 40px -12px rgba(0,0,0,.7);margin:8px 8px 14px;overflow:hidden}'
+'.tf-board svg,.tf-board canvas{position:absolute;inset:0;width:100%;height:100%;display:block}'
+'.tf-board canvas.draw{touch-action:none;cursor:crosshair}'
+'.tf-cap{position:relative;width:100%;max-width:560px;min-height:3.9em;padding:2px 8px 0;font-size:1rem;line-height:1.4;font-weight:550;color:#f4f1e6;text-align:center;display:flex;align-items:center;justify-content:center}'
+'.tf-cap span{animation:tfCap .4s ease}@keyframes tfCap{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}'
+'.tf-bot{position:relative;display:flex;align-items:center;gap:8px;padding:8px 14px calc(12px + var(--sab,env(safe-area-inset-bottom,0px)));max-width:588px;width:100%;margin:0 auto}'
+'.tf-pens{display:flex;gap:6px;align-items:center;background:rgba(255,255,255,.08);border-radius:999px;padding:5px 7px}'
+'.tf-pen{width:26px;height:26px;border-radius:50%;border:2px solid transparent;padding:0;cursor:pointer;transition:transform .15s}'
+'.tf-pen[aria-pressed="true"]{border-color:#fff;transform:scale(1.14)}'
+'.tf-wipe{border:0;background:rgba(255,255,255,.1);color:#f4f1e6;border-radius:999px;height:36px;width:40px;display:grid;place-items:center;cursor:pointer;flex:none}.tf-wipe svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.tf-wipe:active{background:rgba(255,255,255,.22)}'
+'.tf-nav{margin-left:auto;display:flex;gap:8px;align-items:center}'
+'.tf-btn{border:0;border-radius:999px;height:46px;padding:0 20px;font:700 1rem inherit;cursor:pointer;background:#f4f1e6;color:#17251f;transition:transform .15s,opacity .2s;white-space:nowrap}'
+'.tf-btn:active{transform:scale(.95)}.tf-btn.sec{background:rgba(255,255,255,.12);color:#f4f1e6;padding:0;width:46px;display:grid;place-items:center}.tf-btn.sec svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}.tf-btn:disabled{opacity:.3}'
+'.tf-dots{position:absolute;left:0;right:0;bottom:7px;display:flex;gap:5px;justify-content:center;pointer-events:none}.tf-dots i{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.25);transition:background-color .3s,transform .3s}.tf-dots i.on{background:#ffe27a;transform:scale(1.25)}'
+'.tf-list{position:relative;flex:1;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch;touch-action:pan-y;padding:4px 16px calc(24px + var(--sab,env(safe-area-inset-bottom,0px)));display:grid;gap:10px;align-content:start;max-width:588px;width:100%;margin:0 auto}'
+'.tf-list p{margin:2px 2px 6px;color:rgba(244,241,230,.75);font-size:.95rem;line-height:1.45}'
+'.tf-it{display:flex;align-items:center;gap:13px;text-align:left;border:0;border-radius:20px;padding:14px;background:rgba(255,255,255,.08);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);color:#f4f1e6;font:inherit;cursor:pointer;animation:tfCap .45s ease both;transition:transform .15s,background-color .2s}'
+'.tf-it:active{transform:scale(.975);background:rgba(255,255,255,.14)}'
+'.tf-it .n{flex:none;width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:rgba(255,226,122,.16);color:#ffe27a;font:700 1.5rem "Caveat","Bradley Hand","Segoe Print",cursive}'
+'.tf-it.d3 .n{background:rgba(143,208,255,.16);color:#8fd0ff;font:800 .9rem inherit;letter-spacing:.02em}'
+'.tf-it b{display:block;font-weight:700;font-size:1.02rem;line-height:1.25}.tf-it small{display:block;color:rgba(244,241,230,.66);font-size:.86rem;line-height:1.3;margin-top:2px}'
+'.tf-it .ok{margin-left:auto;flex:none;width:24px;height:24px;border-radius:50%;background:#a5e6a0;color:#17251f;display:grid;place-items:center;font-size:.8rem;font-weight:800}'
+'.tf-ch{font-family:"Caveat","Bradley Hand","Segoe Print","Comic Sans MS",cursive;font-weight:700}'
+'.tf-ch tspan{opacity:0;animation:tfCh .01s linear forwards}@keyframes tfCh{to{opacity:1}}'
+'.tf-st{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;animation:tfSt var(--dur,.6s) cubic-bezier(.4,.1,.3,1) forwards;animation-delay:var(--dl,0s)}@keyframes tfSt{to{stroke-dashoffset:0}}'
+'.tf-fd{opacity:0;animation:tfFd .5s ease forwards;animation-delay:var(--dl,0s)}@keyframes tfFd{to{opacity:var(--op,1)}}'
+'.tf-now .tf-ch tspan,.tf-now .tf-st,.tf-now .tf-fd{animation-duration:.01s!important;animation-delay:0s!important}'
+'.tf-hint{position:absolute;right:0;left:0;text-align:center;bottom:20px;font:600 .72rem inherit;color:rgba(244,241,230,.5);pointer-events:none;transition:opacity .4s}'
+'@media (prefers-reduced-motion:reduce){#tafel,#tafel *{animation-duration:.01s!important;animation-delay:0s!important}}';

var root=null,cur=null,stepI=0,pen="w",drawn=false;
function key(){return (window.BW_TAFEL.prefix||"bw-")+"tafel"}
function doneGet(){try{return JSON.parse(localStorage.getItem(key()))||{}}catch(e){return{}}}
function doneSet(id){var d=doneGet();d[id]=1;try{localStorage.setItem(key(),JSON.stringify(d))}catch(e){}}

/* ---------- Kreide-Zeichnen ---------- */
function wob(pts,r,amp){var o=[];for(var i=0;i<pts.length-1;i++){var a=pts[i],b=pts[i+1],dx=b[0]-a[0],dy=b[1]-a[1],L=Math.sqrt(dx*dx+dy*dy)||1,n=Math.max(1,Math.round(L/26));
    for(var k=0;k<n;k++){var t=k/n;o.push([a[0]+dx*t+(k?(r()-.5)*amp:0),a[1]+dy*t+(k?(r()-.5)*amp:0)])}}o.push(pts[pts.length-1]);return o}
function smooth(p){if(p.length<3)return "M"+p.map(function(q){return q[0].toFixed(1)+" "+q[1].toFixed(1)}).join("L");
  var d="M"+p[0][0].toFixed(1)+" "+p[0][1].toFixed(1);for(var i=1;i<p.length-1;i++){var mx=(p[i][0]+p[i+1][0])/2,my=(p[i][1]+p[i+1][1])/2;d+="Q"+p[i][0].toFixed(1)+" "+p[i][1].toFixed(1)+" "+mx.toFixed(1)+" "+my.toFixed(1)}
  var l=p[p.length-1];return d+"L"+l[0].toFixed(1)+" "+l[1].toFixed(1)}
function stroke(g,pts,o,dl,r,raw){o=o||{};var c=COL[o.c||"w"],w=o.w||2.6,len=0;for(var i=1;i<pts.length;i++)len+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);
  var dur=Math.min(1.1,Math.max(.25,len/420));
  if(o.dash){var p0=sv("path",{d:smooth(raw?pts:wob(pts,r,1.2)),stroke:c,"stroke-width":w,"stroke-dasharray":"7 7",fill:"none","stroke-linecap":"round",class:"tf-fd",opacity:.9});p0.style.setProperty("--dl",dl+"s");g.appendChild(p0);return dl+.35}
  for(var k=0;k<2;k++){var p=sv("path",{d:smooth(raw?pts:wob(pts,r,k?2.2:1.3)),stroke:c,"stroke-width":k?w*.55:w,pathLength:1,class:"tf-st",opacity:k?.55:.95});
    p.style.setProperty("--dl",dl+"s");p.style.setProperty("--dur",dur+"s");g.appendChild(p)}
  return dl+dur*.85}
function text(g,x,y,str,o,dl){o=o||{};var t=sv("text",{x:x,y:y,fill:COL[o.c||"w"],"font-size":o.s||22,"text-anchor":o.a==="m"?"middle":o.a==="e"?"end":"start",class:"tf-ch"});
  if(o.rot)t.setAttribute("transform","rotate("+o.rot+" "+x+" "+y+")");
  var per=Math.min(.045,.9/Math.max(1,str.length));
  Array.from(str).forEach(function(ch,i){var s=sv("tspan",{});s.textContent=ch;s.style.animationDelay=(dl+i*per)+"s";t.appendChild(s)});
  g.appendChild(t);return dl+str.length*per+.12}
function drawStep(g,ops,seed){var r=rng(seed*7919+13),dl=.05;
  ops.forEach(function(op){var k=op[0];
    if(k==="t")dl=text(g,op[1],op[2],String(op[3]),op[4],dl);
    else if(k==="l")dl=stroke(g,[[op[1],op[2]],[op[3],op[4]]],op[5],dl,r);
    else if(k==="a"){var o=op[5]||{};dl=stroke(g,[[op[1],op[2]],[op[3],op[4]]],o,dl,r);var an=Math.atan2(op[4]-op[2],op[3]-op[1]),h=o.h||11;
      stroke(g,[[op[3]-h*Math.cos(an-.45),op[4]-h*Math.sin(an-.45)],[op[3],op[4]],[op[3]-h*Math.cos(an+.45),op[4]-h*Math.sin(an+.45)]],{c:o.c,w:o.w},dl-.08,r,true);dl+=.12}
    else if(k==="r"){var x=op[1],y=op[2],w=op[3],hh=op[4];dl=stroke(g,[[x,y],[x+w,y],[x+w,y+hh],[x,y+hh],[x,y]],op[5],dl,r)}
    else if(k==="c"){var pts=[],n=22;for(var i=0;i<=n+1;i++){var a=i/n*6.283-1.6;pts.push([op[1]+Math.cos(a)*op[3]*(1+(r()-.5)*.05),op[2]+Math.sin(a)*((op[4]&&op[4].ry)||op[3])*(1+(r()-.5)*.05)])}dl=stroke(g,pts,op[4],dl,r,true)}
    else if(k==="p")dl=stroke(g,op[1],op[2],dl,r,!!(op[2]&&op[2].raw));
    else if(k==="f"){var pg=sv("polygon",{points:op[1].map(function(q){return q.join(",")}).join(" "),fill:COL[(op[2]&&op[2].c)||"y"],class:"tf-fd"});pg.style.setProperty("--op",(op[2]&&op[2].o)||.22);pg.style.setProperty("--dl",dl+"s");g.appendChild(pg);dl+=.3}
    else if(k==="u"){dl=stroke(g,[[op[1],op[3]],[op[2],op[3]+1]],op[4]||{c:"y"},dl,r)}
    else if(k==="w")dl+=op[1];
  });return dl}

/* ---------- 3D-Modell ---------- */
function view3d(board,scene,cap){
  var c=el("canvas");board.appendChild(c);var x=c.getContext("2d"),yaw=scene.yaw!=null?scene.yaw:-.62,pit=scene.pitch!=null?scene.pitch:.42,auto=!RM,raf=0,dead=false,zoom=scene.zoom||1;
  function size(){var d=Math.min(2,window.devicePixelRatio||1);c.width=board.clientWidth*d;c.height=board.clientHeight*d}
  function shade(hex,f){var n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;f=Math.max(.35,Math.min(1.25,f));return "rgb("+Math.min(255,r*f|0)+","+Math.min(255,g*f|0)+","+Math.min(255,b*f|0)+")"}
  function draw(){if(dead)return;var w=c.width,h=c.height,d=Math.min(2,window.devicePixelRatio||1);x.clearRect(0,0,w,h);
    var cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pit),sp=Math.sin(pit),S=Math.min(w,h)/(scene.size||10)*zoom,ox=w/2,oy=h*(scene.cy||.52);
    function P(p){var X=p[0]*cy+p[2]*sy,Z=-p[0]*sy+p[2]*cy,Y=p[1]*cp-Z*sp,Z2=p[1]*sp+Z*cp,k=1/(1+Z2*.035);return [ox+X*S*k,oy-Y*S*k,Z2]}
    var items=[];
    (scene.boxes||[]).forEach(function(b){var x0=b.p[0],y0=b.p[1],z0=b.p[2],x1=x0+b.s[0],y1=y0+b.s[1],z1=z0+b.s[2];
      var V=[[x0,y0,z0],[x1,y0,z0],[x1,y1,z0],[x0,y1,z0],[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]].map(P);
      [[0,1,2,3,[0,0,-1]],[5,4,7,6,[0,0,1]],[4,0,3,7,[-1,0,0]],[1,5,6,2,[1,0,0]],[3,2,6,7,[0,1,0]],[4,5,1,0,[0,-1,0]]].forEach(function(f){
        var n=f[4],nx=n[0]*cy+n[2]*sy,nz=-n[0]*sy+n[2]*cy,ny=n[1]*cp-nz*sp,nz2=n[1]*sp+nz*cp;if(nz2>=0&&!b.glass)return;
        var q=[V[f[0]],V[f[1]],V[f[2]],V[f[3]]],z=(q[0][2]+q[1][2]+q[2][2]+q[3][2])/4;
        items.push({z:z,f:function(){x.beginPath();x.moveTo(q[0][0],q[0][1]);for(var i=1;i<4;i++)x.lineTo(q[i][0],q[i][1]);x.closePath();x.globalAlpha=b.o||1;x.fillStyle=shade(b.c,.62+.5*Math.max(0,-nx*.35+ny*.75-nz2*.45));x.fill();x.globalAlpha=1;x.strokeStyle="rgba(10,20,16,.55)";x.lineWidth=1*d;x.stroke()}})});
      if(b.t){var m=P([(x0+x1)/2,y1,(z0+z1)/2]);items.push({z:-999,f:function(){lab(b.t,m[0],m[1]-9*d,b.tc||"#f4f1e6")}})}});
    (scene.arrows||[]).forEach(function(a){var A=P(a.a),B=P(a.b);items.push({z:Math.min(A[2],B[2])-.5,f:function(){var an=Math.atan2(B[1]-A[1],B[0]-A[0]),hl=11*d;x.strokeStyle=a.c;x.fillStyle=a.c;x.lineWidth=(a.w||3.2)*d;x.lineCap="round";if(a.dash)x.setLineDash([6*d,6*d]);x.beginPath();x.moveTo(A[0],A[1]);x.lineTo(B[0]-Math.cos(an)*hl*.6,B[1]-Math.sin(an)*hl*.6);x.stroke();x.setLineDash([]);
        if(!a.nohead){x.beginPath();x.moveTo(B[0],B[1]);x.lineTo(B[0]-hl*Math.cos(an-.42),B[1]-hl*Math.sin(an-.42));x.lineTo(B[0]-hl*Math.cos(an+.42),B[1]-hl*Math.sin(an+.42));x.closePath();x.fill()}
        if(a.t){var tp=a.tp==="a"?A:a.tp==="m"?[(A[0]+B[0])/2,(A[1]+B[1])/2]:B;lab(a.t,tp[0]+(a.dx||0)*d,tp[1]+(a.dy!=null?a.dy:-12)*d,a.c)}}})});
    (scene.rings||[]).forEach(function(g){var pts=[],n=40,a0=g.a0||0,a1=g.a1!=null?g.a1:6.283;for(var i=0;i<=n;i++){var t=a0+(a1-a0)*i/n,u=[0,0,0];u[g.ax[0]]=Math.cos(t)*g.r;u[g.ax[1]]=Math.sin(t)*g.r;pts.push(P([g.p[0]+u[0],g.p[1]+u[1],g.p[2]+u[2]]))}
      items.push({z:-500,f:function(){x.strokeStyle=g.c;x.lineWidth=3*d;x.lineCap="round";x.beginPath();pts.forEach(function(q,i){i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1])});x.stroke();var B=pts[pts.length-1],A=pts[pts.length-3],an=Math.atan2(B[1]-A[1],B[0]-A[0]),hl=11*d;x.fillStyle=g.c;x.beginPath();x.moveTo(B[0]+Math.cos(an)*4*d,B[1]+Math.sin(an)*4*d);x.lineTo(B[0]-hl*Math.cos(an-.45),B[1]-hl*Math.sin(an-.45));x.lineTo(B[0]-hl*Math.cos(an+.45),B[1]-hl*Math.sin(an+.45));x.closePath();x.fill();if(g.t)lab(g.t,pts[n>>1][0],pts[n>>1][1]-10*d,g.c)}})});
    (scene.labels||[]).forEach(function(l){var q=P(l.p);items.push({z:-998,f:function(){lab(l.t,q[0],q[1],l.c||"#f4f1e6",l.s)}})});
    function lab(t,px,py,col,s){x.font="700 "+((s||15)*d)+'px -apple-system,"Segoe UI",system-ui,sans-serif';x.textAlign="center";x.textBaseline="middle";x.lineWidth=4*d;x.strokeStyle="rgba(23,37,31,.85)";x.lineJoin="round";x.strokeText(t,px,py);x.fillStyle=col;x.fillText(t,px,py)}
    items.sort(function(a,b){return b.z-a.z}).forEach(function(i){i.f()});
    if(auto){yaw+=.0035;raf=requestAnimationFrame(draw)}}
  var px=0,py=0,down=false,pd=0,pts={};
  c.addEventListener("pointerdown",function(e){down=true;auto=false;px=e.clientX;py=e.clientY;pts[e.pointerId]=[e.clientX,e.clientY];try{c.setPointerCapture(e.pointerId)}catch(_){}});
  c.addEventListener("pointermove",function(e){if(!down)return;pts[e.pointerId]=[e.clientX,e.clientY];var ks=Object.keys(pts);
    if(ks.length>=2){var a=pts[ks[0]],b=pts[ks[1]],dd=Math.hypot(a[0]-b[0],a[1]-b[1]);if(pd)zoom=Math.max(.6,Math.min(2.4,zoom*dd/pd));pd=dd}
    else{yaw+=(e.clientX-px)*.011;pit=Math.max(-.2,Math.min(1.35,pit+(e.clientY-py)*.009));px=e.clientX;py=e.clientY}
    cancelAnimationFrame(raf);raf=requestAnimationFrame(draw)});
  function up(e){delete pts[e.pointerId];pd=0;if(!Object.keys(pts).length)down=false}
  c.addEventListener("pointerup",up);c.addEventListener("pointercancel",up);
  size();draw();var ro=function(){size();cancelAnimationFrame(raf);draw()};addEventListener("resize",ro);
  return {stop:function(){dead=true;cancelAnimationFrame(raf);removeEventListener("resize",ro)},redraw:function(){cancelAnimationFrame(raf);draw()},set:function(sc){scene=sc;cancelAnimationFrame(raf);draw()}};
}

/* ---------- Oberfläche ---------- */
function close(){if(!root)return;var r=root;root=null;if(r._v3)r._v3.stop();r.classList.add("bye");setTimeout(function(){r.remove()},RM?0:300);D.documentElement.style.overflow=""}
function open(id){
  if(!D.getElementById("tafel-css")){var st=el("style");st.id="tafel-css";st.textContent=CSS;D.head.appendChild(st);
    if(!D.querySelector('link[href*="Caveat"]')){var l=el("link");l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap";D.head.appendChild(l)}}
  if(root)root.remove();root=el("div");root.id="tafel";root.setAttribute("role","dialog");root.setAttribute("aria-modal","true");root.setAttribute("aria-label","Tafel");D.body.appendChild(root);D.documentElement.style.overflow="hidden";
  var L=window.BW_TAFEL.list,les=id&&L.filter(function(x){return x.id===id})[0];if(les)lesson(les);else menu()}
var X='<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',BACK='<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>';
function menu(){if(root._v3){root._v3.stop();root._v3=null}var L=window.BW_TAFEL.list,dn=doneGet();root.innerHTML="";
  var top=el("div","tf-top",'<h2><small>'+(window.BW_TAFEL.name||"")+'</small>An der Tafel</h2>');var xb=el("button","tf-rb",X);xb.type="button";xb.setAttribute("aria-label","Tafel schließen");xb.onclick=close;top.appendChild(xb);root.appendChild(top);
  var list=el("div","tf-list",'<p>Schritt für Schritt angeschrieben, wie an der Tafel. Du kannst mit dem Finger mitzeichnen. Die Modelle mit „3D“ lassen sich drehen.</p>');
  L.forEach(function(l,i){var b=el("button","tf-it"+(l.d3?" d3":""),'<span class="n">'+(l.d3?"3D":(i+1))+'</span><span><b>'+l.t+'</b><small>'+l.sub+'</small></span>'+(dn[l.id]?'<span class="ok">✓</span>':''));b.type="button";b.style.animationDelay=(i*.05)+"s";b.onclick=function(){lesson(l)};list.appendChild(b)});
  root.appendChild(list)}
function lesson(l){cur=l;stepI=0;drawn=false;root.innerHTML="";
  var top=el("div","tf-top");var bb=el("button","tf-rb",BACK);bb.type="button";bb.setAttribute("aria-label","Zur Übersicht");bb.onclick=menu;top.appendChild(bb);
  top.appendChild(el("h2",null,'<small>'+(l.d3?"3D-Modell":"Tafel")+'</small>'+l.t));var xb=el("button","tf-rb",X);xb.type="button";xb.setAttribute("aria-label","Tafel schließen");xb.onclick=close;top.appendChild(xb);root.appendChild(top);
  var main=el("div","tf-main"),board=el("div","tf-board"),cap=el("div","tf-cap");main.appendChild(board);main.appendChild(cap);root.appendChild(main);
  var bot=el("div","tf-bot");root.appendChild(bot);var dots=el("div","tf-dots");board.appendChild(dots);
  var steps=l.steps,svg=null,cv=null,v3=null;
  l.steps.forEach(function(){dots.appendChild(el("i"))});
  if(l.d3){v3=view3d(board,l.scene(0),cap);root._v3=v3;board.appendChild(el("div","tf-hint","Zum Drehen ziehen"));board.appendChild(dots)}
  else{svg=sv("svg",{viewBox:"0 0 "+W+" "+HH,preserveAspectRatio:"xMidYMid meet"});board.insertBefore(svg,dots);
    cv=el("canvas","draw");board.insertBefore(cv,dots);var hint=el("div","tf-hint","Mit dem Finger mitzeichnen");board.appendChild(hint);
    var cx=cv.getContext("2d"),last=null;function size(){var d=Math.min(2,window.devicePixelRatio||1),im=null;try{if(drawn)im=cx.getImageData(0,0,cv.width,cv.height)}catch(e){}cv.width=board.clientWidth*d;cv.height=board.clientHeight*d;if(im)cx.putImageData(im,0,0)}
    size();addEventListener("resize",size);
    function pt(e){var r=cv.getBoundingClientRect();return [(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height]}
    cv.addEventListener("pointerdown",function(e){e.preventDefault();last=pt(e);drawn=true;hint.style.opacity=0;try{cv.setPointerCapture(e.pointerId)}catch(_){}});
    cv.addEventListener("pointermove",function(e){if(!last)return;var p=pt(e),d=Math.min(2,window.devicePixelRatio||1);cx.strokeStyle=COL[pen];cx.globalAlpha=.92;cx.lineWidth=4.2*d;cx.lineCap="round";cx.lineJoin="round";cx.beginPath();cx.moveTo(last[0],last[1]);cx.lineTo(p[0],p[1]);cx.stroke();last=p});
    var end=function(){last=null};cv.addEventListener("pointerup",end);cv.addEventListener("pointercancel",end);
    var pens=el("div","tf-pens");["w","y","b","r"].forEach(function(k){var b=el("button","tf-pen");b.type="button";b.style.background=COL[k];b.setAttribute("aria-label","Kreidefarbe");b.setAttribute("aria-pressed",k===pen?"true":"false");b.onclick=function(){pen=k;pens.querySelectorAll("button").forEach(function(q){q.setAttribute("aria-pressed",q===b?"true":"false")})};pens.appendChild(b)});bot.appendChild(pens);
    var wipe=el("button","tf-wipe",'<svg viewBox="0 0 24 24"><path d="M4 16.5 13.5 7a2 2 0 0 1 2.8 0l2.7 2.700a2 2 0 0 1 0 2.800L12.500 19H7z"/><path d="M9.500 11l5.500 5.500M5 21h15"/></svg>');wipe.type="button";wipe.setAttribute("aria-label","Eigene Zeichnung wegwischen");wipe.onclick=function(){cx.clearRect(0,0,cv.width,cv.height);drawn=false};bot.appendChild(wipe)}
  var nav=el("div","tf-nav"),prev=el("button","tf-btn sec",BACK),next=el("button","tf-btn");prev.type=next.type="button";prev.setAttribute("aria-label","Schritt zurück");nav.appendChild(prev);nav.appendChild(next);bot.appendChild(nav);
  function show(i,instant){stepI=i;var s=steps[i];
    if(svg){while(svg.firstChild)svg.removeChild(svg.firstChild);for(var k=0;k<=i;k++){var g=sv("g",{});if(k<i||instant)g.setAttribute("class","tf-now");svg.appendChild(g);drawStep(g,steps[k].d,k+1+(cur.id.length*31))}}
    else if(v3)v3.set(l.scene(i));
    cap.innerHTML="<span>"+s.s+"</span>";dots.querySelectorAll("i").forEach(function(d,k){d.classList.toggle("on",k<=i)});
    prev.disabled=i===0;var lastS=i===steps.length-1;next.textContent=lastS?"Fertig":"Weiter";if(lastS)doneSet(l.id)}
  prev.onclick=function(){if(stepI>0)show(stepI-1,true)};
  next.onclick=function(){if(stepI<steps.length-1)show(stepI+1);else{if(window.BW_CONFETTI&&!l.d3)window.BW_CONFETTI();menu()}};
  show(0)}

window.BW_TAFEL=window.BW_TAFEL||{list:[]};window.BW_TAFEL.open=open;window.BW_TAFEL.close=close;
D.addEventListener("keydown",function(e){if(e.key==="Escape"&&root)close()});
D.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("[data-tafel]");if(a){e.preventDefault();open(a.getAttribute("data-tafel")||null)}});
})();
