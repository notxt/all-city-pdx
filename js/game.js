export const createGame = () => {
    const hero = {
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
    const state = {
        hero,
    };
    const update = () => watchList.forEach((watcher) => watcher(state));
    const grab = (item) => {
        if (hero.things.includes(item))
            return;
        hero.things.push(item);
        update();
    };
    const move = (location) => {
        hero.placeAt = location;
        hero.place[location].visited = true;
        update();
    };
    const tag = ({ place, marker }) => {
        hero.place[place].tag = true;
        hero.skill[marker]++;
        update();
    };
    const watchList = [];
    const watch = (callback) => watchList.push(callback);
    const verb = {
        grab,
        move,
        tag,
    };
    const result = {
        verb,
        watch,
    };
    return result;
};
//# sourceMappingURL=game.js.map