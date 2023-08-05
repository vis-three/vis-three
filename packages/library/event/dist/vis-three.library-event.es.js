import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { Easing, Tween } from "@tweenjs/tween.js";
export { Tween } from "@tweenjs/tween.js";
import { Color, Material, Object3D, Euler, Vector3, Matrix4 } from "three";
const config$h = {
  name: "addClass",
  params: {
    target: "",
    className: "",
    delay: 0
  }
};
const generator$h = function(engine, config2) {
  const params = config2.params;
  const targets = [];
  if (params.target === "all") {
    engine.scene.traverse((object) => {
      if (object instanceof CSS3DObject) {
        targets.push(object);
      }
    });
  } else if (Array.isArray(params.target)) {
    params.target.forEach((symbol) => {
      const target = engine.getObjectBySymbol(symbol);
      if (!target) {
        console.warn(
          `basic event AddClass: can not found vid object: ${params.target}`
        );
      } else {
        targets.push(target);
      }
    });
  } else {
    const target = engine.getObjectBySymbol(params.target);
    if (!target) {
      console.warn(
        `basic event AddClass: can not found vid object: ${params.target}`
      );
      return () => {
      };
    }
    if (!(target instanceof CSS3DObject)) {
      console.warn(`basic event AddClass: object is not a CSS3DObject.`);
      return () => {
      };
    }
    targets.push(target);
  }
  if (!targets.length) {
    console.warn(
      `basic event AddClass: can not found vid object: ${params.target}`
    );
    return () => {
    };
  }
  return () => {
    setTimeout(() => {
      targets.forEach((target) => {
        target.element.classList.add(params.className);
      });
    }, params.delay);
  };
};
var addClass = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$h,
  generator: generator$h
}, Symbol.toStringTag, { value: "Module" }));
const config$g = {
  name: "changeCamera",
  params: {
    camera: "",
    delay: 0
  }
};
const generator$g = function(engine, config2) {
  const params = config2.params;
  return () => {
    setTimeout(() => {
      engine.setCameraBySymbol(params.camera);
    }, params.delay);
  };
};
var changeCamera = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$g,
  generator: generator$g
}, Symbol.toStringTag, { value: "Module" }));
const config$f = {
  name: "changeScene",
  params: {
    scene: "Scene",
    delay: 0
  }
};
const generator$f = function(engine, config2) {
  const params = config2.params;
  return () => {
    setTimeout(() => {
      engine.setSceneBySymbol(params.scene);
    }, params.delay);
  };
};
var changeScene = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$f,
  generator: generator$f
}, Symbol.toStringTag, { value: "Module" }));
const config$e = {
  name: "openWindow",
  params: {
    url: ""
  }
};
const generator$e = function(engine, config2) {
  return () => {
    window.open(config2.params.url);
  };
};
var openWindow = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$e,
  generator: generator$e
}, Symbol.toStringTag, { value: "Module" }));
const config$d = {
  name: "switchAnimate",
  params: {
    target: "",
    toggle: "auto",
    delay: 0
  }
};
const generator$d = function(engine, config2) {
  const params = config2.params;
  const target = engine.getConfigBySymbol(params.target);
  if (!target) {
    console.warn(
      `basic event switchAnimate: can not found vid config: ${params.target}`
    );
    return () => {
    };
  }
  return () => {
    setTimeout(() => {
      if (params.toggle === "auto") {
        target.play != target.play;
        return;
      }
      if (params.toggle === "off") {
        target.play = false;
        return;
      }
      if (params.toggle === "on") {
        target.play = true;
        return;
      }
    }, params.delay);
  };
};
var switchAnimate = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$d,
  generator: generator$d
}, Symbol.toStringTag, { value: "Module" }));
const config$c = {
  name: "visibleObject",
  params: {
    target: "",
    visible: true,
    delay: 0
  }
};
const generator$c = function(engine, config2) {
  const params = config2.params;
  const target = engine.getObjectBySymbol(params.target);
  if (!target) {
    console.warn(
      `basic event visibleObject: can not found vid object: ${params.target}`
    );
    return () => {
    };
  }
  return () => {
    setTimeout(() => {
      target.visible = params.visible;
    }, params.delay);
  };
};
var visibleObject = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$c,
  generator: generator$c
}, Symbol.toStringTag, { value: "Module" }));
var TIMINGFUNCTION = /* @__PURE__ */ ((TIMINGFUNCTION2) => {
  TIMINGFUNCTION2["EASING_LINEAR_NONE"] = "EASING_LINEAR_NONE";
  TIMINGFUNCTION2["EASING_QUARTIC_IN"] = "EASING_QUARTIC_IN";
  TIMINGFUNCTION2["EASING_QUARTIC_OUT"] = "EASING_QUARTIC_OUT";
  TIMINGFUNCTION2["EASING_QUARTIC_INOUT"] = "EASING_QUARTIC_INOUT";
  TIMINGFUNCTION2["EASING_QUADRATIC_IN"] = "EASING_QUADRATIC_IN";
  TIMINGFUNCTION2["EASING_QUADRATIC_OUT"] = "EASING_QUADRATIC_OUT";
  TIMINGFUNCTION2["EASING_QUADRATIC_INOUT"] = "EASING_QUADRATIC_INOUT";
  return TIMINGFUNCTION2;
})(TIMINGFUNCTION || {});
const timingFunction = {
  EASING_LINEAR_NONE: Easing.Linear.None,
  EASING_QUARTIC_IN: Easing.Quartic.In,
  EASING_QUARTIC_OUT: Easing.Quartic.Out,
  EASING_QUARTIC_INOUT: Easing.Quartic.InOut,
  EASING_QUADRATIC_IN: Easing.Quadratic.In,
  EASING_QUADRATIC_OUT: Easing.Quadratic.Out,
  EASING_QUADRATIC_INOUT: Easing.Quadratic.InOut
};
const config$b = {
  name: "colorChange",
  params: {
    target: "",
    attribute: "color",
    color: "rgb(255, 255, 255)",
    delay: 0,
    duration: 500,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$b = function(engine, config2) {
  const params = config2.params;
  const material = engine.getObjectBySymbol(params.target);
  if (!material) {
    console.warn(
      `real time animation ColorChange: can not found vid material: ${params.target}`
    );
    return () => {
    };
  }
  if (!material[params.attribute] || !(material[params.attribute] instanceof Color)) {
    console.warn(
      `real time animation ColorChange: material attribute is illeage: ${params.attribute}`
    );
    return () => {
    };
  }
  const supportData = engine.getConfigBySymbol(params.target);
  if (!supportData) {
    console.warn(
      `real time animation ColorChange: can not found material config: ${params.target}`
    );
    return () => {
    };
  }
  const color = new Color(params.color);
  const renderManager = engine.renderManager;
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const tween = new Tween(material[params.attribute]).to({
      r: color.r,
      g: color.g,
      b: color.b
    }).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData[params.attribute] = params.color;
      animating = false;
    });
  };
};
var colorChange = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$b,
  generator: generator$b
}, Symbol.toStringTag, { value: "Module" }));
const config$a = {
  name: "fadeObject",
  params: {
    target: "",
    direction: "out",
    delay: 0,
    duration: 300,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
    visible: true
  }
};
const generator$a = function(engine, config2) {
  const params = config2.params;
  const target = engine.getObjectBySymbol(params.target);
  if (!target) {
    console.warn(
      `real time animation fadeObject: can not found vid object: ${params.target}`
    );
    return () => {
    };
  }
  const objectConfig = engine.getObjectConfig(target);
  if (!objectConfig.material) {
    console.warn(
      `real time animation fadeObject: target can not support fade: ${params.target}`
    );
    return () => {
    };
  }
  const materialList = [];
  const materialConfigList = [];
  const materialSymbolList = Array.isArray(objectConfig.material) ? [].concat(objectConfig.material) : [objectConfig.material];
  for (const vid of materialSymbolList) {
    const material = engine.getObjectBySymbol(vid);
    const materialConfig = engine.getConfigBySymbol(vid);
    if (!(material instanceof Material)) {
      console.error(
        `real time animation fadeObject: object config material is not instanceof Material: ${vid}`
      );
      continue;
    }
    if (!materialConfig) {
      console.error(
        `real time animation fadeObject: object config material can not found config: ${vid}`
      );
      continue;
    }
    materialList.push(material);
    materialConfigList.push(materialConfig);
  }
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const renderManager = engine.renderManager;
    objectConfig.visible = true;
    materialList.forEach((material, i, arr) => {
      material.visible = true;
      material.transparent = true;
      material.opacity = params.direction === "in" ? 0 : 1;
      material.needsUpdate = true;
      const tween = new Tween(material).to({
        opacity: params.direction === "in" ? 1 : 0
      }).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
      const renderFun = (event) => {
        tween.update();
      };
      renderManager.addEventListener("render", renderFun);
      tween.onComplete(() => {
        renderManager.removeEventListener("render", renderFun);
        if (params.direction === "out" && params.visible) {
          materialConfigList[i].visible = false;
          objectConfig.visible = false;
        } else if (params.direction === "in" && params.visible) {
          materialConfigList[i].visible = true;
          objectConfig.visible = true;
        }
        materialConfigList[i].opacity = params.direction === "in" ? 1 : 0;
        animating = false;
      });
    });
  };
};
var fadeObject = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$a,
  generator: generator$a
}, Symbol.toStringTag, { value: "Module" }));
const config$9 = {
  name: "focusObject",
  params: {
    target: "",
    camera: "",
    space: "world",
    offset: {
      x: 0,
      y: 0,
      z: 20
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
    back: true
  }
};
const generator$9 = function(engine, config2) {
  const params = config2.params;
  const target = engine.getObjectBySymbol(params.target);
  const orbTarget = engine.orbitControls.target;
  if (!target) {
    console.warn(
      `real time animation focusObject: can not found vid object: ${params.target}`
    );
    return () => {
    };
  }
  if (!(target instanceof Object3D)) {
    console.warn(
      `real time animation focusObject: vid object is not a class of THREE.Object3D: ${params.target}`
    );
    return () => {
    };
  }
  let animating = false;
  const cacheEuler = new Euler();
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    let camera = engine.camera;
    if (params.camera) {
      camera = engine.getObjectBySymbol(params.camera);
      if (!camera) {
        camera = engine.camera;
        console.warn(
          `real time animation focusObject: can not found camera config: ${params.camera}`
        );
      }
    }
    const cameraConfig = engine.getObjectConfig(camera);
    const orb = engine.orbitControls && engine.orbitControls.object === camera;
    if (!cameraConfig) {
      console.warn(`engine current camera can not found config.`);
    }
    const renderManager = engine.renderManager;
    let position = {
      x: target.matrixWorld.elements[12] + params.offset.x,
      y: target.matrixWorld.elements[13] + params.offset.y,
      z: target.matrixWorld.elements[14] + params.offset.z
    };
    const backPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };
    if (params.space === "local") {
      const vector3 = new Vector3(
        params.offset.x,
        params.offset.y,
        params.offset.z
      ).applyEuler(cacheEuler.setFromRotationMatrix(target.matrixWorld));
      position = {
        x: target.matrixWorld.elements[12] + vector3.x,
        y: target.matrixWorld.elements[13] + vector3.y,
        z: target.matrixWorld.elements[14] + vector3.z
      };
    }
    const positionTween = new Tween(camera.position).to(position).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    let upTween;
    const backUp = {
      x: camera.up.x,
      y: camera.up.y,
      z: camera.up.z
    };
    if (params.space === "local") {
      const upVector3 = new Vector3(0, 1, 0).applyEuler(
        cacheEuler.setFromRotationMatrix(target.matrixWorld)
      );
      upTween = new Tween(camera.up).to({
        x: upVector3.x,
        y: upVector3.y,
        z: upVector3.z
      }).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    }
    let orbTween;
    const backOrb = {
      x: orbTarget.x,
      y: orbTarget.y,
      z: orbTarget.z
    };
    if (orb) {
      orbTween = new Tween(orbTarget).to({
        x: target.matrixWorld.elements[12],
        y: target.matrixWorld.elements[13],
        z: target.matrixWorld.elements[14]
      }).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    }
    let renderFun;
    if (orb && params.space === "local") {
      renderFun = (event) => {
        positionTween.update();
        upTween.update();
        orbTween.update();
      };
    } else if (orb) {
      renderFun = (event) => {
        positionTween.update();
        orbTween.update();
      };
    } else if (params.space === "local") {
      renderFun = (event) => {
        positionTween.update();
        upTween.update();
      };
    } else {
      renderFun = (event) => {
        positionTween.update();
      };
    }
    renderManager.addEventListener("render", renderFun);
    positionTween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      if (cameraConfig) {
        cameraConfig.position.x = position.x;
        cameraConfig.position.y = position.y;
        cameraConfig.position.z = position.z;
      }
      animating = false;
      if (params.back) {
        const backFun = () => {
          const positionTween2 = new Tween(camera.position).to(backPosition).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
          let upTween2;
          if (params.space === "local") {
            upTween2 = new Tween(camera.up).to(backUp).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
          }
          let orbTween2;
          if (orb) {
            orbTween2 = new Tween(orbTarget).to(backOrb).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
          }
          const renderFun2 = (event) => {
            positionTween2.update();
            upTween2 && upTween2.update();
            orbTween2 && orbTween2.update();
          };
          positionTween2.onComplete(() => {
            renderManager.removeEventListener(
              "render",
              renderFun2
            );
          });
          renderManager.addEventListener("render", renderFun2);
          document.removeEventListener("dblclick", backFun);
        };
        document.addEventListener("dblclick", backFun);
      }
    });
  };
};
var focusObject = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$9,
  generator: generator$9
}, Symbol.toStringTag, { value: "Module" }));
const config$8 = {
  name: "moveFromTo",
  params: {
    target: "",
    from: {
      x: 0,
      y: 0,
      z: 0
    },
    to: {
      x: 10,
      y: 10,
      z: 10
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$8 = function(engine, config2) {
  const params = config2.params;
  const compiler = engine.compilerManager;
  const object = compiler.getObjectBySymbol(params.target);
  if (!object) {
    console.warn(
      `real time animation moveTO: can not found vid object: ${params.target}`
    );
    return () => {
    };
  }
  const renderManager = engine.renderManager;
  const supportData = engine.dataSupportManager.getConfigBySymbol(
    params.target
  );
  if (!supportData) {
    console.warn(`can not found object config: ${params.target}`);
    return () => {
    };
  }
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    object.position.set(params.from.x, params.from.y, params.from.z);
    object.updateMatrix();
    object.updateMatrixWorld();
    const tween = new Tween(object.position).to(params.to).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.position.x = params.to.x;
      supportData.position.y = params.to.y;
      supportData.position.z = params.to.z;
      animating = false;
    });
  };
};
var moveFromTo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$8,
  generator: generator$8
}, Symbol.toStringTag, { value: "Module" }));
const config$7 = {
  name: "moveSpacing",
  params: {
    target: "",
    spacing: {
      x: 10,
      y: 10,
      z: 10
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$7 = function(engine, config2) {
  const params = config2.params;
  const object = engine.getObjectBySymbol(params.target);
  if (!object) {
    console.warn(`can not found vid object: ${params.target}`);
    return () => {
    };
  }
  if (!(object instanceof Object3D)) {
    console.warn(`object is not instanceof Object3D: ${params.target}`);
    return () => {
    };
  }
  const renderManager = engine.renderManager;
  const supportData = engine.getConfigBySymbol(params.target);
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const position = {
      x: object.position.x + params.spacing.x,
      y: object.position.y + params.spacing.y,
      z: object.position.z + params.spacing.z
    };
    const tween = new Tween(object.position).to(position).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.position.x = position.x;
      supportData.position.y = position.y;
      supportData.position.z = position.z;
      animating = false;
    });
  };
};
var moveSpacing = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$7,
  generator: generator$7
}, Symbol.toStringTag, { value: "Module" }));
const config$6 = {
  name: "moveTo",
  params: {
    target: "",
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$6 = function(engine, config2) {
  const params = config2.params;
  const compiler = engine.compilerManager;
  const object = compiler.getObjectBySymbol(params.target);
  if (!object) {
    console.warn(
      `real time animation moveTO: can not found vid object: ${params.target}`
    );
    return () => {
    };
  }
  const renderManager = engine.renderManager;
  const supportData = engine.dataSupportManager.getConfigBySymbol(
    params.target
  );
  if (!supportData) {
    console.warn(`can not found object config: ${params.target}`);
    return () => {
    };
  }
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const tween = new Tween(object.position).to(params.position).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.position.x = params.position.x;
      supportData.position.y = params.position.y;
      supportData.position.z = params.position.z;
      animating = false;
    });
  };
};
var moveTo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$6,
  generator: generator$6
}, Symbol.toStringTag, { value: "Module" }));
const config$5 = {
  name: "moveToObject",
  params: {
    target: "",
    to: "",
    offset: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$5 = function(engine, config2) {
  const params = config2.params;
  const compiler = engine.compilerManager;
  const object = compiler.getObjectBySymbol(params.target);
  const toObject = compiler.getObjectBySymbol(params.to);
  if (!object) {
    console.warn(
      `real time animation MoveToObject: can not found vid object: ${params.target}`
    );
    return () => {
    };
  }
  if (!toObject) {
    console.warn(
      `real time animation MoveToObject: can not found vid object: ${params.target}`
    );
    return () => {
    };
  }
  const renderManager = engine.renderManager;
  const supportData = engine.dataSupportManager.getConfigBySymbol(
    params.target
  );
  if (!supportData) {
    console.warn(`can not found object config: ${params.target}`);
    return () => {
    };
  }
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const position = {
      x: toObject.position.x + params.offset.x,
      y: toObject.position.y + params.offset.y,
      z: toObject.position.z + params.offset.z
    };
    const tween = new Tween(object.position).to(position).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.position.x = position.x;
      supportData.position.y = position.y;
      supportData.position.z = position.z;
      animating = false;
    });
  };
};
var moveToObject = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$5,
  generator: generator$5
}, Symbol.toStringTag, { value: "Module" }));
const config$4 = {
  name: "orbitTargetMove",
  params: {
    target: "",
    offset: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$4 = function(engine, config2) {
  const params = config2.params;
  engine.compilerManager;
  if (!engine.orbitControls) {
    console.warn(
      `real time animation orbitTargetMove: engine can not install orbitControls.`
    );
    return () => {
    };
  }
  const renderManager = engine.renderManager;
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    let position = params.offset;
    if (params.target) {
      const object = engine.getObjectBySymbol(params.target);
      if (!object) {
        console.warn(
          `real time animation orbitTargetMove: can not found vid object: ${params.target}`
        );
      } else {
        position = {
          x: object.matrixWorld.elements[12] + position.x,
          y: object.matrixWorld.elements[13] + position.y,
          z: object.matrixWorld.elements[14] + position.z
        };
      }
    }
    const tween = new Tween(engine.orbitControls.target).to(position).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      animating = false;
    });
  };
};
var orbitTargetMove = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$4,
  generator: generator$4
}, Symbol.toStringTag, { value: "Module" }));
const config$3 = {
  name: "rotationTo",
  params: {
    target: "",
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$3 = function(engine, config2) {
  const params = config2.params;
  const compiler = engine.compilerManager;
  const object = compiler.getObjectBySymbol(params.target);
  if (!object) {
    console.warn(
      `real time animation moveTO: can not found vid object: ${params.target}`
    );
    return () => {
    };
  }
  const renderManager = engine.renderManager;
  const supportData = engine.dataSupportManager.getConfigBySymbol(
    params.target
  );
  if (!supportData) {
    console.warn(`can not found object config: ${params.target}`);
    return () => {
    };
  }
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const tween = new Tween(object.rotation).to(params.rotation).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.rotation.x = params.rotation.x;
      supportData.rotation.y = params.rotation.y;
      supportData.rotation.z = params.rotation.z;
      animating = false;
    });
  };
};
var rotationTo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$3,
  generator: generator$3
}, Symbol.toStringTag, { value: "Module" }));
const config$2 = {
  name: "showToCamera",
  params: {
    target: "",
    offset: {
      x: 0,
      y: 0,
      z: -30
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
    back: true
  }
};
const generator$2 = function(engine, config2) {
  const params = config2.params;
  const target = engine.getObjectBySymbol(params.target);
  const targetConfig = engine.getConfigBySymbol(params.target);
  const camera = engine.camera;
  if (!target) {
    console.warn(
      `real time animation showToCamera: can not found vid object: ${params.target}`
    );
    return () => {
    };
  }
  if (!target) {
    console.warn(
      `real time animation showToCamera: can not found vid config: ${params.target}`
    );
    return () => {
    };
  }
  if (!(target instanceof Object3D)) {
    console.warn(
      `real time animation showToCamera: vid object is not a class of THREE.Object3D: ${params.target}`
    );
    return () => {
    };
  }
  const matrix4 = new Matrix4();
  const euler = new Euler();
  const vector3 = new Vector3();
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const renderManager = engine.renderManager;
    vector3.set(params.offset.x, params.offset.y, params.offset.z).applyEuler(camera.rotation);
    vector3.set(
      camera.position.x + vector3.x,
      camera.position.y + vector3.y,
      camera.position.z + vector3.z
    );
    matrix4.lookAt(camera.position, vector3, camera.up);
    euler.setFromRotationMatrix(matrix4);
    const cachePosition = {
      x: target.position.x,
      y: target.position.y,
      z: target.position.z
    };
    const cacheRotation = {
      x: target.rotation.x,
      y: target.rotation.y,
      z: target.rotation.z
    };
    const positionTween = new Tween(target.position).to({
      x: vector3.x,
      y: vector3.y,
      z: vector3.z
    }).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const rotationTween = new Tween(target.rotation).to({
      x: euler.x,
      y: euler.y,
      z: euler.z
    }).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      positionTween.update();
      rotationTween.update();
    };
    renderManager.addEventListener("render", renderFun);
    positionTween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      targetConfig.position.x = vector3.x;
      targetConfig.position.y = vector3.y;
      targetConfig.position.z = vector3.z;
      targetConfig.rotation.x = euler.x;
      targetConfig.rotation.y = euler.y;
      targetConfig.rotation.z = euler.z;
      animating = false;
      if (params.back) {
        const backFun = () => {
          const positionTween2 = new Tween(target.position).to(cachePosition).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
          const rotationTween2 = new Tween(target.rotation).to(cacheRotation).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
          const renderFun2 = (event) => {
            positionTween2.update();
            rotationTween2.update();
          };
          positionTween2.onComplete(() => {
            renderManager.removeEventListener("render", renderFun2);
            targetConfig.position.x = cachePosition.x;
            targetConfig.position.y = cachePosition.y;
            targetConfig.position.z = cachePosition.z;
            targetConfig.rotation.x = cacheRotation.x;
            targetConfig.rotation.y = cacheRotation.y;
            targetConfig.rotation.z = cacheRotation.z;
          });
          renderManager.addEventListener("render", renderFun2);
          document.removeEventListener("dblclick", backFun);
        };
        document.addEventListener("dblclick", backFun);
      }
    });
  };
};
var showToCamera = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$2,
  generator: generator$2
}, Symbol.toStringTag, { value: "Module" }));
const config$1 = {
  name: "upTo",
  params: {
    target: "",
    up: {
      x: 0,
      y: 1,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$1 = function(engine, config2) {
  const params = config2.params;
  const compiler = engine.compilerManager;
  const object = compiler.getObjectBySymbol(params.target);
  if (!object) {
    console.warn(
      `real time animation upTo: can not found vid object: ${params.target}`
    );
    return () => {
    };
  }
  const renderManager = engine.renderManager;
  const supportData = engine.dataSupportManager.getConfigBySymbol(
    params.target
  );
  if (!supportData) {
    console.warn(`can not found object config: ${params.target}`);
    return () => {
    };
  }
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const tween = new Tween(object.up).to(params.up).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.up.x = params.up.x;
      supportData.up.y = params.up.y;
      supportData.up.z = params.up.z;
      animating = false;
    });
  };
};
var upTo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: config$1,
  generator: generator$1
}, Symbol.toStringTag, { value: "Module" }));
const config = {
  name: "vector3To",
  params: {
    target: "",
    attribute: ".position",
    props: {
      x: "x",
      y: "y",
      z: "z"
    },
    delay: 0,
    duration: 500,
    to: {},
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator = function(engine, config2) {
  var _a, _b, _c;
  const params = config2.params;
  const object = engine.compilerManager.getObjectBySymbol(params.target);
  if (!object) {
    console.warn(
      `real time animation vector3To: can not found vid object: ${params.target}`
    );
    return () => {
    };
  }
  const renderManager = engine.renderManager;
  let supportData = engine.dataSupportManager.getConfigBySymbol(params.target);
  if (!supportData) {
    console.warn(
      `real time animation vector3To: can not found object config: ${params.target}`
    );
    return () => {
    };
  }
  const attributeList = params.attribute.split(".");
  attributeList.shift();
  let targetObject = object;
  for (const key of attributeList) {
    if (targetObject[key] === void 0) {
      console.error(
        `real time animation vector3To: object can not support key: ${key}`,
        object
      );
      return () => {
      };
    }
    targetObject = targetObject[key];
    supportData = supportData[key];
  }
  const props = params.props;
  if (!(props.x in targetObject) || !(props.y in targetObject) || !(props.z in targetObject)) {
    console.error(
      `real time animation vector3To: object can not support props:`,
      targetObject,
      props
    );
    return () => {
    };
  }
  if (!(props.x in supportData) || !(props.y in supportData) || !(props.z in supportData)) {
    console.error(
      `real time animation vector3To: config can not support props:`,
      supportData,
      props
    );
    return () => {
    };
  }
  const toObject = {
    x: (_a = params.to.x) != null ? _a : targetObject[props.x],
    y: (_b = params.to.y) != null ? _b : targetObject[props.y],
    z: (_c = params.to.z) != null ? _c : targetObject[props.z]
  };
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const tween = new Tween(targetObject).to(toObject).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData[props.x] = toObject.x;
      supportData[props.y] = toObject.y;
      supportData[props.z] = toObject.z;
      animating = false;
    });
  };
};
var vector3To = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config,
  generator
}, Symbol.toStringTag, { value: "Module" }));
var index = {
  addClass,
  changeCamera,
  changeScene,
  openWindow,
  switchAnimate,
  visibleObject,
  colorChange,
  fadeObject,
  focusObject,
  moveFromTo,
  moveSpacing,
  moveTo,
  moveToObject,
  orbitTargetMove,
  rotationTo,
  showToCamera,
  upTo,
  vector3To
};
export { TIMINGFUNCTION, index as default, timingFunction };
