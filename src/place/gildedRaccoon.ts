import { PlaceConfig } from "../state.js";

export const gildedRaccoonConfig: PlaceConfig = {
  name: "Gilded Raccoon",
  label: "Neon signs and taxidermy. This place is rad.",
  tagged: null,
  verb: {
    grab: [],
    move: [
      {
        label: "Back into the rain",
        name: "Killingsworth",
      },
    ],
    tag: {
      label: "Slap up a sticker on the corner of the booth.",
      requires: "Stickers",
      hint: "Bit intimate to pull out a marker. If I had some stickers I could probably get one up.",
    },
  },
};
