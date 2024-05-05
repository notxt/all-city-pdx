import { html } from "../lib.js";
const createGoToButtonFactory = (game) => (goTo) => {
    const button = document.createElement("button");
    button.textContent = goTo.description;
    button.onclick = () => game.action.move(goTo.location);
    return button;
};
const template = document.createElement("template");
template.innerHTML = html `
  <style>
    * {
      margin: 0;
    }

    .container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    h1 {
      font-family: "Title Text";
      font-size: 120px;
      color: rgb(0 0 0 / 0);
      text-shadow: hsl(0 255 255 / 1) 0 0 2px;
      letter-spacing: -6px;
      word-spacing: -15px;
    }

    button {
      font-family: "Accent Text";
      border-style: none;
      color: inherit;
      background-color: inherit;
      border: 0;
      padding: 0;
      font-size: 50px;
      color: rgb(255 0 255 / 0.7);
      cursor: pointer;
    }
  </style>

  <div class="container"></div>
`;
class El extends HTMLElement {
    constructor(createGoToButton, config) {
        super();
        this.attachShadow({ mode: "open" });
        const shadowRoot = this.shadowRoot;
        if (shadowRoot === null)
            throw new Error("shadowRoot is null");
        shadowRoot.appendChild(template.content.cloneNode(true));
        const container = shadowRoot.querySelector("div");
        if (container === null)
            throw new Error("container is null");
        const h1 = document.createElement("h1");
        h1.textContent = config.name;
        container.appendChild(h1);
        const description = document.createElement("p");
        description.textContent = config.description;
        container.appendChild(description);
        const gotoContainer = document.createElement("div");
        container.appendChild(gotoContainer);
        config.goTo.forEach((goto) => {
            const button = createGoToButton(goto);
            gotoContainer.appendChild(button);
        });
    }
}
customElements.define("ac-location", El);
export const createLocationFactory = (state) => (config) => {
    const createGoToButton = createGoToButtonFactory(state);
    const el = new El(createGoToButton, config);
    return el;
};
//# sourceMappingURL=location.js.map