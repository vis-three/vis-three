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

  const vid = tempPath.shift() || key;
  const attribute = tempPath.shift() || key;

  if (operate === "add") {
    if (attribute === "children") {
      compiler.addChildren(vid, value);
      return;
    }

    if (attribute.toLocaleUpperCase() in EVENTNAME) {
      if (Number.isInteger(Number(key)) && !tempPath.length) {
        compiler.addEvent(vid, attribute as EVENTNAME, value);
        return;
      } else {
        const index = Number(tempPath.length ? tempPath[0] : key);

        if (!Number.isInteger(index)) {
          console.error(
            `${compiler.COMPILER_NAME} rule: event analysis error.`,
            input
          );
          return;
        }
        compiler.updateEvent(vid, attribute as EVENTNAME, index);
        return;
      }
    }

    if (validate(key) || UNIQUESYMBOL[key]) {
      compiler.add(key, value);
    }
    return;
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
      // event
      if (attribute.toLocaleUpperCase() in EVENTNAME) {
        const index = Number(tempPath.length ? tempPath[0] : key);

        if (!Number.isInteger(index)) {
          console.error(
            `${compiler.COMPILER_NAME} rule: event analysis error.`,
            input
          );
          return;
        }
        compiler.updateEvent(vid, attribute as EVENTNAME, index);
        return;
      }

      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`${compiler.COMPILER_NAME} rule vid is illeage: '${vid}'`);
    }
    return;
  }

  if (operate === "delete") {
    // children
    if (attribute === "children") {
      compiler.removeChildren(vid, value);
      return;
    }

    // event
    if (attribute.toLocaleUpperCase() in EVENTNAME) {
      const index = Number(tempPath.length ? tempPath[0] : key);

      if (!Number.isInteger(index)) {
        console.error(
          `${compiler.COMPILER_NAME} rule: event analysis error.`,
          input
        );
        return;
      }
      compiler.removeEvent(vid, attribute as EVENTNAME, index);
      return;
    }

    if (validate(key) || UNIQUESYMBOL[key]) {
      compiler.remove(key, value);
    }
    return;
  }
};
