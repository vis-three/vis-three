import { Bus, Compiler } from "@vis-three/middleware";
import { AnimationActionConfig } from "./AnimationActionConfig";
import { AnimationAction } from "three";

export class AnimationActionCompiler extends Compiler<
  AnimationActionConfig,
  object
> {
  constructor() {
    super();
  }

  updateAction(vid: string, action: AnimationAction) {
    const oldAction = this.map.get(vid)! as AnimationAction;
    if (!oldAction) {
      console.warn(
        `Animation action compiler update action can not found oldAction by:${vid}`
      );
      return;
    }

    this.map.delete(vid);
    this.weakMap.delete(oldAction);

    Bus.compilerEvent.dispose(oldAction);

    this.map.set(vid, action);
    this.weakMap.set(action, vid);

    Bus.compilerEvent.create(action);

    this.cacheCompile = undefined;
  }
}
