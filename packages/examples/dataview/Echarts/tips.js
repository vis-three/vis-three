import { CanvasGenerator } from "vis-three";

export const meshTips = new CanvasGenerator({
  width: 256,
  height: 256,
  bgColor: "rgb(0, 0, 0)",
}).draw((ctx) => {
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  ctx.fillStyle = "rgb(206, 42, 230)";

  ctx.font = " bold 54px 微软雅黑";
  ctx.fillText("mesh", 128, 128);
});

export const spriteTips = new CanvasGenerator({
  width: 256,
  height: 256,
}).draw((ctx) => {
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  ctx.fillStyle = "rgb(206, 42, 230)";

  ctx.font = " bold 54px 微软雅黑";
  ctx.fillText("sprite", 128, 128);
});

export const css3DTips = new CanvasGenerator({
  width: 256,
  height: 256,
}).draw((ctx) => {
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  ctx.fillStyle = "rgb(206, 42, 230)";

  ctx.font = " bold 54px 微软雅黑";
  ctx.fillText("css3D", 128, 128);
});
