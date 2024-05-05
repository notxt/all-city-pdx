import { html } from "../lib.js";
const template = document.createElement("template");
template.innerHTML = html `
  <style>
    * {
      margin: 0;
    }

    .container {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: linear-gradient(
          to bottom,
          rgb(255 255 0 / 10%),
          rgb(0 0 255 / 10%)
        ),
        url("img/concrete.jpeg");
      background-size: 100%;
    }

    h1 {
      color: hsl(0 0% 0% / 0);
      font-family: "Title Text";
      font-size: 340px;
      letter-spacing: -30px;
      line-height: 380px;
      text-align: center;
      text-shadow: rgb(0 0 0 / 85%) 0 0 8px;
    }

    h1 > span {
      font-size: 540px;
      letter-spacing: -50px;
    }
  </style>

  <div class="container">
    <hgroup>
      <h1>all city<br /><span>PDX</span></h1>
    </hgroup>
  </div>
`;
class El extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        const shadow = this.shadowRoot;
        if (shadow === null)
            throw new Error("shadow is null");
        shadow.appendChild(template.content.cloneNode(true));
    }
}
customElements.define("ac-screen-title", El);
export const createTitleScreen = () => {
    const container = new El();
    return container;
};
//# sourceMappingURL=title.js.map