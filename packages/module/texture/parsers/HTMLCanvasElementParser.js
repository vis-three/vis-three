import { CONFIGFACTORY, CONFIGTYPE, Parser } from "@vis-three/middleware";
export class HTMLCanvasElementParser extends Parser {
    selector = (url, resource, parseMap) => {
        if (resource instanceof HTMLCanvasElement) {
            return parseMap.get(HTMLCanvasElementParser) || null;
        }
        else {
            return null;
        }
    };
    parse({ url, resource, configMap, resourceMap }) {
        const config = CONFIGFACTORY[CONFIGTYPE.CANVASTEXTURE]();
        config.url = url;
        resourceMap.set(url, resource);
        configMap.set(url, config);
    }
}
