import { VisLightCompiler } from "../visCompiler/VisLightCompiler";
import { VisProxyNotice } from "../visCore/VisProxyBroadcast";
import { VisRule } from "./VisRule";

export const rule: VisRule<VisLightCompiler> = function (notice: VisProxyNotice, compiler: VisLightCompiler) {
  console.log(notice)
  if (notice.operate === 'add') {
    compiler.add(notice.key, notice.value.type)
  }
}