addLayer("ssp", {
    name: "Symbol Space",
    symbol: "⚿",
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
            borderColor: "#F8C898",
            color: "#F8C898",
            boxShadow: "0 0 3px 1px black inset",
            borderRadius: "0px",
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
                look.boxShadow = "0 0 3px 1px black inset"
            } else {
                look.backgroundColor = "#382413"
                look.border = "3px solid #97795b"
                look.color = "#97795b"
                look.boxShadow = "0 0 3px 1px black inset"
            }
            return look
            }
        }
    },
    bars: {},
    upgrades: {
        // Upgrades that affect the main progression of the Alchemy Universe.
        101: {
            title () {return (player.ssp.alchemicalSymbols >= 50) ? "<h3>Symbolicraft</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (player.ssp.alchemicalSymbols >= 50) ? "<hr>Unlocks the ability to transmute Alchemical Symbols and bargain for Symbols/Tomes." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(50),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys and 0 Rev.Pts",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px #ffffff, 0 0 3px #ffffff"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            },
        },
        102: {
            title () {return (player.ssp.alchemicalSymbols >= 100 && player.tlb.revelationPoints >= 1000) ? "<h3>Alchemfactory</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (player.ssp.alchemicalSymbols >= 100 && player.tlb.revelationPoints >= 1000) ? "<hr>Unlocks the art of Alchemical Node Crafting and Assembling." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(100),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys and 1000 Rev.Pts",
            currencyInternalName: "alchemicalSymbols",
            branches() {
                if (hasUpgrade("ssp", 102))
                    return [[101, "#ffdb8e"]]
            },
            // branches: [[101, "linear-gradient(to right, #ffffff, #0000ff)"]],
            canAfford() {return player.tlb.revelationPoints >= 1000},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000055, #0000ff, #5555ff)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px #ffffff, 0 0 3px #ffffff"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), repeating-linear-gradient(0deg, transparent, transparent 9%, #ffffff88 10%), repeating-linear-gradient(90deg, transparent, transparent 9%, #ffffff88 10%), linear-gradient(to top, #000055, #0000ff, #5555ff)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #0000ff 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            },
        },
        103: {
            title () {return (player.ssp.alchemicalSymbols >= 150 && player.tlb.revelationPoints >= 1500) ? "<h3>Starmetalism</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (player.ssp.alchemicalSymbols >= 150 && player.tlb.revelationPoints >= 1500) ? "<hr>Unlocks the ability of Classical Elemental Starmetal Alteration." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(150),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys and 1500 Rev.Pts",
            currencyInternalName: "alchemicalSymbols",
            canAfford() {return player.tlb.revelationPoints >= 1500},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px white, 0 0 3px white"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            },
        },
        104: {
            title () {return (player.ssp.alchemicalSymbols >= 200 && player.tlb.revelationPoints >= 2000) ? "<h3>Symbolia Majoria</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (player.ssp.alchemicalSymbols >= 200 && player.tlb.revelationPoints >= 2000) ? "<hr>Unlocks more bargaining options for Symbols/Tomes." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(200),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys and 2000 Rev.Pts",
            currencyInternalName: "alchemicalSymbols",
            canAfford() {return player.tlb.revelationPoints >= 2000},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px white, 0 0 3px white"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            },
        },
        105: {
            title () {return (player.ssp.alchemicalSymbols >= 250 && player.tlb.revelationPoints >= 2500) ? "<h3>Alchemia Majoria</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (player.ssp.alchemicalSymbols >= 250 && player.tlb.revelationPoints >= 2500) ? "<hr>Unlocks Trinkets, which can be crafted in the Blueprint Table." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(250),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys and 2500 Rev.Pts",
            currencyInternalName: "alchemicalSymbols",
            canAfford() {return player.tlb.revelationPoints >= 2500},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px white, 0 0 3px white"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            },
        },
        106: {
            title () {return (player.ssp.alchemicalSymbols >= 300 && player.tlb.revelationPoints >= 3000) ? "<h3>Starmetallus Majora</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (player.ssp.alchemicalSymbols >= 300 && player.tlb.revelationPoints >= 3000) ? "<hr>Unlocks the 1st Order Elemental Starmetal Alterations." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(300),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys and 3000 Rev.Pts",
            currencyInternalName: "alchemicalSymbols",
            canAfford() {return player.tlb.revelationPoints >= 3000},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px white, 0 0 3px white"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            },
        },
        107: {
            title () {return (player.ssp.alchemicalSymbols >= 350 && player.tlb.revelationPoints >= 3500) ? "<h3>Voidigenesis</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (player.ssp.alchemicalSymbols >= 350 && player.tlb.revelationPoints >= 3500) ? "<hr>Unlocks the Orb of Nothingness and the Void Starmetal." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(350),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys and 3500 Rev.Pts",
            currencyInternalName: "alchemicalSymbols",
            canAfford() {return player.tlb.revelationPoints >= 3500},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px white, 0 0 3px white"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            },
        },
        108: {
            title () {return (player.ssp.alchemicalSymbols >= 400 && player.tlb.revelationPoints >= 4000) ? "<h3>Aetherogenesis</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (player.ssp.alchemicalSymbols >= 400 && player.tlb.revelationPoints >= 4000) ? "<hr>Unlocks the Astrological Construct and the Aether Starmetal." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(400),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys and 4000 Rev.Pts",
            currencyInternalName: "alchemicalSymbols",
            canAfford() {return player.tlb.revelationPoints >= 4000},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px white, 0 0 3px white"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            },
        },
        109: {
            title () {return (player.ssp.alchemicalSymbols >= 450 && player.tlb.revelationPoints >= 4500) ? "<h3>Infernalism</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (player.ssp.alchemicalSymbols >= 450 && player.tlb.revelationPoints >= 4500) ? "<hr>Unlocks the Plasma Core and the Inferno Starmetal." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(450),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys and 4500 Rev.Pts",
            currencyInternalName: "alchemicalSymbols",
            canAfford() {return player.tlb.revelationPoints >= 4500},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px white, 0 0 3px white"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            },
        },
        110: {
            title () {return (player.ssp.alchemicalSymbols >= 500 && player.tlb.revelationPoints >= 5000) ? "<h3>Shadeseeking</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (player.ssp.alchemicalSymbols >= 500 && player.tlb.revelationPoints >= 5000) ? "<hr>Unlocks the Dark Room and the Darkness Starmetal." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(500),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys and 5000 Rev.Pts",
            currencyInternalName: "alchemicalSymbols",
            canAfford() {return player.tlb.revelationPoints >= 5000},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px white, 0 0 3px white"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            },
        },
        111: {
            title () {return (player.ssp.alchemicalSymbols >= 550 && player.tlb.revelationPoints >= 5500) ? "<h3>Rayweaving</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (player.ssp.alchemicalSymbols >= 550 && player.tlb.revelationPoints >= 5500) ? "<hr>Unlocks the Refraction Mirror and the Light Starmetal." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(550),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys and 5500 Rev.Pts",
            currencyInternalName: "alchemicalSymbols",
            canAfford() {return player.tlb.revelationPoints >= 5500},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px white, 0 0 3px white"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            },
        },
        112: {
            title () {return (player.ssp.alchemicalSymbols >= 600 && player.tlb.revelationPoints >= 6000) ? "<h3>Arcanium Forging</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (player.ssp.alchemicalSymbols >= 600 && player.tlb.revelationPoints >= 6000) ? "<hr>Unlocks the Secret Forge and the Arcane Starmetal." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(600),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "Al.Sys and 6000 Rev.Pts",
            currencyInternalName: "alchemicalSymbols",
            canAfford() {return player.tlb.revelationPoints >= 6000},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#000000"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px white, 0 0 3px white"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            },
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        tabs: {
            "Upgrade Emporium": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["style-column",
                        [
                            ["style-row",
                                [
                                    ["style-column",
                                        [
                                            ["upgrade", 101]
                                        ], () => {
                                            if (hasUpgrade("ssp", 101)) 
                                                return {width: "156px", height: "156px", background: "#005500cc", border: "3px solid #ffdb8e", boxShadow: "0 0 10px #c87509, 0 0 10px #c87509 inset", borderRadius: "156px"}
                                            else
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                        }
                                    ],
                                ]
                            ],
                            ["blank", "10px"],
                            ["style-row",
                                [
                                    ["style-column",
                                        [
                                            ["upgrade", 106]
                                        ], () => {
                                            if (hasUpgrade("ssp", 106)) 
                                                return {width: "156px", height: "156px", background: "#005500cc", border: "3px solid #ffd8be", boxShadow: "0 0 10px #c87509, 0 0 10px #c87509 inset", borderRadius: "156px"}
                                            else
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                        }
                                    ],
                                    ["blank", "10px"],
                                    ["style-column",
                                        [
                                            ["upgrade", 108]
					                        ], () => {
                                            if (hasUpgrade("ssp", 108)) 
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid magenta", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                            else
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                        }
                                    ],
                                    ["blank", "10px"],
                                    ["style-column",
                                        [
                                            ["upgrade", 109]
					                    ], () => {
                                            if (hasUpgrade("ssp", 109)) 
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid magenta", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                            else
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                        }
                                    ],
                                    ["blank", "10px"],
                                    ["style-column",
                                        [
                                            ["upgrade", 102]
                                        ], () => {
                                            if (hasUpgrade("ssp", 102)) 
                                                return {width: "156px", height: "156px", background: "#005500cc", border: "3px solid #ffdb8e", boxShadow: "0 0 10px #c87509, 0 0 10px #c87509 inset", borderRadius: "156px"}
                                            else
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                        }
                                    ],
                                ]
                            ],
                            ["blank", "10px"],
                            ["style-row",
                                [
                                    ["style-column",
                                        [
                                            ["upgrade", 107]
					                    ], () => {
                                            if (hasUpgrade("ssp", 107)) 
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid magenta", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
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
                                            ["upgrade", 110]
					                    ], () => {
                                            if (hasUpgrade("ssp", 110)) 
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid magenta", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                            else
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                        }
                                    ],
                                ],
                            ],
                            ["blank", "10px"],
                            ["style-row",
                                [
                                    ["style-column",
                                        [
                                            ["upgrade", 105]
                                        ], () => {
                                            if (hasUpgrade("ssp", 105)) 
                                                return {width: "156px", height: "156px", background: "#005500cc", border: "3px solid #ffdb8e", boxShadow: "0 0 10px #c87509, 0 0 10px #c87509 inset", borderRadius: "156px"}
                                            else
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                        }
                                    ],
                                    ["blank", "10px"],
                                    ["style-column",
                                        [
                                            ["upgrade", 112]
					                    ], () => {
                                            if (hasUpgrade("ssp", 112)) 
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid magenta", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                            else
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                        }
                                    ],
                                    ["blank", "10px"],
                                    ["style-column",
                                        [
                                            ["upgrade", 111]
					                    ], () => {
                                            if (hasUpgrade("ssp", 111)) 
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid magenta", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                            else
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                        }
                                    ],
                                    ["blank", "10px"],
                                    ["style-column",
                                        [
                                            ["upgrade", 103]
                                        ], () => {
                                            if (hasUpgrade("ssp", 103)) 
                                                return {width: "156px", height: "156px", background: "#005500cc", border: "3px solid #ffdb8e", boxShadow: "0 0 10px #c87509, 0 0 10px #c87509 inset", borderRadius: "156px"}
                                            else
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                        }
                                    ]
                                ]
                            ],
                            ["blank", "10px"],
                            ["style-row",
                                [
                                    ["style-column",
                                        [
                                            ["upgrade", 104]
                                        ], () => {
                                            if (hasUpgrade("ssp", 104)) 
                                                return {width: "156px", height: "156px", background: "#005500cc", border: "3px solid #ffdb8e", boxShadow: "0 0 10px #c87509, 0 0 10px #c87509 inset", borderRadius: "156px"}
                                            else
                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                        }
                                    ],
                                ]
                            ],
                        ]
                    ]
                ]
            },
        },
    },
    tabFormat: [
        // ["raw-html", () => {return "You have <h3>" + formatWhole(player.ssp.alchemicalSymbols) + "</h3> 🝪 Alchemical Symbols 🝪."}, {"color": "white", "font-size": "12px", "font-family": "monospace"}],
        // ["raw-html", () => {return "You have <h3>" + formatWhole(player.tlb.revelationPoints) + "</h3> Revelation Points."}, {"color": "white", "font-size": "12px", "font-family": "monospace"}],
        // ["raw-html", () => { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, {"color": "white", "font-size": "12px", "font-family": "monospace"}],
        ["microtabs", "tabs", {'border-width': '0px'}],
        ],
    }
)
