import"../common.006007ed.js";import{K as c,c as d}from"../three.75af7ea3.js";import{c as p,R as g,a as m}from"../Vis.es.a3304217.js";import"../vis-three.69d8f933.js";var l=["/model/katana/katana.obj"];const t=new p,s=new g,f=new m().setDom(document.getElementById("app")).setStats(!0).setSize().play(),o=f.scene,r=new c("rgb(255, 255, 255)",1,100,.01);r.position.set(10,10,10);o.add(r);t.addEventListener("loaded",a=>{s.mappingResource(a.resourceMap),a.resourceMap.forEach((e,n)=>{e instanceof d&&(e.scale.set(30,30,30),o.add(e))})});s.addEventListener("mapped",a=>{console.log(a);let e="";a.configMap.forEach((n,i)=>{e+=`${i}: ${JSON.stringify(n)}
`}),e=e.replace(/",/g,`",
`).replace(/"},/g,`"},
`).replace(/{"/g,`{"
`),document.getElementById("mappingStructure").innerText=e});t.load(l);
