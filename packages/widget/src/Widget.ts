import { EventDispatcher } from "@vis-three/core";
import {
  createSymbol,
  EngineSupport,
  SymbolConfig,
} from "@vis-three/middleware";
import { Renderer } from "./renderer";
import { Observer } from "./Observer";

const lifetimes = [
  "beforeLoad",
  "loaded",
  "beforeCreate",
  "created",
  "beforeRender",
  "rednered",
  "beforeDispose",
  "disposed",
];

export interface WigetLifetimes {
  beforeLoad?: Function;
  loaded?: Function;
  beforeCreate?: Function;
  created?: Function;
  beforeDispose?: Function;
  disposed?: Function;
}

export interface WidgetOptions {
  name: string;
  data: () => Record<string, any>;
  render: (e: (type: string, merge: any) => SymbolConfig) => {
    refs: Record<string, SymbolConfig>;
  };
}

export class Widget extends EventDispatcher {
  private static components: Record<string, WidgetOptions> = {};
  private static engine: EngineSupport;

  static useEngine(engine: EngineSupport) {
    Widget.engine = engine;
  }

  static component = function (options: WidgetOptions) {
    if (Widget.components[options.name]) {
      console.warn(`${options.name} components has exist`);
      return;
    }

    Widget.components[options.name] = options;
  };

  wid = createSymbol();
  parent = "";
  name: string;

  substitute: Record<string, any> & { refs: Record<string, SymbolConfig> } = {
    refs: {},
  };

  renderer!: Renderer;

  private options: WidgetOptions;
  private observer = new Observer();

  constructor(options: WidgetOptions) {
    super();
    this.options = options;
    this.name = `${options.name}-${this.wid.slice(-4)}`;
  }

  private initLifetimes() {
    const options = this.options;

    for (const key of lifetimes) {
      if (options[key]) {
        this.on(key, () => {
          options[key]();
        });
      }
    }
  }

  private initRenderer() {
    const renderer = new Renderer(this);

    const result = this.options.render.call(
      this.substitute,
      renderer.createElement.bind(renderer)
    );

    this.renderer = renderer;
  }

  private initObserver() {
    const data = this.options.data();

    this.substitute = Object.assign(this.observer.watch(data), { refs: {} });
  }

  init() {
    const options = this.options;

    this.initLifetimes();
    this.initObserver();
    this.initRenderer();
  }
}
