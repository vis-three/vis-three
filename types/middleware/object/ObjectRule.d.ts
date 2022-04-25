import { Object3D } from "three";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { ObjectCompiler, ObjectCompilerTarget } from "./ObjectCompiler";
import { ObjectConfig } from "./ObjectConfig";
export declare type ObjectRule<E extends ObjectCompiler<C, T, O>, C extends ObjectConfig, T extends ObjectCompilerTarget<C>, O extends Object3D> = Rule<E>;
export declare const ObjectRule: <E extends ObjectCompiler<C, T, O>, C extends ObjectConfig, T extends ObjectCompilerTarget<C>, O extends Object3D<import("three").Event>>(input: ProxyNotice, compiler: E) => void;
