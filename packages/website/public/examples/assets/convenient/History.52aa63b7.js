var L=Object.defineProperty;var O=(t,e,o)=>e in t?L(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var y=(t,e,o)=>(O(t,typeof e!="symbol"?e+"":e,o),o);import"../modulepreload-polyfill.b7f2da20.js";import{M as S,B as D,a as b,bf as k,P as G}from"../three.837c9bb0.js";import{H,A as C}from"../vis-three.convenient.es.83638baf.js";import{M as K}from"../index.02045c04.js";import"../index.7d48aff8.js";import"../index.9c42f01c.js";import"../index.1d7ad8b9.js";import"../vis-three.plugin-pointer-manager.es.86f17451.js";import"../index.ce95ade9.js";import"../index.388dadd4.js";import"../Pass.1ae4f2a0.js";import"../index.763ed6df.js";import"../index.f4f5b765.js";import"../index.a87f8394.js";import"../index.9a7b1aa5.js";import"../index.8de980d1.js";import"../index.9f3e0a95.js";import"../vis-three.plugin-keyboard-manager.es.9570acee.js";import"../Antdv.a86c3c0d.js";import"../vis-three.plugin-object-helper.es.e2881d5c.js";import"../index.dfadcd6f.js";import"../CSS3DRenderer.d266155a.js";import"../index.ddb76977.js";import"../index.b828c96c.js";import"../index.cfcd8596.js";import"../index.f7cac396.js";import"../index.c670ae85.js";import"../index.484afc60.js";import"../index.29f340c8.js";import"../index.cfa4ec79.js";import"../index.6c1f5960.js";import"../vis-three.strategy-multi-renderer.es.c7860e7e.js";const n=class extends C{constructor({objects:e,engine:o}){super(),this.oldObjects=[].concat(n.cacheSection),this.newObjects=[].concat(e),this.engine=o,n.cacheSection=[].concat(e)}next(){n.status=!0,this.engine.setSelectionBox([this.newObjects])}prev(){n.status=!0,this.engine.setSelectionBox([this.oldObjects])}};let s=n;y(s,"status",!1),y(s,"cacheSection",[]);class P extends C{constructor({transformControls:e}){super(),this.nextState={mode:"translate",space:"world",tranform:"",objectMap:new Map},this.prevState={mode:"translate",space:"world",tranform:"",objectMap:new Map},this.transfromControls=e}generate(e){const o=this.transfromControls,c=o.mode,m=c==="rotate"?"rotation":c==="translate"?"position":c,z=o.getTransObjectSet(),d=this[`${e}State`];d.mode=c,d.tranform=m,d.space=o.space;const B=d.objectMap;z.forEach(r=>{B.set(r,{x:r[m].x,y:r[m].y,z:r[m].z})}),this[e]=function(){const r=this.transfromControls,l=this[`${e}State`];r.mode=l.mode,r.space=l.space;const u=l.tranform,M=[];l.objectMap.forEach((g,i)=>{i[u].x=g.x,i[u].y=g.y,i[u].z=g.z,i.updateMatrixWorld(),M.push(i)}),r.setAttach(...M)}}}const a=new K().setDom(document.getElementById("app")).setSize().setStats(!0).play(),h=new H(50);a.keyboardManager.register({shortcutKey:["ctrl","z"],desp:"undo",keyup:t=>{t==null||t.preventDefault(),h.undo()}}).register({shortcutKey:["ctrl","y"],desp:"redo",keyup:t=>{t==null||t.preventDefault(),h.redo()}});const x=a.scene,f=new S(new D(10,10,10),new b({color:"rgb(255, 105, 100)"}));f.position.x=10;x.add(f);f.updateMatrixWorld();const E=new S(new k(5,32,32),new b({color:"rgb(255, 205, 100)"}));E.position.x=-10;x.add(E);const j=new G("rgb(255, 255, 255)",1,300,0);j.position.y=30;x.add(j);a.setSelectionBox([f]);a.addEventListener("selected",t=>{if(s.status){s.status=!1;return}!s.cacheSection.length&&!t.objects.length||h.apply(new s({objects:t.objects,engine:a}))});const w=a.transformControls;let p="";w.addEventListener("mouseDown",t=>{p=new P({transformControls:w}),p.generate("prev")});w.addEventListener("mouseUp",t=>{p.generate("next"),h.apply(p),p=""});