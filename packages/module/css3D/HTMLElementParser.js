import { CONFIGFACTORY, CONFIGTYPE, Parser, } from "@vis-three/middleware";
export class HTMLElementParser extends Parser {
    selector = (url, resource, parseMap) => {
        if (resource instanceof HTMLElement) {
            return parseMap.get(HTMLElementParser) || null;
        }
        else {
            return null;
        }
    };
    parse({ url, resource, configMap, resourceMap }) {
        const config = CONFIGFACTORY[CONFIGTYPE.CSS3DPLANE]();
        config.element = url;
        resourceMap.set(url, resource);
        configMap.set(url, config);
    }
}
