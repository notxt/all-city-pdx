import { createGame } from "./game.js";
import { createView } from "./view/view.js";
const body = document.querySelector("body");
if (body === null)
    throw new Error("body is null");
const game = createGame();
body.appendChild(createView(game));
const startLocation = "Home Sweet Home";
game.verb.move(startLocation);
//# sourceMappingURL=main.js.map