const elementName = [
                        "None",
                        "Earth",
                        "Water",
                        "Air",
                        "Fire"
]

addLayer("eft", {
    name: "The Elemental Fusion Table", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "✴︎", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 3,
    universe: "LU",
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        // Trigger condition for KTB upgrades
        voidigenesisUnlocked: false,
        alkahestCreationUnlocked: false,
        aetherogenesisUnlocked: false,
        infernalTheoryUnlocked: false,

        // Fusion Components
        starmetalSelectionIndex: new Decimal(0), // Starmetal Select Number
        selectedStarmetalEarth: false,
        symbolEarthSM: new Decimal(0),
        selectedStarmetalWater: false,
        symbolWaterSM: new Decimal(0),
        selectedStarmetalAir: false,
        symbolAirSM: new Decimal(0),
        selectedStarmetalFire: false,
        symbolFireSM: new Decimal(0),
        fusionTime: new Decimal(0),

        // Checks whether a 1st Order Element is unlocked
        mudUnlocked: false,
        iceUnlocked: false,
        magmaUnlocked: false,
        steamUnlocked: false,
        sandUnlocked: false,
        voidUnlocked: false,
        alkhaestUnlocked: false,
        aetherUnlocked: false,
        infernoUnlocked: false,

        // 1st Order Element Symbol versions
        symbolMudSM: new Decimal(0),
        symbolIceSM: new Decimal(0),
        symbolMagmaSM: new Decimal(0),
        symbolSteamSM: new Decimal(0),
        symbolSandSM: new Decimal(0),
        symbolVoidSM: new Decimal(0),
        symbolAlkahestSM: new Decimal(0),
        symbolAetherSM: new Decimal(0),
        symbolInfernoSM: new Decimal(0),

        // 1st Order Element Resources
        // earth + water || water + earth = mud
        mudStarmetal: new Decimal(0),
        currentEarthStarmetalTime: new Decimal(0),
        mudStarmetalGain: new Decimal(1),
        mudStarmetalMult: new Decimal(1),
        mudStarmetalEssence: new Decimal(0),
        mudStarmetalEssenceCap: new Decimal(1000),
        mudStarmetalEssenceGain: new Decimal(1),

        // water + air || air + water = ice
        iceStarmetal: new Decimal(0),
        currentIceStarmetalTime: new Decimal(0),
        iceStarmetalGain: new Decimal(1),
        iceStarmetalMult: new Decimal(1),
        iceStarmetalEssence: new Decimal(0),
        iceStarmetalEssenceCap: new Decimal(1000),
        iceStarmetalEssenceGain: new Decimal(1),

        // earth + fire || fire + earth = magma
        magmaStarmetal: new Decimal(0),
        currentMagmaStarmetalTime: new Decimal(0),
        magmaStarmetalGain: new Decimal(1),
        magmaStarmetalMult: new Decimal(1),
        magmaStarmetalEssence: new Decimal(0),
        magmaStarmetalEssenceCap: new Decimal(1000),
        magmaStarmetalEssenceGain: new Decimal(1),

        // fire + water || water + fire = steam
        steamStarmetal: new Decimal(0),
        currentSteamStarmetalTime: new Decimal(0),
        steamStarmetalGain: new Decimal(1),
        steamStarmetalMult: new Decimal(1),
        steamStarmetalEssence: new Decimal(0),
        steamStarmetalEssenceCap: new Decimal(1000),
        steamStarmetalEssenceGain: new Decimal(1),

        // earth + air || air + earth = sand
        sandStarmetal: new Decimal(0),
        currentSandStarmetalTime: new Decimal(0),
        sandStarmetalGain: new Decimal(1),
        sandStarmetalMult: new Decimal(1),
        sandStarmetalEssence: new Decimal(0),
        sandStarmetalEssenceCap: new Decimal(1000),
        sandStarmetalEssenceGain: new Decimal(1),

        // Progression Blockers
        // REQUIRES VOIDIGENESIS (crucial)
        // magma + ice || steam + sand = void (later mud + inferno)
        voidStarmetal: new Decimal(0),
        currentVoidStarmetalTime: new Decimal(0),
        voidStarmetalGain: new Decimal(1),
        voidStarmetalMult: new Decimal(1),
        voidStarmetalEssence: new Decimal(0),
        voidStarmetalEssenceCap: new Decimal(1000),
        voidStarmetalEssenceGain: new Decimal(1),

        // REQUIRES ALKAHEST CREATION
        // fire + water + air + earth + void = alkahest, implement explosion [hard]
        alkahestStarmetal: new Decimal(0),
        currentAlkahestStarmetalTime: new Decimal(0),
        alkahestStarmetalGain: new Decimal(1),
        alkahestStarmetalMult: new Decimal(1),
        alkahestStarmetalEssence: new Decimal(0),
        alkahestStarmetalEssenceCap: new Decimal(1000),
        alkahestStarmetalEssenceGain: new Decimal(1),

        // REQUIRES AETHEROGENESIS CREATION (crucial)
        // fire + water + air + earth = aether
        aetherStarmetal: new Decimal(0),
        currentAetherStarmetalTime: new Decimal(0),
        aetherStarmetalGain: new Decimal(1),
        aetherStarmetalMult: new Decimal(1),
        aetherStarmetalEssence: new Decimal(0),
        aetherStarmetalEssenceCap: new Decimal(1000),
        aetherStarmetalEssenceGain: new Decimal(1),

        // REQUIRES INFERNAL THEORY (Will boost Void production when combined with Mud)
        // air + fire || fire + air = inferno
        infernoStarmetal: new Decimal(0),
        currentInfernoStarmetalTime: new Decimal(0),
        infernoStarmetalGain: new Decimal(1),
        infernoStarmetalMult: new Decimal(1),
        infernoStarmetalEssence: new Decimal(0),
        infernoStarmetalEssenceCap: new Decimal(1000),
        infernoStarmetalEssenceGain: new Decimal(1),

        // Progression Blockers 2 (Preparation for the Color Incremental)
        // REQUIRES PHOTON MANIPULATION
        // Uses a lot of Starmetal Alloy/Essence AND requires Ancient Core Fragments / Pylon Energy to produce
        lightStarmetal: new Decimal(0),
        currentLightStarmetalTime: new Decimal(0),
        lightStarmetalGain: new Decimal(1),
        lightStarmetalMult: new Decimal(1),
        lightStarmetalEssence: new Decimal(0),
        lightStarmetalEssenceCap: new Decimal(1000),
        lightStarmetalEssenceGain: new Decimal(1),

        shadowStarmetal: new Decimal(0),
        currentShadowStarmetalTime: new Decimal(0),
        shadowStarmetalGain: new Decimal(1),
        shadowStarmetalMult: new Decimal(1),
        shadowStarmetalEssence: new Decimal(0),
        shadowStarmetalEssenceCap: new Decimal(1000),
        shadowStarmetalEssenceGain: new Decimal(1),

        // REQUIRES DIMENSIONAL SLICER
        // Repurposes ??? Core Fragments / Pylon Energy (Time Starmetal) and Cosmic Core Fragments / Pylon Energy (Space Starmetal)
        timeStarmetal: new Decimal(0),
        currentTimeStarmetalTime: new Decimal(0),
        timeStarmetalGain: new Decimal(1),
        timeStarmetalMult: new Decimal(1),
        timeStarmetalEssence: new Decimal(0),
        timeStarmetalEssenceCap: new Decimal(1000),
        timeStarmetalEssenceGain: new Decimal(1),

        spaceStarmetal: new Decimal(0),
        currentSpaceStarmetalTime: new Decimal(0),
        spaceStarmetalGain: new Decimal(1),
        spaceStarmetalMult: new Decimal(1),
        spaceStarmetalEssence: new Decimal(0),
        spaceStarmetalEssenceCap: new Decimal(1000),
        spaceStarmetalEssenceGain: new Decimal(1),

        // Higher Order Elements will be placed in the 2nd Order Fusions.
        // Three Primes and Seven Classical Metals will be collected during the Mining Update, if it comes.
        // Philosopher's Stone will be made in the Planet of Synthesis, hometown of Louki-syhda (Zioe'zettottr).
        
    }},
    automate() {},

    nodeStyle: {
        background: "radial-gradient(circle, #440022 25%, #bb00bb 75%, #ff1baa 100%)",
        backgroundOrigin: "border-box",
        borderColor: "transparent",
        color: "#ffaadd",
        borderImage: "radial-gradient(circle, hotpink, crimson) 1",
        boxShadow: "0 0 3px 1px black inset",
        borderRadius: "0px",
        transform: "translateY(-0px)"
    },

    tooltip: "The Elemental Fusion Table",
    color: "white",

    update(delta) {
        let onepersec = new Decimal(1)

        // fusion times
        player.eft.fusionTime = player.eft.fusionTime.sub(onepersec.mul(delta))
        if (player.eft.fusionTime.lte(0)) {
            player.eft.fusionTime = player.aal.stopTime
        }
    },
    
    branches: ["aal", "phl"],

    grid: {
        rows: 1,
        cols: 2,
        getStartData(id) {
            if (id == undefined) return undefined;
            return 0
        },
        getDisplay(data) {
            let str = ""
            if (data != -1) str = "<img src='resources/alchemyworld/symbol" + elementName[data] + "SM.png' style='width:84px;height:84px'></img>"
            return str
        },
        onClick(data, id) {
            if (data != -1) {
                if (player.eft.selectedStarmetalEarth == true || player.eft.selectedStarmetalWater == true || player.eft.selectedStarmetalAir == true || player.eft.selectedStarmetalFire == true) {
                    setGridData("eft", id, player.eft.starmetalSelectionIndex)
                } else {
                    player.eft.starmetalSelectionIndex = 0;
                    setGridData("eft", id, 0)
                }
            }
        },
        getStyle() {
            let look = {width: "112px", height: "112px", background: "linear-gradient(45deg, #220022, #440022, #220022)", border: "5px solid #770077", borderRadius: "0", padding: "0", margin: "50px", boxShadow: " 0 0 5px 5px #bb00bb78,  0 0 5px 5px #bb00bb78 inset"}
            return look
        }
    },

    clickables: {
        // Alkahest
        0: {
            title() {return "<img src='resources/alchemyworld/alcNode-Alkahest.png' style='width:84px;height:84px;margin-left:0px;margin-top:4px'></img>"},
            canClick() {return false},
            branches: [1, 2, 3, 4, 16],
            unlocked() {return player.eft.alkahestUnlocked == true},
            onClick() { 
                // no functionality for now
            },
            style: { border: "transparent", background: "transparent", borderRadius: "84px" },
        },
        
        // Classical Elements
        1: {
            title() {return "<img src='resources/alchemyworld/alcNode-Earth.png' style='width:84px;height:84px;margin-left:0px;margin-top:4px'></img>"},
            canClick() {return false},
            branches: [],
            unlocked() {return true},
            onClick() { 
                // no functionality for now
            },
            style: { border: "transparent", background: "transparent", borderRadius: "84px" },
        },
        2: {
            title() {return "<img src='resources/alchemyworld/alcNode-Water.png' style='width:84px;height:84px;margin-left:0px;margin-top:4px'></img>"},
            canClick() {return false},
            branches: [],
            unlocked() {return true},
            onClick() { 
                // no functionality for now
            },
            style: { border: "transparent", background: "transparent", borderRadius: "84px" },
        },
        3: {
            title() {return "<img src='resources/alchemyworld/alcNode-Air.png' style='width:84px;height:84px;margin-left:0px;margin-top:4px'></img>"},
            canClick() {return false},
            branches: [],
            unlocked() {return true},
            onClick() { 
                // no functionality for now
            },
            style: { border: "transparent", background: "transparent", borderRadius: "84px" },
        },
        4: {
            title() {return "<img src='resources/alchemyworld/alcNode-Fire.png' style='width:84px;height:84px;margin-left:0px;margin-top:4px'></img>"},
            canClick() {return false},
            branches: [],
            unlocked() {return true},
            onClick() { 
                // no functionality for now
            },
            style: { border: "transparent", background: "transparent", borderRadius: "84px" },
        },

        // 1st Order Elements
        // 1st Set
        11: {
            title() {return "<img src='resources/alchemyworld/alcNode-Mud.png' style='width:84px;height:84px;margin-left:0px;margin-top:4px'></img>"},
            canClick() {return false},
            branches: [1, 2],
            unlocked() {return player.eft.mudUnlocked == true},
            onClick() { 
                // no functionality for now
            },
            style: { border: "transparent", background: "transparent", borderRadius: "84px" },
        },
        12: {
            title() {return "<img src='resources/alchemyworld/alcNode-Ice.png' style='width:84px;height:84px;margin-left:0px;margin-top:4px'></img>"},
            canClick() {return false},
            branches: [2, 3],
            unlocked() {return player.eft.iceUnlocked == true},
            onClick() { 
                // no functionality for now
            },
            style: { border: "transparent", background: "transparent", borderRadius: "84px" },
        },
        13: {
            title() {return "<img src='resources/alchemyworld/alcNode-Magma.png' style='width:84px;height:84px;margin-left:0px;margin-top:4px'></img>"},
            canClick() {return false},
            branches: [1, 4],
            unlocked() {return player.eft.magmaUnlocked == true},
            onClick() { 
                // no functionality for now
            },
            style: { border: "transparent", background: "transparent", borderRadius: "84px" },
        },
        14: {
            title() {return "<img src='resources/alchemyworld/alcNode-Steam.png' style='width:84px;height:84px;margin-left:0px;margin-top:4px'></img>"},
            canClick() {return false},
            branches: [2, 4],
            unlocked() {return player.eft.steamUnlocked == true},
            onClick() { 
                // no functionality for now
            },
            style: { border: "transparent", background: "transparent", borderRadius: "84px" },
        },
        15: {
            title() {return "<img src='resources/alchemyworld/alcNode-Sand.png' style='width:84px;height:84px;margin-left:0px;margin-top:4px'></img>"},
            canClick() {return false},
            branches: [1, 3],
            unlocked() {return player.eft.sandUnlocked == true},
            onClick() { 
                // no functionality for now
            },
            style: { border: "transparent", background: "transparent", borderRadius: "84px" },
        },

        // KNOWLEDGE TABLE STUFF - 2nd set
        16: {
            title() {return "<img src='resources/alchemyworld/alcNode-Void.png' style='width:84px;height:84px;margin-left:0px;margin-top:4px'></img>"},
            canClick() {return false},
            branches: [11, 12, 13, 14, 15, 18],
            unlocked() {return player.eft.voidUnlocked == true},
            onClick() { 
                // no functionality for now
            },
            style: { border: "transparent", background: "transparent", borderRadius: "84px" },
        },
        17: {
            title() {return "<img src='resources/alchemyworld/alcNode-Aether.png' style='width:84px;height:84px;margin-left:0px;margin-top:4px'></img>"},
            canClick() {return false},
            branches: [1, 2, 3, 4],
            unlocked() {return player.eft.aetherUnlocked == true},
            onClick() { 
                // no functionality for now
            },
            style: { border: "transparent", background: "transparent", borderRadius: "84px" },
        },
        18: {
            title() {return "<img src='resources/alchemyworld/alcNode-Inferno.png' style='width:84px;height:84px;margin-left:0px;margin-top:4px'></img>"},
            canClick() {return false},
            branches: [3, 4],
            unlocked() {return player.eft.infernoUnlocked == true},
            onClick() { 
                // no functionality for now
            },
            style: { border: "transparent", background: "transparent", borderRadius: "84px" },
        },

        // Altered Starmetal Selections
        101: {
            title() {return "Select"},
            canClick() {return player.eft.symbolEarthSM.gte(1)},
            unlocked() { 
            if (player.eft.selectedStarmetalEarth) {return false}
            else {return true}
            },
            onClick() {
                player.eft.starmetalSelectionIndex = 1;
                player.eft.selectedStarmetalEarth = true;
                player.eft.selectedStarmetalWater = false;
                player.eft.selectedStarmetalAir = false;
                player.eft.selectedStarmetalFire = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        102: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.eft.selectedStarmetalEarth},
            onClick() {
                player.eft.starmetalSelectionIndex = 0;
                player.eft.selectedStarmetalEarth = false;
                player.eft.selectedStarmetalWater = false;
                player.eft.selectedStarmetalAir = false;
                player.eft.selectedStarmetalFire = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #660000, #990000, #bb0000)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, #330000, black) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        103: {
            title() {return "Select"},
            canClick() {return player.eft.symbolWaterSM.gte(1)},
            unlocked() {
            if (player.eft.selectedStarmetalWater) {return false}
            else {return true}
            },
            onClick() {
                player.eft.starmetalSelectionIndex = 2;
                player.eft.selectedStarmetalEarth = false;
                player.eft.selectedStarmetalWater = true;
                player.eft.selectedStarmetalAir = false;
                player.eft.selectedStarmetalFire = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        104: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.eft.selectedStarmetalWater},
            onClick() {
                player.eft.starmetalSelectionIndex = 0;
                player.eft.selectedStarmetalEarth = false;
                player.eft.selectedStarmetalWater = false;
                player.eft.selectedStarmetalAir = false;
                player.eft.selectedStarmetalFire = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #660000, #990000, #bb0000)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, #330000, black) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        105: {
            title() {return "Select"},
            canClick() {return player.eft.symbolAirSM.gte(1)},
            unlocked() {
            if (player.eft.selectedStarmetalAir) {return false}
            else {return true}
            },
            onClick() {
                player.eft.starmetalSelectionIndex = 3;
                player.eft.selectedStarmetalEarth = false;
                player.eft.selectedStarmetalWater = false;
                player.eft.selectedStarmetalAir = true;
                player.eft.selectedStarmetalFire = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        106: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.eft.selectedStarmetalAir},
            onClick() {
                player.eft.starmetalSelectionIndex = 0;
                player.eft.selectedStarmetalEarth = false;
                player.eft.selectedStarmetalWater = false;
                player.eft.selectedStarmetalAir = false;
                player.eft.selectedStarmetalFire = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #660000, #990000, #bb0000)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, #330000, black) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        107: {
            title() {return "Select"},
            canClick() {return player.eft.symbolFireSM.gte(1)},
            unlocked() {
            if (player.eft.selectedStarmetalFire) {return false}
            else {return true}
            },
            onClick() {
                player.eft.starmetalSelectionIndex = 4;
                player.eft.selectedStarmetalEarth = false;
                player.eft.selectedStarmetalWater = false;
                player.eft.selectedStarmetalAir = false;
                player.eft.selectedStarmetalFire = true
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.backgroundColor = "#333333"
                look.border = "3px solid #000000"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        108: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.eft.selectedStarmetalFire},
            onClick() {
                player.eft.starmetalSelectionIndex = 0;
                player.eft.selectedStarmetalEarth = false;
                player.eft.selectedStarmetalWater = false;
                player.eft.selectedStarmetalAir = false;
                player.eft.selectedStarmetalFire = false
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #660000, #990000, #bb0000)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, #330000, black) 1"
                look.color = "black"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },

        // Fusion Buttons
        110: {
            title() {return "Cannot fuse Altered SM Symbols!"},
            canClick() {return false},
            unlocked() {
                
                if (tmp.eft.clickables[111].unlocked || tmp.eft.clickables[112].unlocked || tmp.eft.clickables[113].unlocked || tmp.eft.clickables[114].unlocked || tmp.eft.clickables[115].unlocked || tmp.eft.clickables[116].unlocked || tmp.eft.clickables[117].unlocked)
                     {return false} else return true
                },
            style() {
            let look = {width: '500px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            return look
            }
        },
        111: {
            title() {return "Fuse 10 Earth SM Symbols and 10 Water SM Symbols into<br><h2>1 Mud SM Symbol.</h2><br><small>Unlocks the -Dirt Aggregator- upon first fusion.</small>"},
            canClick() {return player.eft.symbolEarthSM.gte(10) && player.eft.symbolWaterSM.gte(10) && player.eft.fusionTime.lte(0) },
            unlocked() {
                if (getGridData("eft", 101) == 1 && getGridData("eft", 102) == 2)
                {return true}
                else if (getGridData("eft", 101) == 2 && getGridData("eft", 102) == 1)
                {return true}
            },
            onClick() {
                player.eft.starmetalSelectionIndex = 0;
                player.eft.selectedStarmetalEarth = false;
                player.eft.selectedStarmetalWater = false;
                player.eft.selectedStarmetalAir = false;
                player.eft.selectedStarmetalFire = false;

                player.eft.symbolEarthSM = player.eft.symbolEarthSM.sub(10);
                player.eft.symbolWaterSM = player.eft.symbolWaterSM.sub(10);
                player.eft.symbolMudSM = player.eft.symbolMudSM.add(1);
                player.eft.fusionTime = player.eft.fusionTime.add(300);
                player.eft.mudUnlocked = true
            },
            style() {
            let look = {width: '500px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "radial-gradient(circle, #440022 25%, #bb00bb 75%, #ff1baa 100%)"
                look.borderColor = "transparent"
                look.borderImage = "radial-gradient(circle, hotpink, crimson) 1"
                look.color = "#ffaadd"
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
        112: {
            title() {return "Fuse 10 Water SM Symbols and 10 Air SM Symbols into<br><h2>1 Ice SM Symbol.</h2><br><small>Unlocks the -Polar Vortex- upon first fusion.</small>"},
            canClick() {return player.eft.symbolWaterSM.gte(10) && player.eft.symbolAirSM.gte(10) && player.eft.fusionTime.lte(0) },
            unlocked() {
                if (getGridData("eft", 101) == 2 && getGridData("eft", 102) == 3)
                {return true}
                else if (getGridData("eft", 101) == 3 && getGridData("eft", 102) == 2)
                {return true}
            },
            onClick() {
                player.eft.starmetalSelectionIndex = 0;
                player.eft.selectedStarmetalEarth = false;
                player.eft.selectedStarmetalWater = false;
                player.eft.selectedStarmetalAir = false;
                player.eft.selectedStarmetalFire = false;

                player.eft.symbolWaterSM = player.eft.symbolWaterSM.sub(10);
                player.eft.symbolAirSM = player.eft.symbolAirSM.sub(10);
                player.eft.symbolIceSM = player.eft.symbolIceSM.add(1);
                player.eft.fusionTime = player.eft.fusionTime.add(300);
                player.eft.iceUnlocked = true
            },
            style() {
            let look = {width: '500px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "radial-gradient(circle, #440022 25%, #bb00bb 75%, #ff1baa 100%)"
                look.borderColor = "transparent"
                look.borderImage = "radial-gradient(circle, hotpink, crimson) 1"
                look.color = "#ffaadd"
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
        113: {
            title() {return "Fuse 10 Earth SM Symbols and 10 Fire SM Symbols into<br><h2>1 Magma SM Symbol.</h2><br><small>Unlocks the -Super Volcano- upon first fusion.</small>"},
            canClick() {return player.eft.symbolEarthSM.gte(10) && player.eft.symbolFireSM.gte(10) && player.eft.fusionTime.lte(0) },
            unlocked() {
                if (getGridData("eft", 101) == 1 && getGridData("eft", 102) == 4)
                {return true}
                else if (getGridData("eft", 101) == 4 && getGridData("eft", 102) == 1)
                {return true}
            },
            onClick() {
                player.eft.starmetalSelectionIndex = 0;
                player.eft.selectedStarmetalEarth = false;
                player.eft.selectedStarmetalWater = false;
                player.eft.selectedStarmetalAir = false;
                player.eft.selectedStarmetalFire = false;

                player.eft.symbolEarthSM = player.eft.symbolEarthSM.sub(10);
                player.eft.symbolFireSM = player.eft.symbolFireSM.sub(10);
                player.eft.symbolMagmaSM = player.eft.symbolMagmaSM.add(1);
                player.eft.fusionTime = player.eft.fusionTime.add(300);
                player.eft.magmaUnlocked = true
            },
            style() {
            let look = {width: '500px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "radial-gradient(circle, #440022 25%, #bb00bb 75%, #ff1baa 100%)"
                look.borderColor = "transparent"
                look.borderImage = "radial-gradient(circle, hotpink, crimson) 1"
                look.color = "#ffaadd"
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
        114: {
            title() {return "Fuse 10 Water SM Symbols and 10 Fire SM Symbols into<br><h2>1 Steam SM Symbol.</h2><br><small>Unlocks the -Cloud Engine- upon first fusion.</small>"},
            canClick() {return player.eft.symbolWaterSM.gte(10) && player.eft.symbolFireSM.gte(10) && player.eft.fusionTime.lte(0) },
            unlocked() {
                if (getGridData("eft", 101) == 2 && getGridData("eft", 102) == 4)
                {return true}
                else if (getGridData("eft", 101) == 4 && getGridData("eft", 102) == 2)
                {return true}
            },
            onClick() {
                player.eft.starmetalSelectionIndex = 0;
                player.eft.selectedStarmetalEarth = false;
                player.eft.selectedStarmetalWater = false;
                player.eft.selectedStarmetalAir = false;
                player.eft.selectedStarmetalFire = false;

                player.eft.symbolWaterSM = player.eft.symbolWaterSM.sub(10);
                player.eft.symbolFireSM = player.eft.symbolFireSM.sub(10);
                player.eft.symbolSteamSM = player.eft.symbolSteamSM.add(1);
                player.eft.fusionTime = player.eft.fusionTime.add(300);
                player.eft.steamUnlocked = true
            },
            style() {
            let look = {width: '500px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "radial-gradient(circle, #440022 25%, #bb00bb 75%, #ff1baa 100%)"
                look.borderColor = "transparent"
                look.borderImage = "radial-gradient(circle, hotpink, crimson) 1"
                look.color = "#ffaadd"
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
        115: {
            title() {return "Fuse 10 Earth SM Symbols and 10 Air SM Symbols into<br><h2>1 Sand SM Symbol.</h2><br><small>Unlocks the -Stone Pulverizer- upon first fusion.</small>"},
            canClick() {return player.eft.symbolEarthSM.gte(10) && player.eft.symbolAirSM.gte(10) && player.eft.fusionTime.lte(0) },
            unlocked() {
                if (getGridData("eft", 101) == 1 && getGridData("eft", 102) == 3)
                {return true}
                else if (getGridData("eft", 101) == 3 && getGridData("eft", 102) == 1)
                {return true}
            },
            onClick() {
                player.eft.starmetalSelectionIndex = 0;
                player.eft.selectedStarmetalEarth = false;
                player.eft.selectedStarmetalWater = false;
                player.eft.selectedStarmetalAir = false;
                player.eft.selectedStarmetalFire = false;

                player.eft.symbolEarthSM = player.eft.symbolEarthSM.sub(10);
                player.eft.symbolAirSM = player.eft.symbolAirSM.sub(10);
                player.eft.symbolSandSM = player.eft.symbolSandSM.add(1);
                player.eft.fusionTime = player.eft.fusionTime.add(300);
                player.eft.sandUnlocked = true
            },
            style() {
            let look = {width: '500px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "radial-gradient(circle, #440022 25%, #bb00bb 75%, #ff1baa 100%)"
                look.borderColor = "transparent"
                look.borderImage = "radial-gradient(circle, hotpink, crimson) 1"
                look.color = "#ffaadd"
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

        // This upgrade lies to the player. They do not get Inferno; instead they are given the KTB upgrade "Voidigenesis".
        116: {
            title() {return "Fuse 10 Air SM Symbols and 10 Fire SM Symbols into<br><h2>1 ??? SM Symbol.</h2><br><small>Unlocks the -?????? ????- upon first fusion.<br>DO YOU DARE BREACH THE VEIL OF THE ALCHEMICAL KNOWLEDGE?</small>"},
            canClick() {return player.eft.symbolAirSM.gte(10) && player.eft.symbolFireSM.gte(10) && player.eft.fusionTime.lte(0)},
            unlocked() {
                if (getGridData("eft", 101) == 3 && getGridData("eft", 102) == 4 && !hasUpgrade("ktb", 103))
                {return true}
                else if (getGridData("eft", 101) == 4 && getGridData("eft", 102) == 3 && !hasUpgrade("ktb", 103))
                {return true}
                else if (getGridData("eft", 101) == 3 && getGridData("eft", 102) == 4 && hasUpgrade("ktb", 103))
                {return false}
                else if (getGridData("eft", 101) == 4 && getGridData("eft", 102) == 3 && hasUpgrade("ktb", 103))
                {return false}
                else return false
            },
            onClick() {
                player.eft.starmetalSelectionIndex = 0;
                player.eft.selectedStarmetalEarth = false;
                player.eft.selectedStarmetalWater = false;
                player.eft.selectedStarmetalAir = false;
                player.eft.selectedStarmetalFire = false;

                player.eft.symbolAirSM = player.eft.symbolAirSM.sub(10);
                player.eft.symbolFireSM = player.eft.symbolFireSM.sub(10);
                player.eft.fusionTime = player.eft.fusionTime.add(300);
                player.eft.voidigenesisUnlocked = true
                
            },
            style() {
            let look = {width: '500px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "radial-gradient(circle, #440022 25%, #bb00bb 75%, #ff1baa 100%)"
                look.borderColor = "transparent"
                look.borderImage = "radial-gradient(circle, hotpink, crimson) 1"
                look.color = "#ffaadd"
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

        // This is the actual prompt for Inferno Element.
        117: {
            title() {return "Fuse 10 Air SM Symbols and 10 Fire SM Symbols into<br><h2>1 Inferno SM Symbol.</h2><br><small>Unlocks the -Plasma Core- upon first fusion.<br>HOW DID YOU FIND THIS BUTTON?</small>"},
            canClick() {return player.eft.symbolAirSM.gte(10) && player.eft.symbolFireSM.gte(10) && player.eft.fusionTime.lte(0)},
            unlocked() {
                if (getGridData("eft", 101) == 3 && getGridData("eft", 102) == 4 && hasUpgrade("ktb", 106))
                {return true}
                else if (getGridData("eft", 101) == 4 && getGridData("eft", 102) == 3 && hasUpgrade("ktb", 106))
                {return true}
                else return false
            },
            onClick() {
                player.eft.starmetalSelectionIndex = 0;
                player.eft.selectedStarmetalEarth = false;
                player.eft.selectedStarmetalWater = false;
                player.eft.selectedStarmetalAir = false;
                player.eft.selectedStarmetalFire = false;

                player.eft.symbolAirSM = player.eft.symbolAirSM.sub(10);
                player.eft.symbolFireSM = player.eft.symbolFireSM.sub(10);
                player.eft.symbolInfernoSM = player.eft.symbolInfernoSM.add(1);
                player.eft.fusionTime = player.eft.fusionTime.add(300);
                player.eft.infernoUnlocked = true
                
            },
            style() {
            let look = {width: '500px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "radial-gradient(circle, #440022 25%, #bb00bb 75%, #ff1baa 100%)"
                look.borderColor = "transparent"
                look.borderImage = "radial-gradient(circle, hotpink, crimson) 1"
                look.color = "#ffaadd"
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
            "1st Order Discovery": {
                buttonStyle() {  return { color: "magenta", background: "linear-gradient(45deg, #220022, #440022, #220022)", border: "5px solid #770077", borderRadius: "0px", boxShadow: " 0 0 5px 5px #bb00bb78,  0 0 5px 5px #bb00bb78 inset" } },
                unlocked() { return true },
                content: ["style-column",
                            ["blank", "50px"],
                            ["style-row",
                                [
                                    ["tooltip-row", 
                                        [
                                            ["raw-html", "<img src='resources/alchemyworld/symbolEarthSM.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                            ["raw-html", () => {return formatShortWhole(player.eft.symbolEarthSM)}, {width: "50px", height: "50px", color: "transparent", background: "linear-gradient(to top, #008E4B, #80C645", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px #00ff00", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                            ["raw-html", () => {return "<div class='bottomTooltip'>Earth SM Symbols<hr>Gained by clicking<br>the -Organic Mineralizer- machine<br>in the Alchemy Altar!</div>"}],
                                            ["clickable", 101],
                                            ["clickable", 102]
                                        ], {width: "145px", height: "110px", background: "linear-gradient(45deg, #220022, #440022, #220022)", border: "5px solid #770077", borderRadius: "20px", boxShadow: " 0 0 5px 5px #bb00bb78,  0 0 5px 5px #bb00bb78 inset"}
                                    ],
                                    ["blank", "10px"],
                                    ["tooltip-row", 
                                        [
                                            ["raw-html", "<img src='resources/alchemyworld/symbolWaterSM.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                            ["raw-html", () => {return formatShortWhole(player.eft.symbolWaterSM)}, {width: "50px", height: "50px", color: "transparent", background: "linear-gradient(to top, #1D8EB3, #8EC6D9", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px #0000ff", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                            ["raw-html", () => {return "<div class='bottomTooltip'>Water SM Symbols<hr>Gained by clicking<br>the -Atom Liquefier- machine<br>in the Alchemy Altar!</div>"}],
                                            ["clickable", 103],
                                            ["clickable", 104]
                                        ], {width: "145px", height: "110px", background: "linear-gradient(45deg, #220022, #440022, #220022)", border: "5px solid #770077", borderRadius: "20px", boxShadow: " 0 0 5px 5px #bb00bb78,  0 0 5px 5px #bb00bb78 inset"}
                                    ],
                                    ["blank", "10px"],
                                    ["tooltip-row", 
                                        [
                                            ["raw-html", "<img src='resources/alchemyworld/symbolAirSM.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                            ["raw-html", () => {return formatShortWhole(player.eft.symbolAirSM)}, {width: "50px", height: "50px", color: "transparent", background: "linear-gradient(to top, #C7C796, #E3E3CA)", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px #ffff00", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                            ["raw-html", () => {return "<div class='bottomTooltip'>Air SM Symbols<hr>Gained by clicking<br>the -Pressure Chamber- machine<br>in the Alchemy Altar!</div>"}],
                                            ["clickable", 105],
                                            ["clickable", 106]
                                        ], {width: "145px", height: "110px", background: "linear-gradient(45deg, #220022, #440022, #220022)", border: "5px solid #770077", borderRadius: "20px", boxShadow: " 0 0 5px 5px #bb00bb78,  0 0 5px 5px #bb00bb78 inset"}
                                    ],
                                    ["blank", "10px"],
                                    ["tooltip-row", 
                                        [
                                            ["raw-html", "<img src='resources/alchemyworld/symbolFireSM.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                            ["raw-html", () => {return formatShortWhole(player.eft.symbolFireSM)}, {width: "50px", height: "50px", color: "transparent", background: "linear-gradient(to top, #C7442F, #E3A197)", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px #ff0000", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                            ["raw-html", () => {return "<div class='bottomTooltip'>Fire SM Symbols<hr>Gained by clicking<br>the -Ignition Furnace- machine<br>in the Alchemy Altar!</div>"}],
                                            ["clickable", 107],
                                            ["clickable", 108]
                                        ], {width: "145px", height: "110px", background: "linear-gradient(45deg, #220022, #440022, #220022)", border: "5px solid #770077", borderRadius: "20px", boxShadow: " 0 0 5px 5px #bb00bb78,  0 0 5px 5px #bb00bb78 inset"}
                                    ],
                                ]
                            ],
                            ["blank", "20px"],
                            ["style-row",
                                [
                                    ["raw-html", () => {return "Combine 2 different Altered SMA Symbols<br>to unlock the 1st Order Altered SMA and their machines!"}, {fontSize: "30px", color: "transparent", background: "linear-gradient(to bottom, #8b609c, magenta, pink)", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"} ]
                                ]
                            ],
                            "grid",
                            ["style-row",
                                [
                                    ["raw-html", () => {return "Cost: 10 Altered SMA Symbols per gridable."}, {fontSize: "30px", color: "transparent", background: "linear-gradient(to bottom, #8b609c, magenta, pink)", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}]
                                ]
                            ],
                            ["blank", "10px"],
                            ["style-row",
                                [
                                    ["clickable", 110],
                                    ["clickable", 111],
                                    ["clickable", 112],
                                    ["clickable", 113],
                                    ["clickable", 114],
                                    ["clickable", 115],
                                    ["clickable", 116],
                                    ["clickable", 117]
                                ]
                            ],
                            ["blank", "10px"],
                            ["style-row",
                                [
                                    ["raw-html", () => {return "Fusion will be ready in " + formatShortWhole(player.eft.fusionTime) + " seconds."}, {fontSize: "30px", color: "transparent", background: "linear-gradient(to bottom, #8b609c, magenta, pink)", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}]
                                ]
                            ]
                ]
            },
            "2nd Order Discovery": {
                buttonStyle() {  return { color: "magenta", background: "linear-gradient(45deg, #220022, #440022, #220022)", border: "5px solid #770077", borderRadius: "0px", boxShadow: " 0 0 5px 5px #bb00bb78,  0 0 5px 5px #bb00bb78 inset" } },
                unlocked() { return true },
                content: ["style-column",
                            ["blank", "50px"],
                            ["style-row",
                                [
                                    ["tooltip-row", 
                                        [
                                            // ["raw-html", "<img src='resources/elements/fire.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                            ["raw-html", () => {
                                                if (player.eft.mudUnlocked == true)
                                                    return formatShortWhole(player.eft.symbolMudSM)}, {width: "50px", height: "50px", color: "white"
                                                }
                                            ],
                                            ["raw-html", () => {
                                                if (player.eft.mudUnlocked == true)
                                                    return "<div class='bottomTooltip'>Mud SM Symbols<hr>Gained by fusing<br>10 Earth SM Symbols and<br>10 Water SM Symbols<br>in the 1st Order Discovery tab!</div>"
                                                else
                                                    return "You haven't unlocked this SM symbol yet!"
                                                }
                                            ],
                                        ], {width: "145px", height: "110px", background: "linear-gradient(45deg, #220022, #440022, #220022)", border: "5px solid #770077", borderRadius: "20px", boxShadow: " 0 0 5px 5px #bb00bb78,  0 0 5px 5px #bb00bb78 inset"}
                                    ],
                                    ["blank", "10px"],
                                    ["tooltip-row", 
                                        [
                                            // ["raw-html", "<img src='resources/elements/fire.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                            ["raw-html", () => {
                                                if (player.eft.iceUnlocked == true)
                                                    return formatShortWhole(player.eft.symbolIceSM)}, {width: "50px", height: "50px", color: "white"
                                                }
                                            ],
                                            ["raw-html", () => {
                                                if (player.eft.iceUnlocked == true)
                                                    return "<div class='bottomTooltip'>Ice SM Symbols<hr>Gained by fusing<br>10 Water SM Symbols and<br>10 Air SM Symbols<br>in the 1st Order Discovery tab!</div>"
                                                else
                                                    return "You haven't unlocked this SM symbol yet!"
                                                }
                                            ],  
                                        ], {width: "145px", height: "110px", background: "linear-gradient(45deg, #220022, #440022, #220022)", border: "5px solid #770077", borderRadius: "20px", boxShadow: " 0 0 5px 5px #bb00bb78,  0 0 5px 5px #bb00bb78 inset"}
                                    ],
                                    ["blank", "10px"],
                                    ["tooltip-row", 
                                        [
                                            // ["raw-html", "<img src='resources/elements/fire.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                            ["raw-html", () => {
                                                if (player.eft.magmaUnlocked == true)
                                                    return formatShortWhole(player.eft.symbolMagmaSM)}, {width: "50px", height: "50px", color: "white"
                                                }
                                            ],
                                            ["raw-html", () => {
                                                if (player.eft.magmaUnlocked == true)
                                                    return "<div class='bottomTooltip'>Magma SM Symbols<hr>Gained by fusing<br>10 Earth SM Symbols and<br>10 Fire SM Symbols<br>in the 1st Order Discovery tab!</div>"
                                                else
                                                    return "You haven't unlocked this SM symbol yet!"
                                                }
                                            ],
                                        ], {width: "145px", height: "110px", background: "linear-gradient(45deg, #220022, #440022, #220022)", border: "5px solid #770077", borderRadius: "20px", boxShadow: " 0 0 5px 5px #bb00bb78,  0 0 5px 5px #bb00bb78 inset"}
                                    ],
                                    ["blank", "10px"],
                                    ["tooltip-row", 
                                        [
                                            // ["raw-html", "<img src='resources/elements/fire.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                            ["raw-html", () => {
                                                if (player.eft.steamUnlocked == true)
                                                    return formatShortWhole(player.eft.symbolSteamSM)}, {width: "50px", height: "50px", color: "white"
                                                }
                                            ],
                                            ["raw-html", () => {
                                                if (player.eft.steamUnlocked == true)
                                                    return "<div class='bottomTooltip'>Steam SM Symbols<hr>Gained by fusing<br>10 Water SM Symbols and<br>10 Fire SM Symbols<br>in the 1st Order Discovery tab!</div>"
                                                else
                                                    return "You haven't unlocked this SM symbol yet!"
                                                }
                                            ],
                                        ], {width: "145px", height: "110px", background: "linear-gradient(45deg, #220022, #440022, #220022)", border: "5px solid #770077", borderRadius: "20px", boxShadow: " 0 0 5px 5px #bb00bb78,  0 0 5px 5px #bb00bb78 inset"}
                                    ],
                                    ["blank", "10px"],
                                    ["tooltip-row", 
                                        [
                                            // ["raw-html", "<img src='resources/elements/fire.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                            ["raw-html", () => {
                                                if (player.eft.sandUnlocked == true)
                                                    return formatShortWhole(player.eft.symbolSandSM)}, {width: "50px", height: "50px", color: "white"}],
                                            ["raw-html", () => {
                                                if (player.eft.sandUnlocked == true)
                                                    return "<div class='bottomTooltip'>Sand SM Symbols<hr>Gained by fusing<br>10 Earth SM Symbols and<br>10 Air SM Symbols<br>in the 1st Order Discovery tab!</div>"
                                                else
                                                    return "You haven't unlocked this SM symbol yet!"
                                                }
                                            ],
                                        ], {width: "145px", height: "110px", background: "linear-gradient(45deg, #220022, #440022, #220022)", border: "5px solid #770077", borderRadius: "20px", boxShadow: " 0 0 5px 5px #bb00bb78,  0 0 5px 5px #bb00bb78 inset"}
                                    ],
                                ]
                            ],
                            ["style-row",
                                [
                                    ["tooltip-row", 
                                        [
                                            // ["raw-html", "<img src='resources/elements/fire.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                            ["raw-html", () => {
                                                if (player.eft.infernoUnlocked == true)
                                                    return formatShortWhole(player.eft.symbolInfernoSM)}, {width: "50px", height: "50px", color: "white"}],
                                            ["raw-html", () => {
                                                if (player.eft.infernoUnlocked == true)
                                                    return "<div class='bottomTooltip'>Inferno SM Symbols<hr>Gained by fusing<br>10 Air SM Symbols and<br>10 Fire SM Symbols<br>in the 1st Order Discovery tab!</div>"
                                                else
                                                    return "You haven't unlocked this SM symbol yet!"
                                                }],
                                        ], {width: "145px", height: "110px", background: "linear-gradient(45deg, #220022, #440022, #220022)", border: "5px solid #770077", borderRadius: "20px", boxShadow: " 0 0 5px 5px #bb00bb78,  0 0 5px 5px #bb00bb78 inset"}
                                    ],
                                ]
                            ]
                        ]
                
            },
            "1st Order Fusion Table": {
                buttonStyle() {  return { color: "#ffaadd", background: "radial-gradient(circle, #440022 25%, #bb00bb 75%, #ff1baa 100%)", borderColor: "transparent", borderImage: "radial-gradient(circle, hotpink, crimson) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px black inset" } },
                unlocked() { 
                    if (player.eft.mudUnlocked == true || player.eft.iceUnlocked == true || player.eft.magmaUnlocked == true || player.eft.steamUnlocked == true || player.eft.sandUnlocked == true)
                    return true
                    else return false
                },
                content: ["style-column",
                            ["blank", "60px"],
                            ["style-column",
                                [
                                    ["style-row",
                                        [   
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["tooltip-row", [["hoverless-clickable", 18]], {width: "84px", height: "84px", background: "#545659", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "1px solid #6A6A6A", borderRadius:"84px", boxShadow:"0 0 5px black"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                        ]
                                    ],
                                    ["style-row",
                                        [   
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["tooltip-row", [["hoverless-clickable", 14]], {width: "84px", height: "84px", background: "#545659", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "1px solid #6A6A6A", borderRadius:"84px", boxShadow:"0 0 5px black"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["tooltip-row", [["hoverless-clickable", 15]], {width: "84px", height: "84px", background: "#545659", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "1px solid #6A6A6A", borderRadius:"84px", boxShadow:"0 0 5px black"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                        ]
                                    ],
                                    ["style-row",
                                        [   
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["tooltip-row", [["hoverless-clickable", 3], ["raw-html", () => {return "<div class='bottomTooltip'>-Pressure Chamber-<hr> " + formatShortWhole(player.aal.airStarmetal) + " Air SMA (+" + formatShortWhole(player.aal.airStarmetalGain) + "/click)<br>" + formatShortWhole(player.aal.airStarmetalEssence) + " / " + formatShortWhole(player.aal.airStarmetalEssenceCap)+ " Air SME. (+" + formatShortWhole(player.aal.airStarmetalEssenceGain) + "/s)"}]], {width: "84px", height: "84px", background: "#2F3208", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "1px solid #C7C796", borderRadius:"84px", boxShadow:"0 0 5px black"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["tooltip-row", [["hoverless-clickable", 4], ["raw-html", () => {return "<div class='bottomTooltip'>-Ignition Furnace-<hr> " + formatShortWhole(player.aal.fireStarmetal) + " Fire SMA (+" + formatShortWhole(player.aal.fireStarmetalGain) + "/click)<br>" + formatShortWhole(player.aal.fireStarmetalEssence) + " / " + formatShortWhole(player.aal.fireStarmetalEssenceCap)+ " Fire SME. (+" + formatShortWhole(player.aal.fireStarmetalEssenceGain) + "/s)"}]], {width: "84px", height: "84px", background: "#5D0000", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "1px solid #C7442F", borderRadius:"84px", boxShadow:"0 0 5px black"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                        ]
                                    ],
                                    ["style-row",
                                        [   
                                            ["tooltip-row", [["hoverless-clickable", 12]], {width: "84px", height: "84px", background: "#545659", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "1px solid #6A6A6A", borderRadius:"84px", boxShadow:"0 0 5px black"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["tooltip-row", [["hoverless-clickable", 0]], {width: "84px", height: "84px", background: "#545659", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "1px solid #6A6A6A", borderRadius:"84px", boxShadow:"0 0 5px black"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["tooltip-row", [["hoverless-clickable", 13]], {width: "84px", height: "84px", background: "#545659", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "1px solid #6A6A6A", borderRadius:"84px", boxShadow:"0 0 5px black"}],
                                        ]
                                    ],
                                    ["style-row",
                                        [   
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["tooltip-row", [["hoverless-clickable", 2], ["raw-html", () => {return "<div class='bottomTooltip'>-Atom Liquefier-<hr> " + formatShortWhole(player.aal.waterStarmetal) + " Water SMA (+" + formatShortWhole(player.aal.waterStarmetalGain) + "/click)<br>" + formatShortWhole(player.aal.waterStarmetalEssence) + " / " + formatShortWhole(player.aal.waterStarmetalEssenceCap)+ " Earth SME. (+" + formatShortWhole(player.aal.waterStarmetalEssenceGain) + "/s)"}]], {width: "84px", height: "84px", background: "#002B4A", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "1px solid #1D8EB3", borderRadius:"84px", boxShadow:"0 0 5px black"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["tooltip-row", [["hoverless-clickable", 1], ["raw-html", () => {return "<div class='bottomTooltip'>-Organic Mineralizer-<hr> " + formatShortWhole(player.aal.earthStarmetal) + " Earth SMA (+" + formatShortWhole(player.aal.earthStarmetalGain) + "/click)<br>" + formatShortWhole(player.aal.earthStarmetalEssence) + " / " + formatShortWhole(player.aal.earthStarmetalEssenceCap)+ " Earth SME. (+" + formatShortWhole(player.aal.earthStarmetalEssenceGain) + "/s)"}]], {width: "84px", height: "84px", background: "#002F00", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "1px solid #008E4B", borderRadius:"84px", boxShadow:"0 0 5px black"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                        ]
                                    ],
                                    ["style-row",
                                        [   
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["tooltip-row", [["hoverless-clickable", 16]], {width: "84px", height: "84px", background: "#545659", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "1px solid #6A6A6A", borderRadius:"84px", boxShadow:"0 0 5px black"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["tooltip-row", [["hoverless-clickable", 17]], {width: "84px", height: "84px", background: "#545659", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "1px solid #6A6A6A", borderRadius:"84px", boxShadow:"0 0 5px black"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                        ]
                                    ],
                                    ["style-row",
                                        [   
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["tooltip-row", [["hoverless-clickable", 11]], {width: "84px", height: "84px", background: "#545659", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "1px solid #6A6A6A", borderRadius:"84px", boxShadow:"0 0 5px black"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                            ["style-row", [], {width: "84px", height: "84px"}],
                                        ]
                                    ],
                                ], {width: "644px", height: "644px", background: "#44002255", backgroundImage: "radial-gradient(circle, #9E4B8C, transparent 25%), conic-gradient( #33180078, transparent, #FF940078, transparent, #D3540078, transparent, #BBBBA278, transparent, #CCCCFF78, transparent, #95685178, transparent, #E4F1FE78, transparent, #D5E1EA78, transparent, #33180078), radial-gradient(circle, transparent 25%, #bb00bb45 60%, #ff1baa78 80%)", border: "10px solid #ff1baa", boxShadow: "0 0 5px 5px #ca1688 inset, 0 0 5px 5px #ca1688, 0 0 10px 10px #961165 inset, 0 0 10px 10px #961165", borderRadius: "476px 476px 476px 476px"}
                            ],
                ],
            }
        },
    },
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && player.btb.unlockedElementalFusion == true}
})
