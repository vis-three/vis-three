import { BasicEventConfig } from "../../middleware/object/ObjectCompiler";
import { generateConfigFunction } from "../../utils/utils";

export interface OpenWindow extends BasicEventConfig {
  params: {
    url: string;
  };
}

export const openWindow = generateConfigFunction<OpenWindow>({
  name: "openWindow",
  desp: "打开url浏览窗口",
  params: {
    url: "",
  },
});
