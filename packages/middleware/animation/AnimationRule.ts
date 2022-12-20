import { ProxyNotice, Rule } from "../module";
import { AnimationCompiler } from "./AnimationCompiler";

export const AnimationRule: Rule<AnimationCompiler> = function (
  notice: ProxyNotice,
  compiler: AnimationCompiler
) {
  // 命名跳过
  if (notice.key === "name" && notice.path.length === 1) {
    return;
  }

  Rule(notice, compiler);
};
