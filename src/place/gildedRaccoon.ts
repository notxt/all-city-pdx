import { PlaceConfig } from "../view/place.js";

export const gildedRaccoonConfig: PlaceConfig = {
  name: "Gilded Raccoon",
  label: {
    "1 first time": "Neon signs and taxidermy. This place is rad.",
    "2 been there":
      "Live music gets the creative juices flowing ... fermented grape juice doesn't hurt either.",
  },
  verb: {
    grab: [],
    move: [
      {
        label: {
          "1 first time": "Back into the rain",
          "2 been there": "Back into the rain",
        },
        name: "Killingsworth",
      },
    ],
  },
};
