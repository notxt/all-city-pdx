import { Game, LocationName, State } from "../../game.js";
import { html } from "../../lib.js";

type CreateGoToButton = (state: State, goto: GoTo) => HTMLLIElement;
const createGoToButtonFactory =
  (game: Game): CreateGoToButton =>
  (state, goto) => {
    const button = document.createElement("button");
    const description = goto.description;
    const visited = state.hero.visited[goto.location];

    if (typeof description === "string") {
      button.textContent = description;
    } else {
      button.textContent =
        visited >= 1
          ? description["2 been there"]
          : description["1 first time"];
    }

    button.onclick = () => game.action.move(goto.location);

    const li = document.createElement("li");
    li.appendChild(button);

    return li;
  };

const getElementByIdFactory = (shadow: ShadowRoot) => (id: string) => {
  const el = shadow.getElementById(id);
  if (el === null) throw new Error(`#${id} is null`);
  return el;
};

type SelectorMap = {
  h1: HTMLHeadingElement;
  p: HTMLParagraphElement;
  ul: HTMLUListElement;
};

const querySelectorFactory =
  (shadow: ShadowRoot) =>
  <S extends keyof SelectorMap>(selector: S): SelectorMap[S] => {
    // const test = shadow.querySelector("h1")
    const el = shadow.querySelector(selector);
    if (el === null) throw new Error(`${selector} is null`);
    return el;
  };

const descriptionId = "description";

const template = document.createElement("template");
template.innerHTML = html`
  <style>
    * {
      margin: 0;
      padding: 0;
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

    p {
      max-width: 700px;
    }

    button {
      background-color: inherit;
      border-style: none;
      border: 0;
      color: hsl(300 100% 50% / 0.8);
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

export type LocationEl = {
  actionList: HTMLLIElement[];
  description: string;
};

class El extends HTMLElement implements LocationEl {
  #action: HTMLUListElement;
  #description: HTMLElement;

  constructor(title: string) {
    super();

    this.attachShadow({ mode: "open" });
    const shadow = this.shadowRoot;
    if (shadow === null) throw new Error("shadowRoot is null");
    shadow.appendChild(template.content.cloneNode(true));

    const querySelector = querySelectorFactory(shadow);
    const getElementById = getElementByIdFactory(shadow);

    const titleEl = querySelector("h1");
    titleEl.textContent = title;

    this.#description = getElementById(descriptionId);
    this.#action = querySelector("ul");
  }

  set actionList(actionList: HTMLLIElement[]) {
    this.#action.replaceChildren(...actionList);
  }

  set description(description: string) {
    this.#description.textContent = description;
  }
}

customElements.define("ac-location", El);

type Description = {
  "1 first time": string;
  "2 been there": string;
};

export type GoTo = {
  location: LocationName;
  description: Description | string;
};

export type LocationConfig = {
  name: LocationName;
  regularThreshold: number;
  description: Description;
  goTo: GoTo[];
};

type UpdateLocation = (state: State) => void;
export type LocationView = {
  el: HTMLElement;
  update: UpdateLocation;
};

export type CreateLocation = (config: LocationConfig) => LocationView;

export type ConfigureLocation = (
  createLocation: CreateLocation
) => LocationView;

type Factory = (game: Game) => CreateLocation;
export const createLocationFactory: Factory = (state) => (config) => {
  const createGoToButton = createGoToButtonFactory(state);
  const el = new El(config.name);

  const update: UpdateLocation = (state) => {
    const name = state.hero.location;
    const visited = state.hero.visited[name];
    const description = config.description;

    el.description =
      visited > 1 ? description["2 been there"] : description["1 first time"];

    el.actionList = config.goTo.map((goto) => createGoToButton(state, goto));
  };

  const result: LocationView = {
    el,
    update,
  };

  return result;
};
