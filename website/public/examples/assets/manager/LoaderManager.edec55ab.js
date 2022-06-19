import{M as r,c as d}from"../Vis.es.695cac83.js";import{p as l}from"../three.5dc0577a.js";import"../vis-three.a3d50446.js";var i=["/model/advert/advert.obj","/model/Lowpoly/Lowpoly.obj",{url:"/model/katana/katana.obj",ext:"obj"}];const g=new r().setDom(document.getElementById("app")).setStats(!0).setSize().play(),s=g.scene,n=new l("rgb(255, 255, 255)",1,100,.01);n.position.set(10,10,10);s.add(n);const m=document.getElementById("totalProgress"),c=document.getElementById("detailProgress"),o=new d;o.addEventListener("loading",e=>{m.innerHTML=`total: ${e.loadTotal}, success: ${e.loadSuccess}, error: ${e.loadError}`});o.addEventListener("detailLoading",e=>{c.innerText=`
        url: ${e.detail.url}
        progress: ${e.detail.progress}
        error: ${e.detail.error}
        message: ${e.detail.message}
      `});o.addEventListener("loaded",e=>{e.resourceMap.forEach((t,a)=>{a==="/model/Lowpoly/Lowpoly.obj"?t.scale.set(.2,.2,.2):a==="/model/katana/katana.obj"&&t.scale.set(10,10,10),t.position.set(Math.random()*30,0,Math.random()*30),s.add(t)})});o.load(i);
