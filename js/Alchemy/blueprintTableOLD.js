
// Add constants here
const symbolName = [
                    "symbolNone",
                    "symbolStarmetalAlloy",
                    "symbolStarmetalEssence",
                    "symbolEclipseShard",
                    "symbolSpaceGem",
                    "symbolSpaceDust",
                    "symbolSpaceRock",
                    ];

const symbolBlueprint = [
                    "blueprintEmpty",
                    "blueprintAlchemicalNodeConverter",
                    "blueprintAlchemicalNodeCondenser",
                    "blueprintAlchemicalNodeGuider",
                    "blueprintAlchemicalNodePartAcce"
                    ];

addLayer("btb", {
    name: "The Blueprint Table",
    symbol: "▦",
    row: 2,
    universe: "LU",
    position: 0,

    startData() {return {
        unlocked: true,

        // Select Indexes
        selectedSymbolIndex: 0, // symbol select index
        selectedBlueprintIndex: 0, // blueprint select index
        
        // Altered Alchemical Symbol Selection Boolean
        symbolBuyMax: false,
        selectedSymbolSMA: false,
        selectedSymbolSME: false,
        selectedSymbolECS: false,
        selectedSymbolSPG: false,
        selectedSymbolSPD: false,
        selectedSymbolSPR: false,

        // Crafting Content
        // Alchemical Node Parts Resources
        unlockedAlchemyAltar: false,
        craftAll: false,
        craftedAtLeastOnce: false,
        unlockedElementalFusion: false,
        alcNodePartConverter: new Decimal(0),
        alcNodePartCondenser: new Decimal(0),
        alcNodePartGuider: new Decimal(0),
        alcNodePartPartAcce: new Decimal(0),

        // Blueprint Table Basic Resources
        symbolStarmetalAlloy: new Decimal(0),
        symbolStarmetalEssence: new Decimal(0),
        symbolSpaceRock: new Decimal(0),
        symbolSpaceGem: new Decimal(0),
        symbolSpaceDust: new Decimal(0),
        symbolEclipseShard: new Decimal(0),
    }},

    nodeStyle() {
        return {
            background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)",
            backgroundOrigin: "border-box",
            borderColor: "white",
            color: "white",
            boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset",
            borderRadius: "0px",
            transform: "translateY(-0px)"
        }
    },
    tooltip: "The Blueprint Table",
    color: "white",
    branches: ["eft", "aal"],

    grid: {
        rows: 5,
        cols: 5,
        getStartData(id) {
            if (id == undefined) return undefined;
            return 0
        },
        getDisplay(data) {
            let str = ""
            if (data != -1) str = "<img src='resources/alchemyworld/" + symbolName[data] + ".png' style='width:40px;height:40px'></img>"
            return str
        },
        onClick(data, id) {
            if (data != -1) {
                if (player.btb.selectedSymbolSMA == true || player.btb.selectedSymbolSME == true || player.btb.selectedSymbolECS == true || player.btb.selectedSymbolSPG == true || player.btb.selectedSymbolSPD == true || player.btb.selectedSymbolSPR == true) {
                    setGridData("btb", id, player.btb.selectedSymbolIndex)
                } else {
                    player.btb.selectedSymbolIndex = 0;
                    setGridData("btb", id, 0)
                }
            }
        },
        getStyle() {
            let look = {width: "50px", height: "50px", background: "#a2a2a2", border: "5px solid #777777", borderRadius: "0", padding: "0", margin: "3px", boxShadow: "0 0 2px 2px white, 0 0 5px 5px black"}
            return look
        }
    },

    clickables: {
        1: {
            title() {return "Convert<br>10 🝪 Alchemical Symbols 🝪 and<br>1000000 Starmetal Alloy into<br>1 ⛯ Starmetal Alloy Symbol ⛯."},
            canClick() {return player.sma.starmetalAlloy.gte(1000000) & player.ktb.alchemicalSymbols.gte(10)},
            unlocked() {return true},
            onClick() { 
                if (player.btb.symbolBuyMax == false) {
                    player.btb.symbolStarmetalAlloy = player.btb.symbolStarmetalAlloy.add(1);
                    player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10);
                    player.sma.starmetalAlloy = player.sma.starmetalAlloy.sub(1000000);
                } 
                else if (player.btb.symbolBuyMax == true) {
                    let val1 = player.ktb.alchemicalSymbols.div(10).floor();
                    let val2 = player.sma.starmetalAlloy.div(1000000).floor();
                    let result = val1;
                    if(val2.lt(val1)) result = val2;

                    player.btb.symbolStarmetalAlloy = player.btb.symbolStarmetalAlloy.add(result);
                    player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(Decimal.mul(10, result));
                    player.sma.starmetalAlloy = player.sma.starmetalAlloy.sub(Decimal.mul(1000000, result))
                }
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%,  #60cfeb 100%)";
                look.border = "3px solid #282363";
                look.color = "#282363";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        2: {
            title() {return "Convert<br>10 🝪 Alchemical Symbols 🝪 and<br>1000000 Starmetal Essence into<br>1 ⚶ Starmetal Essence Symbol ⚶."},
            canClick() {return player.sme.starmetalEssence.gte(1000000) & player.ktb.alchemicalSymbols.gte(10)},
            unlocked() {return true},
            onClick() { 
                if (player.btb.symbolBuyMax == false) {
                    player.btb.symbolStarmetalEssence = player.btb.symbolStarmetalEssence.add(1);
                    player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10);
                    player.sme.starmetalEssence = player.sme.starmetalEssence.sub(1000000);
                }
                else if (player.btb.symbolBuyMax == true) {
                    let val1 = player.ktb.alchemicalSymbols.div(10).floor();
                    let val2 = player.sme.starmetalEssence.div(1000000).floor();
                    let result = val1;
                    if(val2.lt(val1)) result = val2;

                    player.btb.symbolStarmetalEssence = player.btb.symbolStarmetalEssence.add(result);
                    player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(Decimal.mul(10, result));
                    player.sme.starmetalEssence = player.sme.starmetalEssence.sub(Decimal.mul(1000000, result))
                }
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%, #eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)";
                look.border = "3px solid #282363";
                look.color = "#282363";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        3: {
            title() {return "Convert<br>10 🝪 Alchemical Symbols 🝪 and <br>1000 Eclipse Shards into<br>1 ⏾ Eclipse Shard Symbol ⏾."},
            canClick() {return player.sma.eclipseShards.gte(1000) & player.ktb.alchemicalSymbols.gte(10)},
            unlocked() {return true},
            onClick() { 
                if (player.btb.symbolBuyMax == false) {
                    player.btb.symbolEclipseShard = player.btb.symbolEclipseShard.add(1);
                    player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10);
                    player.sma.eclipseShards = player.sma.eclipseShards.sub(1000)
                }
                else if (player.btb.symbolBuyMax == true) {
                    let val1 = player.ktb.alchemicalSymbols.div(10).floor();
                    let val2 = player.sma.eclipseShards.div(1000).floor();
                    let result = val1;
                    if(val2.lt(val1)) result = val2;

                    player.btb.symbolEclipseShard = player.btb.symbolEclipseShard.add(result);
                    player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(Decimal.mul(10, result));
                    player.sma.eclipseShards = player.sma.eclipseShards.sub(Decimal.mul(1000, result))
                }
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(135deg, #ffb700, #ffe866)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #222, #000) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        4: {
            title() {return "Convert<br>10 🝪 Alchemical Symbols 🝪 and<br>10 Space Gems into<br>1 ◈ Space Gem Symbol ◈."},
            canClick() {return player.ir.spaceGem.gte(10) & player.ktb.alchemicalSymbols.gte(10)},
            unlocked() {return true},
            onClick() { 
                if (player.btb.symbolBuyMax == false) {
                    player.btb.symbolSpaceGem = player.btb.symbolSpaceGem.add(1);
                    player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10);
                    player.ir.spaceGem = player.ir.spaceGem.sub(10)
                }
                else if (player.btb.symbolBuyMax == true) {
                    let val1 = player.ktb.alchemicalSymbols.div(10).floor();
                    let val2 = player.ir.spaceGem.div(10).floor();
                    let result = val1;
                    if(val2.lt(val1)) result = val2;

                    player.btb.symbolSpaceGem = player.btb.symbolSpaceGem.add(result);
                    player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(Decimal.mul(10, result));
                    player.ir.spaceGem = player.ir.spaceGem.sub(Decimal.mul(10, result))
                }
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "radial-gradient(circle, #564BCC, #000000)";
                look.border = "3px solid white";
                look.color = "#eaf6f7";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        5: {
            title() {return "Convert<br>10 🝪 Alchemical Symbols 🝪 and<br>1000000 Space Dust into<br>1 ♄ Space Dust Symbol ♄."},
            canClick() {return player.pl.spaceDust.gte(1000000) & player.ktb.alchemicalSymbols.gte(10)},
            unlocked() {return true},
            onClick() { 
                if (player.btb.symbolBuyMax == false) {
                    player.btb.symbolSpaceDust = player.btb.symbolSpaceDust.add(1);
                    player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10);
                    player.pl.spaceDust = player.pl.spaceDust.sub(1000000);
                }
                else if (player.btb.symbolBuyMax == true) {
                    let val1 = player.ktb.alchemicalSymbols.div(10).floor();
                    let val2 = player.pl.spaceDust.div(1000000).floor();
                    let result = val1;
                    if(val2.lt(val1)) result = val2;

                    player.btb.symbolSpaceDust = player.btb.symbolSpaceDust.add(result);
                    player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(Decimal.mul(10, result));
                    player.pl.spaceDust = player.pl.spaceDust.sub(Decimal.mul(1000000, result))
                }
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)";
                look.border = "3px solid #59c2ff";
                look.color = "#eaf6f7";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        6: {
            title() {return "Convert<br>10 🝪 Alchemical Symbols 🝪 and<br>1000000 Space Rocks into<br>1 ⛊ Space Rock Symbol ⛊."},
            canClick() {return player.ir.spaceRock.gte(1000000) & player.ktb.alchemicalSymbols.gte(10)},
            unlocked() {return true},
            onClick() { 
                if (player.btb.symbolBuyMax == false) {
                    player.btb.symbolSpaceRock = player.btb.symbolSpaceRock.add(1);
                    player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10);
                    player.ir.spaceRock = player.ir.spaceRock.sub(1000000);
                } 
                else if (player.btb.symbolBuyMax == true) {
                    let val1 = player.ktb.alchemicalSymbols.div(10).floor();
                    let val2 = player.ir.spaceRock.div(1000000).floor();
                    let result = val1;
                    if(val2.lt(val1)) result = val2;

                    player.btb.symbolSpaceRock = player.btb.symbolSpaceRock.add(result);
                    player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(Decimal.mul(10, result));
                    player.ir.spaceRock = player.ir.spaceRock.sub(Decimal.mul(1000000, result))
                }
            },
            style() {
            let look = {width: '325px', minHeight: '100px', maxHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(15deg, #5f5f5f 0%, #a8a8a8 50%, #5f5f5f 100%)";
                look.border = "3px solid #464646";
                look.color = "#eaf6f7";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        // Clear Grid
        7: {
            title() {return "Clear Grid"},
            canClick() {return true},
            unlocked() {return true},
            onClick() { 
            
                if (player.btb.selectedSymbolSMA == true || player.btb.selectedSymbolSME == true || player.btb.selectedSymbolECS == true || player.btb.selectedSymbolSPG == true || player.btb.selectedSymbolSPD == true || player.btb.selectedSymbolSPR == true) {
                    player.btb.selectedSymbolSMA = false;
                    player.btb.selectedSymbolSME = false;
                    player.btb.selectedSymbolECS = false;
                    player.btb.selectedSymbolSPG = false;
                    player.btb.selectedSymbolSPD = false;
                    player.btb.selectedSymbolSPR = false;
                    player.btb.selectedSymbolIndex = 0;
                }

                if (getGridData("btb", id) != 1) {
                    for (let i = 1; i < 506; ) {
                        if (getGridData("btb", i) != -1) {
                            setGridData("btb", i, 0)
                        } 
                        // Increase i value
                        if (i % 5 == 0) {
                         i = i+96
                        } else {
                         i++
                        }
                    }
                }      
            },
            style() {
            let look = {width: '300px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px", marginBottom: "10px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },

        // start of crafting clickables
        11: {
            title() {return "Select"},
            canClick() {return player.btb.symbolStarmetalAlloy.gte(1)},
            unlocked() {
            if (player.btb.selectedSymbolSMA) {return false}
            else {return true}
            },
            onClick() {
                player.btb.selectedSymbolIndex = 1;
                player.btb.selectedSymbolSMA = true;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = false
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
        12: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.btb.selectedSymbolSMA},
            onClick() {
                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = false
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
        21: {
            title() {return "Select"},
            canClick() {return player.btb.symbolStarmetalEssence.gte(1)},
            unlocked() {
            if (player.btb.selectedSymbolSME) {return false}
            else {return true}
            },
            onClick() {
                player.btb.selectedSymbolIndex = 2;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = true;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = false
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
        22: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.btb.selectedSymbolSME},
            onClick() {
                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = false
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
        31: {
            title() {return "Select"},
            canClick() {return player.btb.symbolEclipseShard.gte(1)},
            unlocked() {
            if (player.btb.selectedSymbolECS) {return false}
            else {return true}
            },
            onClick() {
                player.btb.selectedSymbolIndex = 3;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = true;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = false
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
        32: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.btb.selectedSymbolECS},
            onClick() {
                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = false
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
        41: {
            title() {return "Select"},
            canClick() {return player.btb.symbolSpaceGem.gte(1)},
            unlocked() {
            if (player.btb.selectedSymbolSPG) {return false}
            else {return true}
            },
            onClick() {
                player.btb.selectedSymbolIndex = 4;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = true;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = false
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
        42: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.btb.selectedSymbolSPG},
            onClick() {
                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = false
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
        51: {
            title() {return "Select"},
            canClick() {return player.btb.symbolSpaceDust.gte(1)},
            unlocked() {
            if (player.btb.selectedSymbolSPD) {return false}
            else {return true}
            },
            onClick() {
                player.btb.selectedSymbolIndex = 5;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = true;
                player.btb.selectedSymbolSPR = false
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
        52: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.btb.selectedSymbolSPD},
            onClick() {
                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = false
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
        61: {
            title() {return "Select"},
            canClick() {return player.btb.symbolSpaceRock.gte(1)},
            unlocked() {
            if (player.btb.selectedSymbolSPR) {return false}
            else {return true}
            },
            onClick() {
                player.btb.selectedSymbolIndex = 6;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = true
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
        62: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.btb.selectedSymbolSPR},
            onClick() {
                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = false
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

        // Start of Blueprint Buttons
        999: {
            title() {return "Empty"},
            canClick() {return player.btb.selectedBlueprintIndex != 0},
            unlocked() {return true},
            onClick() { 
                player.btb.selectedBlueprintIndex = 0
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
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
        1000: {
            title() {return "Cannot Craft Alchemical Node Part!<br>Use the Blueprints to help you!"},
            canClick() {return false},
            unlocked() {
                
                if (tmp.btb.clickables[1002].unlocked || tmp.btb.clickables[1004].unlocked || tmp.btb.clickables[1006].unlocked || tmp.btb.clickables[1008].unlocked)
                    {return false} else return true
                },
            style() {
            let look = {width: '300px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            return look
            }
        },
        1001: {
            title() {return "Converter"},
            canClick() {return player.btb.selectedBlueprintIndex != 1},
            unlocked() {return true},
            onClick() { 
                player.btb.selectedBlueprintIndex = 1
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
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
        1002: {
            title() {return "Craft Alchemical Node Part <br>-Converter-"}, // Trigger the Alchemical Node -Converter- crafting prompt
            canClick() { // if the layout aligns with the blueprint, then canClick will return 'true'. Otherwise, return 'false'.
                    return true
            }, 
            unlocked() {
                if (
                       getGridData("btb", 101) == 6 && getGridData("btb", 102) == 5 && getGridData("btb", 103) == 1 && getGridData("btb", 104) == 5 && getGridData("btb", 105) == 6
                    && getGridData("btb", 201) == 5 && getGridData("btb", 202) == 0 && getGridData("btb", 203) == 2 && getGridData("btb", 204) == 0 && getGridData("btb", 205) == 5
                    && getGridData("btb", 301) == 1 && getGridData("btb", 302) == 2 && getGridData("btb", 303) == 4 && getGridData("btb", 304) == 2 && getGridData("btb", 305) == 1
                    && getGridData("btb", 401) == 5 && getGridData("btb", 402) == 0 && getGridData("btb", 403) == 2 && getGridData("btb", 404) == 0 && getGridData("btb", 405) == 5
                    && getGridData("btb", 501) == 6 && getGridData("btb", 502) == 5 && getGridData("btb", 503) == 1 && getGridData("btb", 504) == 5 && getGridData("btb", 505) == 6
                    && player.btb.symbolStarmetalAlloy.gte(4)
                    && player.btb.symbolStarmetalEssence.gte(4)
                    && player.btb.symbolSpaceGem.gte(1)
                    && player.btb.symbolSpaceDust.gte(8)
                    && player.btb.symbolSpaceRock.gte(4)
                    )
                return true
            },
            onClick() { 
                if (player.btb.craftAll == false) {
                    player.btb.symbolStarmetalAlloy = player.btb.symbolStarmetalAlloy.sub(4);
                    player.btb.symbolStarmetalEssence = player.btb.symbolStarmetalEssence.sub(4);
                    player.btb.symbolSpaceGem = player.btb.symbolSpaceGem.sub(1);
                    player.btb.symbolSpaceDust = player.btb.symbolSpaceDust.sub(8);
                    player.btb.symbolSpaceRock = player.btb.symbolSpaceRock.sub(4);
                    player.btb.alcNodePartConverter = player.btb.alcNodePartConverter.add(1)
                }
                else if (player.btb.craftAll == true)  {
                    let val1 = player.btb.symbolStarmetalAlloy.div(4).floor();
                    let val2 = player.btb.symbolStarmetalEssence.div(4).floor();
                    let val3 = player.btb.symbolSpaceGem.div(1).floor();
                    let val4 = player.btb.symbolSpaceDust.div(8).floor();
                    let val5 = player.btb.symbolSpaceRock.div(4).floor();
                    let result = val3
                    if(val1.lt(val3) && val2.lt(val3) && val4.lt(val3) && val5.lt(val3)) result = val4

                    player.btb.alcNodePartConverter = player.btb.alcNodePartConverter.add(result);
                    player.btb.symbolStarmetalAlloy = player.btb.symbolStarmetalAlloy.sub(Decimal.mul(4, result));
                    player.btb.symbolStarmetalEssence = player.btb.symbolStarmetalEssence.sub(Decimal.mul(4, result));
                    player.btb.symbolSpaceGem = player.btb.symbolSpaceGem.sub(Decimal.mul(1, result));
                    player.btb.symbolSpaceDust = player.btb.symbolSpaceDust.sub(Decimal.mul(8, result));
                    player.btb.symbolSpaceRock = player.btb.symbolSpaceRock.sub(Decimal.mul(4, result));
                }

                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = false;
                player.btb.craftedAtLeastOnce = true

                if (getGridData("btb", id) != 1) {
                for (let i = 1; i < 506; ) {
                    if (getGridData("btb", i) != -1) {
                            setGridData("btb", i, 0)
                        };

                    // Increase i value
                    if (i % 5 == 0) {i = i+96} else {i++}
                    }
                }
            },
            style() {
            let look = {width: '300px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px", marginTop: "10px", marginLeft: "0"}
            if (this.canClick()) {
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

        1003: {
            title() {return "Condenser"},
            canClick() {return player.btb.selectedBlueprintIndex != 2},
            unlocked() {return player.btb.alcNodePartConverter.gte(4)},
            onClick() { 
                player.btb.selectedBlueprintIndex = 2
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
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
        1004: {
            title() {return "Craft Alchemical Node Part <br>-Condenser-"},
            canClick() { // if the layout aligns with the blueprint, then canClick will return 'true'. Otherwise, return 'false'.
                return true
            }, 
            unlocked() {
                if (
                       getGridData("btb", 101) == 6 && getGridData("btb", 102) == 5 && getGridData("btb", 103) == 1 && getGridData("btb", 104) == 5 && getGridData("btb", 105) == 6
                    && getGridData("btb", 201) == 5 && getGridData("btb", 202) == 0 && getGridData("btb", 203) == 2 && getGridData("btb", 204) == 0 && getGridData("btb", 205) == 5
                    && getGridData("btb", 301) == 1 && getGridData("btb", 302) == 2 && getGridData("btb", 303) == 3 && getGridData("btb", 304) == 2 && getGridData("btb", 305) == 1
                    && getGridData("btb", 401) == 5 && getGridData("btb", 402) == 0 && getGridData("btb", 403) == 2 && getGridData("btb", 404) == 0 && getGridData("btb", 405) == 5
                    && getGridData("btb", 501) == 6 && getGridData("btb", 502) == 5 && getGridData("btb", 503) == 1 && getGridData("btb", 504) == 5 && getGridData("btb", 505) == 6
                    && player.btb.symbolStarmetalAlloy.gte(4)
                    && player.btb.symbolStarmetalEssence.gte(4)
                    && player.btb.symbolEclipseShard.gte(1)
                    && player.btb.symbolSpaceDust.gte(8)
                    && player.btb.symbolSpaceRock.gte(4)
                    && player.btb.alcNodePartConverter.gte(4)
                )
                return true      
            },
            onClick() { 
                if (player.btb.craftAll == false) {
                    player.btb.symbolStarmetalAlloy = player.btb.symbolStarmetalAlloy.sub(4);
                    player.btb.symbolStarmetalEssence = player.btb.symbolStarmetalEssence.sub(4);
                    player.btb.symbolEclipseShard = player.btb.symbolEclipseShard.sub(1);
                    player.btb.symbolSpaceDust = player.btb.symbolSpaceDust.sub(8);
                    player.btb.symbolSpaceRock = player.btb.symbolSpaceRock.sub(4);
                    player.btb.alcNodePartCondenser = player.btb.alcNodePartCondenser.add(1)
                }
                else if (player.btb.craftAll == true) {
                    let val1 = player.btb.symbolStarmetalAlloy.div(4).floor();
                    let val2 = player.btb.symbolStarmetalEssence.div(4).floor();
                    let val3 = player.btb.symbolEclipseShard.div(1).floor();
                    let val4 = player.btb.symbolSpaceDust.div(8).floor();
                    let val5 = player.btb.symbolSpaceRock.div(4).floor();
                    let result = val3
                    if(val1.lt(val3) && val2.lt(val3) && val4.lt(val3) && val5.lt(val3)) result = val4

                    player.btb.alcNodePartCondenser = player.btb.alcNodePartCondenser.add(result);
                    player.btb.symbolStarmetalAlloy = player.btb.symbolStarmetalAlloy.sub(Decimal.mul(4, result));
                    player.btb.symbolStarmetalEssence = player.btb.symbolStarmetalEssence.sub(Decimal.mul(4, result));
                    player.btb.symbolEclipseShard = player.btb.symbolEclipseShard.sub(Decimal.mul(1, result));
                    player.btb.symbolSpaceDust = player.btb.symbolSpaceDust.sub(Decimal.mul(8, result));
                    player.btb.symbolSpaceRock = player.btb.symbolSpaceRock.sub(Decimal.mul(4, result));
                }

                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = false

                if (getGridData("btb", id) != 1) {
                for (let i = 1; i < 506; ) {
                    if (getGridData("btb", i) != -1) {
                            setGridData("btb", i, 0)
                        };

                    // Increase i value
                    if (i % 5 == 0) {i = i+96} else {i++}
                    }
                }
            },
            style() {
            let look = {width: '300px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px", marginTop: "10px", marginLeft: "0"}
            if (this.canClick()) {
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

        1005: {
            title() {return "Guider"},
            canClick() {return player.btb.selectedBlueprintIndex != 3},
            unlocked() {return player.btb.alcNodePartCondenser.gte(4)},
            onClick() { 
                player.btb.selectedBlueprintIndex = 3
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
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
        1006: {
            title() {return "Craft Alchemical Node Part <br>-Guider-"},
            canClick() { // if the layout aligns with the blueprint, then canClick will return 'true'. Otherwise, return 'false'.
                return true
            }, 
            unlocked() {
                if (
                       getGridData("btb", 101) == 0 && getGridData("btb", 102) == 0 && getGridData("btb", 103) == 0 && getGridData("btb", 104) == 0 && getGridData("btb", 105) == 0
                    && getGridData("btb", 201) == 6 && getGridData("btb", 202) == 5 && getGridData("btb", 203) == 6 && getGridData("btb", 204) == 5 && getGridData("btb", 205) == 6
                    && getGridData("btb", 301) == 2 && getGridData("btb", 302) == 2 && getGridData("btb", 303) == 2 && getGridData("btb", 304) == 2 && getGridData("btb", 305) == 2
                    && getGridData("btb", 401) == 6 && getGridData("btb", 402) == 5 && getGridData("btb", 403) == 6 && getGridData("btb", 404) == 5 && getGridData("btb", 405) == 6
                    && getGridData("btb", 501) == 0 && getGridData("btb", 502) == 0 && getGridData("btb", 503) == 0 && getGridData("btb", 504) == 0 && getGridData("btb", 505) == 0
                    && player.btb.symbolStarmetalEssence.gte(5)
                    && player.btb.symbolSpaceDust.gte(4)
                    && player.btb.symbolSpaceRock.gte(6)
                    && player.btb.alcNodePartCondenser.gte(4)
                )
                return true
            },
            onClick() { 
                if (player.btb.craftAll == false) {
                    player.btb.symbolStarmetalEssence = player.btb.symbolStarmetalEssence.sub(5);
                    player.btb.symbolSpaceDust = player.btb.symbolSpaceDust.sub(4);
                    player.btb.symbolSpaceRock = player.btb.symbolSpaceRock.sub(6);
                    player.btb.alcNodePartGuider = player.btb.alcNodePartGuider.add(1)
                }
                else if (player.btb.craftAll == true) {
                    let val1 = player.btb.symbolStarmetalEssence.div(5).floor();
                    let val2 = player.btb.symbolSpaceDust.div(4).floor();
                    let val3 = player.btb.symbolSpaceRock.div(6).floor();
                    let result = val2;
                    if(val1.lt(val2) && val3.lt(val2)) result = val3

                    player.btb.alcNodePartGuider = player.btb.alcNodePartGuider.add(result);
                    player.btb.symbolStarmetalEssence = player.btb.symbolStarmetalEssence.sub(Decimal.mul(5, result));
                    player.btb.symbolSpaceDust = player.btb.symbolSpaceDust.sub(Decimal.mul(4, result));
                    player.btb.symbolSpaceRock = player.btb.symbolSpaceRock.sub(Decimal.mul(6, result));
                }

                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = false

                if (getGridData("btb", id) != 1) {
                for (let i = 1; i < 506; ) {
                    if (getGridData("btb", i) != -1) {
                            setGridData("btb", i, 0)
                        };

                    // Increase i value
                    if (i % 5 == 0) {i = i+96} else {i++}
                    }
                }
            },
            style() {
            let look = {width: '300px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px", marginTop: "10px", marginLeft: "0"}
            if (this.canClick()) {
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
            },
        },

        1007: {
            title() {return "P. Accel."},
            canClick() {return player.btb.selectedBlueprintIndex != 4},
            unlocked() {return hasUpgrade("ktb", 103)},
            onClick() { 
                player.btb.selectedBlueprintIndex = 4
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
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
        1008: {
            title() {return "Craft Alchemical Node Part <br>-Particle Accelerator-"},
            canClick() { // if the layout aligns with the blueprint, then canClick will return 'true'. Otherwise, return 'false'.
                return true
            }, 
            unlocked() {
                if (
                       getGridData("btb", 101) == 0 && getGridData("btb", 102) == 6 && getGridData("btb", 103) == 3 && getGridData("btb", 104) == 6 && getGridData("btb", 105) == 0
                    && getGridData("btb", 201) == 6 && getGridData("btb", 202) == 6 && getGridData("btb", 203) == 4 && getGridData("btb", 204) == 6 && getGridData("btb", 205) == 6
                    && getGridData("btb", 301) == 3 && getGridData("btb", 302) == 4 && getGridData("btb", 303) == 0 && getGridData("btb", 304) == 4 && getGridData("btb", 305) == 3
                    && getGridData("btb", 401) == 6 && getGridData("btb", 402) == 6 && getGridData("btb", 403) == 4 && getGridData("btb", 404) == 6 && getGridData("btb", 405) == 6
                    && getGridData("btb", 501) == 0 && getGridData("btb", 502) == 6 && getGridData("btb", 503) == 3 && getGridData("btb", 504) == 6 && getGridData("btb", 505) == 0
                    && player.btb.symbolEclipseShard.gte(4)
                    && player.btb.symbolSpaceGem.gte(4)
                    && player.btb.symbolSpaceRock.gte(12)
                    && hasUpgrade("ktb", 103)
                )
                return true
            },
            onClick() { 
                if (player.btb.craftAll == false) {
                    player.btb.symbolEclipseShard = player.btb.symbolEclipseShard.sub(4);
                    player.btb.symbolSpaceGem = player.btb.symbolSpaceGem.sub(4);
                    player.btb.symbolSpaceRock = player.btb.symbolSpaceRock.sub(12);
                    player.btb.alcNodePartPartAcce = player.btb.alcNodePartPartAcce.add(1)
                }
                else if (player.btb.craftAll == true) {
                    let val1 = player.btb.symbolEclipseShard.div(4).floor();
                    let val2 = player.btb.symbolSpaceGem.div(4).floor();
                    let val3 = player.btb.symbolSpaceRock.div(12).floor();
                    let result = val1;
                    if(val2.lt(val1) && val3.lt(val1)) result = val3

                    player.btb.alcNodePartPartAcce = player.btb.alcNodePartPartAcce.add(result);
                    player.btb.symbolEclipseShard = player.btb.symbolEclipseShard.sub(Decimal.mul(4, result));
                    player.btb.symbolSpaceGem = player.btb.symbolSpaceGem.sub(Decimal.mul(4, result));
                    player.btb.symbolSpaceRock = player.btb.symbolSpaceRock.sub(Decimal.mul(12, result));
                }

                player.btb.selectedSymbolIndex = 0;
                player.btb.selectedSymbolSMA = false;
                player.btb.selectedSymbolSME = false;
                player.btb.selectedSymbolECS = false;
                player.btb.selectedSymbolSPG = false;
                player.btb.selectedSymbolSPD = false;
                player.btb.selectedSymbolSPR = false

                if (getGridData("btb", id) != 1) {
                for (let i = 1; i < 506; ) {
                    if (getGridData("btb", i) != -1) {
                            setGridData("btb", i, 0)
                        };

                    // Increase i value
                    if (i % 5 == 0) {i = i+96} else {i++}
                    }
                }
            },
            style() {
            let look = {width: '300px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px", marginTop: "10px", marginLeft: "0"}
            if (this.canClick()) {
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
            },
        },

        // Buy Max Symbols
        2000: {
            title() {return "Buy Max<br>OFF"},
            canClick() { return player.btb.symbolBuyMax == true },
            unlocked() { return true },
            onClick() { 
                player.btb.symbolBuyMax = false
            },
            style() {
            let look = {width: '100px', minHeight: '75px', maxHeight: "75px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        2001: {
            title() {return "Buy Max<br>ON"},
            canClick() { return player.btb.symbolBuyMax == false},
            unlocked() { return true },
            onClick() { 
                player.btb.symbolBuyMax = true
            },
            style() {
            let look = {width: '100px', minHeight: '75px', maxHeight: "75px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },

        // Craft All
        2002: {
            title() {return "Craft 1 Converter first!"},
            canClick() {return false},
            unlocked() {
                if (player.btb.craftedAtLeastOnce != true) {return true}
                else return false
            },
            style() {
            let look = {width: '200px', minHeight: '75px', maxHeight: "75px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            return look
            },
        },
        2003: {
            title() {return "Craft All<br>OFF"},
            canClick() { return player.btb.craftAll == true },
            unlocked() { return player.btb.craftedAtLeastOnce == true },
            onClick() { 
                player.btb.craftAll = false
            },
            style() {
            let look = {width: '100px', minHeight: '55px', maxHeight: "55px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },
        2004: {
            title() {return "Craft All<br>ON"},
            canClick() { return player.btb.craftAll == false },
            unlocked() { return player.btb.craftedAtLeastOnce == true },
            onClick() { 
                player.btb.craftAll = true
            },
            style() {
            let look = {width: '100px', minHeight: '55px', maxHeight: "55px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            } else {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        },

        // Progression Unlocks
        3000: {
            title() {return "<h1>UNLOCK THE KNOWLEDGE TO<br>❖ BUILD AN ALCHEMY ALTAR. ❖</h1><br><br><h2>Requires: <br><small>(These do not get consumed upon buying!)</small><br>4 Alchemical Node -Converters-<br>4 Alchemical Node -Condensers-<br>12 Alchemical Node -Guiders-<br>Starmetal Alteration Upgrade Purchased</h2>"},
            canClick() {return player.btb.alcNodePartConverter.gte(4) && player.btb.alcNodePartCondenser.gte(4) && player.btb.alcNodePartGuider.gte(12) && hasUpgrade("ktb", 102)},
            unlocked() {
                if (player.btb.unlockedAlchemyAltar != true) return true
                else return false
            },
            onClick() {
                player.btb.unlockedAlchemyAltar = true
                player.tab = "aal"
            },
            style() {
            let look = {width: '600px', minHeight: '300px', maxHeight: "350px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1"
                look.color = "black"
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
        3001: {
            title() {return "<h1>UNLOCK THE KNOWLEDGE TO<br>✴︎ FUSE ALTERED STARMETAL. ✴︎</h1><br><br><h2>Requires: <br><small>(These do not get consumed upon buying!)</small><br>12 Alchemical Node -Converters-<br>12 Alchemical Node -Condensers-<br>28 Alchemical Node -Guiders-</h2>"},
            canClick() {return player.btb.alcNodePartConverter.gte(12) && player.btb.alcNodePartCondenser.gte(12) && player.btb.alcNodePartGuider.gte(28)},
            unlocked() {
                if (player.btb.unlockedAlchemyAltar == true && player.btb.unlockedElementalFusion != true) return true
                else return false
            },
            onClick() {
                player.btb.unlockedElementalFusion = true
                player.tab = "eft"
            },
            style() {
            let look = {width: '600px', minHeight: '300px', maxHeight: "350px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
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
        3002: {
            title() {return "<h1>BEGIN THE GENERATION OF<br>𖧋 VOID STARMETAL. 𖧋</h1><br><br><h2>Requires: <br><small>(These do not get consumed upon buying!)</small><br>60 Alchemical Node -Converters-<br>60 Alchemical Node -Condensers-<br>140 Alchemical Node -Guiders-<br>12 Alchemical Node -Particle Accelerators-<br><br><small>(These do get consumed upon buying!)</small><br>10 Mud SMSys | 10 Ice SMSys<br>10 Magma SMSys | 10 Steam SMSys<br>10 Sand SMSys</h2>"},
            canClick() {return player.btb.alcNodePartConverter.gte(60) && player.btb.alcNodePartCondenser.gte(60) && player.btb.alcNodePartGuider.gte(140) && player.btb.alcNodePartPartAcce.gte(12)
                                && player.eft.symbolMudSM.gte(10) && player.eft.symbolIceSM.gte(10) && player.eft.symbolMagmaSM.gte(10) && player.eft.symbolSteamSM.gte(10) && player.eft.symbolSandSM.gte(10)},
            unlocked() {
                if (player.btb.unlockedAlchemyAltar == true && hasUpgrade("ktb", 103) && player.eft.voidUnlocked != true)
                    return true
                else return false
            },
            onClick() {
                player.eft.symbolMudSM = player.eft.symbolMudSM.sub(10);
                player.eft.symbolIceSM = player.eft.symbolIceSM.sub(10);
                player.eft.symbolMagmaSM = player.eft.symbolMagmaSM.sub(10);
                player.eft.symbolSteamSM = player.eft.symbolSteamSM.sub(10);
                player.eft.symbolSandSM = player.eft.symbolSandSM.sub(10);
                player.eft.voidUnlocked = true;
                player.tab = "eft"
            },
            style() {
            let look = {width: '600px', minHeight: '460px', maxHeight: "510px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.background = "linear-gradient(to left, #ffca1b, #855b00, #582900, #855b00, #ffca1b)"
                look.borderColor = "transparent"
                look.borderImage = "linear-gradient(to left, yellow, orange, yellow) 1"
                look.color = "#000000"
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
        nonElementals: {
            "Conversion": {
                buttonStyle() { return {background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)", border: "3px solid white", borderRadius: "1px 1px 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}},
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["style-row",
                        [
                            ["clickable", 2000],
                            ["clickable", 2001]
                        ]
                    ],
                    ["blank", "10px"],
                    ["style-row",
                        ["style-column",
                            ["style-column", [
                                ["blank", "10px"],
                                ["raw-html", () => {return "Alchemical Symbol Conversion Table"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["blank", "10px"],
                            ], {width: "900px", height: "40px", background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}
                            ]
                        ]
                    ],
                    ["style-row",
                        [
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolStarmetalAlloy.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolStarmetalAlloy)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%,  #60cfeb 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Starmetal Alloy Symbols</div>"}],
                            ], {width: "145px", height: "50px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolStarmetalEssence.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolStarmetalEssence)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Starmetal Essence Symbols</div>"}],
                            ], {width: "145px", height: "50px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolEclipseShard.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolEclipseShard)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(135deg, #ffb700, #ffe866)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Eclipse Shard Symbols</div>"}],
                            ], {width: "145px", height: "50px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolSpaceGem.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolSpaceGem)}, {width: "90px", height: "50px", color: "transparent", background: "radial-gradient(circle, #564BCC, #000000)", fontSize: "20px", textStroke: "1px #dbd7ff", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Space Gem Symbols</div>"}],
                            ], {width: "145px", height: "50px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolSpaceDust.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolSpaceDust)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Space Dust Symbols</div>"}],
                            ], {width: "145px", height: "50px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolSpaceRock.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolSpaceRock)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(15deg, #5f5f5f 0%, #c5c5c5 50%, #5f5f5f 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Space Rock Symbols</div>"}],
                            ], {width: "145px", height: "50px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                        ]
                    ],
                    ["style-row", [
                        ["style-column",
                            [
                                ["clickable", 1],
                                ["blank", "10px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.sma.starmetalAlloy) + " Starmetal Alloy."}, {color: "transparent", background: "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%,  #60cfeb 100%)", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                                ["blank", "30px"],
                                ["clickable", 2],
                                ["blank", "10px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.sme.starmetalEssence) + " Starmetal Essence."}, {color: "transparent", background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%, #eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                                ["blank", "30px"],
                                ["clickable", 3],
                                ["blank", "10px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.sma.eclipseShards) + " Eclipse Shards."}, {color: "transparent", background: "linear-gradient(135deg, #ffb700, #ffe866)", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}]
                            ], {width: "447px", height: "500px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088), repeating-linear-gradient(0deg, transparent, transparent 19px, #ffffff88 20px, #ffffff88 19px), repeating-linear-gradient(90deg, transparent, transparent 19px, #ffffff88 20px, #ffffff88 19px)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}
                        ],
                        ["style-column",
                            [
                                ["clickable", 4],
                                ["blank", "10px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.ir.spaceGem) + " Space Gems."}, {color: "transparent", background: "radial-gradient(circle, #564BCC, #000000)", fontSize: "16px", textStroke: "1px #dbd7ff", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                                ["blank", "30px"],
                                ["clickable", 5],
                                ["blank", "10px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.pl.spaceDust) + " Space Dust."}, {color: "transparent", background: "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                                ["blank", "30px"],
                                ["clickable", 6],
                                ["blank", "10px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.ir.spaceRock) + " Space Rocks."}, {color: "transparent", background: "linear-gradient(15deg, #5f5f5f 0%, #a8a8a8 50%, #5f5f5f 100%)", fontSize: "16px", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                            ], {width: "447px", height: "500px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088), repeating-linear-gradient(0deg, transparent, transparent 19px, #ffffff88 20px, #ffffff88 19px), repeating-linear-gradient(270deg, transparent, transparent 19px, #ffffff88 20px, #ffffff88 19px)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}]
                        ]
                    ],
                ]
            },
            "Node Crafting": {
                buttonStyle() { return {background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)", border: "3px solid white", borderRadius: "1px 1px 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}},
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["style-row",
                        [
                            ["clickable", 2002],
                            ["clickable", 2003],
                            ["clickable", 2004]
                        ]
                    ],
                    ["blank", "10px"],
                    ["style-row",
                        ["style-column",
                            ["style-column", [
                                ["blank", "10px"],
                                ["raw-html", () => {return "Crafting Table"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["blank", "10px"],
                            ], {width: "900px", height: "40px", background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}]
                        ]
                    ],
                    ["style-row",
                        [
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolStarmetalAlloy.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolStarmetalAlloy)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%,  #60cfeb 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Starmetal Alloy Symbols</div>"}],
                                ["clickable", 11],
                                ["clickable", 12]
                            ], {width: "145px", height: "110px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolStarmetalEssence.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolStarmetalEssence)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Starmetal Essence Symbols</div>"}],
                                ["clickable", 21],
                                ["clickable", 22]
                            ], {width: "145px", height: "110px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolEclipseShard.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolEclipseShard)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(135deg, #ffb700, #ffe866)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Eclipse Shard Symbols</div>"}],
                                ["clickable", 31],
                                ["clickable", 32]
                            ], {width: "145px", height: "110px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolSpaceGem.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolSpaceGem)}, {width: "90px", height: "50px", color: "transparent", background: "radial-gradient(circle, #564BCC, #000000)", fontSize: "20px", textStroke: "1px #dbd7ff", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Space Gem Symbols</div>"}],
                                ["clickable", 41],
                                ["clickable", 42]
                            ], {width: "145px", height: "110px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolSpaceDust.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolSpaceDust)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Space Dust Symbols</div>"}],
                                ["clickable", 51],
                                ["clickable", 52]
                            ], {width: "145px", height: "110px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/alchemyworld/symbolSpaceRock.png'style='width:40px;height:40px'></img>"], {width: "50px", height: "50px", display: "block", alignItems: "center"},
                                ["raw-html", () => {return formatShortWhole(player.btb.symbolSpaceRock)}, {width: "90px", height: "50px", color: "transparent", background: "linear-gradient(15deg, #5f5f5f 0%, #c5c5c5 50%, #5f5f5f 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace", backgroundClip: "text", fontFamily: "monospace", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => {return "<div class='bottomTooltip'>Space Rock Symbols</div>"}],
                                ["clickable", 61],
                                ["clickable", 62]
                            ], {width: "145px", height: "110px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                        ]
                    ],
                    ["style-row", [
                        ["style-column",
                            [
                                ["raw-html", () => {return "<img src='resources/alchemyworld/" + symbolBlueprint[player.btb.selectedBlueprintIndex] + ".png'></img>"}],
                                ["blank", "5px"],
                                ["raw-html", () => {return "<h2>Alchemical Node<br>Part Blueprint</h2><br><small>(Used as a guide)</small>"}],
                                ["blank", "20px"],
                                ["style-row",
                                    [
                                        ["clickable", 999],
                                    ]
                                ],
                                ["style-row",
                                    [
                                        ["clickable", 1001],
                                        ["clickable", 1003],
                                        ["clickable", 1005],
                                    ]
                                ],
                                ["style-row",
                                    [
                                        ["clickable", 1007],
                                        // ["clickable", 1009],
                                        // ["clickable", 1011],
                                    ]
                                ]
                            ], {width: "447px", height: "550px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088), repeating-linear-gradient(0deg, transparent, transparent 19px, #ffffff88 20px, #ffffff88 19px), repeating-linear-gradient(90deg, transparent, transparent 19px, #ffffff88 20px, #ffffff88 19px)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}
                        ],
                        ["style-column",
                            [
                                ["clickable", 1000],
                                ["clickable", 1002],
                                ["clickable", 1004],
                                ["clickable", 1006],
                                ["clickable", 1008],
                                ["blank", "20px"],
                                "grid",
                                ["blank", "20px"],
                                ["clickable", 7]
                            ], {width: "447px", height: "550px", background: "#000055", backgroundImage: " radial-gradient(circle, transparent, #00000088), repeating-linear-gradient(0deg, transparent, transparent 19px, #ffffff88 20px, #ffffff88 19px), repeating-linear-gradient(270deg, transparent, transparent 19px, #ffffff88 20px, #ffffff88 19px)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}
                        ]
                        ]
                    ]
                ]
            },
            "Node Storage": {
                buttonStyle() { return {background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)", border: "3px solid white", borderRadius: "1px 1px 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}},
                unlocked() { return player.btb.alcNodePartConverter.gte(1) },
                content: [
                    ["blank", "10px"],
                    ["style-row",
                        ["style-column",
                            ["style-column", [
                                ["blank", "10px"],
                                ["raw-html", () => {return "Node Storage"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["blank", "10px"],
                            ], {width: "900px", height: "40px", background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}]
                        ]
                    ],
                    ["style-row", [
                        ["style-column",
                            [
                                ["raw-html", () => {return "You have " + formatWhole(player.btb.alcNodePartConverter) + " Alchemical Node -Converters-."}, {color: "transparent", background: "white", fontSize: "25px", textStroke: "1px #cccccc", 'text-shadow': "0 0 5px black", backgroundClip: "text", fontFamily: "monospace"}],
                                ["raw-html", () => {return "You have " + formatWhole(player.btb.alcNodePartCondenser) + " Alchemical Node -Condensers-."}, {color: "transparent", background: "white", fontSize: "25px", textStroke: "1px #cccccc", 'text-shadow': "0 0 5px black", backgroundClip: "text", fontFamily: "monospace"}],
                                ["raw-html", () => {return "You have " + formatWhole(player.btb.alcNodePartGuider) + " Alchemical Node -Guiders-."}, {color: "transparent", background: "white", fontSize: "25px", textStroke: "1px #cccccc", 'text-shadow': "0 0 5px black", backgroundClip: "text", fontFamily: "monospace"}],
                                ["raw-html", () => {
                                    if (hasUpgrade("ktb", 103))
                                        return "You have " + formatWhole(player.btb.alcNodePartPartAcce) + " Alchemical Node -Particle Accelerators-."}, {color: "transparent", background: "white", fontSize: "25px", textStroke: "1px #cccccc", 'text-shadow': "0 0 5px black", backgroundClip: "text", fontFamily: "monospace"
                                    }],
                                ["blank", "30px"],
                                ["clickable", 3000],
                                ["clickable", 3001],
                                ["clickable", 3002],
                            ], {width: "900px", height: "700px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}
                        ],
                        ]
                    ]
                ]
            }
        }

    },
    tabFormat: [
        ["raw-html", () => {return "You have <h3>" + formatWhole(player.ktb.alchemicalSymbols) + "</h3> 🝪 Alchemical Symbols 🝪. (+" + formatWhole(player.ktb.alchemicalSymbolsGain) + ")"}, {color: "transparent", background: "linear-gradient(to bottom, #8b609c, magenta, pink)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
        ["microtabs", "nonElementals", {'border-width': '0px'}],
        ["blank", "10px"],
    ],

    layerShown() { return player.startedGame == true && hasUpgrade("ktb", 101)},
},
)
