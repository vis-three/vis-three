import { CONFIGFACTORY, CONFIGTYPE, Parser, } from "@vis-three/middleware";
import { Texture } from "three";
export class TextureParser extends Parser {
    selector = (url, resource, parseMap) => {
        if (resource instanceof Texture) {
            return parseMap.get(TextureParser) || null;
        }
        else {
            return null;
        }
    };
    parse({ url, resource, configMap, resourceMap }) {
        const config = CONFIGFACTORY[CONFIGTYPE.LOADTEXTURE]();
        config.url = url;
        resourceMap.set(url, resource);
        configMap.set(url, config);
    }
}
