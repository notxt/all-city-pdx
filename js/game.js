var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _El_container;
import { createTitleScreen } from "./screen/title.js";
class El extends HTMLElement {
    constructor() {
        super();
        _El_container.set(this, void 0);
        this.attachShadow({ mode: "open" });
        const shadowRoot = this.shadowRoot;
        if (shadowRoot === null)
            throw new Error("shadowRoot is null");
        const container = document.createElement("div");
        shadowRoot.appendChild(container);
        __classPrivateFieldSet(this, _El_container, container, "f");
    }
    setContent(content) {
        __classPrivateFieldGet(this, _El_container, "f").replaceChildren(content);
        return true;
    }
}
_El_container = new WeakMap();
customElements.define("ac-game", El);
export const createGame = () => {
    const container = new El();
    const viewMap = {
        title: createTitleScreen(),
    };
    let state = "title";
    container.setContent(viewMap[state]);
    // const update = (newState: State) => {
    //   state = newState;
    //   el.setContent(viewMap[state]);
    // };
    return container;
};
//# sourceMappingURL=game.js.map