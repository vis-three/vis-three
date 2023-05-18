import { SymbolConfig } from "@vis-three/middleware";

export const getHelperExpandConfig = function <C extends SymbolConfig>(
  config: C
) {
  return config as C & { helper: string };
};
