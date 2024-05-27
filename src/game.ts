export type Place =
  | "Gilded Raccoon"
  | "Home Sweet Home"
  | "Killingsworth"
  | "Stacks Coffeehouse";

type PlaceData = {
  visited: boolean;
  tag: boolean;
};

type PlaceMap = Record<Place, PlaceData>;

type Marker = "Sharpie";
type BlackBook = "Black Book";

type Skill = Record<Marker, number>;

export type Thing = Marker | BlackBook;

export type Hero = {
  place: PlaceMap;
  placeAt: Place;
  rep: number;
  skill: Skill;
  things: Thing[];
};

export type State = {
  hero: Hero;
};

export type Move = (place: Place) => void;
export type Grab = (thing: Thing) => void;

type WriteObj = {
  marker: Marker;
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

export type Game = { verb: Verb; watch: AddWatch };

type Factory = () => Game;

export const createGame: Factory = () => {
  const hero: Hero = {
    placeAt: "Home Sweet Home",
    place: {
      "Gilded Raccoon": { tag: false, visited: false },
      "Home Sweet Home": { tag: false, visited: false },
      "Stacks Coffeehouse": { tag: false, visited: false },
      Killingsworth: { tag: false, visited: false },
    },
    rep: 0,
    skill: {
      Sharpie: 0,
    },
    things: [],
  };

  const state: State = {
    hero,
  };

  const update = () => watchList.forEach((watcher) => watcher(state));

  const grab: Grab = (item) => {
    if (hero.things.includes(item)) return;
    hero.things.push(item);
    update();
  };

  const move: Move = (location) => {
    hero.placeAt = location;
    hero.place[location].visited = true;
    update();
  };

  const tag: Tag = ({ place, marker }) => {
    hero.place[place].tag = true;
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

  const result: Game = {
    verb,
    watch,
  };

  return result;
};
