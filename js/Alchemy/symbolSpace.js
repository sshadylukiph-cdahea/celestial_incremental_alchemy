addLayer("ssp", {
    name: "Symbol Space",
    symbol: "🝪",
    row: 1,
    universe: "LU",
    position: 0,
    startData() { return {
        unlocked: true,

        // alchemical symbol generation
        alchemicalSymbols: new Decimal (0),
        alchemicalSymbolsGain: new Decimal (0),
        alchemicalSymbolsMult: new Decimal (1)
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, #6b4423, #9b541a)",
            backgroundOrigin: "border-box",
            borderColor: "#f8c898",
            color: "#f8c898",
            boxShadow: "0 0 3px 1px black inset",
            borderRadius: "10px",
            transform: "translateY(-0px)",
        }
    },
    tooltip: "Symbol Space",
    color: "#8b609c",
    update(delta) {
        // Continuous gains, maybe later
        let onepersec = new Decimal(1)
        // Start of Alchemical Symbol Gain
        player.ssp.alchemicalSymbolsGain = player.points.add(1).log10(player.points).div(1000000)
        // Flooring Alchemical Symbol Gain
        player.ssp.alchemicalSymbolsGain = player.ssp.alchemicalSymbolsGain.floor()
    },
    // Alchemical Symbol Reset mechanism
    alchemicalSymbolsReset() {
        layers.co.singularityReset()
        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.add(player.ssp.alchemicalSymbolsGain)
    },
    branches: ["ssp"],
    clickables: {
        1: {
            title() {return "<h2>Symbol Encoder</h2><hr>Encode <h3>" + formatWhole(player.ssp.alchemicalSymbolsGain) + "</h3> 🝪 Alchemical Symbols 🝪."},
            canClick() {return player.ssp.alchemicalSymbolsGain.gte(1) & player.points.gte("1e1000000")},
            unlocked() {return true},
            onClick() { 
                layers.ssp.alchemicalSymbolsReset()
            },
            tooltip: "(Requires e1,000,000 Celestial Points.)",
            style() {
            let look = {fontSize: "8px", width: "136px", minHeight: "136px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "20px"}
            if (this.canClick()) {
                look.background = "linear-gradient(0deg, #6B4423, #9b541a)"
                look.border = "3px solid #F8C898"
                look.color = "#F8C898"
                look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"
            } else {
                look.backgroundColor = "#382413"
                look.border = "3px solid #97795b"
                look.color = "#97795b"
                look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"
            }
            return look
            }
        }
    },
    bars: {},
    upgrades: {
        // Upgrades that affect the main progression of the Alchemy Universe.
        101: {
            title () {return hasUpgrade("ssp", 101) ? "<h3>Symbolicraft</h3><br>[PURCHASED]" : player.ssp.alchemicalSymbols >= 50 ? "<h3>Symbolicraft</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return player.ssp.alchemicalSymbols >= 50 || hasUpgrade("ssp", 101) ? "<hr>Unlocks the ability to transmute Alchemical Symbols and bargain for Tomes." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(50),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys",
            currencyInternalName: "alchemicalSymbols",
            branches() {
                if (hasUpgrade("ssp", 106))
                    return [[106, "#ffdb8e"]]
                else if (!hasUpgrade("ssp", 106) && player.tlb.revelationPoints >= 300)
                    return [[106, "#ffffff"]]
                else
                    return [[106, "#ff0000"]]
            },
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px #ffffff, 0 0 3px #ffffff"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            }
        },
        102: {
            title () {return hasUpgrade("ssp", 102) ? "<h3>Alchemfactory</h3><br>[PURCHASED]" : (player.ssp.alchemicalSymbols >= 100 && player.tlb.revelationPoints >= 1000) || hasUpgrade("ssp", 102) ? "<h3>Alchemfactory</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (player.ssp.alchemicalSymbols >= 100 && player.tlb.revelationPoints >= 1000) || hasUpgrade("ssp", 102) ? "<hr>Unlocks the art of Alchemical Node Crafting and Assembling." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(100),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys and 1000 Rev.Pts",
            currencyInternalName: "alchemicalSymbols",
            branches() {
                if (hasUpgrade("ssp", 102))
                    return [[101, "#ffdb8e"]]
                else if (!hasUpgrade("ssp", 102) && player.ssp.alchemicalSymbols >= 100 && player.tlb.revelationPoints >= 1000)
                    return [[101, "#ffffff"]]
                else
                    return [[101, "#ff0000"]]
            },
            canAfford() {return player.tlb.revelationPoints >= 1000},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000055, #0000ff, #5555ff)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px #ffffff, 0 0 3px #ffffff"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(0deg, transparent, transparent 9%, #ffffff88 10%), repeating-linear-gradient(90deg, transparent, transparent 9%, #ffffff88 10%), linear-gradient(to top, #000055, #0000ff, #5555ff)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #0000ff 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            }
        },
        103: {
            title () {return hasUpgrade("ssp", 103) ? "<h3>Starmetalism</h3><br>[PURCHASED]" : (player.ssp.alchemicalSymbols >= 150 && player.tlb.revelationPoints >= 1500) || hasUpgrade("ssp", 103) ? "<h3>Starmetalism</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (player.ssp.alchemicalSymbols >= 150 && player.tlb.revelationPoints >= 1500) || hasUpgrade("ssp", 103) ? "<hr>Unlocks the ability of Classical Elemental Starmetal Alteration." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(150),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys and 1500 Rev.Pts",
            currencyInternalName: "alchemicalSymbols",
            branches() {
                if (hasUpgrade("ssp", 103))
                    return [[102, "#ffdb8e"]]
                else if (!hasUpgrade("ssp", 103) && player.ssp.alchemicalSymbols >= 150 && player.tlb.revelationPoints >= 1500)
                    return [[102, "#ffffff"]]
                else
                    return [[102, "#ff0000"]]
            },
            canAfford() {return player.tlb.revelationPoints >= 1500},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "transparent" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px white, 0 0 3px white"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff00ff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff00ff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-radial-gradient(circle, transparent, #ff00ff78 9%, #ff00ff78 10%, transparent 25%), repeating-radial-gradient(circle, transparent, transparent 10%, #ff00ff78 10%, #ff00ff78 11%), conic-gradient( #c7442fab, #5d0000ab, transparent, #002f00ab, #008e48ab, #002f00ab, transparent, #002b4aab, #1e8eb3ab, #002b4aab, transparent, #2f3208ab, #c7c796ab, #2f3208ab, transparent, #5d0000ab, #c7442fab), radial-gradient(circle, #880088, #330033)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #550055 75%, #ff00ff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            }
        },
        104: {
            title () {return hasUpgrade("ssp", 104) ? "<h3>Pagefinder</h3><br>[PURCHASED]" : player.tlb.revelationPoints >= 200 || hasUpgrade("ssp", 104) ? "<h3>Pagefinder</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return player.tlb.revelationPoints >= 2000 || hasUpgrade("ssp", 104) ? "<hr>Unlocks more transmuting and bargaining mechanics in the Tome Library." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(200),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "Rev.Pts",
            currencyInternalName: "revelationPoints",
            branches() {
                if (hasUpgrade("ssp", 104))
                    return [[103, "#ffdb8e"]]
                else if (!hasUpgrade("ssp", 104) && player.tlb.revelationPoints >= 200)
                    return [[103, "#ffffff"]]
                else
                    return [[103, "#ff0000"]]
            },
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px #ffffff, 0 0 3px #ffffff"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            }
        },
        105: {
            title () {return hasUpgrade("ssp", 105) ? "<h3>Synthetoner</h3><br>[PURCHASED]" :  player.tlb.revelationPoints >= 250 || hasUpgrade("ssp", 105) ? "<h3>Synthetoner</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return player.tlb.revelationPoints >= 200 || hasUpgrade("ssp", 105) ? "<hr>Unlocks the Syntheton Trinkets, which can be crafted in the Blueprint Table." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(250),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "Rev.Pts",
            currencyInternalName: "revelationPoints",
            branches() {
                if (hasUpgrade("ssp", 105))
                    return [[104, "#ffdb8e"]]
                else if (!hasUpgrade("ssp", 105) && player.tlb.revelationPoints >= 250)
                    return [[104, "#ffffff"]]
                else
                    return [[104, "#ff0000"]]
            },
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000055, #0000ff, #5555ff)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px #ffffff, 0 0 3px #ffffff"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(0deg, transparent, transparent 9%, #ffffff88 10%), repeating-linear-gradient(90deg, transparent, transparent 9%, #ffffff88 10%), linear-gradient(to top, #000055, #0000ff, #5555ff)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #0000ff 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            }
        },
        106: {
            title () {return hasUpgrade("ssp", 106) ? "<h3>Elemenfusion</h3><br>[PURCHASED]" : player.tlb.revelationPoints >= 300 || hasUpgrade("ssp", 106) ? "<h3>Elemenfusion</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return player.tlb.revelationPoints >= 300 || hasUpgrade("ssp", 106) ? "<hr>Unlocks the 1st Order Elemental Starmetal Alterations in the Alchemy Altar." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(300),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "Rev.Pts",
            currencyInternalName: "revelationPoints",
            branches() {
                if (hasUpgrade("ssp", 106))
                    return [[105, "#ffdb8e"]]
                else if (!hasUpgrade("ssp", 106) && player.tlb.revelationPoints >= 300)
                    return [[105, "#ffffff"]]
                else
                    return [[105, "#ff0000"]]
            },
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "transparent" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px white, 0 0 3px white"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff00ff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff00ff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-radial-gradient(circle, transparent, #ff00ff78 9%, #ff00ff78 10%, transparent 25%), repeating-radial-gradient(circle, transparent, transparent 10%, #ff00ff78 10%, #ff00ff78 11%), conic-gradient( #c7442fab, #5d0000ab, transparent, #002f00ab, #008e48ab, #002f00ab, transparent, #002b4aab, #1e8eb3ab, #002b4aab, transparent, #2f3208ab, #c7c796ab, #2f3208ab, transparent, #5d0000ab, #c7442fab), radial-gradient(circle, #880088, #330033)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #550055 75%, #ff00ff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            }
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        tabs: {
            "The Arcane Table": {
                buttonStyle() {return {color: "#F8C898", backgroundColor: "#6B4423", backgroundImage: "linear-gradient(0deg, #6B4423, #9b541a)", borderColor: "#F8C898", borderRadius: "0px", boxShadow: "0 0 3px 1px black inset"}},
                unlocked() { return true },
                content: [
                    ["blank", "30px"],
                    ["style-column",
                        [
                            ["blank", "305px"],
                            ["style-column", [], {width: "800px", height: "250px", background: "transparent", backgroundImage: "radial-gradient(circle, #000000 70%, transparent 100%), repeating-linear-gradient(-45deg, #772277 10px, #551155 20px)", border:"3px solid #330033", boxShadow: "0 0 5px 5px #330033a6 inset, 0 0 8px 8px #551155 inset, 0 0 20px 20px #00000050 inset", marginBottom: "-555px"}], 
                            ["style-row",
                                [
                                    ["style-column",
                                        [
                                            ["style-row", [], {width: "700px", height: "250px", backgroundImage: "radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at -10% 20%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", borderTop: "3px solid #b18961", borderLeft: "3px solid #b18961", borderRight: "3px solid #b18961", borderBottom: "3px solid #330033", borderRadius: "15px 15px 0 0", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                                            ["style-row", [], {width: "700px", height: "250px", backgroundImage: "repeating-linear-gradient(-45deg, #772277 10px, #551155 20px)", borderLeft: "3px solid #330333", borderRight: "3px solid #330033", boxShadow: "0 0 5px 5px #330033a6 inset, 0 0 8px 8px #551155 inset, 0 0 20px 20px #00000050 inset"}],
                                            ["style-row", [], {width: "700px", height: "250px", backgroundImage: "radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 110% 80%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(180deg, #382413, #523116)", borderTop: "3px solid #330033", borderLeft: "3px solid #b18961", borderRight: "3px solid #b18961", borderBottom: "3px solid #b18961", borderRadius: "0 0 15px 15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                                            // ["raw-html", () => {return "<img src='resources/alchemyworld/arcaneTableCircle.png' style='width:400px;height:400px'></img>"}]
                                        ]
                                    ]
                                ]
                            ],
                            ["style-column",
                                [
                                    ["style-column",
                                        [
                                            ["style-row",
                                                [
                                                    ["style-column",
                                                        // [
                                                        //     // ["style-column",
                                                        //     //     [
                                                        //     //         ["style-row",
                                                        //     //             [
                                                        //     //                 ["raw-html", () => {
                                                        //     //                     if (hasUpgrade("ssp", 109))
                                                        //     //                         return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     // else if (player.tlb.revelationPoints >= 300)
                                                        //     //                     //     return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     else
                                                        //     //                         return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     }
                                                        //     //                 ]
                                                        //     //             ], {width: "0px", height: "0px", margin: "0px"}
                                                        //     //         ]
                                                        //     //     ]
                                                        //     // ],
                                                        //     ["upgrade", 109]
                                                        // ], () => {
                                                        //     if (hasUpgrade("ssp", 109)) 
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                        //     else
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        // }
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column",
                                                        // [
                                                        //     // ["style-column",
                                                        //     //     [
                                                        //     //         ["style-row",
                                                        //     //             [
                                                        //     //                 ["raw-html", () => {
                                                        //     //                     if (hasUpgrade("ssp", 110))
                                                        //     //                         return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     // else if (player.tlb.revelationPoints >= 300)
                                                        //     //                     //     return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     else
                                                        //     //                         return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     }
                                                        //     //                 ]
                                                        //     //             ], {width: "0px", height: "0px", margin: "0px"}
                                                        //     //         ]
                                                        //     //     ]
                                                        //     // ],
                                                        //     ["upgrade", 110]
                                                        // ], () => {
                                                        //     if (hasUpgrade("ssp", 110)) 
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                        //     else
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        // }
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column",
                                                        // [
                                                        //     // ["style-column",
                                                        //     //     [
                                                        //     //         ["style-row",
                                                        //     //             [
                                                        //     //                 ["raw-html", () => {
                                                        //     //                     if (hasUpgrade("ssp", 107))
                                                        //     //                         return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     // else if (player.tlb.revelationPoints >= 300)
                                                        //     //                     //     return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     else
                                                        //     //                         return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     }
                                                        //     //                 ]
                                                        //     //             ], {width: "0px", height: "0px", margin: "0px"}
                                                        //     //         ]
                                                        //     //     ]
                                                        //     // ],
                                                        //     ["upgrade", 111]
                                                        // ], () => {
                                                        //     if (hasUpgrade("ssp", 111)) 
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                        //     else
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        // }
                                                    ]
                                                ]
                                            ],
                                            ["blank", "10px"],
                                            ["style-row",
                                                [
                                                    ["style-column",
                                                        // [
                                                        //     // ["style-column",
                                                        //     //     [
                                                        //     //         ["style-row",
                                                        //     //             [
                                                        //     //                 ["raw-html", () => {
                                                        //     //                     if (hasUpgrade("ssp", 108))
                                                        //     //                         return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     // else if (player.tlb.revelationPoints >= 300)
                                                        //     //                     //     return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     else
                                                        //     //                         return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     }
                                                        //     //                 ]
                                                        //     //             ], {width: "0px", height: "0px", margin: "0px"}
                                                        //     //         ]
                                                        //     //     ]
                                                        //     // ],
                                                        //     ["upgrade", 108]
                                                        // ], () => {
                                                        //     if (hasUpgrade("ssp", 108)) 
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                        //     else
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        // }
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column",
                                                        [
                                                            ["style-column",
                                                                [
                                                                    ["style-row",
                                                                        [
                                                                            ["raw-html", () => {
                                                                                if (hasUpgrade("ssp", 101))
                                                                                    return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                else if (player.ssp.alchemicalSymbols >= 50)
                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                else
                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                }
                                                                            ]
                                                                        ], {width: "0px", height: "0px", margin: "0px"}
                                                                    ]
                                                                ]
                                                            ],
                                                            ["upgrade", 101]
                                                        ], () => {
                                                            if (hasUpgrade("ssp", 101)) 
                                                                return {width: "156px", height: "156px", background: "#005500cc", border: "3px solid #ffdb8e", boxShadow: "0 0 10px #c87509, 0 0 10px #c87509 inset", borderRadius: "156px"}
                                                            else if (player.ssp.alchemicalSymbols >= 50)
                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                            else
                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        }
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column",
                                                        [
                                                            ["style-column",
                                                                [
                                                                    ["style-row",
                                                                        [
                                                                            ["raw-html", () => {
                                                                                if (hasUpgrade("ssp", 102))
                                                                                    return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                else if (player.ssp.alchemicalSymbols >= 100 && player.tlb.revelationPoints >= 1000)
                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                else
                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                }
                                                                            ]
                                                                        ], {width: "0px", height: "0px", margin: "0px"}
                                                                    ]
                                                                ]
                                                            ],
                                                            ["upgrade", 102]
                                                        ], () => {
                                                            if (hasUpgrade("ssp", 102)) 
                                                                return {width: "156px", height: "156px", background: "#005500cc", border: "3px solid #ffdb8e", boxShadow: "0 0 10px #c87509, 0 0 10px #c87509 inset", borderRadius: "156px"}
                                                            else if (player.ssp.alchemicalSymbols >= 100 && player.tlb.revelationPoints >= 1000)
                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                            else
                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        }
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column",
                                                        // [
                                                        //     // ["style-column",
                                                        //     //     [
                                                        //     //         ["style-row",
                                                        //     //             [
                                                        //     //                 ["raw-html", () => {
                                                        //     //                     if (hasUpgrade("ssp", 107))
                                                        //     //                         return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     // else if (player.tlb.revelationPoints >= 300)
                                                        //     //                     //     return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     else
                                                        //     //                         return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     }
                                                        //     //                 ]
                                                        //     //             ], {width: "0px", height: "0px", margin: "0px"}
                                                        //     //         ]
                                                        //     //     ]
                                                        //     // ],
                                                        //     ["upgrade", 112]
                                                        // ], () => {
                                                        //     if (hasUpgrade("ssp", 112)) 
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                        //     else
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        // }
                                                    ] 
                                                ]
                                            ],
                                            ["blank", "10px"],
                                            ["style-row",
                                                [
                                                    ["style-column",
                                                        // [
                                                        //     // ["style-column",
                                                        //     //     [
                                                        //     //         ["style-row",
                                                        //     //             [
                                                        //     //                 ["raw-html", () => {
                                                        //     //                     if (hasUpgrade("ssp", 107))
                                                        //     //                         return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     // else if (player.tlb.revelationPoints >= 300)
                                                        //     //                     //     return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     else
                                                        //     //                         return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     }
                                                        //     //                 ]
                                                        //     //             ], {width: "0px", height: "0px", margin: "0px"}
                                                        //     //         ]
                                                        //     //     ]
                                                        //     // ],
                                                        //     ["upgrade", 107]
                                                        // ], () => {
                                                        //     if (hasUpgrade("ssp", 107)) 
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                        //     else
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        // }
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column",
                                                        [
                                                            ["style-column",
                                                                [
                                                                    ["style-row",
                                                                        [
                                                                            ["raw-html", () => {
                                                                                if (hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                else if (player.tlb.revelationPoints >= 300)
                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                else
                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                }
                                                                            ]
                                                                        ], {width: "0px", height: "0px", margin: "0px"}
                                                                    ]
                                                                ]
                                                            ],
                                                            ["upgrade", 106]
                                                        ], () => {
                                                            if (hasUpgrade("ssp", 106)) 
                                                                return {width: "156px", height: "156px", background: "#005500cc", border: "3px solid #ffd8be", boxShadow: "0 0 10px #c87509, 0 0 10px #c87509 inset", borderRadius: "156px"}
                                                            else if (player.tlb.revelationPoints >= 300)
                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                            else
                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        }
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column",
                                                        [
                                                            ["clickable", 1],
                                                        ], {width: "156px", height: "156px", background: "#9b514a", backgroundImage: "radial-gradient(circle, transparent, #6b4423)", border: "3px solid #F8C898", boxShadow: "0 0 10px #97795b, 0 0 10px #97795b", borderRadius: "20px"}
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column",
                                                        [
                                                            ["style-column",
                                                                [
                                                                    ["style-row",
                                                                        [
                                                                            ["raw-html", () => {
                                                                                if (hasUpgrade("ssp", 103))
                                                                                    return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                else if (player.ssp.alchemicalSymbols >= 150 && player.tlb.revelationPoints >= 1500)
                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                else
                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                }
                                                                            ]
                                                                        ], {width: "0px", height: "0px", margin: "0px"}
                                                                    ]
                                                                ]
                                                            ],
                                                            ["upgrade", 103]
                                                        ], () => {
                                                            if (hasUpgrade("ssp", 103)) 
                                                                return {width: "156px", height: "156px", background: "#005500cc", border: "3px solid #ffdb8e", boxShadow: "0 0 10px #c87509, 0 0 10px #c87509 inset", borderRadius: "156px"}
                                                            else if (player.ssp.alchemicalSymbols >= 150 && player.tlb.revelationPoints >= 1500)
                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                            else
                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        }
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column",
                                                        // [
                                                        //     // ["style-column",
                                                        //     //     [
                                                        //     //         ["style-row",
                                                        //     //             [
                                                        //     //                 ["raw-html", () => {
                                                        //     //                     if (hasUpgrade("ssp", 107))
                                                        //     //                         return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     // else if (player.tlb.revelationPoints >= 300)
                                                        //     //                     //     return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     else
                                                        //     //                         return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     }
                                                        //     //                 ]
                                                        //     //             ], {width: "0px", height: "0px", margin: "0px"}
                                                        //     //         ]
                                                        //     //     ]
                                                        //     // ],
                                                        //     ["upgrade", 113]
                                                        // ], () => {
                                                        //     if (hasUpgrade("ssp", 113)) 
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                        //     else
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        // }
                                                    ]
                                                ]
                                            ],
                                            ["blank", "10px"],
                                            ["style-row",
                                                [
                                                    ["style-column",
                                                        // [
                                                        //     // ["style-column",
                                                        //     //     [
                                                        //     //         ["style-row",
                                                        //     //             [
                                                        //     //                 ["raw-html", () => {
                                                        //     //                     if (hasUpgrade("ssp", 107))
                                                        //     //                         return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     // else if (player.tlb.revelationPoints >= 300)
                                                        //     //                     //     return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     else
                                                        //     //                         return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     }
                                                        //     //                 ]
                                                        //     //             ], {width: "0px", height: "0px", margin: "0px"}
                                                        //     //         ]
                                                        //     //     ]
                                                        //     // ],
                                                        //     ["upgrade", 118]
                                                        // ], () => {
                                                        //     if (hasUpgrade("ssp", 118)) 
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                        //     else
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        // }
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column",
                                                        [
                                                            ["style-column",
                                                                [
                                                                    ["style-row",
                                                                        [
                                                                            ["raw-html", () => {
                                                                                if (hasUpgrade("ssp", 105))
                                                                                    return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                else if (player.tlb.revelationPoints >= 250)
                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                else
                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                }
                                                                            ]
                                                                        ], {width: "0px", height: "0px", margin: "0px"}
                                                                    ]
                                                                ]
                                                            ],
                                                            ["upgrade", 105]
                                                        ], () => {
                                                            if (hasUpgrade("ssp", 105)) 
                                                                return {width: "156px", height: "156px", background: "#005500cc", border: "3px solid #ffdb8e", boxShadow: "0 0 10px #c87509, 0 0 10px #c87509 inset", borderRadius: "156px"}
                                                            else if (player.tlb.revelationPoints >= 250)
                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                            else
                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        }
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column",
                                                        [
                                                            ["style-column",
                                                                [
                                                                    ["style-row",
                                                                        [
                                                                            ["raw-html", () => {
                                                                                if (hasUpgrade("ssp", 104))
                                                                                    return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                else if (player.tlb.revelationPoints >= 200)
                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                else
                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                                                }
                                                                            ]
                                                                        ], {width: "0px", height: "0px", margin: "0px"}
                                                                    ]
                                                                ]
                                                            ],
                                                            ["upgrade", 104]
                                                        ], () => {
                                                            if (hasUpgrade("ssp", 104)) 
                                                                return {width: "156px", height: "156px", background: "#005500cc", border: "3px solid #ffdb8e", boxShadow: "0 0 10px #c87509, 0 0 10px #c87509 inset", borderRadius: "156px"}
                                                            else if (player.tlb.revelationPoints >= 200)
                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                            else
                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        }
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column",
                                                        // [
                                                        //     // ["style-column",
                                                        //     //     [
                                                        //     //         ["style-row",
                                                        //     //             [
                                                        //     //                 ["raw-html", () => {
                                                        //     //                     if (hasUpgrade("ssp", 107))
                                                        //     //                         return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     // else if (player.tlb.revelationPoints >= 300)
                                                        //     //                     //     return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     else
                                                        //     //                         return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     }
                                                        //     //                 ]
                                                        //     //             ], {width: "0px", height: "0px", margin: "0px"}
                                                        //     //         ]
                                                        //     //     ]
                                                        //     // ],
                                                        //     ["upgrade", 114]
                                                        // ], () => {
                                                        //     if (hasUpgrade("ssp", 114)) 
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                        //     else
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        // }
                                                    ]
                                                ]
                                            ],
                                            ["blank", "10px"],
                                            ["style-row",
                                                [
                                                    ["style-column",
                                                        // [
                                                        //     // ["style-column",
                                                        //     //     [
                                                        //     //         ["style-row",
                                                        //     //             [
                                                        //     //                 ["raw-html", () => {
                                                        //     //                     if (hasUpgrade("ssp", 107))
                                                        //     //                         return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     // else if (player.tlb.revelationPoints >= 300)
                                                        //     //                     //     return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     else
                                                        //     //                         return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     }
                                                        //     //                 ]
                                                        //     //             ], {width: "0px", height: "0px", margin: "0px"}
                                                        //     //         ]
                                                        //     //     ]
                                                        //     // ],
                                                        //     ["upgrade", 117]
                                                        // ], () => {
                                                        //     if (hasUpgrade("ssp", 117)) 
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                        //     else
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        // }
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column",
                                                        // [
                                                        //     // ["style-column",
                                                        //     //     [
                                                        //     //         ["style-row",
                                                        //     //             [
                                                        //     //                 ["raw-html", () => {
                                                        //     //                     if (hasUpgrade("ssp", 107))
                                                        //     //                         return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     // else if (player.tlb.revelationPoints >= 300)
                                                        //     //                     //     return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     else
                                                        //     //                         return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     }
                                                        //     //                 ]
                                                        //     //             ], {width: "0px", height: "0px", margin: "0px"}
                                                        //     //         ]
                                                        //     //     ]
                                                        //     // ],
                                                        //     ["upgrade", 116]
                                                        // ], () => {
                                                        //     if (hasUpgrade("ssp", 116)) 
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                        //     else
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        // }
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column",
                                                        // [
                                                        //     // ["style-column",
                                                        //     //     [
                                                        //     //         ["style-row",
                                                        //     //             [
                                                        //     //                 ["raw-html", () => {
                                                        //     //                     if (hasUpgrade("ssp", 107))
                                                        //     //                         return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     // else if (player.tlb.revelationPoints >= 300)
                                                        //     //                     //     return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     else
                                                        //     //                         return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-top:140px'></img>"
                                                        //     //                     }
                                                        //     //                 ]
                                                        //     //             ], {width: "0px", height: "0px", margin: "0px"}
                                                        //     //         ]
                                                        //     //     ]
                                                        //     // ],
                                                        //     ["upgrade", 115]
                                                        // ], () => {
                                                        //     if (hasUpgrade("ssp", 115)) 
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                        //     else
                                                        //         return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        // }
                                                    ]
                                                ],
                                            ]
                                        ], () => {
                                            if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                return {width: "800px", height: "800px", backgroundImage: "repeating-radial-gradient(circle, transparent, transparent 9%, #ff00ff22 9%, #ff00ff22 11%, transparent 11%), radial-gradient(circle, #ffdb8e78 5%, #c8750978 10%, transparent, transparent), radial-gradient(circle, #c8750978, #c8750978 35%, #55005578 35%, #55005578), repeating-radial-gradient(circle, transparent, #ff00ff78 9%, #ff00ff78 10%, transparent 25%), repeating-radial-gradient(circle, transparent, transparent 10%, #ff00ff78 10%, #ff00ff78 11%)", border: "5px solid #ff00ffab", boxShadow: "0 0 10px #ff00ffab, 0 0 10px #ff00ffab inset", borderRadius: "476px 476px 476px 476px"}
                                            else
                                                return {width: "800px", height: "800px", backgroundImage: "conic-gradient( #00bb0033, transparent, #00ff0033, transparent, #00bb0033, transparent, #00ff0033, transparent, #00bb0033, transparent, #00ff0033, transparent, #00bb0033, transparent, #00ff0033, transparent, #00bb0033), radial-gradient(circle, #00ff0078 6%, #00bb0078 12%, transparent 45%, transparent 50%), repeating-radial-gradient(circle, transparent, #ffdb8e78 9%, #ffdb8e78 10%, transparent 25%), repeating-radial-gradient(circle, transparent, transparent 10%, #ffdb8e78 10%, #ffdb8e78 11%)", border: "5px solid #00ff00ab", boxShadow: "0 0 10px #00ff00ab, 0 0 10px #00ff00ab inset", borderRadius: "476px 476px 476px 476px"}
                                        }
                                        
                                        // {width: "800px", height: "800px", backgroundImage: "repeating-radial-gradient(circle, transparent, transparent 9%, #ff00ff22 9%, #ff00ff22 11%, transparent 11%), radial-gradient(circle, #ffdb8e78 5%, #c8750978 10%, transparent, transparent), radial-gradient(circle, #c8750978, #c8750978 35%, #55005578 35%, #55005578), repeating-radial-gradient(circle, transparent, #ff00ff78 9%, #ff00ff78 10%, transparent 25%), repeating-radial-gradient(circle, transparent, transparent 10%, #ff00ff78 10%, #ff00ff78 11%)", border: "5px solid #ff00ffab", boxShadow: "0 0 10px #ff00ffab, 0 0 10px #ff00ffab inset", borderRadius: "476px 476px 476px 476px"},
                                    ]
                                ], {marginTop: "-792.5px"}
                            ],
                            // ["style-row",
                            //     [
                            //         [["raw-html", () => {return "<img src='resources/alchemyworld/arcaneTableCircle.png' style='width:400px;height:400px'></img>"}]],
                            //     ]
                            // ],
                        ]
                    ]
                ]
            },
        },
    },
    tabFormat: [
            ["raw-html", () => {return "You have <h3>" + formatWhole(player.ssp.alchemicalSymbols) + "</h3> 🝪 Alchemical Symbols 🝪."}, {color: "transparent", background: "linear-gradient(to bottom, #8b609c, #ff00ff, #ffc0cb)", fontSize: "13px", textStroke: "1px #ff00ff88", 'text-shadow': "0 0 5px #ff00ff, 0 0 5px #ff00ff", backgroundClip: "text", fontFamily: "monospace"}],
            ["raw-html", () => {return "You have <h3>" + formatWhole(player.tlb.revelationPoints) + "</h3> ⚿ Revelation Points ⚿."}, {color: "transparent", background: "linear-gradient(0deg, #6b4423, #9b541a)", fontSize: "13px", textStroke: "1px #f8c89888", 'text-shadow': "0 0 5px #9b541a, 0 0 5px #9b541a", backgroundClip: "text", fontFamily: "monospace"}],
            ["raw-html", () => {return "You have <h3>" + format(player.points) + "</h3> ✸ Celestial Points ✸."}, {color: "#ffffff", fontSize: "13px", 'text-shadow': "0 0 5px #ffffff, 0 0 5px #ffffff", fontFamily: "monospace"}],
            ["microtabs", "tabs", {'border-width': '0px'}],
            ["blank", "25px"],
        ]
    }
)
