import { getObjectConfig } from "../object/ObjectConfig";
export const getLineSegmentsConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'LineSegments',
        pairPoints: [],
        material: ''
    });
};
//# sourceMappingURL=LineConfig.js.map