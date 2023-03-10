import { Compiler, CompilerFactory } from "./compiler";
import { DataSupportFactory } from "./dataSupport";
import { Processor } from "./processor";
import { Rule } from "./rule";
import {
  CompilerMembers,
  DataSupportMembers,
  MODULETYPE,
  OBJECTMODULE,
  installProcessor,
} from "./space";

export * from "./compiler";
export * from "./dataContainer";
export * from "./dataSupport";
export * from "./observable";
export * from "./processor";
export * from "./rule";
export * from "./translater";
export * from "./common";
export * from "./space";

export interface ModuleOptions<C extends Compiler<any, any>> {
  type: string;
  object?: boolean;
  compiler: new () => C;
  rule: Rule<C>;
  processors: Processor<any, any, any, C>[];
}

export const defineModule = function <C extends Compiler<any, any>>(
  options: ModuleOptions<C>
) {
  MODULETYPE[options.type.toLocaleUpperCase()] = options.type;

  if (options.object) {
    OBJECTMODULE[options.type.toLocaleUpperCase()] = true;
  }

  const DataSupportClass = DataSupportFactory(options.type, options.rule);

  DataSupportMembers[`${options.type}DataSupport`] = DataSupportClass;

  const CompilerClass = CompilerFactory(
    options.type,
    options.compiler,
    options.processors
  );

  CompilerMembers[`${options.type}Compiler`] = CompilerClass;

  for (const processor of options.processors) {
    installProcessor(processor);
  }
};
