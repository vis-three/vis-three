import { validate } from "uuid";
import { EVENTNAME } from "../../manager/EventManager";
import { UNIQUESYMBOL } from "../constants/UNIQUESYMBOL";
export const ObjectRule = function (input, compiler) {
    const { operate, key, path, value } = input;
    if (key === "parent") {
        return;
    }
    const tempPath = path.concat([]);
    let vid = key;
    let attribute = key;
    if (tempPath.length) {
        vid = tempPath.shift();
        if (tempPath.length) {
            attribute = tempPath[0];
        }
    }
    // children
    if (attribute === "children") {
        if (operate === "add") {
            compiler.addChildren(vid, value);
            return;
        }
        if (operate === "delete") {
            compiler.removeChildren(vid, value);
            return;
        }
    }
    // event
    if (attribute.toLocaleUpperCase() in EVENTNAME) {
        const index = Number(tempPath.length > 2 ? tempPath[1] : key);
        if (operate === "add") {
            if (Number.isInteger(Number(key)) && tempPath.length === 1) {
                compiler.addEvent(vid, attribute, value);
                return;
            }
            if (!Number.isInteger(index)) {
                console.error(`${compiler.COMPILER_NAME} rule: event analysis error.`, input);
                return;
            }
            compiler.updateEvent(vid, attribute, index);
            return;
        }
        if (operate === "set") {
            if (!Number.isInteger(index)) {
                console.error(`${compiler.COMPILER_NAME} rule: event analysis error.`, input);
                return;
            }
            compiler.updateEvent(vid, attribute, index);
            return;
        }
        if (operate === "delete") {
            if (!Number.isInteger(index)) {
                console.error(`${compiler.COMPILER_NAME} rule: event analysis error.`, input);
                return;
            }
            compiler.removeEvent(vid, attribute, index);
            return;
        }
    }
    // other attribute
    if (operate === "add") {
        if (validate(key) || UNIQUESYMBOL[key]) {
            compiler.add(key, value);
            return;
        }
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
        if (validate(key) || UNIQUESYMBOL[key]) {
            compiler.remove(key, value);
        }
        return;
    }
};
//# sourceMappingURL=ObjectRule.js.map