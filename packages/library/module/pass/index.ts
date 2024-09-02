import { defineModule } from "@vis-three/tdcm";
import { PassModuleEngine, PassCompiler } from "./PassCompiler";
import FilmPassModel from "./models/FilmPassModel";
import LUTPassModel from "./models/LUTPassModel";
import SelectiveBloomPassModel from "./models/SelectiveBloomPassModel";
import SMAAPassModel from "./models/SMAAPassModel";
import SSRPassModel from "./models/SSRPassModel";
import UnrealBloomPassModel from "./models/UnrealBloomPassModel";

export * from "./PassCompiler";
export * from "./PassConfig";

export default defineModule<PassModuleEngine, PassCompiler>({
  type: "pass",
  compiler: PassCompiler,
  models: [
    FilmPassModel,
    LUTPassModel,
    SelectiveBloomPassModel,
    SMAAPassModel,
    SSRPassModel,
    UnrealBloomPassModel,
  ],
});
