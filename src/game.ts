import { createContainer } from "./container.js";
import { createTitleScreen } from "./screen/title.js";

type State = "title";
type ViewMap = Record<State, HTMLElement>;

type Factory = () => HTMLElement;

export const startGame: Factory = () => {
  const container = createContainer();

  const viewMap: ViewMap = {
    title: createTitleScreen(),
  };

  let state: State = "title";
  container.setContent(viewMap[state]);

  // const update = (newState: State) => {
  //   state = newState;
  //   el.setContent(viewMap[state]);
  // };

  return container;
};
