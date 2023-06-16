import{_ as e,o as a,c as i,O as r}from"./chunks/framework.a8fb2c59.js";const p=JSON.parse('{"title":"Interface: LineDashedMaterialConfig","description":"","frontmatter":{},"headers":[],"relativePath":"library/module/material/interfaces/MaterialConfig.LineDashedMaterialConfig.md","filePath":"library/module/material/interfaces/MaterialConfig.LineDashedMaterialConfig.md"}'),t={name:"library/module/material/interfaces/MaterialConfig.LineDashedMaterialConfig.md"},n=r('<h1 id="interface-linedashedmaterialconfig" tabindex="-1">Interface: LineDashedMaterialConfig <a class="header-anchor" href="#interface-linedashedmaterialconfig" aria-label="Permalink to &quot;Interface: LineDashedMaterialConfig&quot;">​</a></h1><p><a href="./../modules/MaterialConfig.html">MaterialConfig</a>.LineDashedMaterialConfig</p><p>虚线材质</p><p><strong><code>See</code></strong></p><p><a href="https://threejs.org/docs/index.html#api/zh/materials/LineDashedMaterial" target="_blank" rel="noreferrer">https://threejs.org/docs/index.html#api/zh/materials/LineDashedMaterial</a></p><h2 id="hierarchy" tabindex="-1">Hierarchy <a class="header-anchor" href="#hierarchy" aria-label="Permalink to &quot;Hierarchy&quot;">​</a></h2><ul><li><p><a href="./MaterialConfig.LineBasicMaterialConfig.html"><code>LineBasicMaterialConfig</code></a></p><p>↳ <strong><code>LineDashedMaterialConfig</code></strong></p></li></ul><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h2><h3 id="alphatest" tabindex="-1">alphaTest <a class="header-anchor" href="#alphatest" aria-label="Permalink to &quot;alphaTest&quot;">​</a></h3><p>• <strong>alphaTest</strong>: <code>number</code></p><p>设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质。默认值为0。</p><h4 id="inherited-from" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#alphatest">alphaTest</a></p><h4 id="defined-in" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L19" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:19</a></p><hr><h3 id="blenddst" tabindex="-1">blendDst <a class="header-anchor" href="#blenddst" aria-label="Permalink to &quot;blendDst&quot;">​</a></h3><p>• <strong>blendDst</strong>: <code>number</code></p><p>混合目标。默认值为OneMinusSrcAlphaFactor。 目标因子所有可能的取值请参阅constants。 必须将材质的blending设置为CustomBlending才能生效。</p><h4 id="inherited-from-1" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-1" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#blenddst">blendDst</a></p><h4 id="defined-in-1" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-1" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L43" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:43</a></p><hr><h3 id="blenddstalpha" tabindex="-1">blendDstAlpha <a class="header-anchor" href="#blenddstalpha" aria-label="Permalink to &quot;blendDstAlpha&quot;">​</a></h3><p>• <strong>blendDstAlpha</strong>: <code>null</code> | <code>number</code></p><p>.blendDst的透明度。</p><h4 id="inherited-from-2" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-2" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#blenddstalpha">blendDstAlpha</a></p><h4 id="defined-in-2" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-2" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L45" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:45</a></p><hr><h3 id="blendequation" tabindex="-1">blendEquation <a class="header-anchor" href="#blendequation" aria-label="Permalink to &quot;blendEquation&quot;">​</a></h3><p>• <strong>blendEquation</strong>: <code>number</code></p><p>使用混合时所采用的混合方程式。默认值为AddEquation。必须将材质的blending设置为CustomBlending才能生效。</p><h4 id="inherited-from-3" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-3" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#blendequation">blendEquation</a></p><h4 id="defined-in-3" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-3" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L47" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:47</a></p><hr><h3 id="blendequationalpha" tabindex="-1">blendEquationAlpha <a class="header-anchor" href="#blendequationalpha" aria-label="Permalink to &quot;blendEquationAlpha&quot;">​</a></h3><p>• <strong>blendEquationAlpha</strong>: <code>null</code> | <code>number</code></p><p>.blendEquation 的透明度。</p><h4 id="inherited-from-4" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-4" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#blendequationalpha">blendEquationAlpha</a></p><h4 id="defined-in-4" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-4" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L49" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:49</a></p><hr><h3 id="blendsrc" tabindex="-1">blendSrc <a class="header-anchor" href="#blendsrc" aria-label="Permalink to &quot;blendSrc&quot;">​</a></h3><p>• <strong>blendSrc</strong>: <code>number</code></p><p>混合源。默认值为SrcAlphaFactor。必须将材质的blending设置为CustomBlending才能生效。</p><h4 id="inherited-from-5" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-5" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#blendsrc">blendSrc</a></p><h4 id="defined-in-5" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-5" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L53" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:53</a></p><hr><h3 id="blendsrcalpha" tabindex="-1">blendSrcAlpha <a class="header-anchor" href="#blendsrcalpha" aria-label="Permalink to &quot;blendSrcAlpha&quot;">​</a></h3><p>• <strong>blendSrcAlpha</strong>: <code>null</code> | <code>number</code></p><p>.blendSrc的透明度。</p><h4 id="inherited-from-6" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-6" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#blendsrcalpha">blendSrcAlpha</a></p><h4 id="defined-in-6" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-6" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L55" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:55</a></p><hr><h3 id="blending" tabindex="-1">blending <a class="header-anchor" href="#blending" aria-label="Permalink to &quot;blending&quot;">​</a></h3><p>• <strong>blending</strong>: <code>Blending</code></p><p>在使用此材质显示对象时要使用何种混合。必须将其设置为CustomBlending才能使用自定义blendSrc, blendDst 或者 [page:Constant blendEquation]。</p><h4 id="inherited-from-7" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-7" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#blending">blending</a></p><h4 id="defined-in-7" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-7" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L51" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:51</a></p><hr><h3 id="color" tabindex="-1">color <a class="header-anchor" href="#color" aria-label="Permalink to &quot;color&quot;">​</a></h3><p>• <strong>color</strong>: <code>string</code></p><h4 id="inherited-from-8" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-8" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#color">color</a></p><h4 id="defined-in-8" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-8" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L189" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:189</a></p><hr><h3 id="colorwrite" tabindex="-1">colorWrite <a class="header-anchor" href="#colorwrite" aria-label="Permalink to &quot;colorWrite&quot;">​</a></h3><p>• <strong>colorWrite</strong>: <code>boolean</code></p><p>是否渲染材质的颜色。 这可以与网格的renderOrder属性结合使用，以创建遮挡其他对象的不可见对象。</p><h4 id="inherited-from-9" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-9" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#colorwrite">colorWrite</a></p><h4 id="defined-in-9" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-9" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L21" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:21</a></p><hr><h3 id="dashsize" tabindex="-1">dashSize <a class="header-anchor" href="#dashsize" aria-label="Permalink to &quot;dashSize&quot;">​</a></h3><p>• <strong>dashSize</strong>: <code>number</code></p><p>虚线的大小，是指破折号和间隙之和</p><h4 id="defined-in-10" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-10" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L201" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:201</a></p><hr><h3 id="depthtest" tabindex="-1">depthTest <a class="header-anchor" href="#depthtest" aria-label="Permalink to &quot;depthTest&quot;">​</a></h3><p>• <strong>depthTest</strong>: <code>boolean</code></p><p>是否在渲染此材质时启用深度测试。</p><h4 id="inherited-from-10" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-10" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#depthtest">depthTest</a></p><h4 id="defined-in-11" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-11" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L23" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:23</a></p><hr><h3 id="depthwrite" tabindex="-1">depthWrite <a class="header-anchor" href="#depthwrite" aria-label="Permalink to &quot;depthWrite&quot;">​</a></h3><p>• <strong>depthWrite</strong>: <code>boolean</code></p><p>渲染此材质是否对深度缓冲区有任何影响。</p><h4 id="inherited-from-11" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-11" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#depthwrite">depthWrite</a></p><h4 id="defined-in-12" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-12" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L25" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:25</a></p><hr><h3 id="dithering" tabindex="-1">dithering <a class="header-anchor" href="#dithering" aria-label="Permalink to &quot;dithering&quot;">​</a></h3><p>• <strong>dithering</strong>: <code>boolean</code></p><p>是否对颜色应用抖动以消除条带的外观。</p><h4 id="inherited-from-12" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-12" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#dithering">dithering</a></p><h4 id="defined-in-13" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-13" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L31" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:31</a></p><hr><h3 id="gapsize" tabindex="-1">gapSize <a class="header-anchor" href="#gapsize" aria-label="Permalink to &quot;gapSize&quot;">​</a></h3><p>• <strong>gapSize</strong>: <code>number</code></p><p>间隙的大小</p><h4 id="defined-in-14" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-14" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L203" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:203</a></p><hr><h3 id="linecap" tabindex="-1">linecap <a class="header-anchor" href="#linecap" aria-label="Permalink to &quot;linecap&quot;">​</a></h3><p>• <strong>linecap</strong>: <code>string</code></p><h4 id="inherited-from-13" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-13" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#linecap">linecap</a></p><h4 id="defined-in-15" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-15" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L190" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:190</a></p><hr><h3 id="linejoin" tabindex="-1">linejoin <a class="header-anchor" href="#linejoin" aria-label="Permalink to &quot;linejoin&quot;">​</a></h3><p>• <strong>linejoin</strong>: <code>string</code></p><h4 id="inherited-from-14" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-14" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#linejoin">linejoin</a></p><h4 id="defined-in-16" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-16" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L191" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:191</a></p><hr><h3 id="linewidth" tabindex="-1">linewidth <a class="header-anchor" href="#linewidth" aria-label="Permalink to &quot;linewidth&quot;">​</a></h3><p>• <strong>linewidth</strong>: <code>number</code></p><h4 id="inherited-from-15" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-15" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#linewidth">linewidth</a></p><h4 id="defined-in-17" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-17" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L192" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:192</a></p><hr><h3 id="name" tabindex="-1">name <a class="header-anchor" href="#name" aria-label="Permalink to &quot;name&quot;">​</a></h3><p>• <strong>name</strong>: <code>string</code></p><h4 id="inherited-from-16" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-16" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#name">name</a></p><h4 id="defined-in-18" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-18" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/common/index.ts#L4" target="_blank" rel="noreferrer">middleware/module/common/index.ts:4</a></p><hr><h3 id="needsupdate" tabindex="-1">needsUpdate <a class="header-anchor" href="#needsupdate" aria-label="Permalink to &quot;needsUpdate&quot;">​</a></h3><p>• <strong>needsUpdate</strong>: <code>boolean</code></p><p>材质是否需要更新。一般来讲是不用手动更新，除非有特殊情况。</p><h4 id="inherited-from-17" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-17" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#needsupdate">needsUpdate</a></p><h4 id="defined-in-19" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-19" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L27" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:27</a></p><hr><h3 id="opacity" tabindex="-1">opacity <a class="header-anchor" href="#opacity" aria-label="Permalink to &quot;opacity&quot;">​</a></h3><p>• <strong>opacity</strong>: <code>number</code></p><p>在0.0 - 1.0的范围内的浮点数，表明材质的透明度。值0.0表示完全透明，1.0表示完全不透明。在transparent为true时有效</p><h4 id="inherited-from-18" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-18" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#opacity">opacity</a></p><h4 id="defined-in-20" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-20" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L29" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:29</a></p><hr><h3 id="polygonoffset" tabindex="-1">polygonOffset <a class="header-anchor" href="#polygonoffset" aria-label="Permalink to &quot;polygonOffset&quot;">​</a></h3><p>• <strong>polygonOffset</strong>: <code>boolean</code></p><p>是否使用多边形偏移。</p><h4 id="inherited-from-19" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-19" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#polygonoffset">polygonOffset</a></p><h4 id="defined-in-21" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-21" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L57" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:57</a></p><hr><h3 id="polygonoffsetfactor" tabindex="-1">polygonOffsetFactor <a class="header-anchor" href="#polygonoffsetfactor" aria-label="Permalink to &quot;polygonOffsetFactor&quot;">​</a></h3><p>• <strong>polygonOffsetFactor</strong>: <code>number</code></p><p>设置多边形偏移系数。</p><h4 id="inherited-from-20" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-20" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#polygonoffsetfactor">polygonOffsetFactor</a></p><h4 id="defined-in-22" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-22" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L59" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:59</a></p><hr><h3 id="polygonoffsetunits" tabindex="-1">polygonOffsetUnits <a class="header-anchor" href="#polygonoffsetunits" aria-label="Permalink to &quot;polygonOffsetUnits&quot;">​</a></h3><p>• <strong>polygonOffsetUnits</strong>: <code>number</code></p><p>设置多边形偏移单位。</p><h4 id="inherited-from-21" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-21" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#polygonoffsetunits">polygonOffsetUnits</a></p><h4 id="defined-in-23" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-23" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L61" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:61</a></p><hr><h3 id="scale" tabindex="-1">scale <a class="header-anchor" href="#scale" aria-label="Permalink to &quot;scale&quot;">​</a></h3><p>• <strong>scale</strong>: <code>number</code></p><p>线条中虚线部分的占比</p><h4 id="defined-in-24" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-24" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L205" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:205</a></p><hr><h3 id="shadowside" tabindex="-1">shadowSide <a class="header-anchor" href="#shadowside" aria-label="Permalink to &quot;shadowSide&quot;">​</a></h3><p>• <strong>shadowSide</strong>: <code>null</code> | <code>number</code></p><p>定义投影的面。设置时，可以是THREE.FrontSide, THREE.BackSide, 或Materials。</p><h4 id="inherited-from-22" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-22" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#shadowside">shadowSide</a></p><h4 id="defined-in-25" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-25" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L33" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:33</a></p><hr><h3 id="side" tabindex="-1">side <a class="header-anchor" href="#side" aria-label="Permalink to &quot;side&quot;">​</a></h3><p>• <strong>side</strong>: <code>number</code></p><p>定义将要渲染哪一面 - 正面，背面或两者。 默认为THREE.FrontSide。其他选项有THREE.BackSide 和 THREE.DoubleSide。</p><h4 id="inherited-from-23" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-23" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#side">side</a></p><h4 id="defined-in-26" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-26" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L35" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:35</a></p><hr><h3 id="tonemapped" tabindex="-1">toneMapped <a class="header-anchor" href="#tonemapped" aria-label="Permalink to &quot;toneMapped&quot;">​</a></h3><p>• <strong>toneMapped</strong>: <code>boolean</code></p><p>定义这个材质是否会被渲染器的toneMapping设置所影响。</p><h4 id="inherited-from-24" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-24" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#tonemapped">toneMapped</a></p><h4 id="defined-in-27" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-27" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L37" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:37</a></p><hr><h3 id="transparent" tabindex="-1">transparent <a class="header-anchor" href="#transparent" aria-label="Permalink to &quot;transparent&quot;">​</a></h3><p>• <strong>transparent</strong>: <code>boolean</code></p><p>定义此材质是否透明。</p><h4 id="inherited-from-25" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-25" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#transparent">transparent</a></p><h4 id="defined-in-28" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-28" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L39" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:39</a></p><hr><h3 id="type" tabindex="-1">type <a class="header-anchor" href="#type" aria-label="Permalink to &quot;type&quot;">​</a></h3><p>• <strong>type</strong>: <code>string</code></p><h4 id="inherited-from-26" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-26" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#type">type</a></p><h4 id="defined-in-29" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-29" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/common/index.ts#L3" target="_blank" rel="noreferrer">middleware/module/common/index.ts:3</a></p><hr><h3 id="vid" tabindex="-1">vid <a class="header-anchor" href="#vid" aria-label="Permalink to &quot;vid&quot;">​</a></h3><p>• <strong>vid</strong>: <code>string</code></p><h4 id="inherited-from-27" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-27" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#vid">vid</a></p><h4 id="defined-in-30" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-30" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/common/index.ts#L2" target="_blank" rel="noreferrer">middleware/module/common/index.ts:2</a></p><hr><h3 id="visible" tabindex="-1">visible <a class="header-anchor" href="#visible" aria-label="Permalink to &quot;visible&quot;">​</a></h3><p>• <strong>visible</strong>: <code>boolean</code></p><p>此材质是否可见。</p><h4 id="inherited-from-28" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-28" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./MaterialConfig.LineBasicMaterialConfig.html">LineBasicMaterialConfig</a>.<a href="./MaterialConfig.LineBasicMaterialConfig.html#visible">visible</a></p><h4 id="defined-in-31" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-31" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L41" target="_blank" rel="noreferrer">library/module/material/MaterialConfig.ts:41</a></p>',250),o=[n];function l(d,h,s,f,c,b){return a(),i("div",null,o)}const g=e(t,[["render",l]]);export{p as __pageData,g as default};