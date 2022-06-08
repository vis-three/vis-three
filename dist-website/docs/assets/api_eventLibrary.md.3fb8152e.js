import{_ as n,c as s,o as a,a as p}from"./app.cbcba369.js";const y='{"title":"\u4ECB\u7ECD","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4ECB\u7ECD","slug":"\u4ECB\u7ECD"},{"level":2,"title":"\u4E8B\u4EF6\u4F7F\u7528","slug":"\u4E8B\u4EF6\u4F7F\u7528"},{"level":2,"title":"\u81EA\u5B9A\u4E49\u4E8B\u4EF6","slug":"\u81EA\u5B9A\u4E49\u4E8B\u4EF6"},{"level":2,"title":"\u57FA\u7840\u4E8B\u4EF6\u5E93","slug":"\u57FA\u7840\u4E8B\u4EF6\u5E93"},{"level":3,"title":"openWindow","slug":"openwindow"},{"level":2,"title":"\u4E8B\u4EF6\u52A8\u753B\u5E93","slug":"\u4E8B\u4EF6\u52A8\u753B\u5E93"},{"level":3,"title":"\u524D\u7F6E\u53D8\u91CF","slug":"\u524D\u7F6E\u53D8\u91CF"},{"level":3,"title":"moveSpacing","slug":"movespacing"},{"level":3,"title":"moveTo","slug":"moveto"}],"relativePath":"api/eventLibrary.md"}',t={},o=p(`<h2 id="\u4ECB\u7ECD" tabindex="-1">\u4ECB\u7ECD <a class="header-anchor" href="#\u4ECB\u7ECD" aria-hidden="true">#</a></h2><p>\u57FA\u4E8E\u914D\u7F6E\u5316\u5F00\u53D1\u4E0B\u7684\u5E94\u7528\u80FD\u591F\u901A\u8FC7\u914D\u7F6E\u7F16\u8BD1\u7ED9\u7269\u4F53\u589E\u52A0\u76F8\u5E94\u7684\u4E8B\u4EF6\u3002</p><h2 id="\u4E8B\u4EF6\u4F7F\u7528" tabindex="-1">\u4E8B\u4EF6\u4F7F\u7528 <a class="header-anchor" href="#\u4E8B\u4EF6\u4F7F\u7528" aria-hidden="true">#</a></h2><div class="language-js"><pre><code><span class="token keyword">const</span> mesh <span class="token operator">=</span> Vis<span class="token punctuation">.</span><span class="token function">generateConfig</span><span class="token punctuation">(</span><span class="token string">&quot;Mesh&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">pointerup</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    Vis<span class="token punctuation">.</span>EventLibrary<span class="token punctuation">.</span><span class="token function">generateConfig</span><span class="token punctuation">(</span><span class="token string">&quot;openWindow&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&quot;https://gitee.com/Shiotsukikaedesari/vis-three&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="\u81EA\u5B9A\u4E49\u4E8B\u4EF6" tabindex="-1">\u81EA\u5B9A\u4E49\u4E8B\u4EF6 <a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u4E8B\u4EF6" aria-hidden="true">#</a></h2><div class="language-ts"><pre><code><span class="token comment">// \u914D\u7F6E\u5316\u7684\u914D\u7F6E\u63A5\u53E3</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">OpenWindow</span> <span class="token keyword">extends</span> <span class="token class-name">BasicEventConfig</span> <span class="token punctuation">{</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u914D\u7F6E\u5355</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> config<span class="token operator">:</span> OpenWindow <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&quot;openWindow&quot;</span><span class="token punctuation">,</span> <span class="token comment">// name\u4E3A\u6B64\u4E8B\u4EF6\u7684\u4E8B\u4EF6\u540D\uFF0C\u552F\u4E00</span>
  <span class="token comment">// \u53C2\u6570\u63A5\u53E3\u6700\u597D\u7EDF\u4E00\u683C\u5F0F\uFF0C\u65B9\u4FBF\u7EDF\u4E00\u7EC4\u4EF6</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    url<span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// finish: { // \u5B8C\u6210\u65F6\u7ED3\u6784</span>

  <span class="token comment">// }</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// \u4E8B\u4EF6\u751F\u6210\u5668</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> generator<span class="token operator">:</span> EventGenerator<span class="token operator">&lt;</span>OpenWindow<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
  engine<span class="token operator">:</span> EngineSupport<span class="token punctuation">,</span>
  config<span class="token operator">:</span> OpenWindow
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">(</span>event<span class="token operator">?</span><span class="token operator">:</span> ObjectEvent<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>params<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="\u57FA\u7840\u4E8B\u4EF6\u5E93" tabindex="-1">\u57FA\u7840\u4E8B\u4EF6\u5E93 <a class="header-anchor" href="#\u57FA\u7840\u4E8B\u4EF6\u5E93" aria-hidden="true">#</a></h2><h3 id="openwindow" tabindex="-1">openWindow <a class="header-anchor" href="#openwindow" aria-hidden="true">#</a></h3><p>\u6253\u5F00\u7A97\u53E3</p><div class="language-js"><pre><code><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;openWindow&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// \u7A97\u53E3\u5730\u5740</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="\u4E8B\u4EF6\u52A8\u753B\u5E93" tabindex="-1">\u4E8B\u4EF6\u52A8\u753B\u5E93 <a class="header-anchor" href="#\u4E8B\u4EF6\u52A8\u753B\u5E93" aria-hidden="true">#</a></h2><h3 id="\u524D\u7F6E\u53D8\u91CF" tabindex="-1">\u524D\u7F6E\u53D8\u91CF <a class="header-anchor" href="#\u524D\u7F6E\u53D8\u91CF" aria-hidden="true">#</a></h3><p>\u5177\u4F53\u8BF7\u67E5\u770B vis-three\\src\\library\\event\\RealTimeAnimateLibrary\\common.ts</p><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Easing <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@tweenjs/tween.js&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">enum</span> <span class="token constant">TIMINGFUNCTION</span> <span class="token punctuation">{</span>
  <span class="token constant">ELN</span> <span class="token operator">=</span> <span class="token string">&quot;ELN&quot;</span><span class="token punctuation">,</span>
  <span class="token constant">EQI</span> <span class="token operator">=</span> <span class="token string">&quot;EQI&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> timingFunction<span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>key <span class="token keyword">in</span> <span class="token constant">TIMINGFUNCTION</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token punctuation">(</span>amount<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token constant">ELN</span><span class="token operator">:</span> Easing<span class="token punctuation">.</span>Linear<span class="token punctuation">.</span>None<span class="token punctuation">,</span>
  <span class="token constant">EQI</span><span class="token operator">:</span> Easing<span class="token punctuation">.</span>Quadratic<span class="token punctuation">.</span>InOut<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="movespacing" tabindex="-1">moveSpacing <a class="header-anchor" href="#movespacing" aria-hidden="true">#</a></h3><p>\u7269\u4F53\u79FB\u52A8\u8DDD\u79BB</p><div class="language-js"><pre><code><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;moveSpacing&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// \u76EE\u6807\u7269\u4F53vid</span>
    <span class="token comment">// \u79FB\u52A8\u8DDD\u79BB</span>
    <span class="token literal-property property">spacing</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
      <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
      <span class="token literal-property property">z</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">delay</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// \u5EF6\u8FDF\u65F6\u95F4</span>
    <span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span> <span class="token comment">// \u52A8\u753B\u65F6\u957F</span>
    <span class="token literal-property property">timingFunction</span><span class="token operator">:</span> <span class="token constant">TIMINGFUNCTION</span><span class="token punctuation">.</span><span class="token constant">EQI</span><span class="token punctuation">,</span> <span class="token comment">// \u52A8\u753B\u63D2\u503C\u51FD\u6570</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="moveto" tabindex="-1">moveTo <a class="header-anchor" href="#moveto" aria-hidden="true">#</a></h3><p>\u7269\u4F53\u79FB\u52A8\u5230</p><div class="language-js"><pre><code><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;moveTo&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// \u76EE\u6807\u7269\u4F53vid</span>
    <span class="token comment">// \u76EE\u6807\u4F4D\u7F6E</span>
    <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token literal-property property">z</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">delay</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// \u5EF6\u8FDF\u65F6\u95F4</span>
    <span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span> <span class="token comment">// \u52A8\u753B\u65F6\u957F</span>
    <span class="token literal-property property">timingFunction</span><span class="token operator">:</span> <span class="token constant">TIMINGFUNCTION</span><span class="token punctuation">.</span><span class="token constant">EQI</span><span class="token punctuation">,</span> <span class="token comment">// \u52A8\u753B\u63D2\u503C\u51FD\u6570</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div>`,20),e=[o];function c(l,r,u,i,k,d){return a(),s("div",null,e)}var g=n(t,[["render",c]]);export{y as __pageData,g as default};
