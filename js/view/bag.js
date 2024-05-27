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
var _El_list;
import { getElementByIdFactory, html } from "../lib.js";
const template = document.createElement("template");
const listId = "list";
template.innerHTML = html `
  <style>
    * {
      margin: 0;
      padding-inline-start: 0;
    }

    .container {
      text-align: center;
    }

    h2 {
      font-family: var(--font-accent);
      font-size: 50px;
      font-weight: normal;
    }

    ul {
      list-style-type: none;
    }

    li {
      font-size: var(--font-size);
    }
  </style>

  <div class="container">
    <h2>Pocket</h2>
    <ul id="${listId}"></ul>
  </div>
`;
class El extends HTMLElement {
    constructor() {
        super();
        _El_list.set(this, void 0);
        this.attachShadow({ mode: "open" });
        const shadow = this.shadowRoot;
        if (shadow === null)
            throw new Error("shadowRoot is null");
        shadow.appendChild(template.content.cloneNode(true));
        const getElementById = getElementByIdFactory(shadow);
        const list = getElementById(listId);
        if (!(list instanceof HTMLUListElement))
            throw new Error(`${listId} is not an instance of HTMLUListElement`);
        __classPrivateFieldSet(this, _El_list, list, "f");
    }
    set things(things) {
        __classPrivateFieldGet(this, _El_list, "f").replaceChildren(...things);
    }
}
_El_list = new WeakMap();
customElements.define("ac-bag", El);
export const createBag = () => {
    const bag = new El();
    const result = (state) => {
        bag.things = state.hero.things.map(createLi);
        return bag;
    };
    return result;
};
const createLi = (itemName) => {
    const li = document.createElement("li");
    li.textContent = itemName;
    return li;
};
//# sourceMappingURL=bag.js.map