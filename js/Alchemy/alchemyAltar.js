addLayer("aal", {
    name: "Alchemy Altar",
    symbol: "❖",
    row: 2,
    universe: "LU",
    position: 2,
    startData() {return {
        unlocked: true,

        stopTime: new Decimal(0),

        // element resources
        earthStarmetal: new Decimal(0),
        currentEarthStarmetalTime: new Decimal(0),
        earthStarmetalGain: new Decimal(1),
        earthStarmetalMult: new Decimal(1),
        earthStarmetalEssence: new Decimal(0),
        earthStarmetalEssenceCap: new Decimal(1000),
        earthStarmetalEssenceGain: new Decimal(0),

        waterStarmetal: new Decimal(0),
        currentWaterStarmetalTime: new Decimal(0),
        waterStarmetalGain: new Decimal(1),
        waterStarmetalMult: new Decimal(1),
        waterStarmetalEssence: new Decimal(0),
        waterStarmetalEssenceCap: new Decimal(1000),
        waterStarmetalEssenceGain: new Decimal(0),

        airStarmetal: new Decimal(0),
        currentAirStarmetalTime: new Decimal(0),
        airStarmetalGain: new Decimal(1),
        airStarmetalMult: new Decimal(1),
        airStarmetalEssence: new Decimal(0),
        airStarmetalEssenceCap: new Decimal(1000),
        airStarmetalEssenceGain: new Decimal(0),
        
        fireStarmetal: new Decimal(0),
        currentFireStarmetalTime: new Decimal(0),
        fireStarmetalGain: new Decimal(1),
        fireStarmetalMult: new Decimal(1),
        fireStarmetalEssence: new Decimal(0),
        fireStarmetalEssenceCap: new Decimal(1000),
        fireStarmetalEssenceGain: new Decimal(0),
    }},

    update(delta) {
        let onepersec = new Decimal(1)

        // Earth Starmetal Making
        player.aal.currentEarthStarmetalTime = player.aal.currentEarthStarmetalTime.sub(onepersec.mul(delta))
        if (player.aal.currentEarthStarmetalTime.lte(0)) {
            player.aal.currentEarthStarmetalTime = player.aal.stopTime
        };
        // Earth Starmetal Essence Making
        if (player.aal.earthStarmetal.gte(1)) {
            player.aal.earthStarmetalEssence = player.aal.earthStarmetalEssence.add(onepersec.mul(delta).mul(player.aal.earthStarmetalEssenceGain)),
            player.aal.earthStarmetalEssenceGain = player.aal.earthStarmetal
            player.aal.earthStarmetalEssenceGain = player.aal.earthStarmetalEssenceGain //.mul(buyableEffect("aal", 12)) // increases gain
        };
        player.aal.earthStarmetalEssenceCap = new Decimal(1000)
        player.aal.earthStarmetalEssenceCap = player.aal.earthStarmetalEssenceCap //.mul(buyableEffect("aal", 14))
        if (player.aal.earthStarmetalEssence.gt(player.aal.earthStarmetalEssenceCap)) {
            player.aal.earthStarmetalEssence = player.aal.earthStarmetalEssenceCap
        }
        // Earth Starmetal Modifiers
        player.aal.earthStarmetalGain = player.aal.earthStarmetalMult //.mul(buyableEffect("aal", 11))



        // Water Starmetal Making
        player.aal.currentWaterStarmetalTime = player.aal.currentWaterStarmetalTime.sub(onepersec.mul(delta))
        if (player.aal.currentWaterStarmetalTime.lte(0)) {
            player.aal.currentWaterStarmetalTime = player.aal.stopTime
        };
        // Water Starmetal Essence Making
        if (player.aal.waterStarmetal.gte(1)) {
            player.aal.waterStarmetalEssence = player.aal.waterStarmetalEssence.add(onepersec.mul(delta).mul(player.aal.waterStarmetalEssenceGain)),
            player.aal.waterStarmetalEssenceGain = player.aal.waterStarmetal
            player.aal.waterStarmetalEssenceGain = player.aal.waterStarmetalEssenceGain //.mul(buyableEffect("aal", 22)) // increases gain
        };
        player.aal.waterStarmetalEssenceCap = new Decimal(1000)
        player.aal.waterStarmetalEssenceCap = player.aal.waterStarmetalEssenceCap //.mul(buyableEffect("aal", 24))
        if (player.aal.waterStarmetalEssence.gte(player.aal.waterStarmetalEssenceCap)) {
            player.aal.waterStarmetalEssence = player.aal.waterStarmetalEssenceCap
        };
        // Water Starmetal Modifiers
        player.aal.waterStarmetalGain = player.aal.waterStarmetalMult //.mul(buyableEffect("aal", 21))



        // Air Starmetal Making
        player.aal.currentAirStarmetalTime = player.aal.currentAirStarmetalTime.sub(onepersec.mul(delta))
        if (player.aal.currentAirStarmetalTime.lte(0)) {
            player.aal.currentAirStarmetalTime = player.aal.stopTime
        };
        // Air Starmetal Essence Making
        if (player.aal.airStarmetal.gte(1)) {
            player.aal.airStarmetalEssence = player.aal.airStarmetalEssence.add(onepersec.mul(delta).mul(player.aal.airStarmetalEssenceGain)),
            player.aal.airStarmetalEssenceGain = player.aal.airStarmetal
            player.aal.airStarmetalEssenceGain = player.aal.airStarmetalEssenceGain //.mul(buyableEffect("aal", 32)) // increases gain
        };
        player.aal.airStarmetalEssenceCap = new Decimal(1000)
        player.aal.airStarmetalEssenceCap = player.aal.airStarmetalEssenceCap //.mul(buyableEffect("aal", 34))
        if (player.aal.airStarmetalEssence.gte(player.aal.airStarmetalEssenceCap)) {
            player.aal.airStarmetalEssence = player.aal.airStarmetalEssenceCap
        };
        // Air Starmetal Modifiers
        player.aal.airStarmetalGain = player.aal.airStarmetalMult //.mul(buyableEffect("aal", 31))


        // Fire Starmetal Making
        player.aal.currentFireStarmetalTime = player.aal.currentFireStarmetalTime.sub(onepersec.mul(delta))
        if (player.aal.currentFireStarmetalTime.lte(0)) {
            player.aal.currentFireStarmetalTime = player.aal.stopTime
        };
        // Fire Starmetal Essence Making
        if (player.aal.fireStarmetal.gte(1)) {
            player.aal.fireStarmetalEssence = player.aal.fireStarmetalEssence.add(onepersec.mul(delta).mul(player.aal.fireStarmetalEssenceGain)),
            player.aal.fireStarmetalEssenceGain = player.aal.fireStarmetal
            player.aal.fireStarmetalEssenceGain = player.aal.fireStarmetalEssenceGain //.mul(buyableEffect("aal", 42)) // increases gain
        };
        player.aal.fireStarmetalEssenceCap = new Decimal(1000)
        player.aal.fireStarmetalEssenceCap = player.aal.fireStarmetalEssenceCap //.mul(buyableEffect("aal", 44))
        if (player.aal.fireStarmetalEssence.gte(player.aal.fireStarmetalEssenceCap)) {
            player.aal.fireStarmetalEssence = player.aal.fireStarmetalEssenceCap
        };
        // Fire Starmetal Modifiers
        player.aal.fireStarmetalGain = player.aal.fireStarmetalMult //.mul(buyableEffect("aal", 41))

        // Sets gains to 0 if Altered SMA = 0
        if (player.aal.earthStarmetal.lte(0)) {
            player.aal.earthStarmetalEssenceGain = new Decimal(0)
        }
        if (player.aal.waterStarmetal.lte(0)) {
            player.aal.waterStarmetalEssenceGain = new Decimal(0)
        }
        if (player.aal.airStarmetal.lte(0)) {
            player.aal.airStarmetalEssenceGain = new Decimal(0)
        }
        if (player.aal.fireStarmetal.lte(0)) {
            player.aal.fireStarmetalEssenceGain = new Decimal(0)
        }

    },

    branches: ["ssp", "ctb"],
    nodeStyle: {
        backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff00ff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff00ff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-radial-gradient(circle, transparent, transparent 9%, #ff00ff78 10%, #ff00ff78 11%, transparent 12%), repeating-radial-gradient(circle, transparent, #ff00ff78 9%, #ff00ff78 10%, transparent 25%), conic-gradient( #c7442fab, #5d0000ab, transparent, #002f00ab, #008e48ab, #002f00ab, transparent, #002b4aab, #1e8eb3ab, #002b4aab, transparent, #2f3208ab, #c7c796ab, #2f3208ab, transparent, #5d0000ab, #c7442fab), radial-gradient(circle, #880088, #330033)",
        backgroundOrigin: "border-box",
        borderColor: "transparent",
        color: "#00ff00",
        'text-shadow' : "0 0 5px #ffffffab, 0 0 10px #000000, 0 0 10px #000000",
        textStroke: "1px #ff00ff",
        borderImage: "radial-gradient(circle, #550055 75%, #ff00ff) 1",
        boxShadow: "0 0 3px 1px #000000 inset",
        borderRadius: "0px"
    },
    tooltip: "Alchemy Altar",
    color: "white",

    clickables: {
        
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Apparatus": {
                buttonStyle() { return { color: "black", background: "linear-gradient(to bottom, #8b609c, magenta, pink)", borderColor: "transparent", borderImage: "linear-gradient(to bottom, chartreuse, #00ff9d) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px black inset" } },
                unlocked() { return true },
                content: [
                ]
            },
        },
    },
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("ssp", 103) }
})