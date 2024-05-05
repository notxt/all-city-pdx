export const createState = () => {
    const hero = {
        location: "home",
    };
    const watchMoveList = [];
    const watchMove = (watch) => watchMoveList.push(watch);
    const move = (location) => {
        hero.location = location;
        watchMoveList.forEach((watcher) => watcher(location));
    };
    const result = {
        hero,
        move,
        watchMove,
    };
    return result;
};
//# sourceMappingURL=state.js.map