/* BWIssen · gemeinsame Bedien-Schicht für alle Fächer (bw-ui.js)
   Leiste unten, Kopfleiste beim Scrollen, Konfetti nach bestandener Prüfung, Sicherheitsabstand unten. */
(function(){
"use strict";
var D=document,H=D.documentElement;
var RM=false;try{RM=matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}
function $(s,r){return (r||D).querySelector(s)}
function el(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}

/* Abstand unten: im eingebetteten Fenster meldet ihn die Startseite */
addEventListener("message",function(e){if(e.data&&typeof e.data.bwSab==="number")H.style.setProperty("--sab",e.data.bwSab+"px")});

var ICON={
 start:'<path d="M3.5 11.2 12 4l8.5 7.2"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>',
 lernen:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5z"/><path d="M9 8h7"/>',
 ueben:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
 pruefung:'<path d="M7 3h7.5L19 7.5V21H7z"/><path d="M14.5 3v4.5H19"/><path d="M10 14.5l2 2 3.5-4.2"/>',
 tafel:'<rect x="3" y="4" width="18" height="12.5" rx="2.2"/><path d="M8 20.5l1.6-4M16 20.5l-1.6-4M7 9.5c1.6-2 3-2 4.4 0s2.8 2 4.6 0"/>'
};
var GROUP={lernen:"lernen",kapitel:"lernen",grundkurs:"lernen",karten:"lernen",videos:"lernen",formeln:"lernen",spiele:"lernen",labor:"lernen",
 fragen:"ueben",quiz:"ueben",aufgaben:"ueben",uebungen:"ueben",trainer:"ueben",rechnen:"ueben",schwach:"ueben",pruefung:"pruefung",verlauf:"pruefung",start:"start"};

function has(h){return !!$('#tabs a[href="#'+h+'"]')}
function buildTab(){
  if($("#utab")||!$("#tabs"))return;
  var items=[["start","Start","start"]];
  if(has("lernen"))items.push(["lernen","Lernen","lernen"]);
  var u=["rechnen","fragen","quiz","aufgaben"].filter(has)[0];
  if(u)items.push(["ueben","Üben",u]);
  if(has("pruefung"))items.push(["pruefung","Prüfung","pruefung"]);
  if(window.BW_TAFEL&&window.BW_TAFEL.list&&window.BW_TAFEL.list.length)items.push(["tafel","Tafel",null]);
  var n=el("nav");n.id="utab";n.setAttribute("aria-label","Schnellzugriff");
  n.appendChild(el("i","ind"));
  items.forEach(function(it){var b=el("button",null,'<svg viewBox="0 0 24 24" aria-hidden="true">'+ICON[it[0]]+'</svg><span>'+it[1]+'</span>');b.type="button";b.dataset.g=it[0];
    b.onclick=function(){if(it[0]==="tafel"){if(window.BW_TAFEL.open)window.BW_TAFEL.open();return}
      var cur=(location.hash||"#start").slice(1);if(cur===it[2])window.scrollTo({top:0,behavior:RM?"auto":"smooth"});else location.hash=it[2]};
    n.appendChild(b)});
  D.body.appendChild(n);
  function mark(){var v=(location.hash||"#start").slice(1).replace(/-.*$/,"");var g=GROUP[v]||"start";var bs=n.querySelectorAll("button"),ix=0;
    bs.forEach(function(b,i){var on=b.dataset.g===g;if(on)ix=i;b.setAttribute("aria-current",on?"true":"false")});
    var ind=$(".ind",n),w=(n.clientWidth-10-2*(bs.length-1))/bs.length;ind.style.width=w+"px";ind.style.transform="translateX("+(ix*(w+2))+"px)"}
  addEventListener("hashchange",function(){setTimeout(mark,0)});addEventListener("resize",mark);setTimeout(mark,0);setTimeout(mark,400);
  /* Tastatur offen: Leiste weg, damit sie kein Eingabefeld verdeckt */
  D.addEventListener("focusin",function(e){var t=e.target;if(t&&/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)&&t.type!=="checkbox"&&t.type!=="radio"&&t.tagName!=="SELECT")n.classList.add("off")});
  D.addEventListener("focusout",function(){setTimeout(function(){var a=D.activeElement;if(!a||!/^(INPUT|TEXTAREA)$/.test(a.tagName))n.classList.remove("off")},60)});
}

function headScroll(){var h=$("header.appbar");if(!h)return;var on=false;
  addEventListener("scroll",function(){var s=(D.scrollingElement||H).scrollTop>6;if(s!==on){on=s;h.classList.toggle("u-scrolled",s)}},{passive:true})}

/* Konfetti */
function confetti(){
  if(RM||$("#u-confetti"))return;var c=el("canvas");c.id="u-confetti";D.body.appendChild(c);
  var dpr=Math.min(2,window.devicePixelRatio||1),W=c.width=innerWidth*dpr,Hh=c.height=innerHeight*dpr,x=c.getContext("2d");
  var col=["#3b5bdb","#ee7418","#139a58","#7048e8","#f59e0b","#e11d74"],P=[];
  for(var i=0;i<130;i++)P.push({x:W/2+(Math.random()-.5)*W*.3,y:Hh*.38,vx:(Math.random()-.5)*26*dpr,vy:(-Math.random()*22-6)*dpr,s:(5+Math.random()*7)*dpr,r:Math.random()*6.3,vr:(Math.random()-.5)*.5,c:col[i%col.length],o:Math.random()<.3});
  var t0=performance.now();
  (function f(t){var k=(t-t0)/1000;x.clearRect(0,0,W,Hh);P.forEach(function(p){p.vy+=.55*dpr;p.vx*=.985;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.globalAlpha=Math.max(0,1-k/2.6);x.fillStyle=p.c;
      if(p.o){x.beginPath();x.arc(0,0,p.s/2,0,6.3);x.fill()}else x.fillRect(-p.s/2,-p.s/3,p.s,p.s*.66);x.restore()});
    if(k<2.6)requestAnimationFrame(f);else c.remove()})(t0);
}
window.BW_CONFETTI=confetti;
function watchWin(){var m=$("main");if(!m)return;var seen=new WeakSet();
  new MutationObserver(function(){var r=m.querySelector(".exres.ok");if(r&&!seen.has(r)){seen.add(r);setTimeout(confetti,250)}}).observe(m,{childList:true,subtree:true})}

function init(){buildTab();headScroll();watchWin();
  try{if(window.parent!==window)window.parent.postMessage({bwAsk:"insets"},"*")}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",init);else init();
})();
