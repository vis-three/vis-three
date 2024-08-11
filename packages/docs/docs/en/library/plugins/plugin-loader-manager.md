# @vis-three/plugin-loader-manager

Loader Manager Plugin.

This plugin provides a unified entry point for all resource loaders, facilitating memory management and lifecycle management of loaded resources.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-loader-manager">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-loader-manager?color=blue">

## Plugin Name

`LoaderManagerPlugin`

:::tip
You can use the enumeration: `LOADER_MANAGER_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters


```ts
export interface LoaderManagerParameters {
    /** Loader Extension */
    loaderExtends: { [key: string]: Loader };
}

export interface LoaderManagerPluginParameters extends LoaderManagerParameters {
    /** Common Prefix Path */
    path?: string;
}
```

### loaderExtends

Supports extending different formats of resource types and overriding the current loaders.

```ts
import { Loader } from "three";
class MyGLFTLoader extends Loader {}

engine.install(
  LoaderManagerPlugin({
    loaderExtends: {
      pmx: new PMXLoader(),
      glft: new MyGLTFLoader(),
    },
  })
);
```

:::tip

It is recommended to extend `three.js`'s `Loader` for custom loaders.
:::

### path

Unified resource prefix, which is useful for services with different domain names.

```ts
engine.install(
  LoaderManagerPlugin({
    path: "https://www.mywebsite.com/model",
  })
);

engine.loadResources(["/home/desk.fbx"]);

// /home/desk.fbx -> https://www.mywebsite.com/model/home/desk.fbx
```

## Engine Extensions

```ts
export interface LoaderManagerEngine extends Engine {
    /** Resource Loader Manager */
    loaderManager: LoaderManager;
    /** Function to load resources */
    loadResources: (
        urlList: Array<LoadUnit>,
        callback: (err: Error | undefined, event?: LoadedEvent) => void
    ) => LoaderManagerEngine;
    /** Function to load resources asynchronously */
    loadResourcesAsync: (urlList: Array<LoadUnit>) => Promise<LoadedEvent>;
}
```

## Loading Blob Temporary Links

This can be done by specifying the type of the current resource.

```ts
engine.loadResources([
  {
    url: "blob:https://shiotsukikaedesari.gitee.io/1e09dae0-94a2-4a32-bd9f-eeae8df51907",
    ext: "glft",
  },
]);
```

## LoaderManager

This class extends `@vis-three/core`'s `Dispatcher`.

### LOADER_EVENT

```ts
export enum LOADER_EVENT {
  BEFORELOAD = "beforeLoad",
  LOADING = "loading",
  DETAILLOADING = "detailLoading",
  DETAILLOADED = "detailLoaded",
  LOADED = "loaded",
}
```

### event

```ts
export interface LoadDetail {
  url: string;
  progress: number;
  error: boolean;
  message: string;
}

export interface BeforeLoadEvent extends BaseEvent {
  urlList: string[];
}

export interface LoadingEvent extends BaseEvent {
  loadTotal: number;
  loadSuccess: number;
  loadError: number;
}

export interface DetailEvent extends BaseEvent {
  detail: LoadDetail;
}

export interface LoadedEvent extends BaseEvent {
  loadTotal: number;
  loadSuccess: number;
  loadError: number;
  resourceMap: Map<string, unknown>;
}
```

### getLoader

▸ **getLoader**(`ext`): `null` \| `Loader`

Gets the loader.

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `ext` | `string` | Resource type |

#### Returns

`null` \| `Loader`

### getResource

▸ **getResource**(`url`): `unknown`

Gets the resource at the given URL.

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `url` | `string` |

#### Returns

`unknown`

### load

▸ **load**(`urlList`): `LoaderManager`

Loads resources.

#### Parameters

| Name      | Type         | Description                              |
| :-------- | :----------- | :--------------------------------------- |
| `urlList` | `LoadUnit`[] | `string[]` \| `[{ext: string, url: string}]` |

#### Returns

this

### register

▸ **register**(`ext`, `loader`): `LoaderManager`

Registers a loader.

#### Parameters

| Name     | Type     | Description         |
| :------- | :------- | :------------------ |
| `ext`    | `string` | File format, e.g., jpg |
| `loader` | `Loader` | Extend `THREE.Loader` |

#### Returns

this

### reset

▸ **reset**(): `LoaderManager`

Resets the loader manager properties.

#### Returns

this

### setLoadDetailMap

▸ **setLoadDetailMap**(`map`): `LoaderManager`

**`Deprecated`**

Sets detailed resource information.

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `map` | `Object` |

#### Returns

this

### setPath

▸ **setPath**(`path`): `LoaderManager`

Sets the unified resource path prefix.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `path` | `string` |

#### Returns

this

### setRequestHeader

▸ **setRequestHeader**(`headers`): `LoaderManager`

Sets request headers.

#### Parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `headers` | `Record`<`string`, `string`\> |

#### Returns

this

### setResponseType

▸ **setResponseType**(`responseType`): `LoaderManager`

Sets the response type.

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `responseType` | `string` |

#### Returns

this

### toJSON

▸ **toJSON**(): `string`

#### Returns

`string`
