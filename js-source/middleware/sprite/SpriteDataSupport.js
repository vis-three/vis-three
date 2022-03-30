import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { SpriteRule } from "./SpriteRule";
export class SpriteDataSupport extends ObjectDataSupport {
    MODULE = MODULETYPE.SPRITE;
    constructor(data) {
        !data && (data = {});
        super(SpriteRule, data);
    }
}
//# sourceMappingURL=SpriteDataSupport.js.map