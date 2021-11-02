import { VisCompiler, VisCompilerTarget } from '../../visCompiler/VisCompiler';
import { VisRule } from '../../visRule/VisRule';
export declare class VisDataSupport<D extends VisCompilerTarget, C extends VisCompiler> {
    private data;
    private broadcast;
    private translater;
    constructor(rule: VisRule<C>, data: D);
    getData(): D;
    addCompiler(compiler: C): this;
}
//# sourceMappingURL=VisDataSupport.d.ts.map