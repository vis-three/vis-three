import { Compiler, Rule, globalAntiShake, OBJECTMODULE, EventGeneratorManager, Bus, COMPILER_EVENT, EVENTNAME, emptyHandler } from "@vis-three/middleware";
import { validate } from "uuid";
import { syncObject } from "@vis-three/utils";
class ObjectCompiler extends Compiler {
  constructor() {
    super();
  }
}
const getObjectConfig = () => {
  return {
    vid: "",
    name: "",
    type: "Object3D",
    castShadow: true,
    receiveShadow: true,
    lookAt: "",
    visible: true,
    matrixAutoUpdate: true,
    renderOrder: 0,
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: {
      x: 1,
      y: 1,
      z: 1
    },
    up: {
      x: 0,
      y: 1,
      z: 0
    },
    parent: "",
    children: [],
    pointerdown: [],
    pointermove: [],
    pointerup: [],
    pointerenter: [],
    pointerleave: [],
    click: [],
    dblclick: [],
    contextmenu: []
  };
};
const ObjectRule = function(input, compiler, validateFun = validate) {
  if (input.key === "parent") {
    return;
  }
  Rule(input, compiler, validateFun);
};
const objectCacheMap = /* @__PURE__ */ new WeakMap();
const lookAtHandler = function({
  target,
  config,
  value,
  engine
}) {
  if (config.vid === value) {
    console.warn(`can not set object lookAt itself.`);
    return;
  }
  let cacheData = objectCacheMap.get(target);
  if (!cacheData) {
    cacheData = { lookAtTarget: null, updateMatrixWorldFun: null };
    objectCacheMap.set(target, cacheData);
  }
  if (!value) {
    if (!cacheData.updateMatrixWorldFun) {
      return;
    }
    target.updateMatrixWorld = cacheData.updateMatrixWorldFun;
    cacheData.lookAtTarget = null;
    cacheData.updateMatrixWorldFun = null;
    return;
  }
  globalAntiShake.exec((finish) => {
    const lookAtTarget = engine.compilerManager.getObjectfromModules(
      OBJECTMODULE,
      value
    );
    if (!lookAtTarget) {
      if (finish) {
        console.warn(
          `lookAt handler can not found this vid mapping object: '${value}'`
        );
      }
      return false;
    }
    const updateMatrixWorldFun = target.updateMatrixWorld;
    cacheData.updateMatrixWorldFun = updateMatrixWorldFun;
    cacheData.lookAtTarget = lookAtTarget.position;
    target.updateMatrixWorld = (focus) => {
      updateMatrixWorldFun.call(target, focus);
      target.lookAt(cacheData.lookAtTarget);
    };
    return true;
  });
};
const eventSymbol = "vis.event";
const addEventHanlder = function({
  target,
  path,
  value,
  engine
}) {
  const eventName = path[0];
  if (!EventGeneratorManager.has(value.name)) {
    console.warn(
      `EventGeneratorManager: can not support this event: ${value.name}`
    );
    return;
  }
  const fun = EventGeneratorManager.generateEvent(value, engine);
  const symbol = Symbol.for(eventSymbol);
  value[symbol] = fun;
  target.addEventListener(eventName, fun);
};
const removeEventHandler = function({
  target,
  path,
  value
}) {
  const eventName = path[0];
  const fun = value[Symbol.for(eventSymbol)];
  if (!fun) {
    console.warn(`event remove can not fun found event in config`, value);
    return;
  }
  target.removeEventListener(eventName, fun);
  delete value[Symbol.for(eventSymbol)];
};
const updateEventHandler = function({
  target,
  config,
  path,
  engine
}) {
  if (path.length < 2) {
    return;
  }
  const eventName = path[0];
  const eventConfig = config[path[0]][path[1]];
  const fun = eventConfig[Symbol.for(eventSymbol)];
  if (!fun) {
    console.warn(`event remove can not fun found event in config`, eventConfig);
    return;
  }
  target.removeEventListener(eventName, fun);
  const newFun = EventGeneratorManager.generateEvent(eventConfig, engine);
  eventConfig[Symbol.for(eventSymbol)] = newFun;
  target.addEventListener(
    eventName,
    newFun
  );
};
const addChildrenHanlder = function({
  target,
  config,
  value,
  engine
}) {
  globalAntiShake.exec((finish) => {
    const childrenConfig = engine.getConfigBySymbol(value);
    if (!childrenConfig) {
      if (finish) {
        console.warn(` can not foud object config in engine: ${value}`);
      }
      return false;
    }
    if (childrenConfig.parent && childrenConfig.parent !== config.vid) {
      const parentConfig = engine.getConfigBySymbol(
        childrenConfig.parent
      );
      if (!parentConfig) {
        if (finish) {
          console.warn(
            ` can not foud object parent config in engine: ${childrenConfig.parent}`
          );
        }
        return false;
      }
      parentConfig.children.splice(parentConfig.children.indexOf(value), 1);
    }
    childrenConfig.parent = config.vid;
    const childrenObject = engine.compilerManager.getObjectfromModules(
      OBJECTMODULE,
      value
    );
    if (!childrenObject) {
      if (finish) {
        console.warn(`can not found this vid in engine: ${value}.`);
      }
      return false;
    }
    target.add(childrenObject);
    childrenObject.updateMatrixWorld(true);
    Bus.compilerEvent.emit(childrenObject, `${COMPILER_EVENT.COMPILE}:parent`);
    return true;
  });
};
const removeChildrenHandler = function({
  target,
  config,
  value,
  engine
}) {
  const childrenObject = engine.compilerManager.getObjectfromModules(
    OBJECTMODULE,
    value
  );
  if (!childrenObject) {
    console.warn(`can not found this vid in engine: ${value}.`);
    return;
  }
  target.remove(childrenObject);
  const childrenConfig = engine.getConfigBySymbol(value);
  if (!childrenConfig) {
    console.warn(`can not found this vid in engine: ${value}.`);
    return;
  }
  childrenConfig.parent = "";
  Bus.compilerEvent.emit(childrenObject, `${COMPILER_EVENT.COMPILE}:parent`);
};
const objectCreate = function(object, config, filter, engine) {
  !filter.lookAt && lookAtHandler({
    target: object,
    config,
    engine,
    value: config.lookAt
  });
  config.children.forEach((vid) => {
    addChildrenHanlder({
      target: object,
      config,
      value: vid,
      engine
    });
  });
  for (const eventName of Object.values(EVENTNAME)) {
    globalAntiShake.nextTick(() => {
      config[eventName].forEach((event, i) => {
        addEventHanlder({
          target: object,
          path: [eventName, i.toString()],
          value: event,
          engine
        });
      });
      return true;
    });
  }
  syncObject(config, object, {
    vid: true,
    type: true,
    lookAt: true,
    parent: true,
    children: true,
    pointerdown: true,
    pointermove: true,
    pointerup: true,
    pointerenter: true,
    pointerleave: true,
    click: true,
    dblclick: true,
    contextmenu: true,
    ...filter
  });
  return object;
};
const objectDispose = function(target) {
  target._listener = {};
};
const objectCommands = {
  add: {
    pointerdown: addEventHanlder,
    pointerup: addEventHanlder,
    pointermove: addEventHanlder,
    pointerenter: addEventHanlder,
    pointerleave: addEventHanlder,
    click: addEventHanlder,
    dblclick: addEventHanlder,
    contextmenu: addEventHanlder,
    children: addChildrenHanlder
  },
  set: {
    lookAt: lookAtHandler,
    pointerdown: updateEventHandler,
    pointerup: updateEventHandler,
    pointermove: updateEventHandler,
    pointerenter: updateEventHandler,
    pointerleave: updateEventHandler,
    click: updateEventHandler,
    dblclick: updateEventHandler,
    contextmenu: updateEventHandler,
    parent: emptyHandler,
    children: {
      $reg: [
        {
          reg: new RegExp(".*"),
          handler: addChildrenHanlder
        }
      ]
    }
  },
  delete: {
    pointerdown: removeEventHandler,
    pointerup: removeEventHandler,
    pointermove: removeEventHandler,
    pointerenter: removeEventHandler,
    pointerleave: removeEventHandler,
    click: removeEventHandler,
    dblclick: removeEventHandler,
    contextmenu: removeEventHandler,
    children: removeChildrenHandler
  }
};
export { ObjectCompiler, ObjectRule, addChildrenHanlder, addEventHanlder, getObjectConfig, lookAtHandler, objectCommands, objectCreate, objectDispose, removeChildrenHandler, removeEventHandler, updateEventHandler };
