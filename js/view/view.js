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
var _El_heading, _El_place, _El_pocket;
import { getElementByIdFactory, html, querySelectorFactory } from "../lib.js";
import { createPlaceFactory } from "./place.js";
import { createPocketFactory } from "./pocket.js";
const template = document.createElement("template");
const pocketId = "pocket";
const placeId = "place";
template.innerHTML = html `
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    h1 {
      color: hsl(0 0 0 / 0);
      font-family: var(--font-title);
      font-size: 120px;
      letter-spacing: -6px;
      text-align: center;
      text-shadow: hsl(180 100% 50% / 0.8) 0 0 2px;
      word-spacing: -15px;
      margin-top: 5vh;
    }

    .container {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      grid-column-gap: 10px;
    }
  </style>

  <h1>testing</h1>
  <div class="container">
    <div></div>
    <div id="${placeId}"></div>
    <div id="${pocketId}"></div>
  </div>
`;
class El extends HTMLElement {
    constructor() {
        super();
        _El_heading.set(this, void 0);
        _El_place.set(this, void 0);
        _El_pocket.set(this, void 0);
        this.attachShadow({ mode: "open" });
        const shadow = this.shadowRoot;
        if (shadow === null)
            throw new Error("shadowRoot is null");
        shadow.appendChild(template.content.cloneNode(true));
        const getElementById = getElementByIdFactory(shadow);
        const querySelector = querySelectorFactory(shadow);
        __classPrivateFieldSet(this, _El_heading, querySelector("h1"), "f");
        __classPrivateFieldSet(this, _El_place, getElementById(placeId), "f");
        __classPrivateFieldSet(this, _El_pocket, getElementById(pocketId), "f");
    }
    set heading(heading) {
        __classPrivateFieldGet(this, _El_heading, "f").textContent = heading;
    }
    set place(place) {
        __classPrivateFieldGet(this, _El_place, "f").replaceChildren(place);
    }
    set pocket(pocket) {
        __classPrivateFieldGet(this, _El_pocket, "f").replaceChildren(pocket);
    }
}
_El_heading = new WeakMap(), _El_place = new WeakMap(), _El_pocket = new WeakMap();
customElements.define("ac-view", El);
export const createViewFactory = (verb) => {
    const el = new El();
    const createPocket = createPocketFactory();
    const createPlace = createPlaceFactory(verb);
    const result = (state) => {
        const pocket = createPocket(state);
        el.pocket = pocket;
        el.heading = state.hero.placeAt;
        el.place = createPlace(state);
        return el;
    };
    return result;
};
//# sourceMappingURL=view.js.map