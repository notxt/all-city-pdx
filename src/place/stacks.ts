import { PlaceConfig } from "../view/place.js";

export const stacksConfig: PlaceConfig = {
  name: "Stacks Coffeehouse",
  label: {
    "1 first time":
      "Bookshelves line the walls and the baristas crack jokes in behind the counter. Clearly a local favorite.",
    "2 been there":
      "My mouth starts watering as soon as smell of that Roseline blend hits my nostrils",
  },
  verb: {
    grab: [],
    move: [
      {
        label: "Time to get going",
        name: "Killingsworth",
      },
    ],
  },
};
