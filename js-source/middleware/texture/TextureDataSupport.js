import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { TextureRule } from "./TextureRule";
export class TextureDataSupport extends DataSupport {
    MODULE = MODULETYPE.TEXTURE;
    constructor(data) {
        !data && (data = {});
        super(TextureRule, data);
    }
}
//# sourceMappingURL=TextureDataSupport.js.map