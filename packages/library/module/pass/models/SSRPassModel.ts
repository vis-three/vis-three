import { defineModel } from "@vis-three/tdcm";
import { getSSRPassConfig, SSRPassConfig } from "../PassConfig";
import { ComposerEngineSupport, PassCompiler } from "../PassCompiler";
import { SSRPass } from "three/examples/jsm/postprocessing/SSRPass.js";
import { Camera, Color, PlaneGeometry, Scene, WebGLRenderer } from "three";
import { ReflectorForSSRPass } from "three/examples/jsm/objects/ReflectorForSSRPass.js";

export default defineModel<
  SSRPassConfig,
  SSRPass,
  {},
  {
    defaultGroundGeometry: PlaneGeometry;
    setDefaultGroundGeometry: (config: SSRPassConfig) => PlaneGeometry;
    generateGround: (
      config: SSRPassConfig,
      engine: ComposerEngineSupport
    ) => ReflectorForSSRPass;
    disposeGround: (reflector: ReflectorForSSRPass) => void;
  },
  ComposerEngineSupport,
  PassCompiler
>({
  type: "SSRPass",
  config: getSSRPassConfig,
  shared: {
    defaultGroundGeometry: new PlaneGeometry(
      window.innerWidth,
      window.innerHeight
    ),
    setDefaultGroundGeometry(config: SSRPassConfig) {
      const newGeometry = new PlaneGeometry(
        config.width ? config.width : window.innerWidth,
        config.height ? config.height : window.innerHeight
      );

      this.defaultGroundGeometry.copy(newGeometry);
      newGeometry.dispose();

      return this.defaultGroundGeometry;
    },
    generateGround(config: SSRPassConfig, engine: ComposerEngineSupport) {
      const reflector = new ReflectorForSSRPass(
        engine.getObjectBySymbol(config.groudOption.geometry) ||
          this.setDefaultGroundGeometry(config),
        {
          color: new Color(config.groudOption.color).getHex(),
          clipBias: config.groudOption.clipBias,
          textureHeight:
            config.groudOption.textureHeight ||
            engine.dom.offsetWidth * window.devicePixelRatio,
          textureWidth:
            config.groudOption.textureWidth ||
            engine.dom.offsetHeight * window.devicePixelRatio,
          useDepthTexture: true,
        }
      );

      reflector.material.depthWrite = false;
      reflector.raycast = () => {};
      reflector.visible = false;

      if (reflector.geometry === this.defaultGroundGeometry) {
        reflector.rotation.x = -Math.PI / 2;
      }

      const scene = config.scene
        ? engine.getObjectBySymbol(config.scene)
        : engine.scene;

      scene.add(reflector);

      return reflector;
    },
    disposeGround(reflector: ReflectorForSSRPass) {
      reflector.getRenderTarget().dispose();
      reflector.material.dispose();
    },
  },
  commands: {
    set: {
      ground({ model, target, config, value, engine }) {
        if (value && !target.groundReflector) {
          target.groundReflector = model.generateGround(config, engine);
          return;
        }

        if (!value && target.groundReflector) {
          model.disposeGround(target.groundReflector);
          target.groundReflector = null;
        }
      },
      groudOption: {
        geometry({ model, target, config, value, engine }) {
          if (config.ground) {
            if (value) {
              const geometry = engine.getObjectBySymbol(value);
              if (!geometry) {
                console.warn(
                  `SSR pass processor: can not found geometry with: ${value}`
                );
                return;
              }
              target.groundReflector!.geometry = geometry;
            } else {
              target.groundReflector!.geometry =
                model.setDefaultGroundGeometry(config);
            }
          }
        },
      },
      opacity({ target, value }) {
        if (target.groundReflector) {
          target.groundReflector.opacity = value;
          target.opacity = value;
        } else {
          target.opacity = value;
        }
      },
      maxDistance({ target, value }) {
        if (target.groundReflector) {
          target.groundReflector.maxDistance = value;
          target.maxDistance = value;
        } else {
          target.maxDistance = value;
        }
      },
    },
  },
  create({ model, config, engine }) {
    const pixelRatio = window.devicePixelRatio;

    const pass = new SSRPass({
      renderer: config.renderer
        ? (engine.getObjectBySymbol(config.renderer) as WebGLRenderer)
        : engine.webGLRenderer,
      scene: config.scene
        ? (engine.getObjectBySymbol(config.scene) as Scene)
        : engine.scene,
      camera: config.camera
        ? (engine.getObjectBySymbol(config.camera) as Camera)
        : engine.camera,
      width: config.width ? config.width : engine.dom.offsetWidth * pixelRatio,
      height: config.height
        ? config.height
        : engine.dom.offsetHeight * pixelRatio,
      groundReflector: config.ground
        ? model.generateGround(config, engine)
        : null,
      selects: config.selects.map((vid) => engine.getObjectBySymbol(vid)),
      //@ts-ignore
      bouncing: config.bouncing,
    });

    // @ts-ignore
    pass.infiniteThick = config.infiniteThick;
    pass.opacity = config.opacity;
    pass.output = config.output;
    pass.maxDistance = config.maxDistance;
    pass.thickness = config.thickness;

    if (pass.groundReflector) {
      const reflector = pass.groundReflector;
      reflector.opacity = pass.opacity;
      reflector.maxDistance = pass.maxDistance;
    }

    return pass;
  },
  dispose({ model, target }) {
    target.groundReflector && model.disposeGround(target.groundReflector);
    target.groundReflector = null;
    target.dispose();
    model.defaultGroundGeometry.dispose();
    //@ts-ignore
    defaultGroundGeometry = undefined;
  },
});
