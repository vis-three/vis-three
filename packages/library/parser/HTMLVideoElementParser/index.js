import { CONFIGFACTORY, CONFIGTYPE, Parser, } from "@vis-three/middleware";
export class HTMLVideoElementParser extends Parser {
    selector = (url, resource, parseMap) => {
        if (resource instanceof HTMLVideoElement) {
            return parseMap.get(HTMLVideoElementParser) || null;
        }
        else {
            return null;
        }
    };
    parse({ url, resource, configMap, resourceMap }) {
        const config = CONFIGFACTORY[CONFIGTYPE.VIDEOTEXTURE]();
        config.url = url;
        resourceMap.set(url, resource);
        configMap.set(url, config);
    }
}
