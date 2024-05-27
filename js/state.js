import { gildedRaccoonConfig } from "./place/gildedRaccoon.js";
import { homeConfig } from "./place/home.js";
import { killingsworthConfig } from "./place/killingsworth.js";
import { stacksConfig } from "./place/stacks.js";
export const createState = () => {
    const hero = {
        placeAt: "Home Sweet Home",
        place: {
            "Gilded Raccoon": 0,
            "Home Sweet Home": 0,
            "Stacks Coffeehouse": 0,
            Killingsworth: 0,
        },
        rep: 0,
        skill: {
            Sharpie: 0,
            Stickers: 0,
            Mop: 0,
        },
        things: [],
    };
    const placeMap = {
        "Gilded Raccoon": gildedRaccoonConfig,
        "Home Sweet Home": homeConfig,
        "Stacks Coffeehouse": stacksConfig,
        Killingsworth: killingsworthConfig,
    };
    const state = {
        hero,
        place: placeMap,
    };
    const update = () => watchList.forEach((watcher) => watcher(state));
    const grab = (item) => {
        if (hero.things.includes(item))
            return;
        hero.things.push(item);
        update();
    };
    const move = (place) => {
        hero.placeAt = place;
        hero.place[place]++;
        update();
    };
    const tag = ({ place, marker }) => {
        placeMap[place].tagged = "Me";
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
//# sourceMappingURL=state.js.map