import { getObjectConfig } from "@vis-three/module-object";
export const getGroupConfig = function () {
    return Object.assign(getObjectConfig(), {
        children: [],
    });
};
