"use strict";
class El extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        const shadowRoot = this.shadowRoot;
        if (shadowRoot === null)
            throw new Error("shadowRoot is null");
    }
}
//# sourceMappingURL=title.js.map