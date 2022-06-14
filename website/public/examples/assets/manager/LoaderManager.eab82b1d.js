import{M as r,c as d}from"../Vis.es.b030611e.js";import{p as l}from"../three.5dc0577a.js";import"../vis-three.a3d50446.js";var i=["/model/advert/advert.obj","/model/Lowpoly/Lowpoly.obj",{url:"/model/katana/katana.obj",ext:"obj"}];const m=new r().setDom(document.getElementById("app")).setStats(!0).setSize().play(),s=m.scene,n=new l("rgb(255, 255, 255)",1,100,.01);n.position.set(10,10,10);s.add(n);const g=document.getElementById("totalProgress"),p=document.getElementById("detailProgress"),a=new d;a.addEventListener("loading",e=>{g.innerHTML=`total: ${e.loadTotal}, success: ${e.loadSuccess}, error: ${e.loadError}`});a.addEventListener("detailLoading",e=>{p.innerText=`
        url: ${e.detail.url}
        progress: ${e.detail.progress}
        error: ${e.detail.error}
        message: ${e.detail.message}
      `});a.addEventListener("loaded",e=>{e.resourceMap.forEach((t,o)=>{o==="/examples/public/model/Lowpoly/Lowpoly.obj"?t.scale.set(.2,.2,.2):o==="/examples/public/model/katana/katana.obj"&&t.scale.set(10,10,10),t.position.set(Math.random()*30,0,Math.random()*30),s.add(t)})});a.load(i);
