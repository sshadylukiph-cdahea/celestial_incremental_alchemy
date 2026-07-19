addLayer("aal", {
    name: "Alchemy Altar",
    symbol: "❖",
    row: 2,
    universe: "LU",
    position: 2,
    startData() {return {
        unlocked: true,

        // element tab unlocks
        earthUnlocked: false,
        earthReq1Get: false,
        earthReq2Get: false,
        earthReq3Get: false,
        earthReq4Get: false,
        waterUnlocked: false,
        airUnlocked: false,
        fireUnlocked: false,

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
        thaumicOrb: { // activation button
            title() {return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-OFF.png' style='width:80px;height:80px;margin-top:4px'></img>"},
            canClick() {return false},
            unlocked() {return true},
            onClick() { 
                // no functionality for now
            },
            style: {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "#ffffff11", borderRadius: "100px" },
        },
        earthOrb: { // activation button
            title() {
                if(player.aal.earthReq1Get == true && player.aal.earthReq2Get == true && player.aal.earthReq3Get == true && player.aal.earthReq4Get == true)
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-EarthON.png' style='width:80px;height:80px;margin-top:4px'></img>"
                else
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-EarthOFF.png' style='width:80px;height:80px;margin-top:4px'></img>"
            },
            canClick() {return player.aal.earthUnlocked == false && player.aal.earthReq1Get == true && player.aal.earthReq2Get == true && player.aal.earthReq3Get == true && player.aal.earthReq4Get == true},
            unlocked() {return true},
            branches() {
                if(player.aal.earthUnlocked == true)
                    return [["thaumicOrb", "#008e4b"]]
                else
                    return [["thaumicOrb", "#ffffff11"]]
            },
            onClick() { 
                player.aal.earthUnlocked = true
            },
            style: {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "#ffffff11", borderRadius: "100px" },
        },
        waterOrb: { // activation button
            title() {return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-WaterOFF.png' style='width:80px;height:80px;margin-top:4px'></img>"},
            canClick() {return false},
            unlocked() {return true},
            branches: [["thaumicOrb", "#ffffff11"]],
            onClick() { 
                // no functionality for now
            },
            style: {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "#ffffff11", borderRadius: "100px" },
        },
        airOrb: { // activation button
            title() {return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-AirOFF.png' style='width:80px;height:80px;margin-top:4px'></img>"},
            canClick() {return false},
            unlocked() {return true},
            branches: [["thaumicOrb", "#ffffff11"]],
            onClick() { 
                // no functionality for now
            },
            style: {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "#ffffff11", borderRadius: "100px" },
        },
        fireOrb: { // activation button
            title() {return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-FireOFF.png' style='width:80px;height:80px;margin-top:4px'></img>"},
            canClick() {return false},
            unlocked() {return true},
            branches: [["thaumicOrb", "#ffffff11"]],
            onClick() { 
                // no functionality for now
            },
            style: {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "#ffffff11", borderRadius: "100px" },
        },
        earthOrbReq1: {
            title() {return formatShortWhole(player.cof.coreFragments[1]) + " / 1e12<hr>Nature Core Fragments"},
            canClick() {return player.cof.coreFragments[1].gte("1e12") && player.aal.earthReq1Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.aal.earthReq1Get == true) return [["earthOrb", "#008e4b"]]
                else if (this.canClick()) return [["earthOrb", "#008e4b55"]]
                else return [["earthOrb", "#ffffff11"]]
            },
            onClick() { 
                player.aal.earthReq1Get = true
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "9px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.aal.earthReq1Get == true) {
                look.background = "linear-gradient(to bottom, #00ff00, #00bb00, #005500";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #008e4b, #000000) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            else if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        earthOrbReq2: {
            title() {return formatShortWhole(player.n.pylonEnergy) + " / 1e15<hr>Nature Pylon Energy"},
            canClick() {return player.n.pylonEnergy.gte("1e15") && player.aal.earthReq2Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.aal.earthReq2Get == true) return [["earthOrb", "#008e4b"]]
                else if (this.canClick()) return [["earthOrb", "#008e4b55"]]
                else return [["earthOrb", "#ffffff11"]]
            },
            onClick() { 
                player.aal.earthReq2Get = true
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "9px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.aal.earthReq2Get == true) {
                look.background = "linear-gradient(to bottom, #00ff00, #00bb00, #005500";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #008e4b, #000000) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            else if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        earthOrbReq3: {
            title() {return formatShortWhole(player.tlb.jadeSymbols) + " / 100<hr>Jade Symbols"},
            canClick() {return player.tlb.jadeSymbols.gte(100) && player.aal.earthReq3Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.aal.earthReq3Get == true) return [["earthOrb", "#008e4b"]]
                else if (this.canClick()) return [["earthOrb", "#008e4b55"]]
                else return [["earthOrb", "#ffffff11"]]
            },
            onClick() { 
                player.aal.earthReq3Get = true
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "9px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.aal.earthReq3Get == true) {
                look.background = "linear-gradient(to bottom, #00ff00, #00bb00, #005500";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #008e4b, #000000) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            else if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        earthOrbReq4: {
            title() {return formatShortWhole(player.tlb.starmetalEssenceSymbols) + " / 25<hr>SME Symbols"},
            canClick() {return player.tlb.starmetalEssenceSymbols.gte(25) && player.aal.earthReq4Get == false},  
            unlocked() {return true},
            branches() {
                if(player.aal.earthReq4Get == true) return [["earthOrb", "#008e4b"]]
                else if (this.canClick()) return [["earthOrb", "#008e4b55"]]
                else return [["earthOrb", "#ffffff11"]]
            },
            onClick() { 
                player.aal.earthReq4Get = true
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "9px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.aal.earthReq4Get == true) {
                look.background = "linear-gradient(to bottom, #00ff00, #00bb00, #005500";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #008e4b, #000000) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            else if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["row",
                        [
                            ["column",
                                [
                                    ["hoverless-clickable", "fireOrbReq1"],
                                    ["hoverless-clickable", "fireOrbReq2"],
                                ]
                            ],
                            ["raw-html", () => {return "<img src='resources/alchemyworld/alcNode-Pylon-Radioactive.png' style='width:112px;height:160px'></img>"}],
                            ["column",
                                [
                                    ["hoverless-clickable", "fireOrbReq3"],
                                    ["hoverless-clickable", "fireOrbReq4"],
                                ]
                            ],
                        ]
                    ],
                    ["row",
                        [
                            ["hoverless-clickable", "fireOrb"]
                        ]
                    ],
                    ["row",
                        [
                            ["column",
                                [
                                    ["row",
                                        [
                                            ["hoverless-clickable", "airOrbReq1"],
                                            ["hoverless-clickable", "airOrbReq2"],
                                        ]
                                    ],
                                    ["raw-html", () => {return "<img src='resources/alchemyworld/alcNode-Pylon-Technological.png' style='width:160px;height:112px'></img>"}],
                                    ["row",
                                        [
                                            ["hoverless-clickable", "airOrbReq3"],
                                            ["hoverless-clickable", "airOrbReq4"],
                                        ]
                                    ],
                                ]
                            ],
                            ["hoverless-clickable", "airOrb"],
                            ["column", [], {width: "100px"}],
                            ["hoverless-clickable", "thaumicOrb"],
                            ["column", [], {width: "100px"}],
                            ["hoverless-clickable", "earthOrb"],
                            ["column",
                                [
                                    ["row",
                                        [
                                            ["hoverless-clickable", "earthOrbReq1"],
                                            ["hoverless-clickable", "earthOrbReq2"],
                                        ]
                                    ],
                                    ["raw-html", () => {return "<img src='resources/alchemyworld/alcNode-Pylon-Natural.png' style='width:160px;height:112px'></img>"}],
                                    ["row",
                                        [
                                            ["hoverless-clickable", "earthOrbReq3"],
                                            ["hoverless-clickable", "earthOrbReq4"],
                                        ]
                                    ],
                                ]
                            ],
                        ]
                    ],
                    ["row",
                        [
                            ["hoverless-clickable", "waterOrb"]
                        ]
                    ],
                    ["row",
                        [
                            ["column",
                                [
                                    ["hoverless-clickable", "waterOrbReq1"],
                                    ["hoverless-clickable", "waterOrbReq2"],
                                ]
                            ],
                            ["raw-html", () => {return "<img src='resources/alchemyworld/alcNode-Pylon-Paradox.png' style='width:112px;height:160px'></img>"}],
                            ["column",
                                [
                                    ["hoverless-clickable", "waterOrbReq3"],
                                    ["hoverless-clickable", "waterOrbReq4"],
                                ]
                            ],
                        ]
                    ],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("ssp", 103) }
})