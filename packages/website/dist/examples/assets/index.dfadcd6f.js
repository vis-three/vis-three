import{t as m,a as s}from"./index.7d48aff8.js";import{C as i,a as R}from"./CSS3DRenderer.d266155a.js";import{a as D,b as l}from"./index.9c42f01c.js";const v="@vis-three/plugin-css2d-renderer",S=m(v),y=function(){let r,t,d,o;return{name:S,install(e){const a=new i;e.css2DRenderer=a;const n=a.domElement;n.id="vis-css2D",n.classList.add("vis-css2D"),n.style.position="absolute",n.style.top="0",n.style.left="0",n.style.zIndex="2",r=E=>{E.dom.appendChild(a.domElement)},t=E=>{a.setSize(E.width,E.height)},d=E=>{E.oldScene.traverse(c=>{c instanceof R&&(c.element.style.display="none")})},o=()=>{a.render(e.scene,e.camera)},e.addEventListener(s.SETDOM,r),e.addEventListener(s.SETSIZE,t),e.addEventListener(s.SETSCENE,d),e.addEventListener(s.RENDER,o)},dispose(e){e.removeEventListener(s.SETDOM,r),e.removeEventListener(s.SETSIZE,t),e.removeEventListener(s.SETSCENE,d),e.removeEventListener(s.RENDER,o)}}},N="@vis-three/strategy-css2d-render",L=m(N),T=function(){let r;return{name:L,condition:[S,D],exec(t){r=()=>{t.css2DRenderer.render(t.scene,t.camera)},t.renderManager.addEventListener(l.RENDER,r)},rollback(t){t.renderManager.removeEventListener(l.RENDER,r)}}};export{y as C,T as a,S as b};