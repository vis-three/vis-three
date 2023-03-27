import { Rule } from "@vis-three/middleware";
export const AnimationRule = function (notice, compiler) {
    // 命名跳过
    if (notice.key === "name" && notice.path.length === 1) {
        return;
    }
    Rule(notice, compiler);
};
