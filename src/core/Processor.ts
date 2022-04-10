import { SymbolConfig } from "../middleware/common/CommonConfig";

export interface Process {
  key: string;
  path: string[];
  value: any;
}

export abstract class Processor {
  abstract target?: any;
  abstract config?: SymbolConfig;

  filterMap: { [key: string]: boolean } = {};

  protected assembly = false;

  constructor() {
    this.filterMap = Object.assign(
      {
        vid: true,
        type: true,
      },
      this.filterMap
    );
  }

  protected mergeAttribute(path: string[], key: string, value: any) {
    if (this.filterMap[path.concat([key]).join(".")]) {
      return;
    }

    let object = this.target!;
    if (path.length) {
      for (const key of path) {
        object = object[key];
      }
    }

    object[key] = value;
  }

  protected mergeObject(callBack?: Function) {
    const recursiveConfig = (config, object) => {
      for (const key in config) {
        if (this.filterMap[key]) {
          continue;
        }

        if (typeof config[key] === "object" && typeof config[key] !== null) {
          recursiveConfig(config[key], object[key]);
          continue;
        }

        object[key] = config[key];
      }
    };

    recursiveConfig(this.config!, this.target!);
    callBack && callBack();
  }

  processAll(): this {
    const recursiveConfig = (config: SymbolConfig, path: string[]) => {
      for (const key in config) {
        if (this.filterMap[path.concat([key]).join(".")]) {
          continue;
        }

        if (typeof config[key] === "object" && typeof config[key] !== null) {
          recursiveConfig(config[key], path.concat([key]));
          continue;
        }

        this.process({ path, key, value: config[key] });
      }
    };

    recursiveConfig(this.config!, []);
    return this;
  }

  abstract assemble(params: any): this;
  abstract process(params: Process): this;
  abstract dispose(): this;
}
