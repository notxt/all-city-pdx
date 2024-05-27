import { Game, Place } from "../game.js";
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
    <div id="${bagId}"></div>
  </div>
`;

class El extends HTMLElement {
  #heading: HTMLHeadingElement;
  #place: HTMLElement;

  constructor({ bag }: { bag: HTMLElement }) {
    super();

    this.attachShadow({ mode: "open" });
    const shadow = this.shadowRoot;
    if (shadow === null) throw new Error("shadowRoot is null");
    shadow.appendChild(template.content.cloneNode(true));

    const getElementById = getElementByIdFactory(shadow);
    const querySelector = querySelectorFactory(shadow);

    getElementById(bagId).appendChild(bag);

    this.#place = getElementById(placeId);
    this.#heading = querySelector("h1");
  }

  set heading(heading: string) {
    this.#heading.textContent = heading;
  }

  set place(place: HTMLElement) {
    this.#place.replaceChildren(place);
  }
}

customElements.define("ac-view", El);

type PlaceMap = Record<Place, HTMLElement>;

type Factory = (game: Game) => HTMLElement;

export const createView: Factory = (game) => {
  const bag = createStuff(game);

  const el = new El({ bag });

  const createLocation = createLocationFactory(game);

  const placeMap: PlaceMap = {
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
