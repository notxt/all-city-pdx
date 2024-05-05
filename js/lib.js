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
//# sourceMappingURL=lib.js.map