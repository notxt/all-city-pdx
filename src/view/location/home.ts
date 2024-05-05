import { LocationConfig } from "./location.js";

export const homeConfig: LocationConfig = {
  name: "Home Sweet Home",
  regularThreshold: 3,
  description: {
    "1 first time": "Your cozy little corner of the world",
    "2 been there": "Back at home",
    "3 regular": "Starting to get sick of this place",
  },
  goTo: [
    {
      description: "Open the door and walk outside",
      location: "Killingsworth",
    },
  ],
};
