import { validate } from "uuid";
import { EVENTNAME } from "../../manager/EventManager";
import { UNIQUESYMBOL } from "../constants/UNIQUESYMBOL";
export const ObjectRule = function (input, compiler) {
    const { operate, key, path, value } = input;
    const tempPath = path.concat([]);
    const vid = tempPath.shift() || key;
    const attribute = tempPath.length ? tempPath[0] : key;
    if (operate === "add") {
        if (attribute === "children") {
            compiler.addChildren(vid, value);
            return;
        }
        if (attribute.toLocaleUpperCase() in EVENTNAME) {
            if (Number.isInteger(Number(key)) && !path.length) {
                compiler.addEvent(vid, attribute, value);
                return;
            }
            else {
                const index = Number(path.length ? path[0] : key);
                if (!Number.isInteger(index)) {
                    console.error(`${compiler.COMPILER_NAME} rule: event analysis error.`, input);
                    return;
                }
                compiler.updateEvent(vid, attribute, index);
                return;
            }
        }
        if (validate(key) || UNIQUESYMBOL[key]) {
            compiler.add(key, value);
        }
        return;
    }
    if (operate === "set") {
        if (((vid && validate(key)) || UNIQUESYMBOL[vid]) &&
            !path.length &&
            typeof value === "object") {
            compiler.cover(vid, value);
            return;
        }
        if ((vid && validate(vid)) || UNIQUESYMBOL[vid]) {
            compiler.set(vid, tempPath, key, value);
        }
        else {
            console.warn(`${compiler.COMPILER_NAME} rule vid is illeage: '${vid}'`);
        }
        return;
    }
    if (operate === "delete") {
        if (attribute === "children") {
            compiler.removeChildren(vid, value);
            return;
        }
        if (validate(key) || UNIQUESYMBOL[key]) {
            compiler.add(key, value);
        }
        return;
    }
};
//# sourceMappingURL=ObjectRule.js.map