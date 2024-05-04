import { createContainer } from "./container.js";
import { createTitleScreen } from "./screen/title.js";
export const startGame = () => {
    const container = createContainer();
    const viewMap = {
        title: createTitleScreen(),
    };
    let state = "title";
    container.setContent(viewMap[state]);
    // const update = (newState: State) => {
    //   state = newState;
    //   el.setContent(viewMap[state]);
    // };
    return container;
};
//# sourceMappingURL=game.js.map