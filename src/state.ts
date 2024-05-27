import { gildedRaccoonConfig } from "./place/gildedRaccoon.js";
import { homeConfig } from "./place/home.js";
import { killingsworthConfig } from "./place/killingsworth.js";
import { stacksConfig } from "./place/stacks.js";

export type Place =
  | "Gilded Raccoon"
  | "Home Sweet Home"
  | "Killingsworth"
  | "Stacks Coffeehouse";

type Gear = "Sharpie" | "Stickers" | "Mop";

type Skill = Record<Gear, number>;

export type Thing = Gear;

export type Writer = "Me";

export type Hero = {
  place: Record<Place, number>;
  placeAt: Place;
  rep: number;
  skill: Skill;
  things: Thing[];
};

export type GrabConfig = {
  name: Thing;
  label: string;
};

export type MoveConfig = {
  name: Place;
  label: string;
};

export type TagConfig = {
  requires: Gear;
  label: string;
  hint: string;
};

export type PlaceConfig = MoveConfig & {
  verb: {
    grab: GrabConfig[];
    move: MoveConfig[];
    tag: TagConfig;
  };
  tagged: Writer | null;
};

type PlaceMap = Record<Place, PlaceConfig>;

export type State = {
  hero: Hero;
  place: PlaceMap;
};

export type Move = (place: Place) => void;
export type Grab = (thing: Thing) => void;

type WriteObj = {
  marker: Gear;
  place: Place;
};
export type Tag = (obj: WriteObj) => void;

export type Verb = {
  move: Move;
  grab: Grab;
  tag: Tag;
};

export type Watch = (state: State) => void;
type AddWatch = (watch: Watch) => void;

export type Result = { verb: Verb; watch: AddWatch };

type Factory = () => Result;

export const createState: Factory = () => {
  const hero: Hero = {
    placeAt: "Home Sweet Home",
    place: {
      "Gilded Raccoon": 0,
      "Home Sweet Home": 0,
      "Stacks Coffeehouse": 0,
      Killingsworth: 0,
    },
    rep: 0,
    skill: {
      Sharpie: 0,
      Stickers: 0,
      Mop: 0,
    },
    things: [],
  };

  const placeMap: PlaceMap = {
    "Gilded Raccoon": gildedRaccoonConfig,
    "Home Sweet Home": homeConfig,
    "Stacks Coffeehouse": stacksConfig,
    Killingsworth: killingsworthConfig,
  };

  const state: State = {
    hero,
    place: placeMap,
  };

  const update = () => watchList.forEach((watcher) => watcher(state));

  const grab: Grab = (item) => {
    if (hero.things.includes(item)) return;
    hero.things.push(item);
    update();
  };

  const move: Move = (place) => {
    hero.placeAt = place;
    hero.place[place]++;
    update();
  };

  const tag: Tag = ({ place, marker }) => {
    placeMap[place].tagged = "Me";
    hero.skill[marker]++;
    update();
  };

  const watchList: Watch[] = [];
  const watch: AddWatch = (callback) => watchList.push(callback);

  const verb: Verb = {
    grab,
    move,
    tag,
  };

  const result: Result = {
    verb,
    watch,
  };

  return result;
};
