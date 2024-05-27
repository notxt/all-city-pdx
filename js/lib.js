export const createH1 = (text) => {
    const result = document.createElement("h1");
    result.textContent = text;
    return result;
};
export const html = (templateStrings, ...substitutions) => {
    let result = "";
    for (let i = 0; i < templateStrings.length; i++) {
        result += templateStrings[i];
        if (i < substitutions.length)
            result += substitutions[i];
    }
    return result;
};
export const getElementByIdFactory = (shadow) => (id) => {
    const el = shadow.getElementById(id);
    if (el === null)
        throw new Error(`#${id} is null`);
    return el;
};
export const querySelectorFactory = (shadow) => (selector) => {
    // const test = shadow.querySelector("h1")
    const el = shadow.querySelector(selector);
    if (el === null)
        throw new Error(`${selector} is null`);
    return el;
};
//# sourceMappingURL=lib.js.map