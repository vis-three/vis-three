import { SymbolConfig } from "../middleware/common/CommonConfig";

export interface ParseParams {
  url: string;
  resource: any;
  configMap: Map<string, SymbolConfig>;
  resourceMap: Map<string, any>;
}

export abstract class Parser {
  abstract parse(params: ParseParams): void;
}
