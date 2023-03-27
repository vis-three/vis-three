import { CSS3DCompiler } from "./CSS3DCompiler";
import { CSS3DRule } from "./CSS3DRule";
import CSS3DPlaneProcessor from "./CSS3DPlaneProcessor";
import CSS3DObjectProcessor from "./CSS3DObjectProcessor";
import CSS3DSpriteProcessor from "./CSS3DSpriteProcessor";
import { HTMLElementParser } from "./HTMLElementParser";
export default {
    type: "css3D",
    object: true,
    compiler: CSS3DCompiler,
    rule: CSS3DRule,
    processors: [CSS3DPlaneProcessor, CSS3DObjectProcessor, CSS3DSpriteProcessor],
    parsers: [HTMLElementParser],
};
