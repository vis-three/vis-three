import { Object3DParser } from "./Object3DParser";
import { ParseParams, Parser, ResourceHanlder } from "./Parser";

export class GLTFResourceParser extends Parser {
  private object3DParser = new Object3DParser();
  constructor() {
    super();
  }

  parse({ url, resource, configMap, resourceMap }: ParseParams): void {
    this.object3DParser.parse({
      url: `${url}.scene`,
      resource: resource.scene,
      configMap,
      resourceMap,
    });
  }

  registHandler(): ResourceHanlder {
    return (url, rescource, parseMap) => {
      if (
        rescource.parser &&
        rescource.parser.constructor.name === "GLTFParser"
      ) {
        return parseMap.get(this.constructor.name) || null;
      } else {
        return null;
      }
    };
  }
}
