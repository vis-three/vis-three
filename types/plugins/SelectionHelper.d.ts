export declare class SelectionHelper {
    private element;
    private startPoint;
    private pointTopLeft;
    private pointBottomRight;
    private isDown;
    constructor();
    onSelectStart(event: MouseEvent): void;
    onSelectMove(event: MouseEvent): void;
    onSelectOver(event: MouseEvent): void;
}
