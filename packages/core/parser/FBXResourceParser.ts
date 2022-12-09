import { SymbolConfig } from "../middleware/common/CommonConfig";
import { defaultObject3DParser, Object3DParser } from "./Object3DParser";
import { ParseParams, Parser, ResourceHanlder } from "./Parser";

export class FBXResourceParser extends Object3DParser {
  constructor() {
    super();
  }
}
