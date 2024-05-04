export const createH1 = (text: string): HTMLHeadElement => {
  const result = document.createElement("h1");
  result.textContent = text;
  return result;
};
