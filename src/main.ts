import { Place, createState } from "./state.js";
import { createViewFactory } from "./view/view.js";

const body = document.querySelector("body");
if (body === null) throw new Error("body is null");

const { watch, verb } = createState();

const createView = createViewFactory(verb);

watch((state) => {
  body.replaceChildren(createView(state));
});

const startLocation: Place = "Home Sweet Home";
verb.move(startLocation);
