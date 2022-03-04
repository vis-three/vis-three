import { validate } from "uuid";
import { EVENTNAME } from "../../manager/EventManager";
import { isValidEnum } from "../../utils/utils";
export const EventRule = function (notice, compiler) {
    const { operate, key, path, value } = notice;
    if (operate === 'add') {
        // 新增配置
        if (validate(key) && !path.length) {
            compiler.add(key, value);
        }
        else {
            if (Number.isInteger(Number(key)) && path.length === 2) {
                const [vid, eventName] = path;
                if (!validate(vid)) {
                    console.warn(`EventRule: vid is illeage: ${vid}`);
                    return;
                }
                if (!isValidEnum(EVENTNAME, eventName)) {
                    console.warn(`EventRule: eventName is not support: ${eventName}`);
                    return;
                }
                // 增加事件
                compiler.addEvent(vid, eventName, value);
            }
        }
        return;
    }
    if (operate === 'set') {
        if (!path.length) {
            return;
        }
        const [vid, eventName, index] = path;
        if (!validate(vid)) {
            console.warn(`EventRule: vid is illeage: ${vid}`);
            return;
        }
        if (!isValidEnum(EVENTNAME, eventName)) {
            console.warn(`EventRule: eventName is not support: ${eventName}`);
            return;
        }
        if (!Number.isInteger(Number(index))) {
            console.warn(`EventRule: this index is not integer: ${index}`);
            return;
        }
        compiler.updateEvent(vid, eventName, Number(index));
        return;
    }
    if (operate === 'delete') {
        if (validate(key) && !path.length) {
            compiler.remove(key);
        }
        else {
            if (Number.isInteger(Number(key)) && path.length === 2) {
                const [vid, eventName] = path;
                if (!validate(vid)) {
                    console.warn(`EventRule: vid is illeage: ${vid}`);
                    return;
                }
                if (!isValidEnum(EVENTNAME, eventName)) {
                    console.warn(`EventRule: eventName is not support: ${eventName}`);
                    return;
                }
                // 增加事件
                compiler.removeEvent(vid, eventName, Number(key));
            }
        }
        return;
    }
};
//# sourceMappingURL=EventRule.js.map