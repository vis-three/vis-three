import { CanvasTexture } from "three";
import { CanvasGenerator } from "@vis-three/convenient";

export const anchorTexture = new CanvasTexture(
  new CanvasGenerator({ width: 32, height: 32 })
    .draw((ctx) => {
      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.fillRect(0, 0, 32, 32);
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = "rgb(0, 255, 238)";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.arc(16, 16, 15, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    })
    .getDom()
);

export const moveTexture = new CanvasTexture(
  new CanvasGenerator({ width: 32, height: 32 })
    .draw((ctx) => {
      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.fillRect(0, 0, 32, 32);
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = "rgb(255, 248, 0)";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.arc(16, 16, 15, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    })
    .getDom()
);

export const switchTexture = new CanvasTexture(
  new CanvasGenerator({ width: 32, height: 32 })
    .draw((ctx) => {
      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.fillRect(0, 0, 32, 32);
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = "rgb(255, 0, 0)";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.moveTo(1, 0);
      ctx.lineTo(31, 16);
      ctx.lineTo(0, 31);
      ctx.lineTo(1, 0);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    })
    .getDom()
);
