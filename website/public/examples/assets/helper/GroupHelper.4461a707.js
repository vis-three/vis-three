import{M as o,G as n}from"../Vis.es.fa503373.js";import{a1 as a,M as r,i,o as d,G as c}from"../three.b90fa353.js";import"../vis-three.78ccfae1.js";const p=document.getElementById("app"),m=new o().setDom(p).setSize().setStats(!0).play(),e=m.scene;e.add(new a("white",1));const t=new r(new i(10,10,10),new d({color:"rgb(255, 105, 100)"}));t.position.set(-15,15,-15);const s=new c;s.add(t);const w=new n(s);e.add(s);e.add(w);