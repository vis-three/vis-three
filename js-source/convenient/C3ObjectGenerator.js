export class C3ObjectGenerator {
    element;
    constructor(dom, dev = true) {
        if (dev) {
            const mask = document.createElement("div");
            mask.style.position = "absolute";
            mask.style.top = "0";
            mask.style.left = "0";
            mask.style.width = "100%";
            mask.style.height = "100%";
            // mask.style.pointerEvents = "none";
            mask.style.zIndex = "1000";
            dom.appendChild(mask);
            const fun = () => {
                console.log(1);
                mask.style.display = "none";
                const exitDev = () => {
                    console.log(2);
                    mask.style.display = "block";
                    document.body.removeEventListener("click", exitDev);
                };
                document.body.addEventListener("click", exitDev);
            };
            dom.addEventListener("dblclick", fun);
        }
        this.element = dom;
    }
    get() {
        return this.element;
    }
}
//# sourceMappingURL=C3ObjectGenerator.js.map