import"../modulepreload-polyfill.b7f2da20.js";import{ao as U}from"../three.837c9bb0.js";import{C as I}from"../vis-three.convenient.es.9947652a.js";import{D as X}from"../index.2f192dc6.js";import{k as l,g as n,p as Z}from"../vis-three.middleware.es.2585b78e.js";import{i as S}from"../vis-three.library-event.es.ce33bf1d.js";import{r as ee,d as te,G as R}from"../G6.7a2bba98.js";import"../index.be5e1784.js";import"../index.5fd0e639.js";import"../index.32011c09.js";import"../CSS3DRenderer.d266155a.js";import"../index.813bc471.js";import"../index.e6c950f1.js";import"../index.db239e15.js";import"../Pass.1ae4f2a0.js";import"../index.d505a6dc.js";import"../index.9299f102.js";import"../index.7bdd9bd7.js";import"../vis-three.module-animation-action.es.6d7baff5.js";import"../UnrealBloomPass.caa1ad7b.js";import"../index.4192aafc.js";import"../index.df02a99b.js";import"../vis-three.plugin-pointer-manager.es.9009bd78.js";import"../vis-three.strategy-orbit-controls-support.es.feebca3b.js";import"../index.c0066b9f.js";import"../index.80c3482e.js";import"../index.cc89943f.js";import"../vis-three.library-parser.es.152102aa.js";import"../vis-three.strategy-multi-renderer.es.35c3b855.js";import"../vis-three.plugin-loader-manager.es.dd5ac293.js";import"../Antdv.a86c3c0d.js";var ae=function(e){var t=typeof e;return e!==null&&t==="object"||t==="function"};const oe={A:"#9CFC72",B:"#44A5FF",C:"#FFBE4C"},ie={nodes:[{id:"1",label:"Company1"},{id:"2",label:"Company2"},{id:"3",label:"Company3"},{id:"4",label:"Company4"},{id:"5",label:"Company5"},{id:"8",label:"Company8"},{id:"9",label:"Company9"}],edges:[{source:"1",target:"2",data:{type:"A",amount:"100,000 Yuan",date:"2019-08-03"}},{source:"1",target:"3",data:{type:"B",amount:"100,000 Yuan",date:"2019-08-03"}},{source:"2",target:"5",data:{type:"C",amount:"100,000 Yuan",date:"2019-08-03"}},{source:"3",target:"4",data:{type:"C",amount:"100,000 Yuan",date:"2019-08-03"}},{source:"1",target:"8",data:{type:"B",amount:"100,000 Yuan",date:"2019-08-03"}},{source:"1",target:"9",data:{type:"C",amount:"100,000 Yuan",date:"2019-08-03"}}]};ee("round-rect",{drawShape:function(t,r){const o=t.style.width,a=t.style.stroke,d=r.addShape("rect",{attrs:{x:-o/2,y:-15,width:o,height:30,radius:15,stroke:a,lineWidth:3,fillOpacity:1},name:"rect-shape"});return r.addShape("circle",{attrs:{x:-o/2,y:0,r:3,fill:a},name:"circle-shape"}),r.addShape("circle",{attrs:{x:o/2,y:0,r:3,fill:a},name:"circle-shape2"}),d},getAnchorPoints:function(){return[[0,.5],[1,.5]]},update:function(t,r){const a=r.getContainer().get("children"),d=a[0],g=a[1],p=a[2],m=t.style.stroke;m&&(d.attr("stroke",m),g.attr("fill",m),p.attr("fill",m))}},"single-node");te("fund-polyline",{itemType:"edge",draw:function(t,r){const o=t.startPoint,a=t.endPoint,d=a.y-o.y,g=d!==0?Math.min(500/Math.abs(d),20):0,p=g>15?0:16,m=d<0?p:-p,f={x:o.x+g,y:a.y+m},u={x:f.x+p,y:a.y},A={x:(f.x-o.x)*(a.y-o.y)/(f.y-o.y)+o.x,y:a.y};let z=[["M",o.x,o.y],["L",f.x,f.y],["Q",A.x,A.y,u.x,u.y],["L",a.x,a.y]];Math.abs(d)<=5&&(z=[["M",o.x,o.y],["L",a.x,a.y]]);const O=(t==null?void 0:t.style)&&t.style.endArrow?t.style.endArrow:!1;ae(O)&&(O.fill=stroke);const P=r.addShape("path",{attrs:{path:z,stroke:oe[t.data&&t.data.type],lineWidth:3,endArrow:O},name:"path-shape"}),b=0,j=8,Y=r.addShape("text",{attrs:{text:t.data&&t.data.amount,x:u.x+b,y:a.y-j-2,fontSize:14,textAlign:"left",textBaseline:"middle",fill:"white"},name:"text-shape-amount"});return r.addShape("text",{attrs:{text:t.data&&t.data.type,x:u.x+b,y:a.y-j-Y.getBBox().height-2,fontSize:10,textAlign:"left",textBaseline:"middle",fill:"white"},name:"text-shape-type"}),r.addShape("text",{attrs:{text:t.data&&t.data.date,x:u.x+b,y:a.y+j+4,fontSize:12,fontWeight:300,textAlign:"left",textBaseline:"middle",fill:"white"},name:"text-shape-date"}),P}});const v=document.createElement("div");v.style.width="1024px";v.style.height="1024px";v.style.position="absolute";v.style.opacity=0;v.className="g6-tree";document.body.appendChild(v);const J=new R({container:v,layout:{type:"dagre",rankdir:"LR",nodesep:30,ranksep:100},fitView:!0,modes:{default:["drag-canvas"]},defaultNode:{type:"round-rect",labelCfg:{style:{fill:"white",fontSize:10}},style:{stroke:"#72CC4A",width:150}},defaultEdge:{type:"fund-polyline"}});J.data(ie);J.render();const B=["rgb(91, 143, 249)","rgb(90, 216, 166)","rgb(93, 112, 146)","rgb(246, 189, 22)","rgb(232, 104, 74)","rgb(109, 200, 236)","rgb(146, 112, 202)","rgb(255, 157, 77)","rgb(38, 154, 153)","rgb(227, 137, 163)"],x=document.createElement("div");x.style.width="1024px";x.style.height="1024px";x.style.position="absolute";x.style.opacity=0;x.className="g6-tree";document.body.appendChild(x);const h=new R({container:x,linkCenter:!0,fitView:!0,modes:{default:[{type:"edge-tooltip",formatText:function(t){return"source: "+t.sourceName+"<br/> target: "+t.targetName}}]},defaultNode:{style:{opacity:.8,lineWidth:1,stroke:"#999"}},defaultEdge:{size:1,color:"#e2e2e2",style:{opacity:.6,lineAppendWidth:3}}});h.on("edge:mouseenter",function(e){const t=e.item;h.setItemState(t,"hover",!0)});h.on("edge:mouseleave",function(e){const t=e.item;h.setItemState(t,"hover",!1)});const re=1024,W=1024;fetch("https://gw.alipayobjects.com/os/basement_prod/70cde3be-22e8-4291-98f1-4d5a5b75b62f.json").then(e=>e.json()).then(e=>{const t=e.edges,r=e.nodes,o=new Map,a=new Map;let d=0;const g=r.length,p=10,m=[p,W*.7],f=[re-p,W*.7],u=f[0]-m[0],A=f[1]-m[1],z=u/g,O=A/g;r.forEach(function(i,C){i.x=m[0]+C*z,i.y=m[1]+C*O,o.set(i.id,i),i.cluster&&a.get(i.cluster)===void 0&&(a.set(i.cluster,d),d++);const k=a.get(i.cluster);i.style?i.style.fill=B[k%B.length]:i.style={fill:B[k%B.length]},i.label=i.name,i.labelCfg={position:"bottom",offset:5,style:{rotate:Math.PI/2,textAlign:"start",fill:"white"}}}),t.forEach(i=>{i.type="arc";const C=o.get(i.source),k=o.get(i.target),$=(k.x-C.x)/z,K=($<0?-1:1)*10*Math.ceil(Math.abs($));i.curveOffset=K,i.color=C.style.fill,i.sourceName=C.name,i.targetName=k.name});let P=-9999,b=9999;r.forEach(function(i){P<i.value&&(P=i.value),b>i.value&&(b=i.value)}),se(r,"size","value",[b,P],[3,25]),h.data(e),h.render(),typeof window!="undefined"&&(window.onresize=()=>{!h||h.get("destroyed")})});function se(e,t,r,o,a){const d=a[1]-a[0],g=o[1]-o[0];e.forEach(function(p){p[t]=(p[r]-o[0])*d/g+a[0]})}const ne=new I({width:512,height:256,bgColor:"rgb(0, 0, 0)"}).draw(e=>{e.textBaseline="middle",e.textAlign="center",e.fillStyle="rgb(0, 255, 0)",e.font=" bold 54px \u5FAE\u8F6F\u96C5\u9ED1",e.fillText("\u6811\u67B6\u6784\u56FE\u8C31",256,128)}),le=new I({width:512,height:256,bgColor:"rgb(0, 0, 0)"}).draw(e=>{e.textBaseline="middle",e.textAlign="center",e.fillStyle="rgb(0, 255, 0)",e.font=" bold 54px \u5FAE\u8F6F\u96C5\u9ED1",e.fillText("\u98DE\u7EBF\u67B6\u6784\u56FE\u8C31",256,128)});l.register(S.focusObject).register(S.moveTo).register(S.moveFromTo).register(S.fadeObject).register(S.visibleObject).register(S.addClass);const de=new I({width:256,height:256,bgColor:"rgb(0, 0, 0)"}).draw(e=>{const t=e.createLinearGradient(0,0,0,256);t.addColorStop(0,"rgb(0, 0, 255)"),t.addColorStop(1,"rgb(0, 100, 0)"),e.fillStyle=t,e.fillRect(0,0,256,256)}),G=new X().setDom(document.getElementById("app")).setSize().play();G.registerResources({hookAlpha:de.getDom(),treeGraph:J.get("canvas").cfg.el,arcGraph:h.get("canvas").cfg.el,treeTips:ne.getDom(),arcTips:le.getDom()});n.injectEngine=G;const ce=n("PerspectiveCamera",{far:1e4,position:{x:500,y:-300,z:500}});G.setCameraBySymbol(ce.vid).setSize();const pe=n("Scene");G.setSceneBySymbol(pe.vid);n.injectScene=!0;n("AmbientLight");const V=70,M=70,s=V/2,c=10,y=M*2,me=n("CustomGeometry",{attribute:{position:[-s,0,-s,s,0,-s,s,0,s,-s,0,s,-s*c,y,-s*c,s*c,y,-s*c,s*c,y,s*c,-s*c,y,s*c],uv:[0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1],index:[0,4,5,5,1,0,1,5,6,6,2,1,2,6,7,7,3,2,3,7,4,4,0,3]},rotation:{x:Math.PI/2},position:{z:1}}),ge=n("CanvasTexture",{url:"hookAlpha"}),he=n("MeshBasicMaterial",{color:"rgb(53, 193, 221)",side:U,alphaMap:ge.vid,transparent:!0}),H=n("Mesh",{geometry:me.vid,material:he.vid,visible:!1}),Q=n("PlaneGeometry",{width:100,height:50,rotation:{x:Math.PI/2}}),ye=n("CanvasTexture",{url:"treeTips"}),fe=n("MeshBasicMaterial",{alphaMap:ye.vid,transparent:!0}),D=n("Mesh",{geometry:Q.vid,material:fe.vid,position:{z:y+10,y:-s*c+20,x:s*c-50},visible:!1}),N=n("CSS3DPlane",{element:"treeGraph",width:1024,height:1024,scale:{x:.7,y:.7,z:.7},position:{z:y+10},visible:!1}),ue=n("CanvasTexture",{url:"arcTips"}),be=n("MeshBasicMaterial",{alphaMap:ue.vid,transparent:!0}),F=n("Mesh",{geometry:Q.vid,material:be.vid,position:{z:y+120,y:-s*c+20,x:s*c-50},visible:!1}),T=n("CSS3DPlane",{element:"arcGraph",width:1024,height:1024,scale:{x:.7,y:.7,z:.7},position:{z:y+120},visible:!1}),ve=n("Group",{children:[H.vid,D.vid,N.vid,F.vid,T.vid]}),E=6,w=10,L=5,_=[],q=[];for(let e=0;e<=E*w-1;e+=1){const t=document.createElement("div");t.className="app-brick",t.innerHTML=`<span class="title">title:${e}</span>
        <span class="tips">tips:${e}</span>`,document.body.appendChild(t),G.registerResources({[`dom${e}`]:t});const r=Z();_.push(r);const o={x:w*(M+L)*(e%w/w)-w*(M+L)/2,y:E*(M+L)*(Math.floor(e/w)/E)-E*(M+L)/2,z:0},a=n("CSS3DPlane",{vid:r,element:`dom${e}`,width:V,height:M,position:o,click:[l.generateConfig("focusObject",{params:{target:r,space:"local",offset:{y:-850,z:500}},back:!1}),l.generateConfig("moveTo",{params:{target:ve.vid,position:{x:o.x,y:o.y,z:o.z},duration:0}}),l.generateConfig("moveFromTo",{params:{target:T.vid,to:{x:0,y:0,z:y+120},delay:500}}),l.generateConfig("moveFromTo",{params:{target:D.vid,to:JSON.parse(JSON.stringify(D.position)),delay:500}}),l.generateConfig("moveFromTo",{params:{target:N.vid,to:JSON.parse(JSON.stringify(N.position)),delay:500}}),l.generateConfig("moveFromTo",{params:{target:F.vid,to:JSON.parse(JSON.stringify(F.position)),delay:500}}),l.generateConfig("moveFromTo",{params:{target:T.vid,to:JSON.parse(JSON.stringify(T.position)),delay:500}}),l.generateConfig("fadeObject",{params:{target:H.vid,direction:"in",delay:500}}),l.generateConfig("fadeObject",{params:{target:F.vid,direction:"in",delay:500}}),l.generateConfig("visibleObject",{params:{target:T.vid,visible:!1}}),l.generateConfig("visibleObject",{params:{target:T.vid,visible:!0,delay:500}}),l.generateConfig("fadeObject",{params:{target:D.vid,direction:"in",delay:500}}),l.generateConfig("visibleObject",{params:{target:N.vid,visible:!1}}),l.generateConfig("visibleObject",{params:{target:N.vid,visible:!0,delay:500}}),l.generateConfig("addClass",{params:{target:r,className:"app-brick-focus"}})]});q.push(a)}q.forEach(e=>{const t=l.generateConfig("addClass",{params:{target:_.filter(r=>r!==e.vid),className:"app-brick-fade"}});e.click.push(t)});