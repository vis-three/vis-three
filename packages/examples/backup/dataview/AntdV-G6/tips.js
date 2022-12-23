import { CanvasGenerator } from "vis-three";

export const treeTips = new CanvasGenerator({
  width: 512,
  height: 256,
  bgColor: "rgb(0, 0, 0)",
}).draw((ctx) => {
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  ctx.fillStyle = "rgb(0, 255, 0)";

  ctx.font = " bold 54px 微软雅黑";
  ctx.fillText("树架构图谱", 256, 128);
});

export const arcTips = new CanvasGenerator({
  width: 512,
  height: 256,
  bgColor: "rgb(0, 0, 0)",
}).draw((ctx) => {
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  ctx.fillStyle = "rgb(0, 255, 0)";

  ctx.font = " bold 54px 微软雅黑";
  ctx.fillText("飞线架构图谱", 256, 128);
});
