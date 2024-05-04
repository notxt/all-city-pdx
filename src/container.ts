type SetContent = (content: HTMLElement) => true;
type Container = HTMLElement & { setContent: SetContent };

const css = `
* {
box-sizing: border-box;
margin: 0;
padding: 0;
list-style-type: none;
}
`;

class El extends HTMLElement implements Container {
  #container: HTMLElement;
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const shadowRoot = this.shadowRoot;
    if (shadowRoot === null) throw new Error("shadowRoot is null");

    const style = document.createElement("style");
    style.textContent = css;
    shadowRoot.appendChild(style);

    const container = document.createElement("div");
    shadowRoot.appendChild(container);
    this.#container = container;
  }

  setContent(content: HTMLElement): true {
    this.#container.replaceChildren(content);
    return true;
  }
}

customElements.define("ac-container", El);

type Factory = () => Container;

export const createContainer: Factory = () => {
  const el = new El();
  return el;
};
