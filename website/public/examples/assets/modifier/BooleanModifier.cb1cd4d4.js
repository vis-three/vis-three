import"../common.006007ed.js";import{n as d,M as n,g as m,m as c,H as p,j as l,e as w,f as g}from"../three.fec063a1.js";import{M as u,B as a}from"../Vis.es.d8d395f3.js";import"../vis-three.59b4e7ed.js";const s=new u().setDom(document.getElementById("app")).setSize().setStats(!0).play(),t=s.scene,i=new d("rgb(255, 255, 255)",1,300,0);i.position.y=30;t.add(i);const o=new n(new m(20,10,10),new c({map:new p().load("/examples/public/texture/Bricks_Color.jpg")}));t.add(o);const e=new n(new l(7),new w({wireframe:!0,color:"rgb(155, 155, 0)",transparent:!0,opacity:.5}));e.position.x=-5;e.updateMatrix();t.add(e);const r=new n(new g(3,3,15,16),e.material);r.position.x=5;r.updateMatrix();t.add(r);const M=new a({source:o,target:e}),f=new a({source:o,target:r,mode:"union"});s.renderManager.addEventListener("render",()=>{M.render(),f.render()});