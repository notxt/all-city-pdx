export const createH1 = (text: string): HTMLHeadElement => {
  const result = document.createElement("h1");
  result.textContent = text;
  return result;
};

export const html = (
  templateStrings: TemplateStringsArray,
  ...substitutions: string[]
) => {
  let result = "";

  for (let i = 0; i < templateStrings.length; i++) {
    result += templateStrings[i];
    if (i < substitutions.length) result += substitutions[i];
  }

  return result;
};

export const getElementByIdFactory = (shadow: ShadowRoot) => (id: string) => {
  const el = shadow.getElementById(id);
  if (el === null) throw new Error(`#${id} is null`);
  return el;
};

type SelectorMap = {
  h1: HTMLHeadingElement;
  p: HTMLParagraphElement;
  ul: HTMLUListElement;
};

export const querySelectorFactory =
  (shadow: ShadowRoot) =>
  <S extends keyof SelectorMap>(selector: S): SelectorMap[S] => {
    // const test = shadow.querySelector("h1")
    const el = shadow.querySelector(selector);
    if (el === null) throw new Error(`${selector} is null`);
    return el;
  };
