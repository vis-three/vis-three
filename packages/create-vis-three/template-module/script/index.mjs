import { renameSync } from "fs";
import path from "path";

export default ({ name, targetDir }) => {
  const renameFile = (origin, target) => {
    renameSync(
      path.resolve(targetDir, origin),
      path.resolve(targetDir, target)
    );
  };

  renameFile(
    "./TemplateCompiler.ts",
    `./${name.slice(0, 1).toLocaleUpperCase() + name.slice(1)}Compiler.ts`
  );
  renameFile(
    "./TemplateConfig.ts",
    `./${name.slice(0, 1).toLocaleUpperCase() + name.slice(1)}Config.ts`
  );
  renameFile(
    "./TemplateRule.ts",
    `./${name.slice(0, 1).toLocaleUpperCase() + name.slice(1)}Rule.ts`
  );
  renameFile(
    "./processors/TemplateProcessor.ts",
    `./processors/${
      name.slice(0, 1).toLocaleUpperCase() + name.slice(1)
    }Processor.ts`
  );
};
