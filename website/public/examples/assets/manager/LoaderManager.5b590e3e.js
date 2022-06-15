import{M as n,c as r}from"../Vis.es.1ff11d31.js";import{p as l}from"../three.5dc0577a.js";import"../vis-three.a3d50446.js";var i=["/model/advert/advert.obj","/model/Lowpoly/Lowpoly.obj",{url:"/model/katana/katana.obj",ext:"obj"}];const g=new n().setDom(document.getElementById("app")).setStats(!0).setSize().play(),s=g.scene,d=new l("rgb(255, 255, 255)",1,100,.01);d.position.set(10,10,10);s.add(d);const m=document.getElementById("totalProgress"),c=document.getElementById("detailProgress"),o=new r;o.addEventListener("loading",e=>{m.innerHTML=`total: ${e.loadTotal}, success: ${e.loadSuccess}, error: ${e.loadError}`});o.addEventListener("detailLoading",e=>{c.innerText=`
        url: ${e.detail.url}
        progress: ${e.detail.progress}
        error: ${e.detail.error}
        message: ${e.detail.message}
      `});o.addEventListener("loaded",e=>{e.resourceMap.forEach((t,a)=>{a==="/model/Lowpoly/Lowpoly.obj"?t.scale.set(.2,.2,.2):a==="/model/katana/katana.obj"&&t.scale.set(10,10,10),t.position.set(Math.random()*30,0,Math.random()*30),s.add(t)})});o.load(i);
