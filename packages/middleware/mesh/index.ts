import { defineModule } from "../module";
import { MeshCompiler } from "./MeshCompiler";
import MeshProcessor from "./MeshProcessor";
import { MeshRule } from "./MeshRule";

export default defineModule({
  type: "mesh",
  object: true,
  compiler: MeshCompiler,
  rule: MeshRule,
  processors: [MeshProcessor],
});
