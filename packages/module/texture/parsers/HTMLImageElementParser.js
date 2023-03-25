import { CONFIGFACTORY, CONFIGTYPE, Parser, } from "@vis-three/middleware";
export class HTMLImageElementParser extends Parser {
    selector = (url, resource, parseMap) => {
        if (resource instanceof HTMLImageElement) {
            return parseMap.get(HTMLImageElementParser) || null;
        }
        else {
            return null;
        }
    };
    parse({ url, resource, configMap, resourceMap }) {
        const config = CONFIGFACTORY[CONFIGTYPE.IMAGETEXTURE]();
        config.url = url;
        resourceMap.set(url, resource);
        configMap.set(url, config);
    }
}
