import{_ as n,c as s,o as a,a as t}from"./app.9dfb895f.js";const g='{"title":"\u4ECB\u7ECD","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4ECB\u7ECD","slug":"\u4ECB\u7ECD"},{"level":2,"title":"\u81EA\u5B9A\u4E49\u63D2\u4EF6","slug":"\u81EA\u5B9A\u4E49\u63D2\u4EF6"},{"level":2,"title":"WebGLRenderer","slug":"webglrenderer"},{"level":2,"title":"CSS3DRenderer","slug":"css3drenderer"},{"level":2,"title":"Scene","slug":"scene"},{"level":2,"title":"EffectComposer","slug":"effectcomposer"},{"level":2,"title":"PointerManager","slug":"pointermanager"},{"level":2,"title":"EventManager","slug":"eventmanager"},{"level":2,"title":"RenderManager","slug":"rendermanager"},{"level":2,"title":"LoaderManager","slug":"loadermanager"},{"level":2,"title":"ResourceManager","slug":"resourcemanager"},{"level":2,"title":"KeyboardManager","slug":"keyboardmanager"},{"level":2,"title":"DataSupportManager","slug":"datasupportmanager"},{"level":2,"title":"CompilerManager","slug":"compilermanager"},{"level":2,"title":"OrbitControls","slug":"orbitcontrols"},{"level":2,"title":"TransformControls","slug":"transformcontrols"},{"level":2,"title":"Stats","slug":"stats"},{"level":2,"title":"AxesHelper","slug":"axeshelper"},{"level":2,"title":"GridHelper","slug":"gridhelper"},{"level":2,"title":"ObjectHelper","slug":"objecthelper"},{"level":2,"title":"Viewpoint","slug":"viewpoint"},{"level":2,"title":"DisplayMode","slug":"displaymode"},{"level":2,"title":"Selection","slug":"selection"}],"relativePath":"api/plugins.md"}',p={},e=t(`<h2 id="\u4ECB\u7ECD" tabindex="-1">\u4ECB\u7ECD <a class="header-anchor" href="#\u4ECB\u7ECD" aria-hidden="true">#</a></h2><p>\u4E3A\u4E86\u63D0\u9AD8\u53EF\u62D3\u5C55\u6027\uFF0C\u5F15\u64CE\u672C\u8EAB\u53EA\u63D0\u4F9B\u62D4\u63D2\u80FD\u529B\u548C\u529F\u80FD\u5C5E\u6027\u7A7A\u95F4\uFF0C\u5269\u4E0B\u7684\u5B9E\u73B0\u4EA4\u7ED9\u5404\u4E2A\u63D2\u4EF6\u8FDB\u884C\u3002</p><h2 id="\u81EA\u5B9A\u4E49\u63D2\u4EF6" tabindex="-1">\u81EA\u5B9A\u4E49\u63D2\u4EF6 <a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u63D2\u4EF6" aria-hidden="true">#</a></h2><div class="language-js"><pre><code><span class="token keyword">const</span> <span class="token function-variable function">customPlugin</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// this is engine</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">this</span><span class="token punctuation">.</span>completeSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u7A0D\u5FAE\u5141\u8BB8\u65E0\u987B\u5B89\u88C5\u63D2\u4EF6\uFF0C\u6240\u4EE5\u90E8\u5206\u903B\u8F91\u653E\u5728completeSet\u4E2D\u6700\u540Ecomplete()\u8C03\u7528\u5B8C\u6210</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

Vis<span class="token punctuation">.</span>Engine<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token string">&quot;customPlugin&quot;</span><span class="token punctuation">,</span> customPlugin<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span><span class="token string">&quot;customPlugin&quot;</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="webglrenderer" tabindex="-1">WebGLRenderer <a class="header-anchor" href="#webglrenderer" aria-hidden="true">#</a></h2><p>GL \u6E32\u67D3\u5668\u63D2\u4EF6</p><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>Vis<span class="token punctuation">.</span><span class="token constant">ENGINEPLUGIN</span><span class="token punctuation">.</span><span class="token constant">WEBGLRENDERER</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// WebGLRendererParameters</span>
  <span class="token literal-property property">antialias</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// \u6297\u952F\u9F7F</span>
  <span class="token literal-property property">alpha</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// \u5141\u8BB8\u900F\u660E\u5EA6</span>
  <span class="token comment">//...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// event</span>
engine<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;setSize&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// event.width</span>
  <span class="token comment">// event.height</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;setCamera&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// event.camera</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="css3drenderer" tabindex="-1">CSS3DRenderer <a class="header-anchor" href="#css3drenderer" aria-hidden="true">#</a></h2><p>CSS3D \u6E32\u67D3\u5668\u63D2\u4EF6</p><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>Vis<span class="token punctuation">.</span><span class="token constant">ENGINEPLUGIN</span><span class="token punctuation">.</span><span class="token constant">CSS3DRENDERER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="scene" tabindex="-1">Scene <a class="header-anchor" href="#scene" aria-hidden="true">#</a></h2><p>\u573A\u666F\u63D2\u4EF6</p><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>Vis<span class="token punctuation">.</span><span class="token constant">ENGINEPLUGIN</span><span class="token punctuation">.</span><span class="token constant">SCENE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// event</span>
engine<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;afterAdd&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// event.objects</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;afterRemove&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// event.objects</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="effectcomposer" tabindex="-1">EffectComposer <a class="header-anchor" href="#effectcomposer" aria-hidden="true">#</a></h2><p>\u540E\u671F\u5904\u7406\u5668\u63D2\u4EF6</p><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>Vis<span class="token punctuation">.</span><span class="token constant">ENGINEPLUGIN</span><span class="token punctuation">.</span><span class="token constant">EFFECTCOMPOSER</span> <span class="token punctuation">,</span><span class="token punctuation">{</span>
 <span class="token literal-property property">samples</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token comment">// \u91C7\u6837\u7A0B\u5EA6</span>
 <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token constant">THREE</span><span class="token punctuation">.</span>RGBAFormat <span class="token comment">// \u540E\u671F\u7F16\u7801</span>
 <span class="token constant">MSAA</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// event</span>
</code></pre></div><h2 id="pointermanager" tabindex="-1">PointerManager <a class="header-anchor" href="#pointermanager" aria-hidden="true">#</a></h2><p>\u6307\u9488\uFF0C\u9F20\u6807\u7BA1\u7406\u5668\u63D2\u4EF6</p><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>Vis<span class="token punctuation">.</span><span class="token constant">ENGINEPLUGIN</span><span class="token punctuation">.</span><span class="token constant">POINTERMANAGER</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">throttleTime</span><span class="token operator">:</span> number<span class="token punctuation">,</span> <span class="token comment">// \u8282\u6D41\u65F6\u95F4</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// event</span>
engine<span class="token punctuation">.</span>dom<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;pointerdown&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>dom<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;pointermove&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>dom<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;pointerup&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="eventmanager" tabindex="-1">EventManager <a class="header-anchor" href="#eventmanager" aria-hidden="true">#</a></h2><p>\u573A\u666F\u4E0E\u7269\u4F53\u7684\u4E8B\u4EF6\u7BA1\u7406\u5668\u63D2\u4EF6</p><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>Vis<span class="token punctuation">.</span><span class="token constant">ENGINEPLUGIN</span><span class="token punctuation">.</span><span class="token constant">EVENTMANAGER</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">recursive</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// \u662F\u5426\u53EF\u9012\u5F52\u8BA1\u7B97\u7269\u4F53\u5305\u62ECchildren</span>
  <span class="token literal-property property">penetrate</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// \u662F\u5426\u53EF\u4EE5\u7A7F\u900F\u89E6\u53D1\u4E8B\u4EF6\u59D4\u6258</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// event</span>

<span class="token comment">// global</span>
engine<span class="token punctuation">.</span>eventManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;pointerdown&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersections</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>eventManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;pointermove&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersections</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>eventManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;pointerup&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersections</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>eventManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;pointerenter&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersections</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>eventManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;pointerleave&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersections</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>eventManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;click&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersections</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>eventManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;dblclick&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersections</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>eventManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;contextmenu&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersections</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// object</span>
threeObject<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;pointerdown&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// event.intersections</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

threeObject<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;pointermove&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersection</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

threeObject<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;pointerup&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersection</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

threeObject<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;pointerenter&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersection</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

threeObject<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;pointerleave&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersection</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

threeObject<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;click&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersection</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

threeObject<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;dblclick&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersection</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

threeObject<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;contextmenu&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// mouseevent</span>
  <span class="token comment">// event.intersection</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="rendermanager" tabindex="-1">RenderManager <a class="header-anchor" href="#rendermanager" aria-hidden="true">#</a></h2><p>\u6E32\u67D3\u7BA1\u7406\u5668\u63D2\u4EF6</p><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>Vis<span class="token punctuation">.</span><span class="token constant">ENGINEPLUGIN</span><span class="token punctuation">.</span><span class="token constant">RENDERMANAGER</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">fps</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//(\u9884\u8BBE) \u5E27\u7387</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// event</span>
engine<span class="token punctuation">.</span>renderManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;render&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// event.delta</span>
  <span class="token comment">// event.total</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>renderManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;play&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>renderManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;stop&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="loadermanager" tabindex="-1">LoaderManager <a class="header-anchor" href="#loadermanager" aria-hidden="true">#</a></h2><p>\u52A0\u8F7D\u5668\u7BA1\u7406\u5668\u63D2\u4EF6</p><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>Vis<span class="token punctuation">.</span><span class="token constant">ENGINEPLUGIN</span><span class="token punctuation">.</span><span class="token constant">LOADERMANAGER</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">loaderExtends</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">diy</span><span class="token operator">:</span> DIYLoader <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// \u6269\u5C55\u7684\u52A0\u8F7D\u5668 extends THREE.Loader</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// event</span>
engine<span class="token punctuation">.</span>loaderManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;beforeLoad&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// event.urlList</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>loaderManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;loading&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// event.loadTotal</span>
  <span class="token comment">// event.loadSuccess,</span>
  <span class="token comment">// event.loadError</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>loaderManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;loaded&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// event.loadTotal,</span>
  <span class="token comment">// event.loadSuccess</span>
  <span class="token comment">// event.loadError</span>
  <span class="token comment">// event.resourceMap</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>loaderManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;detailLoading&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// event.detail</span>
  <span class="token comment">// detail = {</span>
  <span class="token comment">//   url,</span>
  <span class="token comment">//   progress: 0,</span>
  <span class="token comment">//   error: false,</span>
  <span class="token comment">//   message: url</span>
  <span class="token comment">// }</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

engine<span class="token punctuation">.</span>loaderManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;detailLoaded&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// event.detail</span>
  <span class="token comment">// detail = {</span>
  <span class="token comment">//   url,</span>
  <span class="token comment">//   progress: 0,</span>
  <span class="token comment">//   error: false,</span>
  <span class="token comment">//   message: url</span>
  <span class="token comment">// }</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="resourcemanager" tabindex="-1">ResourceManager <a class="header-anchor" href="#resourcemanager" aria-hidden="true">#</a></h2><p>\u8D44\u6E90\u7BA1\u7406\u5668\u63D2\u4EF6</p><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>Vis<span class="token punctuation">.</span><span class="token constant">ENGINEPLUGIN</span><span class="token punctuation">.</span><span class="token constant">RESOURCEMANAGER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// event</span>
engine<span class="token punctuation">.</span>resourceManager<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;mapped&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// event.structureMap: Map&lt;string, unknown&gt;</span>
  <span class="token comment">// event.configMap: Map&lt;string, unknown&gt;</span>
  <span class="token comment">// event.resourceMap: Map&lt;string, unknown&gt;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="keyboardmanager" tabindex="-1">KeyboardManager <a class="header-anchor" href="#keyboardmanager" aria-hidden="true">#</a></h2><p>\u5FEB\u6377\u952E\u7BA1\u7406\u63D2\u4EF6</p><h2 id="datasupportmanager" tabindex="-1">DataSupportManager <a class="header-anchor" href="#datasupportmanager" aria-hidden="true">#</a></h2><p>\u6570\u636E\u652F\u6301\u7BA1\u7406\u5668\u63D2\u4EF6</p><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>Vis<span class="token punctuation">.</span><span class="token constant">ENGINEPLUGIN</span><span class="token punctuation">.</span><span class="token constant">DATASUPPORTMANAGER</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">//module DataSupport</span>
  <span class="token literal-property property">lightDataSupport</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>LightDataSupport</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// event</span>
</code></pre></div><h2 id="compilermanager" tabindex="-1">CompilerManager <a class="header-anchor" href="#compilermanager" aria-hidden="true">#</a></h2><p>\u7F16\u8BD1\u7BA1\u7406\u5668\u63D2\u4EF6</p><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>Vis<span class="token punctuation">.</span><span class="token constant">ENGINEPLUGIN</span><span class="token punctuation">.</span><span class="token constant">COMPILERMANAGER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// event</span>
</code></pre></div><h2 id="orbitcontrols" tabindex="-1">OrbitControls <a class="header-anchor" href="#orbitcontrols" aria-hidden="true">#</a></h2><p>\u8F68\u9053\u63A7\u5236\u5668\u63D2\u4EF6</p><h2 id="transformcontrols" tabindex="-1">TransformControls <a class="header-anchor" href="#transformcontrols" aria-hidden="true">#</a></h2><p>\u53D8\u6362\u63A7\u5236\u5668\u63D2\u4EF6</p><h2 id="stats" tabindex="-1">Stats <a class="header-anchor" href="#stats" aria-hidden="true">#</a></h2><p>\u8D44\u6E90\u76D1\u89C6\u5668\u63D2\u4EF6</p><h2 id="axeshelper" tabindex="-1">AxesHelper <a class="header-anchor" href="#axeshelper" aria-hidden="true">#</a></h2><p>\u5750\u6807\u8F74\u8F85\u52A9\u63D2\u4EF6</p><h2 id="gridhelper" tabindex="-1">GridHelper <a class="header-anchor" href="#gridhelper" aria-hidden="true">#</a></h2><p>\u7F51\u683C\u8F85\u52A9\u63D2\u4EF6</p><h2 id="objecthelper" tabindex="-1">ObjectHelper <a class="header-anchor" href="#objecthelper" aria-hidden="true">#</a></h2><p>\u7269\u4F53\u8F85\u52A9\u63D2\u4EF6</p><h2 id="viewpoint" tabindex="-1">Viewpoint <a class="header-anchor" href="#viewpoint" aria-hidden="true">#</a></h2><p>\u89C6\u89D2\u5207\u6362\u63D2\u4EF6</p><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>Vis<span class="token punctuation">.</span><span class="token constant">ENGINEPLUGIN</span><span class="token punctuation">.</span><span class="token constant">VIEWPOINT</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">viewpoint</span><span class="token operator">:</span> Vis<span class="token punctuation">.</span><span class="token constant">VIEWPOINT</span><span class="token punctuation">.</span><span class="token constant">DEFAULT</span><span class="token punctuation">,</span> <span class="token comment">// default top bottom left right front back</span>
  <span class="token literal-property property">perspective</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// \u521D\u59CB\u7684\u900F\u89C6\u76F8\u673A\u8BBE\u7F6E</span>
    <span class="token literal-property property">position</span><span class="token operator">:</span> Vector3Config<span class="token punctuation">,</span>
    <span class="token literal-property property">lookAt</span><span class="token operator">:</span> Vector3Config<span class="token punctuation">,</span>
    <span class="token literal-property property">up</span><span class="token operator">:</span> Vector3Config<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token literal-property property">orthograpbic</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">//  \u521D\u59CB\u7684\u6B63\u4EA4\u76F8\u673A\u8BBE\u7F6E</span>
    <span class="token literal-property property">distance</span><span class="token operator">:</span> number<span class="token punctuation">,</span>
    <span class="token literal-property property">up</span><span class="token operator">:</span> Vector3Config<span class="token punctuation">,</span>
    <span class="token literal-property property">allowRotate</span><span class="token operator">:</span> boolean<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// event</span>
</code></pre></div><h2 id="displaymode" tabindex="-1">DisplayMode <a class="header-anchor" href="#displaymode" aria-hidden="true">#</a></h2><p>\u6E32\u67D3\u6A21\u5F0F\u63D2\u4EF6</p><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>Vis<span class="token punctuation">.</span><span class="token constant">ENGINEPLUGIN</span><span class="token punctuation">.</span><span class="token constant">DISPLAYMODE</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> Vis<span class="token punctuation">.</span><span class="token constant">DISPLAYMODE</span><span class="token punctuation">.</span><span class="token constant">ENV</span><span class="token punctuation">,</span> <span class="token comment">// &#39;geometry&#39;, &#39;material&#39;, &#39;light&#39;, &#39;env&#39;</span>
  <span class="token literal-property property">overrideColor</span><span class="token operator">:</span> <span class="token string">&quot;rgb(250, 250, 250)&quot;</span><span class="token punctuation">,</span> <span class="token comment">// geometry\u6A21\u5F0F\u4E0B\u88AB\u66FF\u6362\u7684\u989C\u8272</span>
  <span class="token literal-property property">defaultAmbientLightSetting</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// \u9ED8\u8BA4\u73AF\u5883\u5149\u8BBE\u7F6E</span>
    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&quot;rgb(255, 255, 255)&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">intensity</span><span class="token operator">:</span> <span class="token number">0.5</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token literal-property property">defaultDirectionalLightSetting</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// \u9ED8\u8BA4\u5E73\u884C\u5149\u8BBE\u7F6E</span>
    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&quot;rgb(255, 255, 255)&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">intensity</span><span class="token operator">:</span> <span class="token number">0.5</span><span class="token punctuation">,</span>
    <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">100</span><span class="token punctuation">,</span>
      <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
      <span class="token literal-property property">z</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// event</span>
</code></pre></div><h2 id="selection" tabindex="-1">Selection <a class="header-anchor" href="#selection" aria-hidden="true">#</a></h2><p>\u7269\u4F53\u9009\u62E9\u63D2\u4EF6</p><div class="language-js"><pre><code><span class="token keyword">const</span> engine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vis<span class="token punctuation">.</span>Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span>Vis<span class="token punctuation">.</span><span class="token constant">ENGINEPLUGIN</span><span class="token punctuation">.</span><span class="token constant">SELECTION</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// event</span>
engine<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;selected&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// event.objects</span>
  <span class="token comment">// event.objectSymbols</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,60),o=[e];function c(l,u,i,k,r,d){return a(),s("div",null,o)}var v=n(p,[["render",c]]);export{g as __pageData,v as default};
