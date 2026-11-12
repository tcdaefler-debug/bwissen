/* BWIssen · Inhalte für die Tafel je Fach. Nur Stoff, Beispiele und Zahlen aus dem jeweiligen Fach der App.
   Zeichenfläche 360 × 470. Befehle: t Text, l Linie, a Pfeil, r Rechteck, c Kreis, p Linienzug, f Fläche, u Unterstrich, w Pause. */
(function(){
"use strict";
var M={m:{a:"m"}};
function o(c,s,a){var x={};if(c)x.c=c;if(s)x.s=s;if(a)x.a=a;return x}
/* T-Konto: Titel, Querstrich, Mittelstrich, S und H */
function tk(x,y,w,h,title){var m=x+w/2;return [["t",m,y-8,title,o("w",19,"m")],["l",x,y,x+w,y,{w:3}],["l",m,y,m,y+h,{w:3}],["t",x+4,y+17,"S",o("b",17)],["t",x+w-4,y+17,"H",o("o",17,"e")]]}
function axes(x0,y0,x1,y1,lx,ly){return [["a",x0,y0,x0,y1,{w:2.6}],["a",x0,y0,x1,y0,{w:2.6}],["t",x0-8,y1+4,ly,o("w",20,"e")],["t",x1,y0+24,lx,o("w",20,"e")]]}

var L={};

/* ================= Buchführung ================= */
L["modul-buchfuehrung"]={name:"Soll & Haben",prefix:"bf-",list:[
{id:"bs1",t:"Vom Geschäftsfall zum Buchungssatz",sub:"Maschine gegen Banküberweisung, Fall 9.1",steps:[
 {s:"Baresta kauft einen Rüttelplattenverdichter für 18.000 € und bezahlt per Banküberweisung.",d:[["t",180,40,"Geschäftsfall",o("y",28,"m")],["u",112,248,48],["t",180,80,"Maschine kaufen: 18.000 €",o("w",23,"m")],["t",180,106,"bezahlt per Überweisung",o("w",21,"m")]]},
 {s:"Zwei Konten ändern sich: Die Maschinen werden mehr, das Bankguthaben wird weniger. Beides sind Aktivkonten.",d:[["t",26,148,"Welche Konten?",o("y",22)],["t",38,176,"TA und Maschinen",o("w",21)],["t",330,176,"+ 18.000",o("g",21,"e")],["t",38,202,"Bank",o("w",21)],["t",330,202,"− 18.000",o("r",21,"e")]]},
 {s:"Jedes Konto hat zwei Seiten: links Soll, rechts Haben. Aktivkonten nehmen im Soll zu und im Haben ab.",d:tk(18,254,152,96,"TA und Maschinen").concat(tk(190,254,152,96,"Bank"))},
 {s:"Der Zugang bei den Maschinen steht im Soll. Der Abgang bei der Bank steht im Haben.",d:[["t",56,300,"18.000",o("b",23,"m")],["c",56,293,30,{c:"b",w:2,ry:16}],["t",304,300,"18.000",o("o",23,"m")],["c",304,293,30,{c:"o",w:2,ry:16}]]},
 {s:"Der Buchungssatz nennt zuerst das Soll-Konto, dann „an“, dann das Haben-Konto.",d:[["t",180,392,"TA 18.000  an  Bank 18.000",o("y",25,"m")],["r",22,366,316,38,{c:"y",w:2}]]},
 {s:"Baresta ist nicht reicher geworden: Geld wurde gegen eine Maschine im gleichen Wert getauscht. Das ist ein Aktivtausch.",d:[["t",180,436,"Aktivtausch: Bilanzsumme bleibt gleich",o("g",20,"m")]]}
]},
{id:"bs2",t:"Einkauf auf Ziel",sub:"Betonstahl auf Rechnung, Fall 9.3",steps:[
 {s:"Baresta kauft Betonstahl für 24.000 € auf Ziel. „Ziel“ heißt: auf Rechnung, bezahlt wird später.",d:[["t",180,40,"Zieleinkauf",o("y",28,"m")],["u",120,240,48],["t",180,80,"Betonstahl: 24.000 €",o("w",23,"m")],["t",180,106,"laut Eingangsrechnung",o("w",21,"m")]]},
 {s:"Die Rohstoffe werden mehr (Aktivkonto). Gleichzeitig entsteht eine Schuld beim Lieferanten (Passivkonto).",d:[["t",38,164,"Rohstoffe",o("w",21)],["t",330,164,"+ 24.000",o("g",21,"e")],["t",38,190,"Verbindlichkeiten aLuL",o("w",21)],["t",330,190,"+ 24.000",o("g",21,"e")]]},
 {s:"Aktivkonten nehmen im Soll zu. Passivkonten sind gespiegelt: Sie nehmen im Haben zu.",d:tk(18,246,152,90,"Rohstoffe").concat(tk(190,246,152,90,"Verbindl. aLuL"),[["t",56,292,"24.000",o("b",23,"m")],["t",304,292,"24.000",o("o",23,"m")]])},
 {s:"Soll an Haben: Rohstoffe an Verbindlichkeiten aus Lieferungen und Leistungen.",d:[["t",180,378,"Rohstoffe 24.000",o("y",24,"m")],["t",180,406,"an  Verbindl. aLuL 24.000",o("y",24,"m")]]},
 {s:"Beide Seiten der Bilanz wachsen um 24.000 €. Das ist eine Aktiv-Passivmehrung.",d:[["t",180,442,"Aktiv-Passivmehrung",o("g",22,"m")]]}
]},
{id:"bs3",t:"Ein Bestandskonto abschließen",sub:"Bank: Anfangsbestand, Zugänge, Abgänge, Schlussbestand",steps:[
 {s:"Das Konto Bank ist ein Aktivkonto. Der Anfangsbestand von 10.000 € steht deshalb im Soll.",d:tk(40,80,280,250,"Bank").concat([["t",52,128,"AB",o("w",21)],["t",170,128,"10.000",o("b",22,"e")]])},
 {s:"Zugänge stehen auf derselben Seite wie der Anfangsbestand: 4.000 € im Soll.",d:[["t",52,160,"Zugänge",o("w",21)],["t",170,160,"4.000",o("b",22,"e")]]},
 {s:"Abgänge stehen auf der anderen Seite: 9.000 € im Haben.",d:[["t",192,128,"Abgänge",o("w",21)],["t",312,128,"9.000",o("o",22,"e")]]},
 {s:"Der Schlussbestand ist der Rest, der das Konto ausgleicht: 14.000 − 9.000 = 5.000 €. Er steht im Haben.",d:[["t",192,160,"SB",o("y",21)],["t",312,160,"5.000",o("y",22,"e")],["c",286,153,32,{c:"y",w:2,ry:16}]]},
 {s:"Beide Seiten ergeben jetzt dieselbe Summe. Erst dann ist das Konto abgeschlossen.",d:[["l",46,290,174,290,{w:2}],["l",186,290,314,290,{w:2}],["t",170,316,"14.000",o("w",22,"e")],["t",312,316,"14.000",o("w",22,"e")],["t",180,380,"AB + Zugänge − Abgänge = SB",o("y",23,"m")],["t",180,412,"10.000 + 4.000 − 9.000 = 5.000",o("w",22,"m")]]}
]}
]};

/* ================= VWL ================= */
var gg=axes(60,360,320,90,"Menge X","Preis P");
L["modul-vwl"]={name:"VWL",prefix:"vwl-",list:[
{id:"gg",t:"Das Marktgleichgewicht",sub:"Angebot, Nachfrage und der Preis, der den Markt räumt",steps:[
 {s:"Ein Markt im Bild: nach rechts die Menge, nach oben der Preis.",d:[["t",180,44,"Marktgleichgewicht",o("y",28,"m")]].concat(gg)},
 {s:"Die Nachfragekurve fällt: Je niedriger der Preis, desto mehr wollen die Nachfrager kaufen.",d:[["l",80,120,300,340,{c:"b",w:3.2}],["t",304,336,"N",o("b",24)]]},
 {s:"Die Angebotskurve steigt: Je höher der Preis, desto mehr wollen die Anbieter verkaufen.",d:[["l",80,340,300,120,{c:"o",w:3.2}],["t",304,124,"A",o("o",24)]]},
 {s:"Im Schnittpunkt passen die Pläne zusammen. Zum Gleichgewichtspreis wird genau die Menge gekauft, die angeboten wird.",d:[["c",190,230,7,{c:"y",w:3}],["l",60,230,184,230,{c:"y",dash:1,w:2}],["l",190,236,190,360,{c:"y",dash:1,w:2}],["t",54,236,"P*",o("y",22,"e")],["t",190,384,"X*",o("y",22,"m")]]},
 {s:"Liegt der Preis darüber, zum Beispiel durch einen Mindestpreis, entsteht ein Angebotsüberschuss.",d:[["l",60,160,330,160,{c:"r",dash:1,w:2}],["a",124,150,256,150,{c:"r",w:2.4}],["a",256,150,124,150,{c:"r",w:2.4}],["t",190,140,"Angebotsüberschuss",o("r",19,"m")]]},
 {s:"Liegt der Preis darunter, zum Beispiel durch einen Höchstpreis, entsteht ein Nachfrageüberschuss.",d:[["l",60,300,330,300,{c:"g",dash:1,w:2}],["a",124,312,256,312,{c:"g",w:2.4}],["a",256,312,124,312,{c:"g",w:2.4}],["t",190,334,"Nachfrageüberschuss",o("g",19,"m")],["t",180,430,"Wettbewerb führt zurück zu P*",o("w",21,"m")]]}
]},
{id:"shift",t:"Die Nachfrage steigt",sub:"Was passiert mit Preis und Menge?",steps:[
 {s:"Ausgangslage: Der Markt ist im Gleichgewicht bei P₁ und X₁.",d:[["t",180,44,"Nachfrage steigt",o("y",28,"m")]].concat(gg,[["l",80,140,270,330,{c:"b",w:3}],["t",274,330,"N₁",o("b",22)],["l",80,340,300,120,{c:"o",w:3}],["t",304,124,"A",o("o",24)],["c",172.5,232.5,6,{c:"w",w:2.6}],["l",60,232.5,166,232.5,{dash:1,w:1.8}],["l",172.5,239,172.5,360,{dash:1,w:1.8}],["t",54,238,"P₁",o("w",20,"e")],["t",172,384,"X₁",o("w",20,"m")]])},
 {s:"Die Nachfrage steigt, das Angebot bleibt gleich. Die Nachfragekurve verschiebt sich nach rechts.",d:[["l",130,120,320,310,{c:"b",w:3.4}],["t",322,300,"N₂",o("b",22)],["a",214,292,256,292,{c:"b",w:2.2}]]},
 {s:"Der neue Schnittpunkt liegt weiter oben rechts.",d:[["c",207.5,197.5,7,{c:"y",w:3}],["l",60,197.5,201,197.5,{c:"y",dash:1,w:2}],["l",207.5,204,207.5,360,{c:"y",dash:1,w:2}],["t",54,203,"P₂",o("y",20,"e")],["t",212,384,"X₂",o("y",20,"m")]]},
 {s:"Ergebnis: Der Preis steigt und die Menge steigt.",d:[["a",34,226,34,196,{c:"y",w:2.4}],["a",180,402,206,402,{c:"y",w:2.4}],["t",180,436,"Preis ↑ und Menge ↑",o("g",24,"m")]]}
]},
{id:"komp",t:"Komparativer Vorteil",sub:"Deutschland und Südkorea, Fernseher und Autos",steps:[
 {s:"So viele Arbeitseinheiten braucht jedes Land für ein Stück.",d:[["t",180,40,"Arbeit je Stück",o("y",27,"m")],["t",190,84,"Fernseher",o("w",20,"m")],["t",290,84,"Auto",o("w",20,"m")],["l",24,96,336,96,{w:2.4}],["l",136,64,136,170,{w:2.4}],["t",30,126,"Deutschland",o("w",20)],["t",190,126,"1",o("w",24,"m")],["t",290,126,"2",o("w",24,"m")],["t",30,160,"Südkorea",o("w",20)],["t",190,160,"2",o("w",24,"m")],["t",290,160,"10",o("w",24,"m")]]},
 {s:"Deutschland braucht für beide Güter weniger Arbeit. Es hat bei beiden einen absoluten Vorteil.",d:[["c",190,119,16,{c:"g",w:2}],["c",290,119,16,{c:"g",w:2}],["t",180,206,"absoluter Vorteil: Deutschland",o("g",20,"m")]]},
 {s:"Entscheidend sind die Opportunitätskosten: Worauf verzichtet ein Land für ein Auto?",d:[["t",180,250,"1 Auto kostet …",o("y",24,"m")],["t",30,286,"Deutschland:  2 : 1 =",o("w",21)],["t",330,286,"2 Fernseher",o("b",21,"e")],["t",30,316,"Südkorea:  10 : 2 =",o("w",21)],["t",330,316,"5 Fernseher",o("o",21,"e")]]},
 {s:"Ein Auto ist in Deutschland billiger als in Südkorea. Deutschland hat den komparativen Vorteil bei Autos.",d:[["u",236,332,292,{c:"b"}],["t",180,356,"Deutschland → Autos",o("b",23,"m")]]},
 {s:"Umgekehrt kostet ein Fernseher Südkorea nur 1/5 Auto, Deutschland aber 1/2 Auto. Südkorea hat den komparativen Vorteil bei Fernsehern.",d:[["t",180,392,"Südkorea → Fernseher",o("o",23,"m")],["t",180,436,"Spezialisieren und tauschen lohnt sich",o("g",20,"m")]]}
]}
]};

/* ================= Baustoffkunde ================= */
L["modul-baustoffkunde"]={name:"Baustoffkunde",prefix:"bk-",list:[
{id:"dichte",t:"Reindichte und Rohdichte",sub:"Dieselbe Masse, zwei verschiedene Volumen",steps:[
 {s:"Ein Baustoff besteht aus Feststoff und Poren. Je nachdem, welches Volumen man nimmt, ergibt sich eine andere Dichte.",d:[["t",180,40,"Dichten",o("y",28,"m")],["r",40,70,120,120,{w:3}],["c",72,104,10,{w:2}],["c",118,96,7,{w:2}],["c",98,140,12,{w:2}],["c",136,160,8,{w:2}],["c",62,166,6,{w:2}],["t",100,214,"Stein mit Poren",o("w",19,"m")]]},
 {s:"Rohdichte: trockene Masse durch das Volumen einschließlich der Eigenporen, also Länge mal Breite mal Höhe.",d:[["t",190,104,"Rohdichte",o("b",23)],["t",190,140,"ρ roh = m / V roh",o("b",23)],["t",190,168,"mit Poren",o("w",19)]]},
 {s:"Reindichte: Masse durch das Volumen ohne jede Pore. Dafür wird die Probe gemahlen.",d:[["r",40,250,120,62,{w:3}],["f",[[42,252],[158,252],[158,310],[42,310]],{c:"w",o:.16}],["t",100,334,"nur Feststoff",o("w",19,"m")],["t",190,266,"Reindichte",o("o",23)],["t",190,302,"ρ rein = m / V rein",o("o",23)],["t",190,330,"ohne Poren",o("w",19)]]},
 {s:"Aus beiden folgt die Porosität: der Anteil der Poren am Gesamtvolumen.",d:[["t",180,392,"P = 1 − ρ roh / ρ rein",o("y",27,"m")],["r",52,362,256,44,{c:"y",w:2}]]},
 {s:"Weil die Poren zum Rohvolumen zählen, ist die Rohdichte nie größer als die Reindichte.",d:[["t",180,440,"ρ roh ≤ ρ rein",o("g",23,"m")]]}
]},
{id:"poren",t:"Was mehr Poren bewirken",sub:"Die Rohdichte steuert fast alles",steps:[
 {s:"Mehr Poren heißt: weniger Feststoff im selben Volumen. Die Rohdichte sinkt.",d:[["t",180,40,"Mehr Poren",o("y",28,"m")],["r",30,70,110,110,{w:3}],["c",62,104,8,{w:2}],["c",108,140,9,{w:2}],["a",156,125,204,125,{c:"y",w:2.6}],["r",220,70,110,110,{w:3}],["c",246,96,11,{w:2}],["c",290,100,12,{w:2}],["c",262,134,12,{w:2}],["c",304,142,10,{w:2}],["c",244,164,8,{w:2}],["c",284,166,9,{w:2}],["t",180,214,"Rohdichte ↓",o("r",24,"m")]]},
 {s:"Weniger Feststoff trägt weniger: Die Festigkeit sinkt.",d:[["t",40,262,"Festigkeit",o("w",23)],["t",320,262,"↓",o("r",27,"e")]]},
 {s:"Luft in den Poren leitet Wärme schlecht: Die Wärmedämmung wird besser, die Wärmeleitfähigkeit sinkt.",d:[["t",40,300,"Wärmedämmung",o("w",23)],["t",320,300,"↑",o("g",27,"e")]]},
 {s:"Weniger Masse speichert weniger Wärme und dämmt Luftschall schlechter.",d:[["t",40,338,"Wärmespeicherung",o("w",23)],["t",320,338,"↓",o("r",27,"e")],["t",40,376,"Luftschalldämmung",o("w",23)],["t",320,376,"↓",o("r",27,"e")]]},
 {s:"Offene Poren saugen Wasser auf: Die Wasseraufnahme steigt.",d:[["t",40,414,"Wasseraufnahme",o("w",23)],["t",320,414,"↑",o("b",27,"e")],["t",180,446,"bei offenen Poren",o("w",17,"m")]]}
]},
{id:"emodul",t:"Der E-Modul",sub:"Steif oder weich: Spannung und Dehnung",steps:[
 {s:"Nach rechts die Dehnung ε, nach oben die Spannung σ.",d:[["t",180,40,"E = σ / ε",o("y",30,"m")]].concat(axes(60,360,320,90,"Dehnung ε","σ"))},
 {s:"Stahl: Die Gerade steigt steil. Für wenig Dehnung braucht man viel Spannung. E ist rund 200.000 N/mm².",d:[["l",60,360,150,110,{c:"b",w:3.4}],["t",156,114,"Stahl",o("b",23)],["t",156,138,"200.000 N/mm²",o("b",18)]]},
 {s:"Aluminium: Die Gerade ist flacher. E ist rund 70.000 N/mm².",d:[["l",60,360,300,180,{c:"o",w:3.4}],["t",222,172,"Aluminium",o("o",21)],["t",222,300,"70.000 N/mm²",o("o",18)]]},
 {s:"Ein hoher E-Modul heißt steif. Stahl ist etwa dreimal so steif wie Aluminium.",d:[["t",180,420,"hoher E-Modul = steif",o("g",24,"m")],["t",180,446,"Stahl ≈ 3 × Aluminium",o("w",20,"m")]]}
]}
]};

/* ================= Technische Mechanik ================= */
function beam3(i){var S={size:10.5,cy:.5,yaw:-.45,pitch:.3,boxes:[{p:[-4,0,-.5],s:[8,.5,1],c:"#c3cde0"},{p:[-4.35,-1.3,-.5],s:[.7,1.3,1],c:"#8a66f0"},{p:[3.65,-1.3,-.5],s:[.7,1.3,1],c:"#8a66f0"},{p:[-4.8,-1.5,-.8],s:[1.6,.2,1.6],c:"#4a6357"},{p:[3.2,-1.5,-.8],s:[1.6,.2,1.6],c:"#4a6357"}],arrows:[],labels:[]};
 if(i<2)S.labels.push({p:[-4,-2.2,0],t:"A",c:"#d3b8ff",s:17},{p:[4,-2.2,0],t:"B",c:"#d3b8ff",s:17});
 if(i>=1)S.arrows.push({a:[1,3.3,0],b:[1,.6,0],c:"#ff9d94",t:"F",tp:"a",dy:-12,w:4});
 if(i>=2)S.arrows.push({a:[-4,-4,0],b:[-4,-1.75,0],c:"#a5e6a0",t:"A",tp:"a",dy:14,w:4},{a:[4,-4,0],b:[4,-1.75,0],c:"#a5e6a0",t:"B",tp:"a",dy:14,w:4});
 if(i>=3)S.arrows.push({a:[-4,1.2,0],b:[1,1.2,0],c:"#ffe27a",t:"a",tp:"m",w:2,dy:-11},{a:[-4,2.1,0],b:[4,2.1,0],c:"#8fd0ff",t:"l",tp:"m",w:2,dy:-11});
 return S}
function hand3(i){var S={size:7.6,cy:.56,yaw:-.7,pitch:.5,boxes:[{p:[-3,-.05,-3],s:[6,.1,6],c:"#3d5248",o:.9}],arrows:[{a:[0,0,0],b:[3.4,0,0],c:"#f4f1e6",w:2,t:"x"},{a:[0,0,0],b:[0,0,-3.4],c:"#f4f1e6",w:2,t:"y"}],rings:[],labels:[{p:[0,.1,0],t:"●",c:"#ffe27a",s:13}]};
 if(i>=1){S.arrows.push({a:[0,.12,0],b:[2.4,.12,0],c:"#ffe27a",w:3,t:"Hebelarm r",tp:"m",dy:15});S.arrows.push({a:[2.4,.12,0],b:[2.4,.12,-2.2],c:"#ff9d94",w:3.6,t:"F"})}
 if(i>=2)S.rings.push({p:[0,.14,0],r:1.3,ax:[0,2],a0:0,a1:-4.6,c:"#8fd0ff",t:"Drehsinn"});
 if(i>=3)S.arrows.push({a:[0,.1,0],b:[0,3.2,0],c:"#a5e6a0",w:4,t:"M (Daumen)"});
 return S}
L["modul-mechanik"]={name:"Technische Mechanik",prefix:"tm-",list:[
{id:"res",t:"Resultierende zweier Kräfte",sub:"Aufgabe 1.1 aus dem Hefter: 30 kN und 20 kN",steps:[
 {s:"Am selben Punkt greifen zwei Kräfte an: F₁ = 30 kN nach rechts und F₂ = 20 kN nach oben.",d:[["t",180,40,"Resultierende",o("y",28,"m")],["c",70,300,5,{w:3}],["a",70,300,280,300,{c:"b",w:3.6}],["t",176,326,"F₁ = 30 kN",o("b",21,"m")],["a",70,300,70,160,{c:"o",w:3.6}],["t",62,224,"F₂ = 20 kN",{c:"o",s:21,a:"m",rot:-90}]]},
 {s:"Kräfteparallelogramm: F₂ parallel an die Spitze von F₁ verschieben.",d:[["l",280,300,280,160,{c:"o",dash:1,w:2}],["l",70,160,280,160,{c:"b",dash:1,w:2}]]},
 {s:"Die Resultierende ist die Diagonale vom Angriffspunkt zur gegenüberliegenden Ecke.",d:[["a",70,300,280,160,{c:"y",w:4.2,h:14}],["t",150,212,"F R",o("y",25)]]},
 {s:"Ihr Betrag folgt aus dem Satz des Pythagoras, weil F₁ und F₂ senkrecht aufeinander stehen.",d:[["t",180,366,"F R = √(30² + 20²)",o("w",23,"m")],["t",180,394,"= √1300 ≈ 36,06 kN",o("y",23,"m")]]},
 {s:"Der Winkel gegen die Waagerechte: tan α = 20 / 30. Die Gleichgewichtskraft F₃ ist genauso groß und zeigt genau entgegengesetzt.",d:[["p",[[118,300],[117,286],[110,274]],{c:"g",w:2.2,raw:1}],["t",124,290,"α",o("g",21)],["t",180,432,"α = tan⁻¹(20 / 30) ≈ 33,7°",o("g",22,"m")]]}
]},
{id:"komp2",t:"Schräge Kraft in Komponenten",sub:"Aufgabe 1.2 aus dem Hefter: 3 kN und 4 kN unter 70°",steps:[
 {s:"F₁ = 3 kN zeigt nach rechts. F₂ = 4 kN zeigt unter 70° gegen die Waagerechte nach rechts oben.",d:[["t",180,38,"Komponenten",o("y",28,"m")],["c",70,250,5,{w:3}],["l",50,250,320,250,{w:1.6}],["a",70,250,205,250,{c:"b",w:3.6}],["t",140,274,"F₁ = 3",o("b",20,"m")],["a",70,250,131.6,80.9,{c:"o",w:3.6}],["t",136,96,"F₂ = 4",o("o",20)],["p",[[106,250],[103,236],[96,226],[82.3,216.2]],{c:"w",w:2,raw:1}],["t",110,232,"70°",o("w",18)]]},
 {s:"F₂ zerlegen: waagerecht mit dem Kosinus, senkrecht mit dem Sinus.",d:[["l",131.6,80.9,131.6,250,{c:"o",dash:1,w:2}],["t",180,304,"F₂x = 4 · cos 70° ≈ 1,37 kN",o("o",21,"m")],["t",180,330,"F₂y = 4 · sin 70° ≈ 3,76 kN",o("o",21,"m")]]},
 {s:"Alle waagerechten Anteile addieren, alle senkrechten Anteile addieren.",d:[["t",180,364,"R x = 3 + 1,37 = 4,37 kN",o("w",21,"m")],["t",180,390,"R y = 3,76 kN",o("w",21,"m")]]},
 {s:"Betrag wieder mit Pythagoras, Winkel mit dem Tangens. Im Hefter grafisch: etwa 5,8 kN und 40°.",d:[["a",70,250,266.6,80.9,{c:"y",w:4,h:14}],["t",232,150,"R",o("y",25)],["t",180,422,"R = √(4,37² + 3,76²) ≈ 5,76 kN",o("y",21,"m")],["t",180,448,"α = tan⁻¹(3,76 / 4,37) ≈ 40,7°",o("g",21,"m")]]}
]},
{id:"auflager",t:"Auflagerkräfte am Balken",sub:"Freischneiden und drei Gleichgewichtsbedingungen",steps:[
 {s:"Ein Balken auf zwei Stützen: links ein Festlager A, rechts ein Loslager B. Im Abstand a von A drückt die Kraft F.",d:[["t",180,38,"Auflagerkräfte",o("y",28,"m")],["l",50,150,310,150,{w:5}],["p",[[50,152],[36,176],[64,176],[50,152]],{w:2.6,raw:1}],["l",28,180,72,180,{w:2}],["p",[[310,152],[296,174],[324,174],[310,152]],{w:2.6,raw:1}],["c",303,179,4,{w:2}],["c",317,179,4,{w:2}],["l",288,186,332,186,{w:2}],["a",210,84,210,146,{c:"r",w:3.6}],["t",220,104,"F",o("r",24)],["t",26,172,"A",o("w",22,"m")],["t",340,172,"B",o("w",22,"m")]]},
 {s:"Freischneiden: Die Lager werden durch ihre Kräfte ersetzt. Das Festlager kann zwei Kräfte aufnehmen, das Loslager eine.",d:[["a",50,240,50,190,{c:"g",w:3.2}],["t",64,236,"A v",o("g",21)],["a",6,150,44,150,{c:"g",w:3.2}],["t",8,138,"A h",o("g",21)],["a",310,244,310,196,{c:"g",w:3.2}],["t",324,240,"B",o("g",21)]]},
 {s:"Abstände eintragen: a von A bis zur Kraft, l von A bis B.",d:[["l",50,262,210,262,{c:"y",w:2}],["l",50,256,50,268,{c:"y",w:2}],["l",210,256,210,268,{c:"y",w:2}],["t",130,258,"a",o("y",22,"m")],["l",50,286,310,286,{c:"b",w:2}],["l",50,280,50,292,{c:"b",w:2}],["l",310,280,310,292,{c:"b",w:2}],["t",180,282,"l",o("b",22,"m")]]},
 {s:"Momente um A, linksdrehend positiv: B dreht links herum, F rechts herum. A selbst hat keinen Hebelarm.",d:[["t",28,328,"Σ M um A = 0:",o("w",21)],["t",332,328,"B · l − F · a = 0",o("w",21,"e")],["t",180,358,"B = F · a / l",o("y",25,"m")]]},
 {s:"Summe der senkrechten Kräfte gleich null liefert Av. Waagerecht wirkt keine Last, also ist Ah null.",d:[["t",28,394,"Σ V = 0:",o("w",21)],["t",332,394,"A v + B − F = 0",o("w",21,"e")],["t",100,424,"A v = F − B",o("y",23,"m")],["t",260,424,"A h = 0",o("y",23,"m")]]}
]},
{id:"balken3d",d3:1,t:"Balken auf zwei Stützen",sub:"Lager, Last und Lagerkräfte räumlich",scene:beam3,steps:[
 {s:"Der Balken liegt auf zwei Lagern A und B. Dreh das Modell mit dem Finger."},
 {s:"Die Last F drückt von oben auf den Balken."},
 {s:"Die Lager antworten mit den Lagerkräften A und B nach oben. Zusammen halten sie F im Gleichgewicht."},
 {s:"Gelb der Abstand a der Kraft von A, blau die Stützweite l. Je näher F an B rückt, desto mehr trägt B: B = F · a / l."}
]},
{id:"hand3d",d3:1,t:"Daumenregel für das Moment",sub:"Drehsinn und Momentenvektor räumlich",scene:hand3,steps:[
 {s:"Die Kräfte liegen in der x-y-Ebene. Der gelbe Punkt ist der Bezugspunkt."},
 {s:"Die Kraft F greift mit dem Hebelarm r an. Das Moment ist Kraft mal Hebelarm: M = F · r."},
 {s:"F will die Ebene um den Bezugspunkt drehen. Der blaue Bogen zeigt den Drehsinn."},
 {s:"Rechte Hand: Die Finger zeigen in Drehrichtung, der Daumen zeigt die Richtung des Momentenvektors. Er steht senkrecht auf der Ebene."}
]}
]};

/* ================= Bauphysik ================= */
function wall3(i){var S={size:13.5,cy:.55,yaw:-.7,pitch:.28,boxes:[],arrows:[],labels:[]};
 S.boxes.push({p:[-1.2,-2.2,-2.4],s:[2.4,4.4,4.8],c:"#c9c2b6"});S.labels.push({p:[-.2,3,0],t:"Mauerwerk 24 cm",c:"#f4f1e6"});
 if(i>=1){S.boxes.push({p:[1.2,-2.2,-2.4],s:[1.4,4.4,4.8],c:"#f0d264"});S.labels.push({p:[1.9,3.9,0],t:"Dämmung 14 cm",c:"#ffe27a"})}
 S.labels.push({p:[-3.3,-3,0],t:"innen 20 °C",c:"#ff9d94"},{p:[i>=1?4.3:3.2,-3,0],t:"außen −5 °C",c:"#8fd0ff"});
 if(i>=2)S.arrows.push({a:[-4,0,0],b:[i>=1?4.6:3.4,0,0],c:"#ff9d94",w:4,t:"Wärmestrom",tp:"a",dy:-14});
 return S}
L["modul-bauphysik"]={name:"Bauphysik",prefix:"bp-",list:[
{id:"uwert",t:"U-Wert einer Außenwand",sub:"Schicht für Schicht: Mauerwerk mit Dämmung",steps:[
 {s:"Die Wand von innen nach außen: 24 cm Mauerwerk (λ = 0,99) und 14 cm Dämmung (λ = 0,035).",d:[["t",180,36,"U-Wert",o("y",28,"m")],["r",70,56,120,120,{w:3}],["r",190,56,70,120,{c:"y",w:3}],["t",130,112,"Mauerwerk",o("w",19,"m")],["t",130,134,"24 cm",o("w",19,"m")],["t",225,112,"Dämm.",o("y",19,"m")],["t",225,134,"14 cm",o("y",19,"m")],["t",62,120,"innen",{c:"r",s:19,a:"m",rot:-90}],["t",282,120,"außen",{c:"b",s:19,a:"m",rot:90}]]},
 {s:"Jede Schicht bremst die Wärme. Ihr Widerstand ist Dicke durch Wärmeleitfähigkeit: R = d / λ.",d:[["t",28,214,"R = d / λ",o("y",24)],["t",28,246,"Mauerwerk:  0,24 / 0,99 = 0,242",o("w",20)],["t",28,272,"Dämmung:  0,14 / 0,035 = 4,0",o("w",20)]]},
 {s:"Dazu kommen die Übergangswiderstände an den Oberflächen: innen 0,13 und außen 0,04 m²·K/W.",d:[["t",28,306,"R si = 0,13",o("b",20)],["t",190,306,"R se = 0,04",o("b",20)]]},
 {s:"Alle Widerstände addieren. Die Dämmung macht den größten Teil aus.",d:[["t",28,342,"R ges = 0,13 + 0,242 + 4,0 + 0,04",o("w",20)],["t",28,368,"= 4,412 m²·K/W",o("y",22)]]},
 {s:"Der U-Wert ist der Kehrwert. Je kleiner er ist, desto weniger Wärme geht verloren.",d:[["t",180,412,"U = 1 / R ges ≈ 0,23 W/(m²·K)",o("y",24,"m")],["r",24,384,312,42,{c:"y",w:2}]]}
]},
{id:"heiz",t:"Heizleistung eines Hauses",sub:"Aus H T und dem Temperaturunterschied",steps:[
 {s:"Ein Haus hat H T = 120 W/K. Innen sollen 20 °C herrschen, draußen sind es −10 °C.",d:[["t",180,38,"Heizleistung",o("y",28,"m")],["p",[[110,170],[110,104],[180,60],[250,104],[250,170],[110,170]],{w:3}],["t",180,134,"20 °C",o("r",24,"m")],["t",300,134,"−10 °C",o("b",22,"m")],["a",252,150,290,150,{c:"r",w:2.6}]]},
 {s:"Zuerst der Temperaturunterschied. Achtung: minus mal minus ergibt plus.",d:[["t",28,218,"ΔT = T innen − T außen",o("w",21)],["t",28,246,"= 20 − (−10) = 30 K",o("y",22)]]},
 {s:"Die Heizleistung ist H T mal ΔT.",d:[["t",28,290,"P = H T · ΔT",o("w",21)],["t",28,318,"= 120 · 30 = 3600 W",o("y",22)]]},
 {s:"Für einen ganzen Tag: Leistung in Kilowatt mal 24 Stunden.",d:[["t",28,362,"E = P · t = 3,6 kW · 24 h",o("w",21)],["t",28,390,"= 86,4 kWh",o("y",22)],["r",20,340,250,60,{c:"y",w:2}]]}
]},
{id:"wand3d",d3:1,t:"Wandaufbau zum Drehen",sub:"Mauerwerk, Dämmung und der Wärmestrom",scene:wall3,steps:[
 {s:"Eine Außenwand aus Mauerwerk. Links ist es innen warm, rechts außen kalt. Dreh das Modell mit dem Finger."},
 {s:"Außen kommt die Dämmschicht davor. Sie ist dünner als das Mauerwerk, bremst die Wärme aber viel stärker."},
 {s:"Wärme fließt immer von warm nach kalt, also von innen nach außen durch alle Schichten. Je größer der Widerstand der Schichten, desto kleiner der Wärmestrom."}
]}
]};

var f=(location.pathname.split("/").pop()||"").replace(/\.html.*$/,"");
var cur=L[f]||{list:[]};
window.BW_TAFEL=window.BW_TAFEL||{};window.BW_TAFEL.list=cur.list;window.BW_TAFEL.name=cur.name;window.BW_TAFEL.prefix=cur.prefix;window.BW_TAFEL_ALL=L;
})();
