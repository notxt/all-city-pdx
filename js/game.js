export const createGame = () => {
    const hero = {
        location: "Home Sweet Home",
        visited: {
            "Gilded Raccoon": 0,
            "Home Sweet Home": 0,
            "Stacks Coffeehouse": 0,
            Killingsworth: 0,
        },
    };
    const state = {
        hero,
    };
    const moveWatchers = [];
    const watchMove = (callback) => moveWatchers.push(callback);
    const move = (location) => {
        hero.location = location;
        hero.visited[location]++;
        moveWatchers.forEach((watcher) => watcher(state));
    };
    const action = {
        move,
    };
    const watch = {
        move: watchMove,
    };
    const result = {
        action,
        watch,
    };
    return result;
};
//# sourceMappingURL=game.js.map