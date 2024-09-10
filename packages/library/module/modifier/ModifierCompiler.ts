import { Compiler, CompilerParameters, EngineSupport } from "@vis-three/tdcm";
import { Modifier } from "@vis-three/library-modifier";

export class ModifierCompiler extends Compiler<EngineSupport> {
  cacheRenderFun: Map<Modifier, any> = new Map();

  sourceModifiers: Map<object, Modifier[]> = new Map();
  constructor(params: CompilerParameters) {
    super(params);
  }

  integrateModifer(modifier: Modifier) {
    if (!this.sourceModifiers.has(modifier.source)) {
      this.sourceModifiers.set(modifier.source, []);
    }

    const list = this.sourceModifiers.get(modifier.source)!;

    if (!list.includes(modifier)) {
      list.push(modifier);
    }
  }

  chainRender(modifier: Modifier) {
    if (!this.sourceModifiers.has(modifier.source)) {
      console.error(
        `${this.MODULE} compiler can not found modifier list`,
        modifier
      );
      return;
    }

    const list = this.sourceModifiers.get(modifier.source)!;

    if (!list.includes(modifier)) {
      console.error(
        `${this.MODULE} compiler: can not found this modifier in source list`,
        modifier
      );
    }

    const renderList = list.slice(list.indexOf(modifier) + 1, list.length);

    for (const modifier of renderList) {
      modifier.render();
    }
  }
}
