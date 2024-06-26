import { getElementByIdFactory, html } from "../lib.js";
import { CreateView } from "./view.js";

const template = document.createElement("template");
const listId = "list";
template.innerHTML = html`
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
  #list: HTMLUListElement;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const shadow = this.shadowRoot;
    if (shadow === null) throw new Error("shadowRoot is null");
    shadow.appendChild(template.content.cloneNode(true));

    const getElementById = getElementByIdFactory(shadow);

    const list = getElementById(listId);
    if (!(list instanceof HTMLUListElement))
      throw new Error(`${listId} is not an instance of HTMLUListElement`);

    this.#list = list;
  }

  set things(things: HTMLLIElement[]) {
    this.#list.replaceChildren(...things);
  }
}

customElements.define("ac-bag", El);

type Factory = () => CreateView;

export const createPocketFactory: Factory = () => {
  const bag = new El();

  const result: CreateView = (state) => {
    bag.things = state.hero.things.map(createLi);

    return bag;
  };

  return result;
};

const createLi = (itemName: string): HTMLLIElement => {
  const li = document.createElement("li");
  li.textContent = itemName;

  return li;
};
