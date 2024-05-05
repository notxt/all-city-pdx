export const createHome = (configureLocation) => {
    return configureLocation({
        name: "Home Sweet Home",
        description: "Your cozy little corner of the world",
        goTo: [
            {
                description: "Open the door and walk outside",
                location: "Killingsworth",
            },
        ],
    });
};
//# sourceMappingURL=home.js.map