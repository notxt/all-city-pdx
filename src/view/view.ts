import { getElementByIdFactory, html, querySelectorFactory } from "../lib.js";
import { State, Verb } from "../state.js";
import { createPlaceFactory } from "./place.js";
import { createPocketFactory } from "./pocket.js";

const template = document.createElement("template");

const pocketId = "pocket";
const placeId = "place";

template.innerHTML = html`
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
  #heading: HTMLHeadingElement;
  #place: HTMLElement;
  #pocket: HTMLElement;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const shadow = this.shadowRoot;
    if (shadow === null) throw new Error("shadowRoot is null");
    shadow.appendChild(template.content.cloneNode(true));

    const getElementById = getElementByIdFactory(shadow);
    const querySelector = querySelectorFactory(shadow);

    this.#heading = querySelector("h1");
    this.#place = getElementById(placeId);
    this.#pocket = getElementById(pocketId);
  }

  set heading(heading: string) {
    this.#heading.textContent = heading;
  }

  set place(place: HTMLElement) {
    this.#place.replaceChildren(place);
  }

  set pocket(pocket: HTMLElement) {
    this.#pocket.replaceChildren(pocket);
  }
}

customElements.define("ac-view", El);

export type CreateView = (state: State) => HTMLElement;
type Factory = (verb: Verb) => CreateView;

export const createViewFactory: Factory = (verb) => {
  const el = new El();

  const createPocket = createPocketFactory();
  const createPlace = createPlaceFactory(verb);

  const result: CreateView = (state) => {
    const pocket = createPocket(state);
    el.pocket = pocket;

    el.heading = state.hero.placeAt;

    el.place = createPlace(state);

    return el;
  };

  return result;
};
