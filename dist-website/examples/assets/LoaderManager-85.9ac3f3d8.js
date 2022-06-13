import{M as n,c as r}from"./Vis.es.5d3b4fb7.js";import{p as d}from"./three.b90fa353.js";import"./vis-three.78ccfae1.js";var i=["/examples/public/model/advert/advert.obj","/examples/public/model/Lowpoly/Lowpoly.obj",{url:"/examples/public/model/katana/katana.obj",ext:"obj"}];const p=new n().setDom(document.getElementById("app")).setStats(!0).setSize().play(),s=p.scene,l=new d("rgb(255, 255, 255)",1,100,.01);l.position.set(10,10,10);s.add(l);const m=document.getElementById("totalProgress"),c=document.getElementById("detailProgress"),t=new r;t.addEventListener("loading",e=>{m.innerHTML=`total: ${e.loadTotal}, success: ${e.loadSuccess}, error: ${e.loadError}`});t.addEventListener("detailLoading",e=>{c.innerText=`
        url: ${e.detail.url}
        progress: ${e.detail.progress}
        error: ${e.detail.error}
        message: ${e.detail.message}
      `});t.addEventListener("loaded",e=>{e.resourceMap.forEach((a,o)=>{o==="/examples/public/model/Lowpoly/Lowpoly.obj"?a.scale.set(.2,.2,.2):o==="/examples/public/model/katana/katana.obj"&&a.scale.set(10,10,10),a.position.set(Math.random()*30,0,Math.random()*30),s.add(a)})});t.load(i);
