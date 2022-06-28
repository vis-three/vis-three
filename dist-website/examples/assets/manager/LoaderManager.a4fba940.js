import{M as r,c as d}from"../Vis.es.04b7ac1a.js";import{p as l}from"../three.a9d531d9.js";import"../vis-three.5ae274fa.js";var i=["/model/advert/advert.obj","/model/Lowpoly/Lowpoly.obj",{url:"/model/katana/katana.obj",ext:"obj"}];const g=new r().setDom(document.getElementById("app")).setStats(!0).setSize().play(),s=g.scene,n=new l("rgb(255, 255, 255)",1,100,.01);n.position.set(10,10,10);s.add(n);const m=document.getElementById("totalProgress"),c=document.getElementById("detailProgress"),a=new d;a.addEventListener("loading",e=>{m.innerHTML=`total: ${e.loadTotal}, success: ${e.loadSuccess}, error: ${e.loadError}`});a.addEventListener("detailLoading",e=>{c.innerText=`
        url: ${e.detail.url}
        progress: ${e.detail.progress}
        error: ${e.detail.error}
        message: ${e.detail.message}
      `});a.addEventListener("loaded",e=>{e.resourceMap.forEach((t,o)=>{o==="/model/Lowpoly/Lowpoly.obj"?t.scale.set(.2,.2,.2):o==="/model/katana/katana.obj"&&t.scale.set(10,10,10),t.position.set(Math.random()*30,0,Math.random()*30),s.add(t)})});a.load(i);
