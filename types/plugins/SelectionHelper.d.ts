export declare class SelectionHelper {
    private dom;
    private element;
    private startPoint;
    private pointTopLeft;
    private pointBottomRight;
    private isDown;
    constructor(dom: HTMLElement);
    onSelectStart(event: MouseEvent): void;
    onSelectMove(event: MouseEvent): void;
    onSelectOver(event: MouseEvent): void;
}
