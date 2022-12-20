export interface LoaderMappingEngine extends ResourceManagerEngine {
  loaderManager: LoaderManager;
  loadResources: (
    urlList: Array<LoadUnit>,
    callback: (err: Error | undefined, event?: MappedEvent) => void
  ) => LoaderMappingEngine;
  loadResourcesAsync: (urlList: Array<LoadUnit>) => Promise<MappedEvent>;
}

ResourceManagerPlugin(engine: LoaderMappingEngine) {
  engine.loadResources = (
    urlList: Array<LoadUnit>,
    callback: (err: Error | undefined, event?: MappedEvent) => void
  ) => {
    const lodedFun = (event: MappedEvent) => {
      callback(undefined, event);
      engine.resourceManager.removeEventListener<MappedEvent>(
        "mapped",
        lodedFun
      );
    };

    try {
      engine.resourceManager.addEventListener<MappedEvent>(
        "mapped",
        lodedFun
      );
    } catch (error) {
      callback(error as Error);
    }
    engine.loaderManager.load(urlList);
    return engine;
  };

  engine.loadResourcesAsync = (
    urlList: Array<LoadUnit>
  ): Promise<MappedEvent> => {
    return new Promise((resolve, reject) => {
      const lodedFun = (event: MappedEvent) => {
        resolve(event);
        engine.resourceManager.removeEventListener<MappedEvent>(
          "mapped",
          lodedFun
        );
      };

      try {
        engine.resourceManager.addEventListener<MappedEvent>(
          "mapped",
          lodedFun
        );
      } catch (error) {
        reject(error);
      }

      engine.loaderManager.load(urlList);
    });
  };
}

LoaderManagerPlugin(engine: LoaderDataSupportEngine) {
  engine.toJSON = function () {
    const assets = {
      assets: JSON.parse(engine.loaderManager.toJSON()),
    };
    return engine.dataSupportManager.toJSON(assets);
  };

  engine.exportConfig = function () {
    let extendConfig = {};

    extendConfig = {
      assets: engine.loaderManager.exportConfig(),
    };

    return engine.dataSupportManager.exportConfig(extendConfig);
  };
}