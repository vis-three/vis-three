import"../modulepreload-polyfill.b7f2da20.js";import{M as a,B as i,a as s,P as m,L as p,b as d}from"../three.237d835c.js";import{W as g,C as l}from"../index.1d3a6ec0.js";import{P as c}from"../vis-three.plugin-pointer-manager.es.640cfa1a.js";import{E as f}from"../index.c35e5a3e.js";import{O as P}from"../vis-three.plugin-object-helper.es.15c18b4e.js";import{S as u}from"../index.4ec3bfd2.js";import{T as y}from"../index.12fd638d.js";import{H as S}from"../index.5331312d.js";import{T as w}from"../index.873dfd1f.js";import{d as b}from"../index.202ebdec.js";import{T as E}from"../index.664a593f.js";import"../vis-three.convenient.es.7b860830.js";const e=b({plugins:[g({antialias:!0,alpha:!0}),l(),c(),f(),u(),P(),y()],strategy:[E(),S(),w()]}).setDom(document.getElementById("app")).setSize(),t=e.scene,n=new a(new i(10,10,10),new s({color:"rgb(255, 105, 100)"}));n.position.x=10;t.add(n);const r=new m("rgb(255, 255, 255)",1,300,0);r.position.y=15;t.add(r);const L=new p(n.geometry);t.add(L);const o=new d(n.geometry);o.position.x=-10;t.add(o);window.engine=e;e.render();e.addEventListener("selected",h=>{e.render()});e.transformControls.addEventListener("objectChange",()=>{e.render()});