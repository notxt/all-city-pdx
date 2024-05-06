import { Game, LocationName } from "../game.js";
import { gildedRaccoonConfig } from "./location/gildedRaccoon.js";
import { homeConfig } from "./location/home.js";
import { killingsworthConfig } from "./location/killingsworth.js";
import { LocationView, createLocationFactory } from "./location/location.js";
import { stacksConfig } from "./location/stacks.js";

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

type LocationMap = Record<LocationName, LocationView>;

type Factory = (game: Game) => HTMLElement;

export const createView: Factory = (game) => {
  const el = new El();

  const createLocation = createLocationFactory(game);

  const locationMap: LocationMap = {
    "Gilded Raccoon": createLocation(gildedRaccoonConfig),
    "Home Sweet Home": createLocation(homeConfig),
    "Stacks Coffeehouse": createLocation(stacksConfig),
    Killingsworth: createLocation(killingsworthConfig),
  };

  game.watch.move((state) => {
    const view = locationMap[state.hero.location];
    view.update(state);
    el.setContent(view.el);
  });

  return el;
};
