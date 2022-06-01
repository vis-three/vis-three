import{_ as n,c as s,o as a,a as p}from"./app.506b6e3b.js";const h='{"title":"\u5B89\u88C5","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5B89\u88C5","slug":"\u5B89\u88C5"},{"level":2,"title":"\u4F7F\u7528","slug":"\u4F7F\u7528"},{"level":2,"title":"\u57FA\u672C\u7528\u6CD5","slug":"\u57FA\u672C\u7528\u6CD5"},{"level":3,"title":"\u751F\u6210\u914D\u7F6E","slug":"\u751F\u6210\u914D\u7F6E"},{"level":3,"title":"\u914D\u7F6E\u4F7F\u7528","slug":"\u914D\u7F6E\u4F7F\u7528"},{"level":3,"title":"\u4F7F\u7528\u914D\u7F6E\u652F\u6301\u6A21\u5757\u63D2\u4EF6","slug":"\u4F7F\u7528\u914D\u7F6E\u652F\u6301\u6A21\u5757\u63D2\u4EF6"},{"level":3,"title":"\u4F7F\u7528\u652F\u6301\u76F8\u5173\u5F15\u64CE","slug":"\u4F7F\u7528\u652F\u6301\u76F8\u5173\u5F15\u64CE"},{"level":3,"title":"\u6307\u5B9A\u6E32\u67D3\u573A\u666F","slug":"\u6307\u5B9A\u6E32\u67D3\u573A\u666F"},{"level":3,"title":"\u6307\u5B9A\u6E32\u67D3\u76F8\u673A","slug":"\u6307\u5B9A\u6E32\u67D3\u76F8\u673A"},{"level":3,"title":"\u5FEB\u901F\u7F16\u8F91\u573A\u666F\u7269\u4F53","slug":"\u5FEB\u901F\u7F16\u8F91\u573A\u666F\u7269\u4F53"},{"level":3,"title":"\u5BFC\u51FA\u914D\u7F6E","slug":"\u5BFC\u51FA\u914D\u7F6E"},{"level":3,"title":"\u5BFC\u5165\u914D\u7F6E","slug":"\u5BFC\u5165\u914D\u7F6E"}],"relativePath":"start/start.md"}',t={},o=p(`<h2 id="\u5B89\u88C5" tabindex="-1">\u5B89\u88C5 <a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a></h2><div class="language-"><pre><code>npm i vis-three
</code></pre></div><h2 id="\u4F7F\u7528" tabindex="-1">\u4F7F\u7528 <a class="header-anchor" href="#\u4F7F\u7528" aria-hidden="true">#</a></h2><div class="language-js"><pre><code><span class="token comment">// \u6574\u4F53\u5BFC\u5165</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Vis <span class="token keyword">from</span> <span class="token string">&quot;vis-three&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// \u6309\u9700\u5BFC\u5165</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>
  ModelingEngineSupport<span class="token punctuation">,</span>
  SupportDataGenerator<span class="token punctuation">,</span>
  generateConfig<span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vis-three&quot;</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="\u57FA\u672C\u7528\u6CD5" tabindex="-1">\u57FA\u672C\u7528\u6CD5 <a class="header-anchor" href="#\u57FA\u672C\u7528\u6CD5" aria-hidden="true">#</a></h2><h3 id="\u751F\u6210\u914D\u7F6E" tabindex="-1">\u751F\u6210\u914D\u7F6E <a class="header-anchor" href="#\u751F\u6210\u914D\u7F6E" aria-hidden="true">#</a></h3><div class="language-js"><pre><code><span class="token comment">// \u57FA\u7840\u914D\u7F6E\u5355</span>
<span class="token keyword">const</span> pointLight <span class="token operator">=</span> Vis<span class="token punctuation">.</span><span class="token function">generateConfig</span><span class="token punctuation">(</span><span class="token string">&quot;PointLight&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
    <span class="token literal-property property">z</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// vis\u54CD\u5E94\u5F0F</span>
<span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>ModelingEngineSupport</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> pointLight <span class="token operator">=</span> engine<span class="token punctuation">.</span><span class="token function">reactiveConfig</span><span class="token punctuation">(</span>
  Vis<span class="token punctuation">.</span><span class="token function">generateConfig</span><span class="token punctuation">(</span><span class="token string">&quot;PointLight&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
      <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
      <span class="token literal-property property">z</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// vue2 + vis\u54CD\u5E94\u5F0F</span>
<span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>ModelingEngineSupport</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> pointLight <span class="token operator">=</span> engine<span class="token punctuation">.</span><span class="token function">reactiveConfig</span><span class="token punctuation">(</span>
  Vue<span class="token punctuation">.</span><span class="token function">observable</span><span class="token punctuation">(</span>
    Vis<span class="token punctuation">.</span><span class="token function">generateConfig</span><span class="token punctuation">(</span><span class="token string">&quot;PointLight&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
        <span class="token literal-property property">z</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// vue3 + vis\u54CD\u5E94\u5F0F</span>
<span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>ModelingEngineSupport</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> pointLight <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span>
  engine<span class="token punctuation">.</span><span class="token function">reactiveConfig</span><span class="token punctuation">(</span>
    Vis<span class="token punctuation">.</span><span class="token function">generateConfig</span><span class="token punctuation">(</span><span class="token string">&quot;PointLight&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
        <span class="token literal-property property">z</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
engine<span class="token punctuation">.</span><span class="token function">applyConfig</span><span class="token punctuation">(</span>pointLight<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="\u914D\u7F6E\u4F7F\u7528" tabindex="-1">\u914D\u7F6E\u4F7F\u7528 <a class="header-anchor" href="#\u914D\u7F6E\u4F7F\u7528" aria-hidden="true">#</a></h3><div class="language-js"><pre><code><span class="token comment">// \u52A8\u6001\u8F7D\u5165</span>
<span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>ModelingEngineSupport</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
engine<span class="token punctuation">.</span><span class="token function">applyConfig</span><span class="token punctuation">(</span>pointLight<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u9884\u8BBE\u52A0\u5165</span>
<span class="token keyword">const</span> lightDataSupport <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>LightDataSupport</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token punctuation">[</span>pointLight<span class="token punctuation">.</span>vid<span class="token punctuation">]</span><span class="token operator">:</span> pointLight<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>ModelingEngineSupport</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">lightDataSupport</span><span class="token operator">:</span> lightDataSupport<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="\u4F7F\u7528\u914D\u7F6E\u652F\u6301\u6A21\u5757\u63D2\u4EF6" tabindex="-1">\u4F7F\u7528\u914D\u7F6E\u652F\u6301\u6A21\u5757\u63D2\u4EF6 <a class="header-anchor" href="#\u4F7F\u7528\u914D\u7F6E\u652F\u6301\u6A21\u5757\u63D2\u4EF6" aria-hidden="true">#</a></h3><div class="language-js"><pre><code><span class="token keyword">const</span> lightDataSupport <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>LightDataSupport</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token punctuation">[</span>pointLight<span class="token punctuation">.</span>vid<span class="token punctuation">]</span><span class="token operator">:</span> pointLight<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> cameraDataSupport <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>CameraDataSupport</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>ModelingEngineSupport</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  lightDataSupport<span class="token punctuation">,</span>
  cameraDataSupport<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="\u4F7F\u7528\u652F\u6301\u76F8\u5173\u5F15\u64CE" tabindex="-1">\u4F7F\u7528\u652F\u6301\u76F8\u5173\u5F15\u64CE <a class="header-anchor" href="#\u4F7F\u7528\u652F\u6301\u76F8\u5173\u5F15\u64CE" aria-hidden="true">#</a></h3><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>ModelingEngineSupport</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">lightDataSupport</span><span class="token operator">:</span> lightDataSupport<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setDom</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;app&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="\u6307\u5B9A\u6E32\u67D3\u573A\u666F" tabindex="-1">\u6307\u5B9A\u6E32\u67D3\u573A\u666F <a class="header-anchor" href="#\u6307\u5B9A\u6E32\u67D3\u573A\u666F" aria-hidden="true">#</a></h3><div class="language-js"><pre><code><span class="token keyword">const</span> scene <span class="token operator">=</span> Vis<span class="token punctuation">.</span><span class="token function">generateConfig</span><span class="token punctuation">(</span><span class="token string">&quot;Scene&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>pointLight<span class="token punctuation">.</span>vid<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
engine<span class="token punctuation">.</span><span class="token function">applyConfig</span><span class="token punctuation">(</span>scene<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setScene</span><span class="token punctuation">(</span>scene<span class="token punctuation">.</span>vid<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="\u6307\u5B9A\u6E32\u67D3\u76F8\u673A" tabindex="-1">\u6307\u5B9A\u6E32\u67D3\u76F8\u673A <a class="header-anchor" href="#\u6307\u5B9A\u6E32\u67D3\u76F8\u673A" aria-hidden="true">#</a></h3><div class="language-js"><pre><code><span class="token keyword">const</span> camera <span class="token operator">=</span> Vis<span class="token punctuation">.</span><span class="token function">generateConfig</span><span class="token punctuation">(</span><span class="token string">&quot;PerspectiveCamera&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>
    <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>
    <span class="token literal-property property">z</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">far</span><span class="token operator">:</span> <span class="token number">5000</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span><span class="token function">applyConfig</span><span class="token punctuation">(</span>camera<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setCamera</span><span class="token punctuation">(</span>camera<span class="token punctuation">.</span>vid<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="\u5FEB\u901F\u7F16\u8F91\u573A\u666F\u7269\u4F53" tabindex="-1">\u5FEB\u901F\u7F16\u8F91\u573A\u666F\u7269\u4F53 <a class="header-anchor" href="#\u5FEB\u901F\u7F16\u8F91\u573A\u666F\u7269\u4F53" aria-hidden="true">#</a></h3><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>number<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pointLight.position.x<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div><div class="language-js"><pre><code><span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    pointLight
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>

<span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">movePointLight</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>pointLight<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>pointLight<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre></div><h3 id="\u5BFC\u51FA\u914D\u7F6E" tabindex="-1">\u5BFC\u51FA\u914D\u7F6E <a class="header-anchor" href="#\u5BFC\u51FA\u914D\u7F6E" aria-hidden="true">#</a></h3><div class="language-js"><pre><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>engineSupport<span class="token punctuation">.</span><span class="token function">toJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="\u5BFC\u5165\u914D\u7F6E" tabindex="-1">\u5BFC\u5165\u914D\u7F6E <a class="header-anchor" href="#\u5BFC\u5165\u914D\u7F6E" aria-hidden="true">#</a></h3><div class="language-js"><pre><code><span class="token keyword">import</span> config <span class="token keyword">from</span> <span class="token string">&quot;/examples/config.json&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> handlerConfig <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">,</span> Vis<span class="token punctuation">.</span>JSONHandler<span class="token punctuation">.</span>parse<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>ModelingEngineSupport</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setDom</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;app&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">loadConfigAsync</span><span class="token punctuation">(</span>handlerConfig<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// loaded do something...</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,24),e=[o];function c(u,l,i,k,r,d){return a(),s("div",null,e)}var y=n(t,[["render",c]]);export{h as __pageData,y as default};
