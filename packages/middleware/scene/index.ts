import { defineModule } from "../module";
import { SceneCompiler } from "./SceneCompiler";
import SceneProcessor from "./SceneProcessor";
import { SceneRule } from "./SceneRule";

export default defineModule({
  type: "scene",
  compiler: SceneCompiler,
  rule: SceneRule,
  processors: [SceneProcessor],
});
