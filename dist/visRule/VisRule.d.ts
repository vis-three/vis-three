import { VisCompiler } from "../visCompiler/VisCompiler";
import { VisProxyNotice } from "../visCore/VisProxyBroadcast";
export declare type VisRule<C extends VisCompiler> = (input: VisProxyNotice, output: C) => void;
//# sourceMappingURL=VisRule.d.ts.map