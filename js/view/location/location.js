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
var _El_action, _El_description;
import { html } from "../../lib.js";
const createGoToButtonFactory = (game) => (goTo) => {
    const button = document.createElement("button");
    button.textContent = goTo.description;
    button.onclick = () => game.action.move(goTo.location);
    const li = document.createElement("li");
    li.appendChild(button);
    return li;
};
const getElementByIdFactory = (shadow) => (id) => {
    const el = shadow.getElementById(id);
    if (el === null)
        throw new Error(`#${id} is null`);
    return el;
};
const querySelectorFactory = (shadow) => (selector) => {
    // const test = shadow.querySelector("h1")
    const el = shadow.querySelector(selector);
    if (el === null)
        throw new Error(`${selector} is null`);
    return el;
};
const descriptionId = "description";
const template = document.createElement("template");
template.innerHTML = html `
  <style>
    * {
      margin: 0;
    }

    .container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    h1 {
      color: hsl(0 0 0 / 0);
      font-family: "Title Text";
      font-size: 120px;
      letter-spacing: -6px;
      text-shadow: hsl(180 100% 50% / 0.8) 0 0 2px;
      word-spacing: -15px;
    }

    button {
      background-color: inherit;
      border-style: none;
      border: 0;
      color: hsl(300 100% 50% / 0.7);
      cursor: pointer;
      font-family: "Accent Text";
      font-size: 50px;
      padding: 0;
    }

    li {
      list-style-type: none;
    }

    button:focus-visible {
      outline: none;
    }

    button:focus,
    button:hover {
      outline: none;
      color: hsl(300 100% 50% / 1);
    }

    button:focus::before,
    button:hover::before {
      content: ">> ";
      font-size: 50px;
    }

    button:focus::after,
    button:hover::after {
      content: " <<";
    }
  </style>

  <div class="container">
    <h1></h1>
    <p id="${descriptionId}"></p>
    <ul></ul>
  </div>
`;
class El extends HTMLElement {
    constructor(title) {
        super();
        _El_action.set(this, void 0);
        _El_description.set(this, void 0);
        this.attachShadow({ mode: "open" });
        const shadow = this.shadowRoot;
        if (shadow === null)
            throw new Error("shadowRoot is null");
        shadow.appendChild(template.content.cloneNode(true));
        const querySelector = querySelectorFactory(shadow);
        const getElementById = getElementByIdFactory(shadow);
        const titleEl = querySelector("h1");
        titleEl.textContent = title;
        __classPrivateFieldSet(this, _El_description, getElementById(descriptionId), "f");
        __classPrivateFieldSet(this, _El_action, querySelector("ul"), "f");
    }
    set actionList(actionList) {
        __classPrivateFieldGet(this, _El_action, "f").replaceChildren(...actionList);
    }
    set description(description) {
        __classPrivateFieldGet(this, _El_description, "f").textContent = description;
    }
}
_El_action = new WeakMap(), _El_description = new WeakMap();
customElements.define("ac-location", El);
export const createLocationFactory = (state) => (config) => {
    const createGoToButton = createGoToButtonFactory(state);
    const el = new El(config.name);
    const update = (state) => {
        const name = state.hero.location;
        const visited = state.hero.visited[name];
        const description = config.description;
        el.description =
            visited > config.regularThreshold
                ? description["3 regular"]
                : visited > 1
                    ? description["2 been there"]
                    : description["1 first time"];
        el.actionList = config.goTo.map((goto) => createGoToButton(goto));
    };
    const result = {
        el,
        update,
    };
    return result;
};
//# sourceMappingURL=location.js.map