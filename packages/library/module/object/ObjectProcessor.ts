import {
  Bus,
  COMPILER_EVENT,
  emptyHandler,
  EngineSupport,
  EventGeneratorManager,
  EVENTNAME,
  globalAntiShake,
  globalObjectModuleTrigger,
  MODULETYPE,
  ObjectEvent,
  OBJECTMODULE,
  ProcessorCommands,
  ProcessParams,
  RegCommand,
} from "@vis-three/middleware";
import { IgnoreAttribute, syncObject } from "@vis-three/utils";
import { Object3D, Vector3 } from "three";
import { ObjectCompiler } from "./ObjectCompiler";
import { ObjectConfig } from "./ObjectConfig";

export interface ObjectCacheData {
  lookAtTarget: Vector3 | null;
  updateMatrixWorldFun: ((focus: boolean) => void) | null;
}

const objectCacheMap = new WeakMap<Object3D, ObjectCacheData>();

// 物体的lookAt方法
export const lookAtHandler = function <
  C extends ObjectConfig,
  O extends Object3D
>({
  target,
  config,
  value,
  engine,
}: ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>) {
  // 不能自己看自己
  if (config.vid === value) {
    console.warn(`can not set object lookAt itself.`);
    return;
  }

  let cacheData = objectCacheMap.get(target)!;

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
    ) as Object3D;

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

    target.updateMatrixWorld = (focus: boolean) => {
      updateMatrixWorldFun.call(target, focus);
      target.lookAt(cacheData!.lookAtTarget!);
    };

    return true;
  });
};

const eventSymbol = "vis.event";

// 添加事件
export const addEventHanlder = function <
  C extends ObjectConfig,
  O extends Object3D
>({
  target,
  path,
  value,
  engine,
}: ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>) {
  const eventName = path[0];

  if (!EventGeneratorManager.has(value.name)) {
    console.warn(
      `EventGeneratorManager: can not support this event: ${value.name}`
    );
    return;
  }

  // 生成函数
  const fun = EventGeneratorManager.generateEvent(value, engine);

  // 映射缓存
  const symbol = Symbol.for(eventSymbol);
  value[symbol] = fun;

  // 绑定事件
  (<Object3D<ObjectEvent>>(<unknown>target)).addEventListener(eventName, fun);
};

// 移除事件
export const removeEventHandler = function <
  C extends ObjectConfig,
  O extends Object3D
>({
  target,
  path,
  value,
}: ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>) {
  const eventName = path[0];
  const fun = value[Symbol.for(eventSymbol)];

  if (!fun) {
    console.warn(`event remove can not fun found event in config`, value);
    return;
  }

  target.removeEventListener(eventName, fun!);
  delete value[Symbol.for(eventSymbol)];
};

// 更新事件
export const updateEventHandler = function <
  C extends ObjectConfig,
  O extends Object3D
>({
  target,
  config,
  path,
  engine,
}: ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>) {
  // fixed: cover empty array
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

  target.removeEventListener(eventName, fun!);

  // 生成函数
  const newFun = EventGeneratorManager.generateEvent(eventConfig, engine);

  // 映射缓存
  eventConfig[Symbol.for(eventSymbol)] = newFun;

  // 绑定事件
  (<Object3D<ObjectEvent>>(<unknown>target)).addEventListener(
    eventName,
    newFun
  );
};

// 添加子项
export const addChildrenHanlder = function <
  C extends ObjectConfig,
  O extends Object3D
>({
  target,
  config,
  value,
  engine,
}: ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>) {
  globalObjectModuleTrigger.registerExec((immediate) => {
    const childrenConfig = engine.getConfigBySymbol(value) as ObjectConfig;
    if (!childrenConfig) {
      if (!immediate) {
        console.warn(` can not foud object config in engine: ${value}`);
      }
      return false;
    }

    // children如果有parent先从parent移除
    if (childrenConfig.parent && childrenConfig.parent !== config.vid) {
      const parentConfig = engine.getConfigBySymbol(
        childrenConfig.parent
      ) as ObjectConfig;

      if (!parentConfig) {
        if (!immediate) {
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
    ) as Object3D;

    if (!childrenObject) {
      if (!immediate) {
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

// 移除子项
export const removeChildrenHandler = function <
  C extends ObjectConfig,
  O extends Object3D
>({
  target,
  config,
  value,
  engine,
}: ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>) {
  const childrenObject = engine.compilerManager.getObjectfromModules(
    OBJECTMODULE,
    value
  ) as Object3D;

  if (!childrenObject) {
    console.warn(`can not found this vid in engine: ${value}.`);
    return;
  }

  target.remove(childrenObject);

  // 更新children对象的parent
  const childrenConfig = engine.getConfigBySymbol(value) as ObjectConfig;
  if (!childrenConfig) {
    console.warn(`can not found this vid in engine: ${value}.`);
    return;
  }

  childrenConfig.parent = "";

  Bus.compilerEvent.emit(childrenObject, `${COMPILER_EVENT.COMPILE}:parent`);
};

// 射线方法
const emptyRaycast = function () {};

export const raycastHandler = function <
  C extends ObjectConfig,
  O extends Object3D
>({
  target,
  config,
  value,
  engine,
}: ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>) {
  if (value) {
    // @ts-ignore
    delete target.raycast;
  } else {
    target.raycast = emptyRaycast;
  }
};

export const objectCreate = function <
  C extends ObjectConfig,
  O extends Object3D
>(object: O, config: C, filter: IgnoreAttribute<C>, engine: EngineSupport): O {
  // lookAt
  !filter.lookAt &&
    lookAtHandler({
      target: object,
      config,
      engine,
      value: config.lookAt,
    } as ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>);

  // raycast
  !config.raycast && (object.raycast = emptyRaycast);

  // children
  config.children.forEach((vid) => {
    addChildrenHanlder({
      target: object,
      config,
      value: vid,
      engine,
    } as ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>);
  });

  // event
  for (const eventName of Object.values(EVENTNAME)) {
    globalAntiShake.nextTick(() => {
      config[eventName].forEach((event, i) => {
        addEventHanlder({
          target: object,
          path: [eventName, i.toString()],
          value: event,
          engine,
        } as unknown as ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>);
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
    raycast: true,
    pointerdown: true,
    pointermove: true,
    pointerup: true,
    pointerenter: true,
    pointerleave: true,
    click: true,
    dblclick: true,
    contextmenu: true,
    ...filter,
  });

  return object;
};

export const objectDispose = function <O extends Object3D>(target: O) {
  // @ts-ignore
  target._listener = {};
};

export type ObjectCommands<
  C extends ObjectConfig,
  T extends Object3D
> = ProcessorCommands<C, T, EngineSupport, ObjectCompiler<C, T>>;

export const objectCommands: ObjectCommands<ObjectConfig, Object3D> = {
  add: {
    pointerdown: addEventHanlder,
    pointerup: addEventHanlder,
    pointermove: addEventHanlder,
    pointerenter: addEventHanlder,
    pointerleave: addEventHanlder,
    click: addEventHanlder,
    dblclick: addEventHanlder,
    contextmenu: addEventHanlder,
    children: addChildrenHanlder,
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
    raycast: raycastHandler,
    children: {
      $reg: [
        {
          reg: new RegExp(".*"),
          handler: addChildrenHanlder,
        },
      ],
    } as Array<undefined> & {
      $reg?: RegCommand<
        ObjectConfig,
        Object3D,
        EngineSupport,
        ObjectCompiler<ObjectConfig, Object3D>
      >[];
    },
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
    children: removeChildrenHandler,
  },
};
