// Add constants here
const symbolName = [
                    "symbolNone",
                    "symbolStarmetalAlloy",
                    "symbolStarmetalEssence",
                    "symbolEclipseShard",
                    "symbolSpaceGem",
                    "symbolPlanet",
                    "symbolSpaceRock",
                    ];

const symbolBlueprint = [
                    "blueprintEmpty",
                    "blueprintAlchemicalNodeConverter",
                    "blueprintAlchemicalNodeCondenser",
                    "blueprintAlchemicalNodeGuider"
                    ];

addLayer("ctb", {
    name: "Crafting Table",
    symbol: "✎",
    row: 2,
    universe: "LU",
    position: 1,
    
    startData() { return {
        unlocked: true,
        
        // Select Indexes
        selectedSymbolIndex: 0, // symbol select index
        selectedBlueprintIndex: 0, // blueprint select index
        
        // Altered Alchemical Symbol Selection Boolean
        selectedSymbolSMA: false,
        selectedSymbolSME: false,
        selectedSymbolECS: false,
        selectedSymbolSPG: false,
        selectedSymbolPLN: false,
        selectedSymbolSPR: false,

        // Crafting Content
        // Alchemical Node Parts Resources
        unlockedAlchemyAltar: false,
        craftAll: false,
        craftedAtLeastOnceConverter: false,
        craftedAtLeastOnceCondenser: false,
        craftedAtLeastOnceGuider: false,
        alcNodePartConverter: new Decimal(0),
        alcNodePartCondenser: new Decimal(0),
        alcNodePartGuider: new Decimal(0),
        alcNodePartPartAcce: new Decimal(0),
    }},
    automate() {},

    nodeStyle: {
        backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(0deg, transparent, transparent 9%, #ffffff88 9%, #ffffff88 10%), repeating-linear-gradient(90deg, transparent, transparent 9%, #ffffff88 9%, #ffffff88 10%), linear-gradient(to top, #000055, #0000ff, #5555ff)",
        backgroundOrigin: "border-box",
        borderColor: "transparent",
        color: "#ffffff",
        'text-shadow' : "0 0 3px #000000, 0 0 3px #000000",
        textStroke: "1px #00000022",
        borderImage: "radial-gradient(circle, #0000ff 75%, #ffffff) 1",
        boxShadow: "0 0 3px 1px #000000 inset",
        borderRadius: "0px"
    },
    tooltip: "Crafting Table",
    color: "white",
    branches: ["ssp", "tlb"],

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
                if (player.ctb.selectedSymbolSMA == true || player.ctb.selectedSymbolSME == true || player.ctb.selectedSymbolECS == true || player.ctb.selectedSymbolSPG == true || player.ctb.selectedSymbolPLN == true || player.ctb.selectedSymbolSPR == true) {
                    setGridData("ctb", id, player.ctb.selectedSymbolIndex)
                } else {
                    player.ctb.selectedSymbolIndex = 0;
                    setGridData("ctb", id, 0)
                }
            }
        },
        getStyle() {
            let look = {width: "50px", height: "50px", background: "#a2a2a2", border: "5px solid #777777", borderRadius: "0", padding: "0", margin: "3px", boxShadow: "0 0 2px 2px white, 0 0 5px 5px black"}
            return look
        }
    },

    update(delta) {
        let onepersec = new Decimal(1)
    },

    clickables: {
        encoder1: {
            title() {
                if(player.ssp.alchemicalSymbolsGain == 1)
                    return "<h2>Symbol Encoder I</h2><hr>Encode <h2>" + formatWhole(player.ssp.alchemicalSymbolsGain) + "</h2><br>🝪 Al.Sy 🝪.<br><br><small>(Req.: e10,000,000 Cel.Pts.)</small>"
                else
                    return "<h2>Symbol Encoder I</h2><hr>Encode <h2>" + formatWhole(player.ssp.alchemicalSymbolsGain) + "</h2><br>🝪 Al.Sys 🝪.<br><br><small>(Req.: e10,000,000 Cel.Pts.)</small>"
            },
            canClick() {return player.ssp.canAlSyReset == true && player.points.gte("e10000000")},
            unlocked() {return true},
            onClick() { 
                layers.ssp.alchemicalSymbolsReset()
                player.ssp.canAlSyReset = false
            },
            style() {
                let look = {fontSize: "7px", width: "170px", minHeight: "90px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "20px", boxShadow: "0 0 5px 1px #000000 inset, 0 0 10px 1px #000000 inset, 0 0 5px 1px #000000, 0 0 5px 1px #000000"}
                    if (this.canClick()) {
                        look.backgroundImage = "radial-gradient(ellipse, #000000cd, transparent 90%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #00ff00 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #00ff0067 90%), repeating-linear-gradient(45deg, transparent, transparent 9%, #00ff0067 9%, #00ff0067 10%), repeating-linear-gradient(135deg, transparent, transparent 9%, #00ff0067 9%, #00ff0067 10%), repeating-radial-gradient(circle at 50% 200%, #00ff0067, #00ff0067 5%, transparent 5%, transparent 10%, #00ff0067 10%), linear-gradient(to bottom, #00000078 10%, transparent 40%, transparent 60%, #00000078 90%), linear-gradient(to bottom, #00000078, #00000078), linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)"
                        look.border = "3px solid #00ff00"
                        look.color = "#00ff00"
                        look.textShadow = "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000"
                        look.textStroke = "1px #aaffaaab"
                    } else {
                        look.backgroundImage = "linear-gradient(to bottom, #382413, #382413)"
                        look.border = "3px solid #97795b"
                        look.color = "#97795b"
                        look.textShadow = "0 0 5px #97795b, 0 0 10px #000000, 0 0 10px #000000"
                        look.textStroke = "1px #00000022"
                    }
                return look
            }
        },
        encoder2: {
            title() {
                if (hasUpgrade("ssp", 104))
                    return "<h2>Symbol Encoder II</h2><hr>Encode <h2>" + formatWhole(player.ssp.advAlchemicalSymbolsGain) + "</h2><br>✩🝪 Adv.Al.Sys 🝪✩.<br><br><small>(Req.: ??? 🝪 Al.Sys 🝪.)</small>"
                else
                    return "<h2>You haven't unlocked this button yet!</h2>"
            },
            canClick() {
                if (hasUpgrade("ssp", 104))
                    return true
                else
                    return false
            },
            unlocked() {return true},
            onClick() {},
            style() {
                let look = {fontSize: "7px", width: "170px", minHeight: "90px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "20px", boxShadow: "0 0 5px 1px #000000 inset, 0 0 10px 1px #000000 inset, 0 0 5px 1px #000000, 0 0 5px 1px #000000"}
                    if (this.canClick()) {
                        look.backgroundImage = "radial-gradient(ellipse, #000000cd, transparent 90%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff00ff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff00ff67 90%), repeating-linear-gradient(45deg, transparent, transparent 9%, #ff00ff67 9%, #ff00ff67 10%), repeating-linear-gradient(135deg, transparent, transparent 9%, #ff00ff67 9%, #ff00ff67 10%), repeating-radial-gradient(circle at 50% -200%, #ff00ff67, #ff00ff67 5%, transparent 5%, transparent 10%, #ff00ff67 10%), linear-gradient(to bottom, #00000078 10%, transparent 40%, transparent 60%, #00000078 90%), linear-gradient(to bottom, #00000078, #00000078), linear-gradient(to bottom, #8b609c, #ff00ff, #ffc0cb)"
                        look.border = "3px solid #ff00ff"
                        look.color = "#ff00ff"
                        look.textShadow = "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000"
                        look.textStroke = "1px #ffaaffab"
                    } else {
                        look.backgroundImage = "linear-gradient(to bottom, #382413, #382413)"
                        look.border = "3px solid #97795b"
                        look.color = "#97795b"
                        look.textShadow = "0 0 5px #97795b, 0 0 10px #000000, 0 0 10px #000000"
                        look.textStroke = "1px #00000022"
                    }
                return look
            }
        },
        craftAllUnlocker: {
            title() {return "Craft 1 Converter first!"},
            canClick() {return false},
            unlocked() {
                if (player.ctb.craftedAtLeastOnceConverter != true) {return true}
                else return false
            },
            style() {
            let look = {width: '200px', minHeight: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            return look
            },
        },
        craftAllOff: {
            title() {return player.ctb.craftAll == false ? "Craft All<br>OFF<br>[ACTIVE]" : "Craft All<br>OFF"},
            canClick() { return player.ctb.craftAll == true },
            unlocked() { return player.ctb.craftedAtLeastOnceConverter == true },
            onClick() { 
                player.ctb.craftAll = false
            },
            style() {
            let look = {width: '100px', minHeight: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            }
            return look
            }
        },
        craftAllOn: {
            title() {return player.ctb.craftAll == true ? "Craft All<br>ON<br>[ACTIVE]" : "Craft All<br>ON"},
            canClick() { return player.ctb.craftAll == false },
            unlocked() { return player.ctb.craftedAtLeastOnceConverter == true },
            onClick() { 
                player.ctb.craftAll = true
            },
            style() {
            let look = {width: '100px', minHeight: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            }
            return look
            }
        },
        clearGrid: {
            title() {return "Clear Grid"},
            canClick() {return true},
            unlocked() {return true},
            onClick() { 
                if (player.ctb.selectedSymbolSMA == true || player.ctb.selectedSymbolSME == true || player.ctb.selectedSymbolECS == true || player.ctb.selectedSymbolSPG == true || player.ctb.selectedSymbolPLN == true || player.ctb.selectedSymbolSPR == true) {
                    player.ctb.selectedSymbolSMA = false;
                    player.ctb.selectedSymbolSME = false;
                    player.ctb.selectedSymbolECS = false;
                    player.ctb.selectedSymbolSPG = false;
                    player.ctb.selectedSymbolPLN = false;
                    player.ctb.selectedSymbolSPR = false;
                    player.ctb.selectedSymbolIndex = 0;
                }

                if (getGridData("ctb", id) != 1) {
                    for (let i = 1; i < 506; ) {
                        if (getGridData("ctb", i) != -1) {
                            setGridData("ctb", i, 0)
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
        selectSMA: {
            title() {return "Select"},
            canClick() {return player.tlb.starmetalAlloySymbols.gte(1)},
            unlocked() {
            if (player.ctb.selectedSymbolSMA == true) {return false}
            else {return true}
            },
            onClick() {
                player.ctb.selectedSymbolIndex = 1;
                player.ctb.selectedSymbolSMA = true;
                player.ctb.selectedSymbolSME = false;
                player.ctb.selectedSymbolECS = false;
                player.ctb.selectedSymbolSPG = false;
                player.ctb.selectedSymbolPLN = false;
                player.ctb.selectedSymbolSPR = false
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
        deselectSMA: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.ctb.selectedSymbolSMA == true},
            onClick() {
                player.ctb.selectedSymbolIndex = 0;
                player.ctb.selectedSymbolSMA = false;
                player.ctb.selectedSymbolSME = false;
                player.ctb.selectedSymbolECS = false;
                player.ctb.selectedSymbolSPG = false;
                player.ctb.selectedSymbolPLN = false;
                player.ctb.selectedSymbolSPR = false
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
        selectSME: {
            title() {return "Select"},
            canClick() {return player.tlb.starmetalEssenceSymbols.gte(1)},
            unlocked() {
            if (player.ctb.selectedSymbolSME == true) {return false}
            else {return true}
            },
            onClick() {
                player.ctb.selectedSymbolIndex = 2;
                player.ctb.selectedSymbolSMA = false;
                player.ctb.selectedSymbolSME = true;
                player.ctb.selectedSymbolECS = false;
                player.ctb.selectedSymbolSPG = false;
                player.ctb.selectedSymbolPLN = false;
                player.ctb.selectedSymbolSPR = false
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
        deselectSME: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.ctb.selectedSymbolSME == true},
            onClick() {
                player.ctb.selectedSymbolIndex = 0;
                player.ctb.selectedSymbolSMA = false;
                player.ctb.selectedSymbolSME = false;
                player.ctb.selectedSymbolECS = false;
                player.ctb.selectedSymbolSPG = false;
                player.ctb.selectedSymbolPLN = false;
                player.ctb.selectedSymbolSPR = false
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
        selectECS: {
            title() {return "Select"},
            canClick() {return player.tlb.eclipseShardSymbols.gte(1)},
            unlocked() {
            if (player.ctb.selectedSymbolECS == true) {return false}
            else {return true}
            },
            onClick() {
                player.ctb.selectedSymbolIndex = 3;
                player.ctb.selectedSymbolSMA = false;
                player.ctb.selectedSymbolSME = false;
                player.ctb.selectedSymbolECS = true;
                player.ctb.selectedSymbolSPG = false;
                player.ctb.selectedSymbolPLN = false;
                player.ctb.selectedSymbolSPR = false
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
        deselectECS: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.ctb.selectedSymbolECS == true},
            onClick() {
                player.ctb.selectedSymbolIndex = 0;
                player.ctb.selectedSymbolSMA = false;
                player.ctb.selectedSymbolSME = false;
                player.ctb.selectedSymbolECS = false;
                player.ctb.selectedSymbolSPG = false;
                player.ctb.selectedSymbolPLN = false;
                player.ctb.selectedSymbolSPR = false
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
        selectSPG: {
            title() {return "Select"},
            canClick() {return player.tlb.spaceGemSymbols.gte(1)},
            unlocked() {
            if (player.ctb.selectedSymbolSPG == true) {return false}
            else {return true}
            },
            onClick() {
                player.ctb.selectedSymbolIndex = 4;
                player.ctb.selectedSymbolSMA = false;
                player.ctb.selectedSymbolSME = false;
                player.ctb.selectedSymbolECS = false;
                player.ctb.selectedSymbolSPG = true;
                player.ctb.selectedSymbolPLN = false;
                player.ctb.selectedSymbolSPR = false
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
        deselectSPG: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.ctb.selectedSymbolSPG == true},
            onClick() {
                player.ctb.selectedSymbolIndex = 0;
                player.ctb.selectedSymbolSMA = false;
                player.ctb.selectedSymbolSME = false;
                player.ctb.selectedSymbolECS = false;
                player.ctb.selectedSymbolSPG = false;
                player.ctb.selectedSymbolPLN = false;
                player.ctb.selectedSymbolSPR = false
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
        selectPLN: {
            title() {return "Select"},
            canClick() {return player.tlb.planetSymbols.gte(1)},
            unlocked() {
            if (player.ctb.selectedSymbolPLN == true) {return false}
            else {return true}
            },
            onClick() {
                player.ctb.selectedSymbolIndex = 5;
                player.ctb.selectedSymbolSMA = false;
                player.ctb.selectedSymbolSME = false;
                player.ctb.selectedSymbolECS = false;
                player.ctb.selectedSymbolSPG = false;
                player.ctb.selectedSymbolPLN = true;
                player.ctb.selectedSymbolSPR = false
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
        deselectPLN: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.ctb.selectedSymbolPLN == true},
            onClick() {
                player.ctb.selectedSymbolIndex = 0;
                player.ctb.selectedSymbolSMA = false;
                player.ctb.selectedSymbolSME = false;
                player.ctb.selectedSymbolECS = false;
                player.ctb.selectedSymbolSPG = false;
                player.ctb.selectedSymbolPLN = false;
                player.ctb.selectedSymbolSPR = false
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
        selectSPR: {
            title() {return "Select"},
            canClick() {return player.tlb.spaceRockSymbols.gte(1)},
            unlocked() {
            if (player.ctb.selectedSymbolSPR == true) {return false}
            else {return true}
            },
            onClick() {
                player.ctb.selectedSymbolIndex = 6;
                player.ctb.selectedSymbolSMA = false;
                player.ctb.selectedSymbolSME = false;
                player.ctb.selectedSymbolECS = false;
                player.ctb.selectedSymbolSPG = false;
                player.ctb.selectedSymbolPLN = false;
                player.ctb.selectedSymbolSPR = true
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
        deselectSPR: {
            title() {return "Deselect"},
            canClick() {return true},
            unlocked() {return player.ctb.selectedSymbolSPR == true},
            onClick() {
                player.ctb.selectedSymbolIndex = 0;
                player.ctb.selectedSymbolSMA = false;
                player.ctb.selectedSymbolSME = false;
                player.ctb.selectedSymbolECS = false;
                player.ctb.selectedSymbolSPG = false;
                player.ctb.selectedSymbolPLN = false;
                player.ctb.selectedSymbolSPR = false
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
        blueprintEmpty: {
            title() {return player.ctb.selectedBlueprintIndex == 0 ? "Empty<br>[ACTIVE]" : "Empty"},
            canClick() {return player.ctb.selectedBlueprintIndex != 0},
            unlocked() {return true},
            onClick() { 
                player.ctb.selectedBlueprintIndex = 0
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            }
            return look
            }
        },
        blueprintConverter: {
            title() {return player.ctb.selectedBlueprintIndex == 1 ? "Converter<br>[ACTIVE]" : "Converter"},
            canClick() {return player.ctb.selectedBlueprintIndex != 1},
            unlocked() {return true},
            onClick() { 
                player.ctb.selectedBlueprintIndex = 1
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            }
            return look
            }
        },
        blueprintCondenser: {
            title() {return player.ctb.selectedBlueprintIndex == 2 ? "Condenser<br>[ACTIVE]" : "Condenser"},
            canClick() {return player.ctb.selectedBlueprintIndex != 2},
            unlocked() {return player.ctb.craftedAtLeastOnceConverter == true},
            onClick() { 
                player.ctb.selectedBlueprintIndex = 2
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            }
            return look
            }
        },
        blueprintGuider: {
            title() {return player.ctb.selectedBlueprintIndex == 3 ? "Guider<br>[ACTIVE]" : "Guider"},
            canClick() {return player.ctb.selectedBlueprintIndex != 3},
            unlocked() {return player.ctb.craftedAtLeastOnceCondenser == true},
            onClick() { 
                player.ctb.selectedBlueprintIndex = 3
            },
            style() {
            let look = {width: '100px', minHeight: '50px', maxHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundColor = "#333333";
                look.border = "3px solid #000000";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.background = "linear-gradient(to bottom, #8b609c, magenta, pink)";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, chartreuse, #00ff9d) 1";
                look.color = "black";
                look.boxShadow = "0 0 3px 1px black inset, 0 0 5px white"
            }
            return look
            }
        },
        1000: {
            title() {return "Cannot Craft Alchemical Node Part!<br>Use the Blueprints to help you!"},
            canClick() {return false},
            unlocked() {
                if (tmp.ctb.clickables[1002].unlocked || tmp.ctb.clickables[1004].unlocked || tmp.ctb.clickables[1006].unlocked)
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
        1002: {
            title() {
                let val1 = player.tlb.starmetalAlloySymbols.div(4).floor();
                let val2 = player.tlb.starmetalEssenceSymbols.div(4).floor();
                let val3 = player.tlb.spaceGemSymbols.div(1).floor();
                let val4 = player.tlb.planetSymbols.div(8).floor();
                let val5 = player.tlb.spaceRockSymbols.div(4).floor();
                let result = val3
                if(val1.lt(val3) && val2.lt(val3) && val4.lt(val3) && val5.lt(val3)) result = val4

                if(player.ctb.craftAll == true)
                    return "Craft Alchemical Node Part <br>-Converter- x" + val4 + "!"
                else
                    return "Craft Alchemical Node Part <br>-Converter- x1!"
            },
            canClick() { // if the layout aligns with the blueprint, then canClick will return 'true'. Otherwise, return 'false'.
                return true
            }, 
            unlocked() {
                if (
                       getGridData("ctb", 101) == 6 && getGridData("ctb", 102) == 5 && getGridData("ctb", 103) == 1 && getGridData("ctb", 104) == 5 && getGridData("ctb", 105) == 6
                    && getGridData("ctb", 201) == 5 && getGridData("ctb", 202) == 0 && getGridData("ctb", 203) == 2 && getGridData("ctb", 204) == 0 && getGridData("ctb", 205) == 5
                    && getGridData("ctb", 301) == 1 && getGridData("ctb", 302) == 2 && getGridData("ctb", 303) == 4 && getGridData("ctb", 304) == 2 && getGridData("ctb", 305) == 1
                    && getGridData("ctb", 401) == 5 && getGridData("ctb", 402) == 0 && getGridData("ctb", 403) == 2 && getGridData("ctb", 404) == 0 && getGridData("ctb", 405) == 5
                    && getGridData("ctb", 501) == 6 && getGridData("ctb", 502) == 5 && getGridData("ctb", 503) == 1 && getGridData("ctb", 504) == 5 && getGridData("ctb", 505) == 6
                    && player.tlb.starmetalAlloySymbols.gte(4)
                    && player.tlb.starmetalEssenceSymbols.gte(4)
                    && player.tlb.spaceGemSymbols.gte(1)
                    && player.tlb.planetSymbols.gte(8)
                    && player.tlb.spaceRockSymbols.gte(4)
                    )
                return true
            },
            onClick() { 
                if (player.ctb.craftAll == false) {
                    player.tlb.starmetalAlloySymbols = player.tlb.starmetalAlloySymbols.sub(4);
                    player.tlb.starmetalEssenceSymbols = player.tlb.starmetalEssenceSymbols.sub(4);
                    player.tlb.spaceGemSymbols = player.tlb.spaceGemSymbols.sub(1);
                    player.tlb.planetSymbols = player.tlb.planetSymbols.sub(8);
                    player.tlb.spaceRockSymbols = player.tlb.spaceRockSymbols.sub(4);
                    player.ctb.alcNodePartConverter = player.ctb.alcNodePartConverter.add(1)
                }
                else if (player.ctb.craftAll == true)  {
                    let val1 = player.tlb.starmetalAlloySymbols.div(4).floor();
                    let val2 = player.tlb.starmetalEssenceSymbols.div(4).floor();
                    let val3 = player.tlb.spaceGemSymbols.div(1).floor();
                    let val4 = player.tlb.planetSymbols.div(8).floor();
                    let val5 = player.tlb.spaceRockSymbols.div(4).floor();
                    let result = val3
                    if(val1.lt(val3) && val2.lt(val3) && val4.lt(val3) && val5.lt(val3)) result = val4

                    player.ctb.alcNodePartConverter = player.ctb.alcNodePartConverter.add(result);
                    player.tlb.starmetalAlloySymbols = player.tlb.starmetalAlloySymbols.sub(Decimal.mul(4, result));
                    player.tlb.starmetalEssenceSymbols = player.tlb.starmetalEssenceSymbols.sub(Decimal.mul(4, result));
                    player.tlb.spaceGemSymbols = player.tlb.spaceGemSymbols.sub(Decimal.mul(1, result));
                    player.tlb.planetSymbols = player.tlb.planetSymbols.sub(Decimal.mul(8, result));
                    player.tlb.spaceRockSymbols = player.tlb.spaceRockSymbols.sub(Decimal.mul(4, result));
                }

                player.ctb.selectedSymbolIndex = 0;
                player.ctb.selectedSymbolSMA = false;
                player.ctb.selectedSymbolSME = false;
                player.ctb.selectedSymbolECS = false;
                player.ctb.selectedSymbolSPG = false;
                player.ctb.selectedSymbolPLN = false;
                player.ctb.selectedSymbolSPR = false;
                player.ctb.craftedAtLeastOnceConverter = true

                if (getGridData("ctb", id) != 1) {
                for (let i = 1; i < 506; ) {
                    if (getGridData("ctb", i) != -1) {
                            setGridData("ctb", i, 0)
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
        1004: {
            title() {
                let val1 = player.tlb.starmetalAlloySymbols.div(4).floor();
                let val2 = player.tlb.starmetalEssenceSymbols.div(4).floor();
                let val3 = player.tlb.eclipseShardSymbols.div(1).floor();
                let val4 = player.tlb.planetSymbols.div(8).floor();
                let val5 = player.tlb.spaceRockSymbols.div(4).floor();
                let result = val3
                if(val1.lt(val3) && val2.lt(val3) && val4.lt(val3) && val5.lt(val3)) result = val4

                if(player.ctb.craftAll == true)
                    return "Craft Alchemical Node Part <br>-Condenser- x" + val4 + "!"
                else
                    return "Craft Alchemical Node Part <br>-Condenser- x1!"
            },
            canClick() {
                return true
            }, 
            unlocked() {
                if (
                       getGridData("ctb", 101) == 6 && getGridData("ctb", 102) == 5 && getGridData("ctb", 103) == 1 && getGridData("ctb", 104) == 5 && getGridData("ctb", 105) == 6
                    && getGridData("ctb", 201) == 5 && getGridData("ctb", 202) == 0 && getGridData("ctb", 203) == 2 && getGridData("ctb", 204) == 0 && getGridData("ctb", 205) == 5
                    && getGridData("ctb", 301) == 1 && getGridData("ctb", 302) == 2 && getGridData("ctb", 303) == 3 && getGridData("ctb", 304) == 2 && getGridData("ctb", 305) == 1
                    && getGridData("ctb", 401) == 5 && getGridData("ctb", 402) == 0 && getGridData("ctb", 403) == 2 && getGridData("ctb", 404) == 0 && getGridData("ctb", 405) == 5
                    && getGridData("ctb", 501) == 6 && getGridData("ctb", 502) == 5 && getGridData("ctb", 503) == 1 && getGridData("ctb", 504) == 5 && getGridData("ctb", 505) == 6
                    && player.tlb.starmetalAlloySymbols.gte(4)
                    && player.tlb.starmetalEssenceSymbols.gte(4)
                    && player.tlb.eclipseShardSymbols.gte(1)
                    && player.tlb.planetSymbols.gte(8)
                    && player.tlb.spaceRockSymbols.gte(4)
                    && player.ctb.craftedAtLeastOnceConverter == true
                )
                return true      
            },
            onClick() { 
                if (player.ctb.craftAll == false) {
                    player.tlb.starmetalAlloySymbols = player.tlb.starmetalAlloySymbols.sub(4);
                    player.tlb.starmetalEssenceSymbols = player.tlb.starmetalEssenceSymbols.sub(4);
                    player.tlb.eclipseShardSymbols = player.tlb.eclipseShardSymbols.sub(1);
                    player.tlb.planetSymbols = player.tlb.planetSymbols.sub(8);
                    player.tlb.spaceRockSymbols = player.tlb.spaceRockSymbols.sub(4);
                    player.ctb.alcNodePartCondenser = player.ctb.alcNodePartCondenser.add(1)
                }
                else if (player.ctb.craftAll == true) {
                    let val1 = player.tlb.starmetalAlloySymbols.div(4).floor();
                    let val2 = player.tlb.starmetalEssenceSymbols.div(4).floor();
                    let val3 = player.tlb.eclipseShardSymbols.div(1).floor();
                    let val4 = player.tlb.planetSymbols.div(8).floor();
                    let val5 = player.tlb.spaceRockSymbols.div(4).floor();
                    let result = val3
                    if(val1.lt(val3) && val2.lt(val3) && val4.lt(val3) && val5.lt(val3)) result = val4

                    player.ctb.alcNodePartCondenser = player.ctb.alcNodePartCondenser.add(result);
                    player.tlb.starmetalAlloySymbols = player.tlb.starmetalAlloySymbols.sub(Decimal.mul(4, result));
                    player.tlb.starmetalEssenceSymbols = player.tlb.starmetalEssenceSymbols.sub(Decimal.mul(4, result));
                    player.tlb.eclipseShardSymbols = player.tlb.eclipseShardSymbols.sub(Decimal.mul(1, result));
                    player.tlb.planetSymbols = player.tlb.planetSymbols.sub(Decimal.mul(8, result));
                    player.tlb.spaceRockSymbols = player.tlb.spaceRockSymbols.sub(Decimal.mul(4, result));
                }

                player.ctb.selectedSymbolIndex = 0;
                player.ctb.selectedSymbolSMA = false;
                player.ctb.selectedSymbolSME = false;
                player.ctb.selectedSymbolECS = false;
                player.ctb.selectedSymbolSPG = false;
                player.ctb.selectedSymbolPLN = false;
                player.ctb.selectedSymbolSPR = false;
                player.ctb.craftedAtLeastOnceCondenser = true

                if (getGridData("ctb", id) != 1) {
                for (let i = 1; i < 506; ) {
                    if (getGridData("ctb", i) != -1) {
                            setGridData("ctb", i, 0)
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
        1006: {
            title() {
                let val1 = player.tlb.starmetalEssenceSymbols.div(5).floor();
                let val2 = player.tlb.planetSymbols.div(4).floor();
                let val3 = player.tlb.spaceRockSymbols.div(6).floor();
                let result = val2;
                if(val1.lt(val2) && val3.lt(val2)) result = val3
                
                if(player.ctb.craftAll == true)
                    return "Craft Alchemical Node Part <br>-Guider- x" + val3 + "!"
                else
                    return "Craft Alchemical Node Part <br>-Guider- x1!"
            },
            canClick() {
                return true
            }, 
            unlocked() {
                if (
                       getGridData("ctb", 101) == 0 && getGridData("ctb", 102) == 0 && getGridData("ctb", 103) == 0 && getGridData("ctb", 104) == 0 && getGridData("ctb", 105) == 0
                    && getGridData("ctb", 201) == 6 && getGridData("ctb", 202) == 5 && getGridData("ctb", 203) == 6 && getGridData("ctb", 204) == 5 && getGridData("ctb", 205) == 6
                    && getGridData("ctb", 301) == 2 && getGridData("ctb", 302) == 2 && getGridData("ctb", 303) == 2 && getGridData("ctb", 304) == 2 && getGridData("ctb", 305) == 2
                    && getGridData("ctb", 401) == 6 && getGridData("ctb", 402) == 5 && getGridData("ctb", 403) == 6 && getGridData("ctb", 404) == 5 && getGridData("ctb", 405) == 6
                    && getGridData("ctb", 501) == 0 && getGridData("ctb", 502) == 0 && getGridData("ctb", 503) == 0 && getGridData("ctb", 504) == 0 && getGridData("ctb", 505) == 0
                    && player.tlb.starmetalEssenceSymbols.gte(5)
                    && player.tlb.planetSymbols.gte(4)
                    && player.tlb.spaceRockSymbols.gte(6)
                    && player.ctb.craftedAtLeastOnceCondenser == true
                )
                return true
            },
            onClick() { 
                if (player.ctb.craftAll == false) {
                    player.tlb.starmetalEssenceSymbols = player.tlb.starmetalEssenceSymbols.sub(5);
                    player.tlb.planetSymbols = player.tlb.planetSymbols.sub(4);
                    player.tlb.spaceRockSymbols = player.tlb.spaceRockSymbols.sub(6);
                    player.ctb.alcNodePartGuider = player.ctb.alcNodePartGuider.add(1)
                }
                else if (player.ctb.craftAll == true) {
                    let val1 = player.tlb.starmetalEssenceSymbols.div(5).floor();
                    let val2 = player.tlb.planetSymbols.div(4).floor();
                    let val3 = player.tlb.spaceRockSymbols.div(6).floor();
                    let result = val2;
                    if(val1.lt(val2) && val3.lt(val2)) result = val3

                    player.ctb.alcNodePartGuider = player.ctb.alcNodePartGuider.add(result);
                    player.tlb.starmetalEssenceSymbols = player.tlb.starmetalEssenceSymbols.sub(Decimal.mul(5, result));
                    player.tlb.planetSymbols = player.tlb.planetSymbols.sub(Decimal.mul(4, result));
                    player.tlb.spaceRockSymbols = player.tlb.spaceRockSymbols.sub(Decimal.mul(6, result));
                }

                player.ctb.selectedSymbolIndex = 0;
                player.ctb.selectedSymbolSMA = false;
                player.ctb.selectedSymbolSME = false;
                player.ctb.selectedSymbolECS = false;
                player.ctb.selectedSymbolSPG = false;
                player.ctb.selectedSymbolPLN = false;
                player.ctb.selectedSymbolSPR = false;
                player.ctb.craftedAtLeastOnceGuider = true

                if (getGridData("ctb", id) != 1) {
                for (let i = 1; i < 506; ) {
                    if (getGridData("ctb", i) != -1) {
                            setGridData("ctb", i, 0)
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
    },
    
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Node Crafting": {
                buttonStyle() { return {background: "linear-gradient(0deg, #000055 50%, #0000ff 100%)", border: "3px solid white", borderRadius: "1px 1px 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}},
                unlocked() { return true },
                content: [
                    ["blank", "5px"],
                    ["row",
                        [
                            ["raw-html", () => {return "You are currently in the"}, {color: "#ffffff", fontSize: "18px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                            ["blank", "2px"],
                            ["raw-html", () => {return "-<u>Node Crafting</u>-."}, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                        ]
                    ],
                    ["blank", "10px"],
                    ["style-row",
                        [
                            ["clickable", "craftAllUnlocker"],
                            ["clickable", "craftAllOff"],
                            ["clickable", "craftAllOn"]
                        ]
                    ],
                    ["blank", "10px"],
                    ["style-row",
                        [
                            ["row", [
                                ["column",
                                    [
                                        ["raw-html", "<img src='resources/alchemyworld/symbolStarmetalAlloy.png'style='width:40px;height:40px'></img>"]
                                    ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                ],
                                ["blank", "5px"],
                                ["column",
                                    [
                                        ["raw-html", () => {return formatShortWhole(player.tlb.starmetalAlloySymbols)}]
                                    ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%,  #60cfeb 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px #ffffff78, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                ],
                                ["clickable", "selectSMA"],
                                ["clickable", "deselectSMA"]
                            ], {width: "145px", height: "110px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["row", [
                                ["column",
                                    [
                                        ["raw-html", "<img src='resources/alchemyworld/symbolStarmetalEssence.png'style='width:40px;height:40px'></img>"]
                                    ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                ],
                                ["blank", "5px"],
                                ["column",
                                    [
                                        ["raw-html", () => {return formatShortWhole(player.tlb.starmetalEssenceSymbols)}]
                                    ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px #ffffff78, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                ],
                                ["clickable", "selectSME"],
                                ["clickable", "deselectSME"]
                            ], {width: "145px", height: "110px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["row", [
                                ["column",
                                    [
                                        ["raw-html", "<img src='resources/alchemyworld/symbolEclipseShard.png'style='width:40px;height:40px'></img>"]
                                    ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                ],
                                ["blank", "5px"],
                                ["column",
                                    [
                                        ["raw-html", () => {return formatShortWhole(player.tlb.eclipseShardSymbols)}]
                                    ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(135deg, #ffb700, #ffe866)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px #ffffff78, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                ],
                                ["clickable", "selectECS"],
                                ["clickable", "deselectECS"]
                            ], {width: "145px", height: "110px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["row", [
                                ["column",
                                    [
                                        ["raw-html", "<img src='resources/alchemyworld/symbolSpaceGem.png'style='width:40px;height:40px'></img>"]
                                    ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                ],
                                ["blank", "5px"],
                                ["column",
                                    [
                                        ["raw-html", () => {return formatShortWhole(player.tlb.spaceGemSymbols)}]
                                    ], {width: "70px", height: "20px", color: "transparent", background: "radial-gradient(circle, #564BCC, #000000)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px #ffffff78, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                ],
                                ["clickable", "selectSPG"],
                                ["clickable", "deselectSPG"]
                            ], {width: "145px", height: "110px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["row", [
                                ["column",
                                    [
                                        ["raw-html", "<img src='resources/alchemyworld/symbolPlanet.png'style='width:40px;height:40px'></img>"]
                                    ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                ],
                                ["blank", "5px"],
                                ["column",
                                    [
                                        ["raw-html", () => {return formatShortWhole(player.tlb.planetSymbols)}]
                                    ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px #ffffff78, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                ],
                                ["clickable", "selectPLN"],
                                ["clickable", "deselectPLN"]
                            ], {width: "145px", height: "110px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                            ["row", [
                                ["column",
                                    [
                                        ["raw-html", "<img src='resources/alchemyworld/symbolSpaceRock.png'style='width:40px;height:40px'></img>"]
                                    ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                ],
                                ["blank", "5px"],
                                ["column",
                                    [
                                        ["raw-html", () => {return formatShortWhole(player.tlb.spaceRockSymbols)}]
                                    ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(15deg, #5f5f5f 0%, #c5c5c5 50%, #5f5f5f 100%)", fontSize: "20px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px #ffffff78, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                ],
                                ["clickable", "selectSPR"],
                                ["clickable", "deselectSPR"]
                            ], {width: "145px", height: "110px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}],
                        ], {width: "910px", height: "110px"}
                    ],
                    ["style-row", [
                        ["style-column",
                            [
                                ["raw-html", () => {return "<img src='resources/alchemyworld/" + symbolBlueprint[player.ctb.selectedBlueprintIndex] + ".png'></img>"}],
                                ["blank", "5px"],
                                ["raw-html", () => {return "<h2>Alchemical Node<br>Part Blueprint</h2><br><small>(Used as a guide)</small>"}],
                                ["blank", "20px"],
                                ["style-row",
                                    [
                                        ["clickable", "blueprintEmpty"],
                                    ]
                                ],
                                ["style-row",
                                    [
                                        ["clickable", "blueprintConverter"],
                                        ["clickable", "blueprintCondenser"],
                                        ["clickable", "blueprintGuider"],
                                    ]
                                ],
                                // ["style-row",
                                //     [
                                //         ["clickable", 1007],
                                //         // ["clickable", 1009],
                                //         // ["clickable", 1011],
                                //     ]
                                // ]
                            ], {width: "447px", height: "550px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088), repeating-linear-gradient(0deg, transparent, transparent 20px, #ffffff88 20px, #ffffff88 21px, transparent 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, #ffffff88 20px, #ffffff88 21px, transparent 21px)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}
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
                                ["clickable", "clearGrid"]
                            ], {width: "447px", height: "550px", background: "#000055", backgroundImage: " radial-gradient(circle, transparent, #00000088), repeating-linear-gradient(0deg, transparent, transparent 20px, #ffffff88 20px, #ffffff88 21px, transparent 21px), repeating-linear-gradient(270deg, transparent, transparent 20px, #ffffff88 20px, #ffffff88 21px, transparent 21px)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}
                        ]
                        ], {width: "910px", height: "550px"}
                    ]
                ]
            },
        },
    },
    tabFormat: [
        ["row",
                [
                    ["column",
                        [
                            ["clickable", "encoder1"]
                        ]
                    ],
                    ["column", [], {width: "30px"}],
                    ["column",
                        [
                            ["raw-html", () => {return "You have <h3>" + formatWhole(player.ssp.alchemicalSymbols) + "</h3> 🝪 Al.Sys 🝪."}, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "15px", textStroke: "1px #aaffaaab", 'text-shadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                            ["raw-html", () => {
                                if (hasUpgrade("ssp", 104))
                                    return "You have <h3>" + formatWhole(player.ssp.advAlchemicalSymbols) + "</h3> ✩🝪 Adv.Al.Sys 🝪✩."}, {color: "transparent", background: "linear-gradient(to bottom, #8b609c, #ff00ff, #ffc0cb)", fontSize: "15px", textStroke: "1px #ffaaffab", 'text-shadow': "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"
                                }
                            ],
                            ["raw-html", () => {
                                if (hasUpgrade("ssp", 101) && player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true)
                                    return "You have <h3>" + formatWhole(player.tlb.revelationPoints) + "</h3> ⚿ Rev.Pts ⚿."}, {color: "transparent", background: "linear-gradient(0deg, #6b4423, #9b541a)", fontSize: "15px", textStroke: "1px #f8c898ab", 'text-shadow': "0 0 5px #9b541a, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"
                                }
                            ],
                            ["raw-html", () => {return "You have <h3>" + format(player.points) + "</h3> ✸ Cel.Pts ✸."}, {color: "#ffffff", fontSize: "15px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                        ], {width: "420px", height: "90px", border: "1px solid #ffdb8e", borderRadius: "20px", backgroundImage: "radial-gradient(ellipse, #000000ab 30%, transparent), linear-gradient(-135deg, #ffffffcd 10%, transparent 30%, transparent 70%, #000000cd 90%), linear-gradient(-135deg, #ffffff45, #00000045), repeating-linear-gradient(45deg, transparent, transparent 9%, #000000ab 9%, #000000ab 10%, #00000067 10%, #00000067 19%, #000000ab 19%, #000000ab 20%, transparent 20%, transparent 29%, #ffffffab 29%, #ffffffab 30%, #ffffff67 30%, #ffffff67 39%, #ffffffab 39%, #ffffffab 40%), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", boxShadow: "0 0 10px #000000, 0 0 10px #000000, 0 0 10px #000000 inset, 0 0 10px #000000 inset"}
                    ],
                    ["column", [], {width: "30px"}],
                    ["column",
                        [
                            ["clickable", "encoder2"]
                        ]
                    ],
                ], {marginTop:"-62px", width: "900px", height: "150px", backgroundImage: "radial-gradient(ellipse at 50% -40%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 50% -20%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}
            ],
            ["blank", "10px"],
            ["row",
                [
                    ["raw-html", () => {return "You are currently in the"}, {color: "#ffffff", fontSize: "18px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                    ["blank", "2px"],
                    ["raw-html", () => {return "-<u>Crafting Table</u>, Louki's Hideout-."}, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                ]
            ],
            ["blank", "10px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("ssp", 102)},
})