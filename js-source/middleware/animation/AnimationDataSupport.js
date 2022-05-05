import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { AnimationRule } from "./AnimationRule";
export class AnimationDataSupport extends DataSupport {
    MODULE = MODULETYPE.ANIMATION;
    constructor(data) {
        !data && (data = {});
        super(AnimationRule, data);
    }
}
//# sourceMappingURL=AnimationDataSupport.js.map