import { RendererCompiler } from "./RendererCompiler";
export * from "./RendererCompiler";
export * from "./RendererConfig";
declare const _default: {
    type: string;
    compiler: typeof RendererCompiler;
    rule: import("@vis-three/middleware").Rule<RendererCompiler>;
    processors: never[];
};
export default _default;
