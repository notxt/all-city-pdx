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
const actionLi = (action) => {
    const button = document.createElement("button");
    button.textContent = action.description;
    button.onclick = () => action.callback();
    const li = document.createElement("li");
    li.appendChild(button);
    return li;
};
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

    h1 {
      color: hsl(0 0 0 / 0);
      font-family: "Title Text";
      font-size: 120px;
      letter-spacing: -6px;
      text-shadow: hsl(180 100% 50% / 0.8) 0 0 2px;
      word-spacing: -15px;
    }

    p {
      max-width: 700px;
    }

    button {
      background-color: inherit;
      border-style: none;
      border: 0;
      color: var(--color-debug);
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

    button:focus::before {
      content: "> ";
    }

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
export const createLocationFactory = (game) => (config) => {
    const el = new El(config.name);
    const createItemActionList = createItemActionFactory({
        actions: config.actions.item,
        game,
    });
    const createMoveActionList = config.actions.move.map(createMoveActionFactory(game));
    const watch = (state) => {
        const moveActionList = createMoveActionList.map((create) => actionLi(create(state)));
        const itemActionList = createItemActionList(state).map(actionLi);
        el.actionList = [...moveActionList, ...itemActionList];
    };
    game.watch(watch);
    return el;
};
const getMoveLabelFactory = (move) => {
    const { description } = move;
    return (state) => {
        if (typeof description === "string") {
            return description;
        }
        return state.hero.visited[move.location] >= 1
            ? description["2 been there"]
            : description["1 first time"];
    };
};
const createMoveActionFactory = (game) => (action) => {
    const getMoveLabel = getMoveLabelFactory(action);
    return (state) => {
        const description = getMoveLabel(state);
        const result = {
            description,
            callback: () => game.action.move(action.location),
        };
        return result;
    };
};
const createItemActionFactory = ({ actions, game, }) => {
    return (state) => {
        const result = [];
        for (const action of actions) {
            if (state.hero.bag.includes(action.item))
                continue;
            const { description, item } = action;
            result.push({
                description,
                callback: () => game.action.grab(item),
            });
        }
        return result;
    };
};
//# sourceMappingURL=location.js.map