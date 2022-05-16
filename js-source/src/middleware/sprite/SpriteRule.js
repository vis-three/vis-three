import { ObjectRule } from "../object/ObjectRule";
export const SpriteRule = function (notice, compiler) {
    if (notice.key === "geometry") {
        return;
    }
    ObjectRule(notice, compiler);
};
//# sourceMappingURL=SpriteRule.js.map