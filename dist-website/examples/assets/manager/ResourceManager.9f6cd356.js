import{c,R as d,M as p}from"../Vis.es.04b7ac1a.js";import{p as g,d as l}from"../three.a9d531d9.js";import"../vis-three.5ae274fa.js";var m=["/model/katana/katana.obj"];const t=new c,s=new d,f=new p().setDom(document.getElementById("app")).setStats(!0).setSize().play(),o=f.scene,r=new g("rgb(255, 255, 255)",1,100,.01);r.position.set(10,10,10);o.add(r);t.addEventListener("loaded",a=>{s.mappingResource(a.resourceMap),a.resourceMap.forEach((e,n)=>{e instanceof l&&(e.scale.set(30,30,30),o.add(e))})});s.addEventListener("mapped",a=>{console.log(a);let e="";a.configMap.forEach((n,i)=>{e+=`${i}: ${JSON.stringify(n)}
`}),e=e.replace(/",/g,`",
`).replace(/"},/g,`"},
`).replace(/{"/g,`{"
`),document.getElementById("mappingStructure").innerText=e});t.load(m);
