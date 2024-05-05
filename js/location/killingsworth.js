export const createKillingsworth = (configureLocation) => {
    return configureLocation({
        name: "Killingsworth",
        description: "A quiet street with a brewery on one side and a coffee shop on the other",
        goTo: [
            {
                description: "Go back inside",
                location: "Home Sweet Home",
            },
        ],
    });
};
//# sourceMappingURL=killingsworth.js.map