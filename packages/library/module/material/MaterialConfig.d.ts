import { BasicConfig, Vector2Config } from "@vis-three/tdcm";
import { Blending } from "three";
/**
 * 材质配置基类
 * @see {@link https://threejs.org/docs/index.html#api/zh/materials/Material}
 */
export interface MaterialConfig extends BasicConfig {
    /**设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质。默认值为0。*/
    alphaTest: number;
    /**是否渲染材质的颜色。 这可以与网格的renderOrder属性结合使用，以创建遮挡其他对象的不可见对象。*/
    colorWrite: boolean;
    /** 是否在渲染此材质时启用深度测试。*/
    depthTest: boolean;
    /**渲染此材质是否对深度缓冲区有任何影响。 */
    depthWrite: boolean;
    /**材质是否需要更新。一般来讲是不用手动更新，除非有特殊情况。 */
    needsUpdate: boolean;
    /**在0.0 - 1.0的范围内的浮点数，表明材质的透明度。值0.0表示完全透明，1.0表示完全不透明。在transparent为true时有效 */
    opacity: number;
    /**是否对颜色应用抖动以消除条带的外观。 */
    dithering: boolean;
    /**定义投影的面。设置时，可以是THREE.FrontSide, THREE.BackSide, 或Materials。 */
    shadowSide: number | null;
    /**定义将要渲染哪一面 - 正面，背面或两者。 默认为THREE.FrontSide。其他选项有THREE.BackSide 和 THREE.DoubleSide。 */
    side: number;
    /**定义这个材质是否会被渲染器的toneMapping设置所影响。 */
    toneMapped: boolean;
    /**定义此材质是否透明。 */
    transparent: boolean;
    /**此材质是否可见。 */
    visible: boolean;
    /**混合目标。默认值为OneMinusSrcAlphaFactor。 目标因子所有可能的取值请参阅constants。 必须将材质的blending设置为CustomBlending才能生效。 */
    blendDst: number;
    /**.blendDst的透明度。 */
    blendDstAlpha: number | null;
    /**使用混合时所采用的混合方程式。默认值为AddEquation。必须将材质的blending设置为CustomBlending才能生效。 */
    blendEquation: number;
    /**.blendEquation 的透明度。 */
    blendEquationAlpha: number | null;
    /**在使用此材质显示对象时要使用何种混合。必须将其设置为CustomBlending才能使用自定义blendSrc, blendDst 或者 [page:Constant blendEquation]。  */
    blending: Blending;
    /**混合源。默认值为SrcAlphaFactor。必须将材质的blending设置为CustomBlending才能生效。 */
    blendSrc: number;
    /** .blendSrc的透明度。*/
    blendSrcAlpha: number | null;
    /**是否使用多边形偏移。 */
    polygonOffset: boolean;
    /**设置多边形偏移系数。 */
    polygonOffsetFactor: number;
    /**设置多边形偏移单位。 */
    polygonOffsetUnits: number;
}
/**
 * 基础网格材质,这种材质不受光照的影响。
 * @see {@link https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial}
 */
export interface MeshBasicMaterialConfig extends MaterialConfig {
    /**材质的颜色(Color) */
    color: string;
    /**如何将表面颜色的结果与环境贴图（如果有）结合起来。 */
    combine: number;
    /**环境遮挡效果的强度。零是不遮挡效果。 */
    aoMapIntensity: number;
    /**材质是否受雾影响。 */
    fog: boolean;
    /**烘焙光的强度。 */
    lightMapIntensity: number;
    /**环境贴图对表面的影响程度; 见.combine。有效范围介于0（无反射）和1（完全反射）之间。 */
    reflectivity: number;
    /**空气的折射率（IOR）（约为1）除以材质的折射率。它与环境映射模式THREE.CubeRefractionMapping 和THREE.EquirectangularRefractionMapping一起使用。折射率不应超过1 */
    refractionRatio: number;
    /**将几何体渲染为线框。 */
    wireframe: boolean;
    /**定义线两端的外观。可选值为 'butt'，'round' 和 'square'。 */
    wireframeLinecap: string;
    /**定义线连接节点的样式。可选值为 'round', 'bevel' 和 'miter'。 */
    wireframeLinejoin: string;
    /**控制线框宽度。默认值为1。由于OpenGL Core Profile与大多数平台上WebGL渲染器的限制， 无论如何设置该值，线宽始终为1。 */
    wireframeLinewidth: number;
    /**颜色贴图。值为vid标识 */
    map: string;
    /**环境贴图。值为vid标识 */
    envMap: string;
    /**alpha贴图是一张灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）。值为vid标识 */
    alphaMap: string;
    /**该纹理的红色通道用作环境遮挡贴图。aoMap需要第二组UV。值为vid标识*/
    aoMap: string;
    /**光照贴图。lightMap需要第二组UV。值为vid标识 */
    lightMap: string;
    /**材质使用的高光贴图。 值为vid标识*/
    specularMap: string;
}
/**
 * 标准网格材质
 * @see {@link https://threejs.org/docs/index.html#api/zh/materials/MeshStandardMaterial}
 */
export interface MeshStandardMaterialConfig extends MaterialConfig {
    aoMapIntensity: number;
    bumpScale: number;
    color: string;
    displacementScale: number;
    displacementBias: number;
    emissive: string;
    emissiveIntensity: number;
    envMapIntensity: number;
    flatShading: boolean;
    lightMapIntensity: number;
    metalness: number;
    normalMapType: number;
    refractionRatio: number;
    roughness: number;
    wireframe: boolean;
    wireframeLinecap: string;
    wireframeLinejoin: string;
    roughnessMap: string;
    normalMap: string;
    metalnessMap: string;
    map: string;
    lightMap: string;
    envMap: string;
    emissiveMap: string;
    displacementMap: string;
    bumpMap: string;
    alphaMap: string;
    aoMap: string;
}
/**
 * Phong网格材质
 * @see {@link https://threejs.org/docs/index.html#api/zh/materials/MeshPhongMaterial}
 */
export interface MeshPhongMaterialConfig extends MaterialConfig {
    aoMapIntensity: number;
    bumpScale: number;
    color: string;
    displacementScale: number;
    displacementBias: number;
    emissive: string;
    emissiveIntensity: number;
    flatShading: boolean;
    lightMapIntensity: number;
    normalMapType: number;
    refractionRatio: number;
    wireframe: boolean;
    wireframeLinecap: string;
    wireframeLinejoin: string;
    specular: string;
    shininess: number;
    combine: number;
    normalMap: string;
    map: string;
    lightMap: string;
    envMap: string;
    emissiveMap: string;
    displacementMap: string;
    bumpMap: string;
    alphaMap: string;
    aoMap: string;
    specularMap: string;
}
/**
 * 点精灵材质
 * @see {@link https://threejs.org/docs/index.html#api/zh/materials/SpriteMaterial}
 */
export interface SpriteMaterialConfig extends MaterialConfig {
    color: string;
    rotation: number;
    map: string;
    alphaMap: string;
    sizeAttenuation: boolean;
}
/**
 * 基础线条材质
 * @see {@link https://threejs.org/docs/index.html#api/zh/materials/LineBasicMaterial}
 */
export interface LineBasicMaterialConfig extends MaterialConfig {
    color: string;
    linecap: string;
    linejoin: string;
    linewidth: number;
}
/**
 * 虚线材质
 * @see {@link https://threejs.org/docs/index.html#api/zh/materials/LineDashedMaterial}
 */
export interface LineDashedMaterialConfig extends LineBasicMaterialConfig {
    /**虚线的大小，是指破折号和间隙之和 */
    dashSize: number;
    /**间隙的大小 */
    gapSize: number;
    /**线条中虚线部分的占比 */
    scale: number;
}
/**
 * 点材质
 * @see {@link https://threejs.org/docs/index.html#api/zh/materials/PointsMaterial}
 */
export interface PointsMaterialConfig extends MaterialConfig {
    alphaMap: string;
    color: string;
    map: string;
    size: number;
    sizeAttenuation: boolean;
}
/**
 * 着色器材质
 * @see {@link https://threejs.org/docs/index.html#api/zh/materials/ShaderMaterial}
 */
export interface ShaderMaterialConfig extends MaterialConfig {
    shader: string;
    uniforms: {
        [key: string]: any;
    };
}
/**
 * 物理网格材质
 * @see {@link https://threejs.org/docs/index.html#api/zh/materials/MeshPhysicalMaterial}
 */
export interface MeshPhysicalMaterialConfig extends MeshStandardMaterialConfig {
    attenuationColor: string;
    attenuationDistance: number;
    clearcoat: number;
    clearcoatNormalScale: Vector2Config;
    clearcoatRoughness: number;
    ior: number;
    reflectivity: number;
    sheen: number;
    sheenRoughness: number;
    sheenColor: string;
    specularIntensity: number;
    specularColor: string;
    thickness: number;
    transmission: number;
    clearcoatMap: string;
    clearcoatNormalMap: string;
    clearcoatRoughnessMap: string;
    sheenRoughnessMap: string;
    sheenColorMap: string;
    specularIntensityMap: string;
    specularColorMap: string;
    thicknessMap: string;
    transmissionMap: string;
}
/**
 * 加载材质
 */
export interface LoadMaterialConfig extends MaterialConfig {
    /**目标材质资源vid */
    url: string;
}
export interface MeshMatcapMaterialConfig extends MaterialConfig {
    color: string;
    bumpScale: number;
    displacementScale: number;
    displacementBias: number;
    flatShading: boolean;
    fog: boolean;
    normalMapType: number;
    normalSale: Vector2Config;
    map: string;
    alphaMap: string;
    bumpMap: string;
    displacementMap: string;
    matcap: string;
    normalMap: string;
}
/**
 * 所有材质配置类型
 */
export type MaterialAllType = MeshBasicMaterialConfig | MeshStandardMaterialConfig | MeshPhongMaterialConfig | LineBasicMaterialConfig | LineDashedMaterialConfig | SpriteMaterialConfig | PointsMaterialConfig | ShaderMaterialConfig | MeshPhysicalMaterialConfig | MeshMatcapMaterialConfig;
export declare const getMaterialConfig: () => MaterialConfig;
export declare const getMeshBasicMaterialConfig: () => MeshBasicMaterialConfig;
export declare const getMeshStandardMaterialConfig: () => MeshStandardMaterialConfig;
export declare const getMeshPhysicalMaterialConfig: () => MeshPhysicalMaterialConfig;
export declare const getMeshPhongMaterialConfig: () => MeshPhongMaterialConfig;
export declare const getSpriteMaterialConfig: () => SpriteMaterialConfig;
export declare const getLineBasicMaterialConfig: () => LineBasicMaterialConfig;
export declare const getLineDashedMaterialConfig: () => LineDashedMaterialConfig;
export declare const getPointsMaterialConfig: () => PointsMaterialConfig;
export declare const getShaderMaterialConfig: () => ShaderMaterialConfig;
export declare const getMeshMatcapMaterialConfig: () => MeshMatcapMaterialConfig;
