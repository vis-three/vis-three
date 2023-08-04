import { ProxyNotice, Rule } from "@vis-three/middleware";
import { Object3D } from "three";
import { ObjectCompiler } from "./ObjectCompiler";
import { ObjectConfig } from "./ObjectConfig";
export type ObjectRule<E extends ObjectCompiler<C, O>, C extends ObjectConfig, O extends Object3D> = Rule<E>;
/**
 *
 * @param input - 代理通知输入
 * @param compiler - 编译器
 * @param validateFun - 验证规则
 * @returns
 */
export declare const ObjectRule: <E extends ObjectCompiler<C, O>, C extends ObjectConfig, O extends Object3D<import("three").Event>>(input: ProxyNotice, compiler: E, validateFun?: any) => void;
