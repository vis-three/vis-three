import { VisLightCompiler } from "./VisLightCompiler";
export interface VisCompilerTarget {
    [key: string]: unknown;
}
export interface VisCompiler {
    initCompile(parameter: unknown): this;
    disposeCompile(parameter: unknown): this;
}
export { VisLightCompiler };
//# sourceMappingURL=VisCompiler.d.ts.map