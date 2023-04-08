import { VisCSS3DSprite } from "./VisCSS3DSprite";

export class CSS3DSprite extends VisCSS3DSprite {
  constructor(element: HTMLElement = document.createElement("div")) {
    super(element);
    this.type = "CSS3DSprite";
    this.element.classList.add("vis-css3d", "vis-css3d-plane");
  }
}
