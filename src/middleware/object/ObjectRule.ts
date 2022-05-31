import { Object3D } from "three";
import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { EVENTNAME } from "../../manager/EventManager";
import { UNIQUESYMBOL } from "../constants/UNIQUESYMBOL";
import { ObjectCompiler, ObjectCompilerTarget } from "./ObjectCompiler";
import { ObjectConfig } from "./ObjectConfig";

export type ObjectRule<
  E extends ObjectCompiler<C, T, O>,
  C extends ObjectConfig,
  T extends ObjectCompilerTarget<C>,
  O extends Object3D
> = Rule<E>;

export const ObjectRule = function <
  E extends ObjectCompiler<C, T, O>,
  C extends ObjectConfig,
  T extends ObjectCompilerTarget<C>,
  O extends Object3D
>(input: ProxyNotice, compiler: E) {
  const { operate, key, path, value } = input;

  if (key === "parent") {
    return;
  }

  const tempPath = path.concat([]);
  let vid = key;
  let attribute = key;

  if (tempPath.length) {
    vid = tempPath.shift()!;
    if (tempPath.length) {
      attribute = tempPath[0];
    }
  }

  // children
  if (attribute === "children") {
    if (operate === "add") {
      compiler.addChildren(vid, value);
      return;
    }

    if (operate === "delete") {
      compiler.removeChildren(vid, value);
      return;
    }
  }

  // event
  if (attribute.toLocaleUpperCase() in EVENTNAME) {
    const index = Number(tempPath.length > 2 ? tempPath[1] : key);

    if (operate === "add") {
      if (Number.isInteger(Number(key)) && tempPath.length === 1) {
        compiler.addEvent(vid, attribute as EVENTNAME, value);
        return;
      }

      if (!Number.isInteger(index)) {
        console.error(`${compiler.MODULE} rule: event analysis error.`, input);
        return;
      }
      compiler.updateEvent(vid, attribute as EVENTNAME, index);
      return;
    }

    if (operate === "set") {
      if (!Number.isInteger(index)) {
        console.error(`${compiler.MODULE} rule: event analysis error.`, input);
        return;
      }
      compiler.updateEvent(vid, attribute as EVENTNAME, index);
      return;
    }

    if (operate === "delete") {
      if (!Number.isInteger(index)) {
        console.error(`${compiler.MODULE} rule: event analysis error.`, input);
        return;
      }
      compiler.removeEvent(vid, attribute as EVENTNAME, value);
      return;
    }
  }

  // other attribute
  if (operate === "add") {
    if (validate(key) || UNIQUESYMBOL[key]) {
      compiler.add(key, value);
      return;
    }
  }

  if (operate === "set") {
    if (
      ((vid && validate(key)) || UNIQUESYMBOL[vid]) &&
      !path.length &&
      typeof value === "object"
    ) {
      compiler.cover(vid, value);
      return;
    }

    if ((vid && validate(vid)) || UNIQUESYMBOL[vid]) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`${compiler.MODULE} rule vid is illeage: '${vid}'`);
    }
    return;
  }

  if (operate === "delete") {
    if (validate(key) || UNIQUESYMBOL[key]) {
      compiler.remove(key, value);
    }
    return;
  }
};
