import { createGame } from "./game.js";

const container = document.getElementById("game-container");
if (container === null) throw new Error("game-container is null");

container.appendChild(createGame());
