import { Game, Place, State, Thing, Watch } from "../game.js";
import { getElementByIdFactory, html, querySelectorFactory } from "../lib.js";

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

type Label = {
  "1 first time": string;
  "2 been there": string;
};

type GrabConfig = {
  name: Thing;
  label: string;
};

type MoveConfig = {
  name: Place;
  label: Label | string;
};

type TagConfig = {};

export type PlaceConfig = MoveConfig & {
  verb: {
    grab: GrabConfig[];
    move: MoveConfig[];
    tag?: TagConfig;
  };
};

export type CreateLocation = (config: PlaceConfig) => HTMLElement;
export type ConfigureLocation = (createLocation: CreateLocation) => HTMLElement;

type Factory = (game: Game) => CreateLocation;
export const createLocationFactory: Factory = (game) => (config) => {
  const el = new El();

  const placeLabel = placeLabelFactory(config);

  const createItemActionList = createItemActionFactory({
    actions: config.verb.grab,
    game,
  });

  const createMoveActionList = config.verb.move.map(createMoveFactory(game));

  const watch: Watch = (state) => {
    el.description = placeLabel(state);

    const moveActionList = createMoveActionList.map((create) =>
      actionLi(create(state))
    );

    const itemActionList = createItemActionList(state).map(actionLi);

    el.actionList = [...moveActionList, ...itemActionList];
  };

  game.watch(watch);

  return el;
};

const placeLabelFactory = (place: MoveConfig) => {
  const { label: description } = place;

  return (state: State): string => {
    if (typeof description === "string") {
      return description;
    }

    return state.hero.place[place.name]
      ? description["2 been there"]
      : description["1 first time"];
  };
};

const createMoveFactory = (game: Game) => (location: MoveConfig) => {
  const placeLabel = placeLabelFactory(location);

  return (state: State): Action => {
    const label = placeLabel(state);

    const result: Action = {
      description: label,
      callback: () => game.verb.move(location.name),
    };

    return result;
  };
};

const createItemActionFactory = ({
  actions,
  game,
}: {
  actions: GrabConfig[];
  game: Game;
}) => {
  return (state: State): Action[] => {
    const result: Action[] = [];

    for (const action of actions) {
      if (state.hero.things.includes(action.name)) continue;
      const { label: description, name: item } = action;

      result.push({
        description,
        callback: () => game.verb.grab(item),
      });
    }

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
