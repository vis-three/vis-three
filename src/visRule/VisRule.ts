import { VisCompiler } from "../visCompiler/VisCompiler";
import { VisProxyNotice } from "../visCore/VisProxyBroadcast";

export type VisRule<C extends VisCompiler> = (input: VisProxyNotice, output: C) => void