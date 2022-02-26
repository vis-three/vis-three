import { Object3D } from "three";
import { Rule } from "../../core/Rule";
import { ObjectCompiler, ObjectCompilerTarget } from "./ObjectCompiler";
import { ObjectConfig } from "./ObjectConfig";

export type ObjectRule<
  E extends ObjectCompiler<C, T, O>,
  C extends ObjectConfig, 
  T extends ObjectCompilerTarget<C>,
  O extends Object3D> = Rule<E>