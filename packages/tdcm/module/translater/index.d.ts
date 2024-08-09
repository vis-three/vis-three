import { Compiler } from "../compiler";
import { CtnNotice } from "../container";
import { Ruler } from "../ruler";
export declare class Translater<C extends Compiler = Compiler> {
    private ruler;
    private members;
    apply(compiler: C): this;
    cancel(compiler: C): this;
    setRuler(ruler: Ruler): this;
    translate(notice: CtnNotice): this;
}
