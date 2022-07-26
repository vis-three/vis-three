import { CanvasGenerator } from "../../../convenient/CanvasGenerator";
export const replaceImage = new CanvasGenerator({
    width: 512,
    height: 512,
})
    .draw((ctx) => {
    ctx.translate(256, 256);
    ctx.font = "72px";
    ctx.fillStyle = "white";
    ctx.fillText("暂无图片", 0, 0);
})
    .getDom();
export const getResource = function (url, engine, instanceClasses) {
    const resourceMap = engine.resourceManager.resourceMap;
    if (!resourceMap.has(url)) {
        console.warn(`engine resourceManager can not found this url: ${url}`);
        return replaceImage;
    }
    const resource = resourceMap.get(url);
    if (Array.isArray(instanceClasses)) {
        for (const instanceClass of instanceClasses) {
            if (resource instanceof instanceClass) {
                return resource;
            }
        }
        console.warn(`this url mapping resource is not a texture image class: ${url}`, resource);
        return replaceImage;
    }
    else {
        if (resource instanceof instanceClasses) {
            return resource;
        }
        else {
            console.warn(`this url mapping resource is not a texture image class: ${url}`, resource);
            return replaceImage;
        }
    }
};
export const needUpdateRegCommand = {
    reg: new RegExp("wrapS|wrapT|format|encoding|anisotropy|magFilter|minFilter|mapping"),
    handler({ target, key, value }) {
        target[key] = value;
        target.needsUpdate = true;
    },
};
//# sourceMappingURL=common.js.map