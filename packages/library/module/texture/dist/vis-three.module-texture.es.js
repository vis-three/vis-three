var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { syncObject } from "@vis-three/utils";
import { UVMapping, ClampToEdgeWrapping, LinearFilter, LinearMipmapLinearFilter, RGBAFormat, LinearEncoding, CubeReflectionMapping, CanvasTexture, CubeTexture, Texture, RGBFormat } from "three";
import { Compiler, globalAntiShake, MODULETYPE, defineProcessor, Rule, generateConfig, CONFIGTYPE } from "@vis-three/middleware";
import { CanvasGenerator } from "@vis-three/convenient";
const _TextureCompiler = class extends Compiler {
  constructor() {
    super();
  }
  getResource(url, instanceClasses2) {
    const resourceMap = this.engine.resourceManager.resourceMap;
    if (!resourceMap.has(url)) {
      console.warn(`engine resourceManager can not found this url: ${url}`);
      return _TextureCompiler.replaceImage;
    }
    const resource = resourceMap.get(url);
    if (Array.isArray(instanceClasses2)) {
      for (const instanceClass of instanceClasses2) {
        if (resource instanceof instanceClass) {
          return resource;
        }
      }
      console.warn(
        `this url mapping resource is not a texture image class: ${url}`,
        resource
      );
      return _TextureCompiler.replaceImage;
    } else {
      if (resource instanceof instanceClasses2) {
        return resource;
      } else {
        console.warn(
          `this url mapping resource is not a texture image class: ${url}`,
          resource
        );
        return _TextureCompiler.replaceImage;
      }
    }
  }
};
let TextureCompiler = _TextureCompiler;
__publicField(TextureCompiler, "replaceImage", new CanvasGenerator({
  width: 512,
  height: 512
}).draw((ctx) => {
  ctx.translate(256, 256);
  ctx.font = "72px";
  ctx.fillStyle = "white";
  ctx.fillText("\u6682\u65E0\u56FE\u7247", 0, 0);
}).getDom());
const needUpdateRegCommand = {
  reg: new RegExp(
    "wrapS|wrapT|format|encoding|anisotropy|magFilter|minFilter|mapping|flipY"
  ),
  handler({
    target,
    key,
    value
  }) {
    target[key] = value;
    target.needsUpdate = true;
  }
};
const urlHanlder = function({
  target,
  value,
  engine
}) {
  globalAntiShake.exec((finish) => {
    target.image = engine.compilerManager.getCompiler(MODULETYPE.TEXTURE).getResource(value, [
      HTMLImageElement,
      HTMLVideoElement,
      HTMLCanvasElement
    ]);
    target.needsUpdate = true;
    if (target.images === TextureCompiler.replaceImage) {
      return false;
    }
    return true;
  });
};
const getTextureConfig = function() {
  return {
    vid: "",
    type: "Texture",
    name: "",
    mapping: UVMapping,
    wrapS: ClampToEdgeWrapping,
    wrapT: ClampToEdgeWrapping,
    magFilter: LinearFilter,
    minFilter: LinearMipmapLinearFilter,
    anisotropy: 1,
    format: RGBAFormat,
    flipY: true,
    offset: {
      x: 0,
      y: 0
    },
    repeat: {
      x: 1,
      y: 1
    },
    rotation: 0,
    center: {
      x: 0,
      y: 0
    },
    matrixAutoUpdate: true,
    encoding: LinearEncoding,
    needsUpdate: false
  };
};
const getImageTextureConfig = function() {
  return Object.assign(getTextureConfig(), {
    url: ""
  });
};
const getVideoTextureConfig = function() {
  return Object.assign(getTextureConfig(), {
    url: "",
    minFilter: LinearFilter
  });
};
const getCubeTextureConfig = function() {
  return Object.assign(getTextureConfig(), {
    cube: {
      nx: "",
      ny: "",
      nz: "",
      px: "",
      py: "",
      pz: ""
    },
    mapping: CubeReflectionMapping,
    flipY: false
  });
};
const getCanvasTextureConfig = function() {
  return Object.assign(getTextureConfig(), {
    url: "",
    needsUpdate: false
  });
};
const getLoadTextureConfig = function() {
  return Object.assign(getTextureConfig(), {
    url: ""
  });
};
var CanvasTextureProcessor = defineProcessor({
  type: "CanvasTexture",
  config: getCanvasTextureConfig,
  commands: {
    set: {
      url: urlHanlder,
      $reg: [needUpdateRegCommand]
    }
  },
  create(config, engine) {
    const texture = new CanvasTexture(
      engine.compilerManager.getCompiler(MODULETYPE.TEXTURE).getResource(config.url, HTMLCanvasElement)
    );
    urlHanlder({ target: texture, value: config.url, engine });
    syncObject(config, texture, {
      type: true,
      url: true
    });
    texture.needsUpdate = true;
    return texture;
  },
  dispose(target) {
    target.dispose();
  }
});
const instanceClasses = [HTMLImageElement, HTMLVideoElement, HTMLCanvasElement];
const imageHanlder = function({ target, index: index2, value, engine }) {
  target.images[index2] = engine.compilerManager.getCompiler(MODULETYPE.TEXTURE).getResource(value, instanceClasses);
  target.needsUpdate = true;
};
var CubeTextureProcessor = defineProcessor({
  type: "CubeTexture",
  config: getCubeTextureConfig,
  commands: {
    set: {
      cube: {
        px({ target, value, engine }) {
          imageHanlder({
            target,
            value,
            engine,
            index: 0
          });
        },
        nx({ target, value, engine }) {
          imageHanlder({
            target,
            value,
            engine,
            index: 1
          });
        },
        py({ target, value, engine }) {
          imageHanlder({
            target,
            value,
            engine,
            index: 2
          });
        },
        ny({ target, value, engine }) {
          imageHanlder({
            target,
            value,
            engine,
            index: 3
          });
        },
        pz({ target, value, engine }) {
          imageHanlder({
            target,
            value,
            engine,
            index: 4
          });
        },
        nz({ target, value, engine }) {
          imageHanlder({
            target,
            value,
            engine,
            index: 5
          });
        }
      }
    }
  },
  create(config, engine) {
    const texture = new CubeTexture();
    const cube = config.cube;
    const compiler = engine.compilerManager.getCompiler(
      MODULETYPE.TEXTURE
    );
    const images = [
      compiler.getResource(cube.px, instanceClasses),
      compiler.getResource(cube.nx, instanceClasses),
      compiler.getResource(cube.py, instanceClasses),
      compiler.getResource(cube.ny, instanceClasses),
      compiler.getResource(cube.pz, instanceClasses),
      compiler.getResource(cube.nz, instanceClasses)
    ];
    texture.image = images;
    syncObject(config, texture, {
      type: true,
      cube: true
    });
    texture.needsUpdate = true;
    return texture;
  },
  dispose(target) {
    target.dispose();
  }
});
class ImageTexture extends Texture {
  constructor(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
    super(
      image,
      mapping,
      wrapS,
      wrapT,
      magFilter,
      minFilter,
      format,
      type,
      anisotropy,
      encoding
    );
  }
}
var ImageTextureProcessor = defineProcessor({
  type: "ImageTexture",
  config: getImageTextureConfig,
  commands: {
    set: {
      url: urlHanlder,
      $reg: [needUpdateRegCommand]
    }
  },
  create(config, engine) {
    const texture = new ImageTexture();
    if (config.url) {
      urlHanlder({ target: texture, value: config.url, engine });
    }
    syncObject(config, texture, {
      type: true,
      url: true
    });
    texture.needsUpdate = true;
    return texture;
  },
  dispose(target) {
    target.dispose();
  }
});
class LoadTexture extends Texture {
  constructor(texture) {
    super();
    Object.keys(texture).forEach((key) => {
      this[key] = texture[key];
    });
    this.copy(texture);
  }
}
var LoadTextureProcessor = defineProcessor({
  type: "LoadTexture",
  config: getLoadTextureConfig,
  commands: {
    set: {
      url({}) {
      },
      $reg: [needUpdateRegCommand]
    }
  },
  create(config, engine) {
    let texture;
    const resource = engine.compilerManager.getCompiler(MODULETYPE.TEXTURE).getResource(config.url, Texture);
    if (resource instanceof Texture) {
      texture = new LoadTexture(resource);
    } else {
      const tempTexture = new Texture(resource);
      texture = new LoadTexture(tempTexture);
    }
    syncObject(config, texture, {
      type: true,
      url: true
    });
    texture.needsUpdate = true;
    return texture;
  },
  dispose(target) {
    target.dispose();
  }
});
const TextureRule = function(notice, compiler) {
  Rule(notice, compiler);
};
class VideoTexture extends Texture {
  constructor(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
    super(
      video,
      mapping,
      wrapS,
      wrapT,
      magFilter,
      minFilter,
      format,
      type,
      anisotropy
    );
    __publicField(this, "isVideoTexture", true);
    this.format = format !== void 0 ? format : RGBFormat;
    this.minFilter = minFilter !== void 0 ? minFilter : LinearFilter;
    this.magFilter = magFilter !== void 0 ? magFilter : LinearFilter;
    this.generateMipmaps = false;
  }
  clone() {
    return new this.constructor(this.image).copy(this);
  }
  update() {
    const video = this.image;
    const hasVideoFrameCallback = "requestVideoFrameCallback" in video;
    if (hasVideoFrameCallback) {
      this.needsUpdate = true;
    } else if (hasVideoFrameCallback === false && video.readyState >= video.HAVE_CURRENT_DATA) {
      this.needsUpdate = true;
    }
  }
}
var VideoTextureProcessor = defineProcessor({
  type: "VideoTexture",
  config: getVideoTextureConfig,
  commands: {
    set: {
      url: urlHanlder,
      $reg: [needUpdateRegCommand]
    }
  },
  create(config, engine) {
    const texture = new VideoTexture(document.createElement("video"));
    if (config.url) {
      urlHanlder({ target: texture, value: config.url, engine });
    }
    syncObject(config, texture, {
      type: true,
      url: true
    });
    texture.needsUpdate = true;
    return texture;
  },
  dispose(target) {
    target.dispose();
  }
});
function TextureExtend(engine) {
  engine.generateLoadTextureConfig = function(url) {
    const resource = this.compilerManager.getCompiler(MODULETYPE.TEXTURE).getResource(url, Texture);
    if (resource instanceof HTMLCanvasElement) {
      return null;
    }
    return generateConfig(CONFIGTYPE.LOADTEXTURE, {
      url,
      flipY: resource.flipY,
      format: resource.format,
      mapping: resource.mapping,
      encoding: resource.encoding,
      minFilter: resource.minFilter,
      magFilter: resource.magFilter
    });
  };
}
var index = {
  type: "texture",
  compiler: TextureCompiler,
  rule: TextureRule,
  processors: [
    CanvasTextureProcessor,
    CubeTextureProcessor,
    ImageTextureProcessor,
    LoadTextureProcessor,
    VideoTextureProcessor
  ],
  extend: TextureExtend
};
export { TextureCompiler, index as default, getCanvasTextureConfig, getCubeTextureConfig, getImageTextureConfig, getLoadTextureConfig, getTextureConfig, getVideoTextureConfig };
