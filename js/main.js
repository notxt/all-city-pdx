import { createGame } from "./game.js";
import { createView } from "./view/view.js";
const container = document.getElementById("game-container");
if (container === null)
    throw new Error("game-container is null");
const game = createGame();
container.appendChild(createView(game));
const startLocation = "Home Sweet Home";
game.action.move(startLocation);
//# sourceMappingURL=main.js.map