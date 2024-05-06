import { LocationConfig } from "./location.js";

export const stacksConfig: LocationConfig = {
  name: "Stacks Coffeehouse",
  regularThreshold: 3,
  description: {
    "1 first time":
      "Bookshelves line the walls and the baristas crack jokes in behind the counter. Clearly a local favorite.",
    "2 been there":
      "My mouth starts watering as soon as smell of that Roseline blend hits my nostrils",
  },
  goTo: [
    {
      description: "Time to get going",
      location: "Killingsworth",
    },
  ],
};
