import { createTitleScreen } from "./screen/title.js";

class El extends HTMLElement {
  #container: HTMLElement;
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const shadowRoot = this.shadowRoot;
    if (shadowRoot === null) throw new Error("shadowRoot is null");

    const container = document.createElement("div");
    shadowRoot.appendChild(container);
    this.#container = container;
  }

  setContent(content: HTMLElement): true {
    this.#container.replaceChildren(content);
    return true;
  }
}

customElements.define("ac-game", El);

type State = "title";
type ViewMap = Record<State, HTMLElement>;

type Factory = () => HTMLElement;

export const createGame: Factory = () => {
  const container = new El();

  const viewMap: ViewMap = {
    title: createTitleScreen(),
  };

  let state: State = "title";
  container.setContent(viewMap[state]);

  // const update = (newState: State) => {
  //   state = newState;
  //   el.setContent(viewMap[state]);
  // };

  return container;
};
