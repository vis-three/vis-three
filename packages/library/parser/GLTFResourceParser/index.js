import { Parser } from "@vis-three/middleware";
import { Object3DParser } from "../Object3DParser";
export class GLTFResourceParser extends Parser {
    object3DParser = new Object3DParser();
    constructor() {
        super();
    }
    selector = (url, resource, parseMap) => {
        // loader can not export GLTFParser
        if (resource.parser &&
            resource.animations &&
            resource.scene &&
            resource.scenes) {
            return parseMap.get(GLTFResourceParser) || null;
        }
        else {
            return null;
        }
    };
    parse({ url, resource, configMap, resourceMap }) {
        this.object3DParser.parse({
            url: `${url}.scene`,
            resource: resource.scene,
            configMap,
            resourceMap,
        });
    }
}
