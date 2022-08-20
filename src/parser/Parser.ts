import { SymbolConfig } from "../middleware/common/CommonConfig";

export interface ParseParams {
  url: string;
  resource: any;
  configMap: Map<string, SymbolConfig>;
  resourceMap: Map<string, any>;
}

export type ResourceHanlder = (
  url: string,
  resource: any,
  parseMap: Map<string, Parser>
) => Parser | null;

export const defaultHanlder: ResourceHanlder = (
  url: string,
  resource: any,
  parseMap: Map<string, Parser>
): Parser | null => {
  const resourceHanlder = (url: string, object: object): Parser | null => {
    if (!Object.getPrototypeOf(object)) {
      return null;
    } else if (
      parseMap.has(Object.getPrototypeOf(object).constructor.name + "Parser")
    ) {
      return parseMap.get(
        Object.getPrototypeOf(object).constructor.name + "Parser"
      )!;
    } else {
      return resourceHanlder(url, Object.getPrototypeOf(object));
    }
  };

  return resourceHanlder(url, resource);
};

export abstract class Parser {
  abstract parse(params: ParseParams): void;

  registHandler(): ResourceHanlder {
    return defaultHanlder;
  }
}
