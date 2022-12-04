import { GLTF, GLTFParser } from "three/examples/jsm/loaders/GLTFLoader";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { defaultObject3DParser, Object3DParser } from "./Object3DParser";
import { ParseParams, Parser, ResourceHanlder } from "./Parser";

export class GLTFResourceParser extends Parser {
  private object3DParser = defaultObject3DParser;

  constructor() {
    super();
  }

  selector: ResourceHanlder = (
    url: string,
    resource: GLTF,
    parseMap: Map<Function, Parser>
  ) => {
    // loader can not export GLTFParser
    if (
      resource.parser &&
      resource.animations &&
      resource.scene &&
      resource.scenes
    ) {
      return parseMap.get(GLTFResourceParser) || null;
    } else {
      return null;
    }
  };

  parse({ url, resource, configMap, resourceMap }: ParseParams): void {
    this.object3DParser.parse({
      url: `${url}.scene`,
      resource: resource.scene,
      configMap,
      resourceMap,
    });
  }
}
