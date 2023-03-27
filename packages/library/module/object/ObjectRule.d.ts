import { ProxyNotice, Rule } from "@vis-three/middleware";
import { Object3D } from "three";
import { ObjectCompiler } from "./ObjectCompiler";
import { ObjectConfig } from "./ObjectConfig";
export type ObjectRule<E extends ObjectCompiler<C, O>, C extends ObjectConfig, O extends Object3D> = Rule<E>;
export declare const ObjectRule: <E extends ObjectCompiler<C, O>, C extends ObjectConfig, O extends Object3D<import("three").Event>>(input: ProxyNotice, compiler: E, validateFun?: (uuid: string) => boolean) => void;
