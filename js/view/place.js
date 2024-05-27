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
import { getElementByIdFactory, html, querySelectorFactory } from "../lib.js";
const descriptionId = "description";
const template = document.createElement("template");
template.innerHTML = html `
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .container {
      text-align: center;
    }

    p {
      max-width: 700px;
    }

    button {
      background-color: inherit;
      border-style: none;
      border: 0;
      color: magenta;
      cursor: pointer;
      font-family: inherit;
      font-size: inherit;
      padding: 0;
    }

    li {
      list-style-type: none;
      text-align: center;
    }

    button:focus-visible {
      outline: none;
    }

    button:focus {
      outline: none;
    }

    button:hover {
      color: hsl(300 100% 50% / 1);
    }

    button:hover::before,
    button:focus::before {
      content: "> ";
    }

    button:hover::after,
    button:focus::after {
      content: " <";
    }
  </style>

  <div class="container">
    <h1></h1>
    <p id="${descriptionId}"></p>
    <ul></ul>
  </div>
`;
class El extends HTMLElement {
    constructor() {
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
        __classPrivateFieldSet(this, _El_description, getElementById(descriptionId), "f");
        __classPrivateFieldSet(this, _El_action, querySelector("ul"), "f");
    }
    set actionList(actionList) {
        __classPrivateFieldGet(this, _El_action, "f").replaceChildren(...actionList);
    }
    set description(description) {
        console.log(description);
        __classPrivateFieldGet(this, _El_description, "f").textContent = description;
    }
}
_El_action = new WeakMap(), _El_description = new WeakMap();
customElements.define("ac-location", El);
export const createPlaceFactory = (verb) => {
    const el = new El();
    const createMove = createMoveFactory(verb);
    const createGrab = createGrabFactory(verb);
    const result = (state) => {
        const at = state.hero.placeAt;
        const config = state.place[at];
        el.description = config.label;
        const grabActions = [];
        for (const grab of config.verb.grab) {
            if (state.hero.things.includes(grab.name))
                continue;
            grabActions.push(createGrab(grab));
        }
        const moveActions = config.verb.move.map(createMove);
        const actions = [...grabActions, ...moveActions];
        el.actionList = actions.map(actionLi);
        return el;
    };
    return result;
};
const createMoveFactory = (verb) => (place) => {
    const label = place.label;
    const result = {
        description: label,
        callback: () => verb.move(place.name),
    };
    return result;
};
const createGrabFactory = (verb) => {
    return (item) => {
        const result = {
            description: item.label,
            callback: () => verb.grab(item.name),
        };
        return result;
    };
};
const actionLi = (action) => {
    const button = document.createElement("button");
    button.textContent = action.description;
    button.onclick = () => action.callback();
    const li = document.createElement("li");
    li.appendChild(button);
    return li;
};
//# sourceMappingURL=place.js.map