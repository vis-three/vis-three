export declare class VisSelectionHelper {
    private element;
    private startPoint;
    private pointTopLeft;
    private pointBottomRight;
    private isDown;
    constructor(selectColor?: string, selectBgColor?: string);
    onSelectStart(event: MouseEvent): void;
    onSelectMove(event: MouseEvent): void;
    onSelectOver(event: MouseEvent): void;
}
