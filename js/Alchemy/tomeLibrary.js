addLayer("tlb", {
    name: "Tome Library",
    symbol: "🕮",
    row: 1,
    universe: "LU",
    position: 1,
    startData() {return {
        unlocked: true,

        // tomes and revelation points
        tomes: new Decimal (0),
        tomesTotal: new Decimal (0),
        revelationPoints: new Decimal (0),
        revelationPointsGain: new Decimal (0),
        revelationPointsMult: new Decimal (1),

        // base symbols
        crimsonSymbols: new Decimal(0),
        goldSymbols: new Decimal(0),
        jadeSymbols: new Decimal(0),
        celesteSymbols: new Decimal(0),
        cobaltSymbols: new Decimal(0),
        amethystSymbols: new Decimal(0),

        // base symbols' powers
        crimsonSymbolPower: new Decimal(0),
        goldSymbolPower: new Decimal(0),
        jadeSymbolPower: new Decimal(0),
        celesteSymbolPower: new Decimal(0),
        cobaltSymbolPower: new Decimal(0),
        amethystSymbolPower: new Decimal(0),

        // 1st order symbols
        arcaneSymbols: new Decimal (0),
        starmetalAlloySymbols: new Decimal (0),
        starmetalEssenceSymbols: new Decimal (0),
        eclipseShardSymbols: new Decimal (0),
        spaceGemSymbols: new Decimal (0),
        planetSymbols: new Decimal (0),
        spaceRockSymbols: new Decimal (0),

        // 1st order symbols' powers
        arcaneSymbolPower: new Decimal (0),
        starmetalAlloySymbolPower: new Decimal (0),
        starmetalEssenceSymbolPower: new Decimal (0),
        eclipseShardSymbolPower: new Decimal (0),
        spaceGemSymbolPower: new Decimal (0),
        planetSymbolPower: new Decimal (0),
        spaceRockSymbolPower: new Decimal (0),
    }},
    nodeStyle: {
        background: "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)",
        backgroundOrigin: "border-box",
        borderColor: "transparent",
        color: "#000000",
        borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1",
        boxShadow: "0 0 3px 1px #000000 inset",
        borderRadius: "30px",
        transform: "translateY(-0px)"
    },
    tooltip: "Tome Library",
    color: "silver",
    branches: ["ssp"],
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Transmutations": {
                buttonStyle() {return {color: "#000000", backgroundColor: "#787878", backgroundImage: "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)", borderColor: "#F8C898", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset"}},
                unlocked() {return true},
                content: [
                    
                ]
            },
            "Bargaining": {
                buttonStyle() {return {color: "#000000", backgroundColor: "#787878", backgroundImage: "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)", borderColor: "#F8C898", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset"}},
                unlocked() {return true},
                content: [
                    
                ]
            },
        },
    },
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() {return player.startedGame == true && hasUpgrade("ssp", 101)}
})