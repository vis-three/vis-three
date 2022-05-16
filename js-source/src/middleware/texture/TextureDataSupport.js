import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { TextureRule } from "./TextureRule";
export class TextureDataSupport extends DataSupport {
    MODULE = MODULETYPE.TEXTURE;
    constructor(data, ignore) {
        !data && (data = {});
        super(TextureRule, data, ignore);
    }
}
//# sourceMappingURL=TextureDataSupport.js.map