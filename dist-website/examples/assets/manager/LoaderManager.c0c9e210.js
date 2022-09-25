import"../common.006007ed.js";import{K as r}from"../three.75af7ea3.js";import{a as d,c as l}from"../Vis.es.a3304217.js";import"../vis-three.69d8f933.js";var i=["/model/advert/advert.obj","/model/Lowpoly/Lowpoly.obj",{url:"/model/katana/katana.obj",ext:"obj"}];const m=new d().setDom(document.getElementById("app")).setStats(!0).setSize().play(),s=m.scene,n=new r("rgb(255, 255, 255)",1,100,.01);n.position.set(10,10,10);s.add(n);const g=document.getElementById("totalProgress"),c=document.getElementById("detailProgress"),o=new l;o.addEventListener("loading",e=>{g.innerHTML=`total: ${e.loadTotal}, success: ${e.loadSuccess}, error: ${e.loadError}`});o.addEventListener("detailLoading",e=>{c.innerText=`
        url: ${e.detail.url}
        progress: ${e.detail.progress}
        error: ${e.detail.error}
        message: ${e.detail.message}
      `});o.addEventListener("loaded",e=>{e.resourceMap.forEach((t,a)=>{a==="/model/Lowpoly/Lowpoly.obj"?t.scale.set(.2,.2,.2):a==="/model/katana/katana.obj"&&t.scale.set(10,10,10),t.position.set(Math.random()*30,0,Math.random()*30),s.add(t)})});o.load(i);
