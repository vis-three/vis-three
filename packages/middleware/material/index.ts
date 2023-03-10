import { defineModule } from "../module";
import { MaterialCompiler } from "./MaterialCompiler";
import { MaterialRule } from "./MaterialRule";

export default defineModule({
  type: "material",
  compiler: MaterialCompiler,
  rule: MaterialRule,
  processors: [],
});
