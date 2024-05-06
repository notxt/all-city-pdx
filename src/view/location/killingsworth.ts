import { LocationConfig } from "./location.js";

export const killingsworthConfig: LocationConfig = {
  name: "Killingsworth",
  regularThreshold: 2,
  description: {
    "1 first time":
      "A quiet street a coffee shop on one side and wine bar down the block",
    "2 been there": "My 'hood",
  },
  goTo: [
    {
      description: "I guess it's time to get back home",
      location: "Home Sweet Home",
    },
    {
      description: {
        "1 first time": "Been meaning to try that coffee shop",
        "2 been there": "Could really use some caffeine right about now",
      },
      location: "Stacks Coffeehouse",
    },
    {
      description: {
        "1 first time": "That wine bar looks fun. Not too pretentious.",
        "2 been there": "Never too early to grab a drink.",
      },
      location: "Gilded Raccoon",
    },
  ],
};
