import { Compiler, Rule, globalAntiShake, defineProcessor, ShaderGeneratorManager, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { FrontSide, OneMinusSrcAlphaFactor, AddEquation, NormalBlending, SrcAlphaFactor, MultiplyOperation, TangentSpaceNormalMap, Texture, Color, MeshBasicMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, PointsMaterial, ShaderMaterial, SpriteMaterial, LineBasicMaterial, LineDashedMaterial, MeshMatcapMaterial } from "three";
import { syncObject } from "@vis-three/utils";
class MaterialCompiler extends Compiler {
  constructor() {
    super();
  }
}
const MaterialRule = function(notice, compiler) {
  Rule(notice, compiler);
};
const getMaterialConfig = function() {
  return {
    vid: "",
    type: "Material",
    alphaTest: 0,
    colorWrite: true,
    depthTest: true,
    depthWrite: true,
    name: "",
    needsUpdate: false,
    opacity: 1,
    dithering: false,
    shadowSide: null,
    side: FrontSide,
    toneMapped: true,
    transparent: false,
    visible: true,
    blendDst: OneMinusSrcAlphaFactor,
    blendDstAlpha: null,
    blendEquation: AddEquation,
    blendEquationAlpha: null,
    blending: NormalBlending,
    blendSrc: SrcAlphaFactor,
    blendSrcAlpha: null,
    polygonOffset: false,
    polygonOffsetFactor: 0,
    polygonOffsetUnits: 0
  };
};
const getMeshBasicMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    color: "rgb(255, 255, 255)",
    combine: MultiplyOperation,
    aoMapIntensity: 1,
    fog: true,
    lightMapIntensity: 1,
    reflectivity: 1,
    refractionRatio: 0.98,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    wireframeLinewidth: 1,
    map: "",
    envMap: "",
    alphaMap: "",
    aoMap: "",
    lightMap: "",
    specularMap: ""
  });
};
const getMeshStandardMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    aoMapIntensity: 1,
    bumpScale: 1,
    color: "rgb(255, 255, 255)",
    displacementScale: 1,
    displacementBias: 0,
    emissive: "rgb(0, 0, 0)",
    emissiveIntensity: 1,
    envMapIntensity: 1,
    flatShading: false,
    lightMapIntensity: 1,
    metalness: 0,
    normalMapType: TangentSpaceNormalMap,
    refractionRatio: 0.98,
    roughness: 1,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    roughnessMap: "",
    normalMap: "",
    metalnessMap: "",
    map: "",
    lightMap: "",
    envMap: "",
    emissiveMap: "",
    displacementMap: "",
    bumpMap: "",
    alphaMap: "",
    aoMap: ""
  });
};
const getMeshPhysicalMaterialConfig = function() {
  return Object.assign(getMeshStandardMaterialConfig(), {
    attenuationColor: "rgb(255, 255, 255)",
    attenuationDistance: 0,
    clearcoat: 0,
    clearcoatNormalScale: {
      x: 1,
      y: 1
    },
    clearcoatRoughness: 0,
    ior: 1.5,
    reflectivity: 0.5,
    sheen: 0,
    sheenRoughness: 1,
    sheenColor: "rgb(255, 255, 255)",
    specularIntensity: 0,
    specularColor: "rgb(255, 255, 255)",
    thickness: 0,
    transmission: 0,
    clearcoatMap: "",
    clearcoatNormalMap: "",
    clearcoatRoughnessMap: "",
    sheenRoughnessMap: "",
    sheenColorMap: "",
    specularIntensityMap: "",
    specularColorMap: "",
    thicknessMap: "",
    transmissionMap: ""
  });
};
const getMeshPhongMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    aoMapIntensity: 1,
    bumpScale: 1,
    color: "rgb(255, 255, 255)",
    displacementScale: 1,
    displacementBias: 0,
    emissive: "rgb(0, 0, 0)",
    emissiveIntensity: 1,
    envMapIntensity: 1,
    flatShading: false,
    lightMapIntensity: 1,
    normalMapType: TangentSpaceNormalMap,
    refractionRatio: 0.98,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    specular: "rgb(17, 17, 17)",
    shininess: 30,
    combine: MultiplyOperation,
    normalMap: "",
    map: "",
    lightMap: "",
    envMap: "",
    emissiveMap: "",
    displacementMap: "",
    bumpMap: "",
    alphaMap: "",
    aoMap: "",
    specularMap: ""
  });
};
const getSpriteMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    color: "rgb(255, 255, 255)",
    rotation: 0,
    map: "",
    alphaMap: "",
    sizeAttenuation: true
  });
};
const getLineBasicMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    color: "rgb(255, 255, 255)",
    linecap: "round",
    linejoin: "round",
    linewidth: 1
  });
};
const getLineDashedMaterialConfig = function() {
  return Object.assign(getLineBasicMaterialConfig(), {
    dashSize: 3,
    gapSize: 1,
    scale: 1
  });
};
const getPointsMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    map: "",
    alphaMap: "",
    color: "rgb(255, 255, 255)",
    sizeAttenuation: true,
    size: 1
  });
};
const getShaderMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    shader: "defaultShader",
    uniforms: {}
  });
};
const getMeshMatcapMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    color: "rgb(255, 255, 255)",
    bumpScale: 1,
    displacementScale: 1,
    displacementBias: 0,
    flatShading: false,
    fog: true,
    normalMapType: TangentSpaceNormalMap,
    normalSale: { x: 1, y: 1 },
    map: "",
    alphaMap: "",
    bumpMap: "",
    displacementMap: "",
    matcap: "",
    normalMap: ""
  });
};
const commonNeedUpdatesRegCommand = {
  reg: new RegExp("transparent|sizeAttenuation"),
  handler({
    target,
    key,
    value
  }) {
    target[key] = value;
    target.needsUpdate = true;
  }
};
const mapHandler = function({
  target,
  key,
  value,
  engine
}) {
  globalAntiShake.exec((finish) => {
    if (!value) {
      target[key] = null;
      target.needsUpdate = true;
      return true;
    }
    const texture = engine.compilerManager.getObjectBySymbol(value);
    if (!(texture instanceof Texture)) {
      finish && console.warn(
        `this url resource is not instance of Texture: ${key}`,
        value,
        texture
      );
      target[key] = null;
      return false;
    }
    target[key] = texture;
    target.needsUpdate = true;
    return true;
  });
};
const commonMapRegCommand = {
  reg: new RegExp("map$", "i"),
  handler: mapHandler
};
const colorSetHandler = function({
  target,
  key,
  value
}) {
  target[key].copy(new Color(value));
};
const create = function(target, config, engine) {
  const filter = {};
  for (const key of Object.keys(config)) {
    if (key.toLocaleLowerCase().endsWith("map") && config[key]) {
      mapHandler({ target, key, value: config[key], engine });
      filter[key] = true;
    } else if (target[key] instanceof Color) {
      target[key] = new Color(config[key]);
      filter[key] = true;
    }
  }
  syncObject(config, target, filter);
  target.needsUpdate = true;
  return target;
};
const dispose = function(target) {
  target.dispose();
};
var MeshBasicMaterialProcessor = defineProcessor({
  type: "MeshBasicMaterial",
  config: getMeshBasicMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config, engine) {
    return create(new MeshBasicMaterial(), config, engine);
  },
  dispose
});
var MeshPhongMaterialProcessor = defineProcessor({
  type: "MeshPhongMaterial",
  config: getMeshPhongMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      emissive: colorSetHandler,
      specular: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config, engine) {
    return create(new MeshPhongMaterial(), config, engine);
  },
  dispose
});
var MeshPhysicalMaterialProcessor = defineProcessor({
  type: "MeshPhysicalMaterial",
  config: getMeshPhysicalMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      emissive: colorSetHandler,
      specularColor: colorSetHandler,
      sheenColor: colorSetHandler,
      attenuationColor: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config, engine) {
    return create(new MeshPhysicalMaterial(), config, engine);
  },
  dispose
});
var MeshStandardMaterialProcessor = defineProcessor({
  type: "MeshStandardMaterial",
  config: getMeshStandardMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      emissive: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config, engine) {
    return create(new MeshStandardMaterial(), config, engine);
  },
  dispose
});
var PointsMaterialProcessor = defineProcessor({
  type: "PointsMaterial",
  config: getPointsMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config, engine) {
    return create(new PointsMaterial(), config, engine);
  },
  dispose
});
var ShaderMaterialProcessor = defineProcessor({
  type: "ShaderMaterial",
  config: getShaderMaterialConfig,
  commands: {
    set: {
      shader({ target, value }) {
        const shader = ShaderGeneratorManager.getShader(value);
        (shader == null ? void 0 : shader.vertexShader) && (target.vertexShader = shader.vertexShader);
        (shader == null ? void 0 : shader.fragmentShader) && (target.fragmentShader = shader.fragmentShader);
        (shader == null ? void 0 : shader.uniforms) && (target.uniforms = shader.uniforms);
        (shader == null ? void 0 : shader.defines) && (target.defines = shader.defines);
        target.needsUpdate = true;
      },
      $reg: [commonNeedUpdatesRegCommand]
    }
  },
  create: function(config, engine) {
    const material = new ShaderMaterial();
    const shader = ShaderGeneratorManager.getShader(config.shader);
    (shader == null ? void 0 : shader.vertexShader) && (material.vertexShader = shader.vertexShader);
    (shader == null ? void 0 : shader.fragmentShader) && (material.fragmentShader = shader.fragmentShader);
    (shader == null ? void 0 : shader.uniforms) && (material.uniforms = shader.uniforms);
    (shader == null ? void 0 : shader.defines) && (material.defines = shader.defines);
    syncObject(config, material, {
      type: true,
      shader: true
    });
    material.needsUpdate = true;
    return material;
  },
  dispose
});
var SpriteMaterialProcessor = defineProcessor({
  type: "SpriteMaterial",
  config: getSpriteMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config, engine) {
    return create(new SpriteMaterial(), config, engine);
  },
  dispose
});
var LineBasicMaterialProcessor = defineProcessor({
  type: "LineBasicMaterial",
  config: getLineBasicMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config, engine) {
    return create(new LineBasicMaterial(), config, engine);
  },
  dispose
});
var LineDashMaterialProcessor = defineProcessor({
  type: "LineDashedMaterial",
  config: getLineDashedMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config, engine) {
    return create(new LineDashedMaterial(), config, engine);
  },
  dispose
});
var MeshMatcapMaterialProcessor = defineProcessor({
  type: "MeshMatcapMaterial",
  config: getMeshMatcapMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      matcap: mapHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create(config, engine) {
    return create(new MeshMatcapMaterial(), config, engine);
  },
  dispose
});
var index = {
  type: "material",
  compiler: MaterialCompiler,
  rule: MaterialRule,
  processors: [
    LineBasicMaterialProcessor,
    LineDashMaterialProcessor,
    MeshBasicMaterialProcessor,
    MeshPhongMaterialProcessor,
    MeshPhysicalMaterialProcessor,
    MeshStandardMaterialProcessor,
    PointsMaterialProcessor,
    ShaderMaterialProcessor,
    SpriteMaterialProcessor,
    MeshMatcapMaterialProcessor
  ],
  lifeOrder: SUPPORT_LIFE_CYCLE.TWO
};
export { MaterialCompiler, index as default, getLineBasicMaterialConfig, getLineDashedMaterialConfig, getMaterialConfig, getMeshBasicMaterialConfig, getMeshMatcapMaterialConfig, getMeshPhongMaterialConfig, getMeshPhysicalMaterialConfig, getMeshStandardMaterialConfig, getPointsMaterialConfig, getShaderMaterialConfig, getSpriteMaterialConfig };
