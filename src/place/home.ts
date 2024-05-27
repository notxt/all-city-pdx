import { PlaceConfig } from "../state.js";

export const homeConfig: PlaceConfig = {
  name: "Home Sweet Home",
  label:
    "Your cozy little corner of the world. The rent's a little steep but worth it.",
  tagged: "Me",
  verb: {
    grab: [
      {
        label: "Can't leave home without my King Sized Chisel Tip Sharpie",
        name: "Sharpie",
      },
    ],
    move: [
      {
        label: "Time to go explore.",
        name: "Killingsworth",
      },
    ],
    tag: {
      label: "I should hit the black book and practice some P's",
      requires: "Sharpie",
      hint: "Been sec since I drew in the book. Need to grab a marker first though.",
    },
  },
};
