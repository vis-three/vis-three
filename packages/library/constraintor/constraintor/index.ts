import { EventDispatcher } from "@vis-three/core";

export abstract class Constraintor extends EventDispatcher {
  abstract constrain(): void;
}
