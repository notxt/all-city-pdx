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
var _El_heading, _El_place;
import { getElementByIdFactory, html, querySelectorFactory } from "../lib.js";
import { gildedRaccoonConfig } from "../place/gildedRaccoon.js";
import { homeConfig } from "../place/home.js";
import { killingsworthConfig } from "../place/killingsworth.js";
import { stacksConfig } from "../place/stacks.js";
import { createLocationFactory } from "./place.js";
import { createStuff } from "./thing.js";
const template = document.createElement("template");
const bagId = "bag";
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
    <div id="${bagId}"></div>
  </div>
`;
class El extends HTMLElement {
    constructor({ bag }) {
        super();
        _El_heading.set(this, void 0);
        _El_place.set(this, void 0);
        this.attachShadow({ mode: "open" });
        const shadow = this.shadowRoot;
        if (shadow === null)
            throw new Error("shadowRoot is null");
        shadow.appendChild(template.content.cloneNode(true));
        const getElementById = getElementByIdFactory(shadow);
        const querySelector = querySelectorFactory(shadow);
        getElementById(bagId).appendChild(bag);
        __classPrivateFieldSet(this, _El_place, getElementById(placeId), "f");
        __classPrivateFieldSet(this, _El_heading, querySelector("h1"), "f");
    }
    set heading(heading) {
        __classPrivateFieldGet(this, _El_heading, "f").textContent = heading;
    }
    set place(place) {
        __classPrivateFieldGet(this, _El_place, "f").replaceChildren(place);
    }
}
_El_heading = new WeakMap(), _El_place = new WeakMap();
customElements.define("ac-view", El);
export const createView = (game) => {
    const bag = createStuff(game);
    const el = new El({ bag });
    const createLocation = createLocationFactory(game);
    const placeMap = {
        "Gilded Raccoon": createLocation(gildedRaccoonConfig),
        "Home Sweet Home": createLocation(homeConfig),
        "Stacks Coffeehouse": createLocation(stacksConfig),
        Killingsworth: createLocation(killingsworthConfig),
    };
    game.watch((state) => {
        el.heading = state.hero.placeAt;
        el.place = placeMap[state.hero.placeAt];
    });
    return el;
};
//# sourceMappingURL=view.js.map