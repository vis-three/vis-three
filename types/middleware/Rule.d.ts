import { Compiler } from "./Compiler";
import { ProxyNotice } from "./ProxyBroadcast";
export declare type Rule<C extends Compiler> = (input: ProxyNotice, output: C) => void;
