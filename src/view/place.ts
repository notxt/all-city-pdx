import { getElementByIdFactory, html, querySelectorFactory } from "../lib.js";
import { GrabConfig, MoveConfig, Verb } from "../state.js";
import { CreateView } from "./view.js";

const descriptionId = "description";

const template = document.createElement("template");
template.innerHTML = html`
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
  #action: HTMLUListElement;
  #description: HTMLElement;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const shadow = this.shadowRoot;
    if (shadow === null) throw new Error("shadowRoot is null");
    shadow.appendChild(template.content.cloneNode(true));

    const querySelector = querySelectorFactory(shadow);
    const getElementById = getElementByIdFactory(shadow);

    this.#description = getElementById(descriptionId);
    this.#action = querySelector("ul");
  }

  set actionList(actionList: HTMLLIElement[]) {
    this.#action.replaceChildren(...actionList);
  }

  set description(description: string) {
    console.log(description);
    this.#description.textContent = description;
  }
}

customElements.define("ac-location", El);

type Factory = (verb: Verb) => CreateView;
export const createPlaceFactory: Factory = (verb) => {
  const el = new El();

  const createMove = createMoveFactory(verb);
  const createGrab = createGrabFactory(verb);

  const result: CreateView = (state) => {
    const at = state.hero.placeAt;
    const config = state.place[at];

    el.description = config.label;

    const grabActions: Action[] = [];
    for (const grab of config.verb.grab) {
      if (state.hero.things.includes(grab.name)) continue;
      grabActions.push(createGrab(grab));
    }

    const moveActions = config.verb.move.map(createMove);

    const actions = [...grabActions, ...moveActions];

    el.actionList = actions.map(actionLi);

    return el;
  };

  return result;
};

const createMoveFactory =
  (verb: Verb) =>
  (place: MoveConfig): Action => {
    const label = place.label;

    const result: Action = {
      description: label,
      callback: () => verb.move(place.name),
    };

    return result;
  };

const createGrabFactory = (verb: Verb) => {
  return (item: GrabConfig): Action => {
    const result: Action = {
      description: item.label,
      callback: () => verb.grab(item.name),
    };

    return result;
  };
};

type Action = {
  description: string;
  callback: () => void;
};
type ActionLi = (action: Action) => HTMLLIElement;
const actionLi: ActionLi = (action) => {
  const button = document.createElement("button");
  button.textContent = action.description;
  button.onclick = () => action.callback();

  const li = document.createElement("li");
  li.appendChild(button);

  return li;
};
