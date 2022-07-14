import{c as i,R as d,M as g}from"../Vis.es.7c5541b7.js";import{n as p,c as l}from"../three.b54e9ae7.js";import"../vis-three.36482fbe.js";var m=["/model/katana/katana.obj"];const t=new i,s=new d,f=new g().setDom(document.getElementById("app")).setStats(!0).setSize().play(),o=f.scene,r=new p("rgb(255, 255, 255)",1,100,.01);r.position.set(10,10,10);o.add(r);t.addEventListener("loaded",a=>{s.mappingResource(a.resourceMap),a.resourceMap.forEach((e,n)=>{e instanceof l&&(e.scale.set(30,30,30),o.add(e))})});s.addEventListener("mapped",a=>{console.log(a);let e="";a.configMap.forEach((n,c)=>{e+=`${c}: ${JSON.stringify(n)}
`}),e=e.replace(/",/g,`",
`).replace(/"},/g,`"},
`).replace(/{"/g,`{"
`),document.getElementById("mappingStructure").innerText=e});t.load(m);
