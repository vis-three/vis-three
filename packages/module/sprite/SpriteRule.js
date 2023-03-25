import { ObjectRule } from "@vis-three/module-object";
export const SpriteRule = function (notice, compiler) {
    if (notice.key === "geometry") {
        return;
    }
    ObjectRule(notice, compiler);
};
