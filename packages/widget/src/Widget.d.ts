import { EngineSupport } from "../engine/EngineSupport";
import { ObjectEvent } from "../manager/EventManager";
import { LoadUnit } from "../manager/LoaderManager";
import { CONFIGFACTORY } from "../middleware/constants/CONFIGFACTORY";
import { CONFIGTYPE } from "../middleware/constants/CONFIGTYPE";
import { EventDispatcher } from "./EventDispatcher";
import { Ignore } from "./Observable";
export interface WigetLifetimes {
  beforeLoad?: Function;
  loaded?: Function;
  beforeCreate?: Function;
  created?: Function;
  beforeDispose?: Function;
  disposed?: Function;
}
export interface WidgetOptions {
  mixins?: Omit<WidgetOptions, "name" | "parent">[];
  name: string;
  input?: Record<string, any>;
  load?: Array<LoadUnit>;
  resources?: () => Record<string, any>;
  parent: string;
  render: (
    e: (
      type: CONFIGTYPE,
      merge: any
    ) => ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>,
    c: () => any,
    onComputed: (fun: () => any) => Symbol,
    onEvent: (fun: (event?: ObjectEvent) => void) => void,
    onResource: (url: string) => any
  ) => Record<string, ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>>;
  data?: (ignore: Ignore) => Record<string, any>;
  computed?: Record<string, () => any>;
  watch?: Record<
    string,
    | Function
    | {
        handler: Function;
        immediate: boolean;
      }
  >;
  methods?: Record<string, Function>;
  beforeLoad?: WigetLifetimes["beforeLoad"];
  loaded?: WigetLifetimes["loaded"];
  beforeCreate?: WigetLifetimes["beforeCreate"];
  created?: WigetLifetimes["created"];
  beforeDispose?: WigetLifetimes["beforeDispose"];
  disposed?: WigetLifetimes["disposed"];
  sceneChange?: Function;
  cameraChange?: Function;
}
export declare class Widget extends EventDispatcher {
  private static components;
  static component: (options: WidgetOptions) => void;
  wid: string;
  parent: string;
  name: string;
  observed: Record<string, any>;
  private options;
  private load;
  private render?;
  private observer;
  constructor(options: WidgetOptions);
  private initMixins;
  private initLifetimes;
  private createLoad;
  private createComputed;
  private createRender;
  private createObserved;
  private createResources;
  private initObserver;
  private createWatch;
  init(engineSupport: EngineSupport): Promise<void>;
  exportConfig(): void;
  loadConfig(): void;
}
