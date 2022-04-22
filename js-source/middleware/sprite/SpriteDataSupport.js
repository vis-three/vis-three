import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { SpriteRule } from "./SpriteRule";
export class SpriteDataSupport extends SolidObjectDataSupport {
    MODULE = MODULETYPE.SPRITE;
    constructor(data) {
        !data && (data = {});
        super(SpriteRule, data);
    }
}
//# sourceMappingURL=SpriteDataSupport.js.map