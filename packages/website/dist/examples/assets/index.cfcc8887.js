import{t as l}from"./index.5fd0e639.js";import{a as n,b as i,c as a}from"./index.1d1f4865.js";import{b as f}from"./index.df02a99b.js";const m="@vis-three/strategy-trans-select-event",d=l(m),x=function(){let r,s;return{name:d,condition:[n,f,i],exec(t){t.eventManager.addFilterObject(t.transformControls),r=o=>{if(t.transing){t.transing=!1;return}const c=o.intersections;if(o.ctrlKey||t.selectionBox.clear(),t.eventManager.penetrate)for(const e of c){if(o.ctrlKey&&t.selectionBox.has(e.object)){t.selectionBox.delete(e.object);continue}t.selectionBox.add(e.object)}else if(c.length){const e=c[0].object;if(o.ctrlKey&&t.selectionBox.has(e)){t.selectionBox.delete(e);return}t.selectionBox.add(e)}t.dispatchEvent({type:a,objects:Array.from(t.selectionBox)})},t.eventManager.addEventListener("click",r),s=o=>{t.transformControls.setAttach(...o.objects)},t.addEventListener(a,s)},rollback(t){t.eventManager.removeFilterObject(t.transformControls),t.eventManager.removeEventListener("click",r),t.eventManager.removeEventListener(a,s)}}};export{x as T};