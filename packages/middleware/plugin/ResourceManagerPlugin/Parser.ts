import { SymbolConfig } from "../../module/common";

export interface ParseParams {
  url: string;
  resource: any;
  configMap: Map<string, SymbolConfig>;
  resourceMap: Map<string, any>;
}

export type ResourceHanlder = (
  url: string,
  resource: any,
  parseMap: Map<Function, Parser>
) => Parser | null;

export abstract class Parser {
  abstract selector: ResourceHanlder;
  abstract parse(params: ParseParams): void;
}

export class DefaultParser extends Parser {
  selector: ResourceHanlder = (
    url: string,
    resource: HTMLCanvasElement,
    parseMap: Map<Function, Parser>
  ) => {
    return parseMap.get(DefaultParser) || null;
  };
  parse({ url, resource, configMap, resourceMap }: ParseParams): void {
    resourceMap.set(url, resource);
  }
}
