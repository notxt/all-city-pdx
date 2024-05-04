import { startGame } from "./game.js";
const body = document.querySelector("body");
if (body === null)
    throw new Error("body is null");
body.appendChild(startGame());
//# sourceMappingURL=main.js.map