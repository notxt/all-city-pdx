export type LocationName =
  | "Gilded Raccoon"
  | "Home Sweet Home"
  | "Killingsworth"
  | "Stacks Coffeehouse";

type Visited = Record<LocationName, number>;
export type Hero = {
  location: LocationName;
  visited: Visited;
};

export type State = {
  hero: Hero;
};

export type Move = (location: LocationName) => void;

export type Action = {
  move: Move;
};
type ActionType = keyof Action;

type WatchCallback = (state: State) => void;
type AddWatchCallback = (callback: WatchCallback) => void;
export type Watch = Record<ActionType, AddWatchCallback>;

export type Game = { action: Action; watch: Watch };

type Factory = () => Game;

export const createGame: Factory = () => {
  const hero: Hero = {
    location: "Home Sweet Home",
    visited: {
      "Gilded Raccoon": 0,
      "Home Sweet Home": 0,
      "Stacks Coffeehouse": 0,
      Killingsworth: 0,
    },
  };

  const state: State = {
    hero,
  };

  const moveWatchers: WatchCallback[] = [];
  const watchMove: AddWatchCallback = (callback) => moveWatchers.push(callback);

  const move: Move = (location) => {
    hero.location = location;
    hero.visited[location]++;
    moveWatchers.forEach((watcher) => watcher(state));
  };

  const action: Action = {
    move,
  };

  const watch: Watch = {
    move: watchMove,
  };

  const result: Game = {
    action,
    watch,
  };

  return result;
};
