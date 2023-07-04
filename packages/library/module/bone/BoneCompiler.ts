import { ObjectCompiler } from "@vis-three/module-object";
import { Bone } from "three";
import { BoneConfig } from "./BoneConfig";

export class BoneCompiler extends ObjectCompiler<BoneConfig, Bone> {
  constructor() {
    super();
  }
}
