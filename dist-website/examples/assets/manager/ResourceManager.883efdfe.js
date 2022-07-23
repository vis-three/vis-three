import"../common.006007ed.js";import{n as i,c as d}from"../three.988821a1.js";import{c as p,R as g,M as m}from"../Vis.es.824ecc78.js";import"../vis-three.8be35a0c.js";var l=["/model/katana/katana.obj"];const t=new p,s=new g,u=new m().setDom(document.getElementById("app")).setStats(!0).setSize().play(),o=u.scene,r=new i("rgb(255, 255, 255)",1,100,.01);r.position.set(10,10,10);o.add(r);t.addEventListener("loaded",a=>{s.mappingResource(a.resourceMap),a.resourceMap.forEach((e,n)=>{e instanceof d&&(e.scale.set(30,30,30),o.add(e))})});s.addEventListener("mapped",a=>{console.log(a);let e="";a.configMap.forEach((n,c)=>{e+=`${c}: ${JSON.stringify(n)}
`}),e=e.replace(/",/g,`",
`).replace(/"},/g,`"},
`).replace(/{"/g,`{"
`),document.getElementById("mappingStructure").innerText=e});t.load(l);
