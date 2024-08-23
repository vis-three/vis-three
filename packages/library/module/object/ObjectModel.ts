import {
  CommandParameters,
  Compiler,
  defineModel,
  emptyHandler,
  EngineSupport,
  EventGeneratorManager,
  EVENTNAME,
  Model,
  MODEL_EVENT,
  OBJECT_MODULE,
  RegCommand,
} from "@vis-three/tdcm";
import { ObjectConfig } from "./ObjectConfig";
import { Object3D, Vector3 } from "three";
import { IgnoreAttribute, syncObject } from "@vis-three/utils";

export interface ObjectModelShared {
  eventSymbol: string;
  emptyRaycast: () => void;
}
export interface ObjectModelContext {
  cacheLookAt: {
    target: Vector3 | null;
    updateMatrixWorld: ((focus: boolean) => void) | null;
  };
}

export type ObjectCommandParameters = CommandParameters<
  ObjectConfig,
  Object3D,
  EngineSupport,
  Compiler<EngineSupport>,
  Model<ObjectConfig, Object3D> &
    ObjectModelContext &
    Readonly<ObjectModelShared>
>;

export type ObjectCommandHandler = (
  this: Model<ObjectConfig, Object3D> &
    ObjectModelContext &
    Readonly<ObjectModelShared>,
  params: ObjectCommandParameters
) => void;

const lookAtHandler: ObjectCommandHandler = function ({
  model,
  target,
  config,
  value,
  engine,
}) {
  // 不能自己看自己
  if (config.vid === value) {
    console.warn(`can not set object lookAt itself.`);
    return;
  }

  const cacheData = model.cacheLookAt;

  if (!value) {
    if (!cacheData.updateMatrixWorld) {
      return;
    }

    target.updateMatrixWorld = cacheData.updateMatrixWorld;
    cacheData.target = null;
    cacheData.updateMatrixWorld = null;
    return;
  }

  model.toAsync((finish) => {
    const lookAtTarget = engine.compilerManager.getObjectFromModules<Object3D>(
      OBJECT_MODULE,
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

    cacheData.updateMatrixWorld = updateMatrixWorldFun;
    cacheData.target = lookAtTarget.position;

    target.updateMatrixWorld = (focus: boolean) => {
      updateMatrixWorldFun.call(target, focus);
      target.lookAt(cacheData.target!);
    };

    return true;
  });
};

const addEventHanlder: ObjectCommandHandler = function ({
  model,
  path,
  value,
  engine,
  target,
}) {
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
  const symbol = Symbol.for(model.eventSymbol);
  value[symbol] = fun;

  // 绑定事件
  (<Object3D<any>>target).addEventListener(eventName, fun);
};

const removeEventHandler: ObjectCommandHandler = function ({
  model,
  target,
  path,
  value,
}) {
  const eventName = path[0];
  const fun = value[Symbol.for(model.eventSymbol)];

  if (!fun) {
    console.warn(`event remove can not fun found event in config`, value);
    return;
  }

  target.removeEventListener(eventName, fun!);
  delete value[Symbol.for(model.eventSymbol)];
};

const updateEventHandler: ObjectCommandHandler = function ({
  model,
  target,
  config,
  path,
  engine,
}) {
  // fixed: cover empty array
  if (path.length < 2) {
    return;
  }
  const eventName = path[0];
  const eventConfig = config[path[0]][path[1]];

  const fun = eventConfig[Symbol.for(model.eventSymbol)];

  if (!fun) {
    console.warn(`event remove can not fun found event in config`, eventConfig);
    return;
  }

  target.removeEventListener(eventName, fun!);

  // 生成函数
  const newFun = EventGeneratorManager.generateEvent(eventConfig, engine);

  // 映射缓存
  eventConfig[Symbol.for(model.eventSymbol)] = newFun;

  // 绑定事件
  (<Object3D<any>>target).addEventListener(eventName, newFun);
};

const addChildrenHanlder: ObjectCommandHandler = function ({
  model,
  target,
  config,
  value,
  engine,
}) {
  model.toTrigger("object", (immediate) => {
    const childrenConfig = model.toConfig<ObjectConfig>(value);

    if (!childrenConfig) {
      if (!immediate) {
        console.warn(` can not foud object config in engine: ${value}`);
      }
      return false;
    }

    // children如果有parent先从parent移除
    if (childrenConfig.parent && childrenConfig.parent !== config.vid) {
      const parentConfig = model.toConfig<ObjectConfig>(childrenConfig.parent);

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

    const childrenObject = engine.compilerManager.getObjectFromModules(
      OBJECT_MODULE,
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

    model.toModel(value)?.emit(`${MODEL_EVENT.COMPILED_ATTR}:parent`);
    return true;
  });
};

const removeChildrenHandler: ObjectCommandHandler = function ({
  model,
  target,
  config,
  value,
  engine,
}) {
  const childrenObject = engine.compilerManager.getObjectFromModules(
    OBJECT_MODULE,
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

  model.toModel(value)?.emit(`${MODEL_EVENT.COMPILED_ATTR}:parent`);
};

const raycastHandler: ObjectCommandHandler = function ({
  model,
  target,
  config,
  value,
  engine,
}) {
  if (value) {
    // @ts-ignore
    delete target.raycast;
  } else {
    target.raycast = model.emptyRaycast;
  }
};

export type ObjectModel = Model<ObjectConfig, Object3D> &
  ObjectModelContext &
  Readonly<ObjectModelShared>;

export const defineObjectModel = defineModel.extend<
  ObjectConfig,
  Object3D,
  ObjectModelContext,
  ObjectModelShared,
  EngineSupport,
  Compiler<EngineSupport>,
  <I extends ObjectConfig = ObjectConfig>(params: {
    model: Model<ObjectConfig, Object3D> &
      ObjectModelContext &
      Readonly<ObjectModelShared>;
    target: Object3D;
    config: ObjectConfig;
    filter: IgnoreAttribute<I>;
    engine: EngineSupport;
  }) => void
>({
  shared: {
    eventSymbol: "vis.event",
    emptyRaycast: () => {},
  },
  context() {
    return {
      cacheLookAt: {
        target: null,
        updateMatrixWorld: null,
      },
    };
  },
  commands: {
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
        $reg?: RegCommand<ObjectConfig, Object3D, EngineSupport>[];
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
  },
  create({ model, target, config, engine, filter }) {
    // lookAt
    !filter.lookAt &&
      lookAtHandler.call(model, {
        model,
        target,
        config,
        value: config.lookAt,
        engine,
      } as ObjectCommandParameters);

    // raycast
    !config.raycast && (target.raycast = model.emptyRaycast);

    // children
    config.children.forEach((vid) => {
      addChildrenHanlder.call(model, {
        target,
        config,
        value: vid,
        engine,
      } as ObjectCommandParameters);
    });

    // event
    for (const eventName of Object.values(EVENTNAME)) {
      model.asyncNextTick(() => {
        config[eventName].forEach((event, i) => {
          addEventHanlder.call(model, {
            model,
            target,
            path: [eventName, i.toString()],
            value: event,
            engine,
          } as unknown as ObjectCommandParameters);
        });
        return true;
      });
    }

    syncObject(config, target, {
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
  },
  dispose({ target }) {
    // @ts-ignore
    target._listener = {};
  },
});
