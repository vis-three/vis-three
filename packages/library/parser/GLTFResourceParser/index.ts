import { ParseParams, Parser, ResourceHanlder } from "@vis-three/middleware";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Object3DParser } from "../Object3DParser";
import { AnimationClip } from "three";

export class GLTFResourceParser extends Parser {
  private object3DParser = new Object3DParser();

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

    resource.animations.forEach((animationClip: AnimationClip, i: number) => {
      this.object3DParser.parseAnimation({
        url: `${url}.animations.${i}`,
        resource: animationClip,
        configMap,
        resourceMap,
      });
    });
  }
}
