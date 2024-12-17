import{_ as s,c as i,o as a,a2 as n}from"./chunks/framework.BjUghlZR.js";const F=JSON.parse('{"title":"组件化引擎","description":"","frontmatter":{},"headers":[],"relativePath":"zh/api/widget/EngineWidget.md","filePath":"zh/api/widget/EngineWidget.md"}'),h={name:"zh/api/widget/EngineWidget.md"},t=n(`<h1 id="组件化引擎" tabindex="-1">组件化引擎 <a class="header-anchor" href="#组件化引擎" aria-label="Permalink to &quot;组件化引擎&quot;">​</a></h1><p>该引擎继承了配置化核心引擎，并添加了相关的组件化能力与有关<code>api</code>。</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;">const</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5;"> engine</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;"> =</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;"> new</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;"> EngineWidget</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">()</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">  .</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">install</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">(</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">WebGLRendererPlugin</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">())</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">  .</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">exec</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">(</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">WebGLRenderStrategy</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">())</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">  .</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">play</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;">const</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5;"> box</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;"> =</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;"> defineComponent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">({</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">  render</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">() {</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">    h</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">(</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62;">&quot;PointLight&quot;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">, {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">      position: {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">        x: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5;">30</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">        y: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5;">50</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">      },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">      distance: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5;">100</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">    h</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">(</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62;">&quot;Mesh&quot;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">, {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">      geometry: </span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">h</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">(</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62;">&quot;BoxGeometry&quot;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">, {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">        width: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5;">20</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">        height: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5;">40</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">        depth: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5;">60</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">      }),</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">      material: </span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">h</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">(</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62;">&quot;MeshStandardMaterial&quot;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">, {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">        color: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62;">&quot;rgb(255, 0, 0)&quot;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">      }),</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">    });</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">  },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">engine.</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">createWidget</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">(box).</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">mount</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">();</span></span></code></pre></div><h2 id="继承" tabindex="-1">继承 <a class="header-anchor" href="#继承" aria-label="Permalink to &quot;继承&quot;">​</a></h2><p><a href="./../tdcm/EngineSupport.html">EngineSupport</a></p><h2 id="方法" tabindex="-1">方法 <a class="header-anchor" href="#方法" aria-label="Permalink to &quot;方法&quot;">​</a></h2><h3 id="createwidget" tabindex="-1">createWidget <a class="header-anchor" href="#createwidget" aria-label="Permalink to &quot;createWidget&quot;">​</a></h3><ul><li><strong>详情</strong></li></ul><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-dark:#6A737D;--shiki-light:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-dark:#6A737D;--shiki-light:#6A737D;"> * 创建一个小部件</span></span>
<span class="line"><span style="--shiki-dark:#6A737D;--shiki-light:#6A737D;"> * </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;">@param</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;"> component</span><span style="--shiki-dark:#6A737D;--shiki-light:#6A737D;"> 组件</span></span>
<span class="line"><span style="--shiki-dark:#6A737D;--shiki-light:#6A737D;"> * </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;">@returns</span><span style="--shiki-dark:#6A737D;--shiki-light:#6A737D;"> Widget</span></span>
<span class="line"><span style="--shiki-dark:#6A737D;--shiki-light:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">createWidget&lt;</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">Props</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;"> extends</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5;"> object</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;"> =</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;"> {}, </span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">RawBindings</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;"> extends</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5;"> object</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;"> =</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;"> {}&gt;(</span><span style="--shiki-dark:#FFAB70;--shiki-light:#E36209;">component</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;">:</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;"> ComponentOptions</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">&lt;</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;">typeof</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5;"> this</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">, </span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">Props</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">, </span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">RawBindings</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">&gt;)</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;">:</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;"> Widget</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">&lt;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5;">this</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">, </span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">Props</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">, </span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">RawBindings</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">&gt;</span></span></code></pre></div>`,9),k=[t];function l(p,e,E,r,d,g){return a(),i("div",null,k)}const o=s(h,[["render",l]]);export{F as __pageData,o as default};