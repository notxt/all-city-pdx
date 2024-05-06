import { LocationConfig } from "./location.js";

export const gildedRaccoonConfig: LocationConfig = {
  name: "Gilded Raccoon",
  regularThreshold: 5,
  description: {
    "1 first time": "Neon signs and taxidermy. This place is rad.",
    "2 been there":
      "Live music gets the creative juices flowing ... fermented grape juice doesn't hurt either.",
  },
  goTo: [
    {
      description: {
        "1 first time": "Back into the rain",
        "2 been there": "Back into the rain",
      },
      location: "Killingsworth",
    },
  ],
};
