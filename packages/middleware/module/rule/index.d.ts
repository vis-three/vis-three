import { BasicCompiler } from "../compiler";
import { ProxyNotice } from "../dataContainer";
export type Rule<C extends BasicCompiler> = (input: ProxyNotice, output: C, validateFun?: (key: string) => boolean) => void;
export declare const Rule: Rule<BasicCompiler>;
