import { defineModule } from "../module";
import { CSS2DCompiler } from "./CSS2DCompiler";
import CSS2DPlaneProcessor from "./CSS2DPlaneProcessor";
import { CSS2DRule } from "./CSS2DRule";

export default defineModule({
  type: "css2D",
  object: true,
  compiler: CSS2DCompiler,
  rule: CSS2DRule,
  processors: [CSS2DPlaneProcessor],
});
