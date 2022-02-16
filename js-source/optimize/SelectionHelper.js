import { Vector2 } from "three";
import { SELECTBGCOLOR, SELECTCOLOR } from "../middleware/constants/COLOR";
export class SelectionHelper {
    element;
    startPoint;
    pointTopLeft;
    pointBottomRight;
    isDown;
    constructor() {
        const element = document.createElement('div');
        element.style.pointerEvents = 'none';
        element.style.border = `1px solid ${SELECTCOLOR}`;
        element.style.position = 'fixed';
        element.style.zIndex = '100';
        element.style.backgroundColor = SELECTBGCOLOR;
        this.element = element;
        this.startPoint = new Vector2();
        this.pointTopLeft = new Vector2();
        this.pointBottomRight = new Vector2();
        this.isDown = false;
    }
    onSelectStart(event) {
        this.isDown = true;
        document.body.appendChild(this.element);
        this.element.style.left = event.clientX + 'px';
        this.element.style.top = event.clientY + 'px';
        this.element.style.width = '0px';
        this.element.style.height = '0px';
        this.startPoint.x = event.clientX;
        this.startPoint.y = event.clientY;
    }
    onSelectMove(event) {
        if (!this.isDown) {
            return;
        }
        this.pointBottomRight.x = Math.max(this.startPoint.x, event.clientX);
        this.pointBottomRight.y = Math.max(this.startPoint.y, event.clientY);
        this.pointTopLeft.x = Math.min(this.startPoint.x, event.clientX);
        this.pointTopLeft.y = Math.min(this.startPoint.y, event.clientY);
        this.element.style.left = this.pointTopLeft.x + 'px';
        this.element.style.top = this.pointTopLeft.y + 'px';
        this.element.style.width = (this.pointBottomRight.x - this.pointTopLeft.x) + 'px';
        this.element.style.height = (this.pointBottomRight.y - this.pointTopLeft.y) + 'px';
    }
    onSelectOver(event) {
        if (!this.isDown) {
            return;
        }
        this.isDown = false;
        document.body.removeChild(this.element);
    }
}
//# sourceMappingURL=SelectionHelper.js.map