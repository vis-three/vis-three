import { MODULETYPE } from "../constants";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { Object3DRule } from "./Object3DRule";
export class Object3DDataSupport extends ObjectDataSupport {
    MODULE = MODULETYPE.OBJECT3D;
    constructor(data = []) {
        super(Object3DRule, data);
    }
}
