addLayer("ssp", {
    name: "Symbol Space",
    symbol: "🝪",
    row: 1,
    universe: "LU",
    position: 0,
    startData() {return {
        unlocked: true,

        // anti-autoclick cheese
        canAlSyReset: false,

        // alchemical symbol generation
        alchemicalSymbols: new Decimal(0),
        alchemicalSymbolsGain: new Decimal(0),

        // advanced alchemical symbol generation
        advAlchemicalSymbols: new Decimal(0),
        advAlchemicalSymbolsGain: new Decimal (0),
    }},
    automate() {},
    nodeStyle() {
        return {
            backgroundImage: "radial-gradient(ellipse, #000000ab 30%, transparent), linear-gradient(-135deg, #ffffffcd 10%, transparent 30%, transparent 70%, #000000cd 90%), linear-gradient(-135deg, #ffffff45, #00000045), repeating-linear-gradient(45deg, transparent, transparent 9%, #000000ab 9%, #000000ab 10%, #00000067 10%, #00000067 19%, #000000ab 19%, #000000ab 20%, transparent 20%, transparent 29%, #ffffffab 29%, #ffffffab 30%, #ffffff67 30%, #ffffff67 39%, #ffffffab 39%, #ffffffab 40%), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)",
            backgroundOrigin: "border-box",
            border: "1px solid #ffdb8e",
            borderRadius: "20px",
            color: "#ffdb8e",
            'text-shadow' : "0 0 5px #ffdb8eab, 0 0 10px #000000, 0 0 10px #000000",
            textStroke: "1px #00000033",
            boxShadow: "0 0 3px 1px #000000 inset"
        }
    },
    tooltip: "Symbol Space",
    color: "#8b609c",
    update(delta) {
        
        // Continuous gains, maybe later
        let onepersec = new Decimal(1)

        // anti-cheese fixes
        if(player.points.gte("e10000000")) player.ssp.canAlSyReset = true

        // Start of Alchemical Symbol Gain
        if (hasUpgrade("tlb", 13)) {player.ssp.alchemicalSymbolsGain = player.points.add(1).log10().add(1).log10().mul(2)}
        else {player.ssp.alchemicalSymbolsGain = player.points.add(1).log10().add(1).log10()}
        // Flooring Alchemical Symbol Gain
        player.ssp.alchemicalSymbolsGain = player.ssp.alchemicalSymbolsGain.floor()

        // Start of Al.Sys modifiers
        if (hasUpgrade("tlb", 13)) player.ssp.alchemicalSymbolsGain = player.ssp.alchemicalSymbolsGain.mul(upgradeEffect("tlb", 13)).floor()
        if (hasUpgrade("tlb", 31)) player.ssp.alchemicalSymbolsGain = player.ssp.alchemicalSymbolsGain.mul(upgradeEffect("tlb", 11)).floor()
    },
    // Alchemical Symbol Reset mechanism
    alchemicalSymbolsReset() {
        layers.co.singularityReset()
        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.add(player.ssp.alchemicalSymbolsGain)
    },
    branches: ["ssp"],
    clickables: {
        encoder1: {
            title() {return "<h2>Symbol Encoder I</h2><hr>Encode <h2>" + formatWhole(player.ssp.alchemicalSymbolsGain) + "</h2><br>🝪 Al.Sys 🝪.<br><br><small>(Req.: e10,000,000 Cel.Pts.)</small>"},
            canClick() {return player.ssp.canAlSyReset == true},
            unlocked() {return true},
            onClick() { 
                layers.ssp.alchemicalSymbolsReset()
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
        }
    },
    bars: {},
    upgrades: {
        // Placeholder
        100: {
            title () {return hasUpgrade("ssp", 100) ? "<h3>Decoy Upgrade</h3><br>[PURCHASED]" : player.tlb.revelationPoints >= 1000 ? "<h3>Decoy Upgrade</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return player.tlb.revelationPoints >= 1000 || hasUpgrade("ssp", 100) ? "<hr>Placeholder description here." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(1000),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "Rev.Pts",
            currencyInternalName: "revelationPoints",
            branches() {},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#ffffff"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 5px #ffffff"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            }
        },
        // Upgrades that affect the main progression of the Alchemy Universe.
        101: {
            title () {return hasUpgrade("ssp", 101) ? "<h3>Symbolicraft</h3><br>[PURCHASED]" : player.ssp.alchemicalSymbols >= 50 ? "<h3>Symbolicraft</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return player.ssp.alchemicalSymbols >= 50 || hasUpgrade("ssp", 101) ? "<hr>Unlocks the ability to alter Alchemical Symbols and bargain for Tomes." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(50),
            currencyLocation() {return player.ssp},
            currencyDisplayName: "🝪 Al.Sys 🝪",
            currencyInternalName: "alchemicalSymbols",
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#ffffff"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 5px #ffffff"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            }
        },
        102: {
            title () {return hasUpgrade("ssp", 102) ? "<h3>Alchemfactory</h3><br>[PURCHASED]" : (hasUpgrade("ssp", 101) && player.ssp.alchemicalSymbols >= 1000 && player.tlb.revelationPoints >= 100) ? "<h3>Alchemfactory</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (hasUpgrade("ssp", 101) && player.ssp.alchemicalSymbols >= 1000 && player.tlb.revelationPoints >= 100) || hasUpgrade("ssp", 102) ? "<hr>Unlocks Crafting, the Assembly and the Apparatus." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(1000),
            currencyLocation() {return player.ssp},
            currencyDisplayName() {
                if (hasUpgrade("ssp", 101) && (player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true))
                    return "🝪 Al.Sys 🝪 and 100 ⚿ Rev.Pts ⚿"
                else
                    return "🝪 Al.Sys 🝪 and 100 ??????"
            },
            currencyInternalName: "alchemicalSymbols",
            canAfford() {return hasUpgrade("ssp", 101) && player.ssp.alchemicalSymbols >= 1000 && player.tlb.revelationPoints >= 100},
            pay() {
                player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(1000)
                player.tlb.revelationPoints = player.tlb.revelationPoints.sub(100)
            },
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000055, #0000ff, #5555ff)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#ffffff"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 5px #ffffff"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(0deg, transparent, transparent 9%, #ffffff88 9%, #ffffff88 10%), repeating-linear-gradient(90deg, transparent, transparent 9%, #ffffff88 9%, #ffffff88 10%), linear-gradient(to top, #000055, #0000ff, #5555ff)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #0000ff 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            }
        },
        103: {
            title () {return hasUpgrade("ssp", 103) ? "<h3>Starmetalism</h3><br>[PURCHASED]" : (hasUpgrade("ssp", 101) && player.ssp.alchemicalSymbols >= 50000 && player.tlb.revelationPoints >= 5000) ? "<h3>Starmetalism</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (hasUpgrade("ssp", 101) && player.ssp.alchemicalSymbols >= 50000 && player.tlb.revelationPoints >= 500) || hasUpgrade("ssp", 103) ? "<hr>Unlocks the Classical Elemental Starmetal Alteration." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(50000),
            currencyLocation() {return player.ssp},
            currencyDisplayName() {
                if (hasUpgrade("ssp", 101) && (player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true))
                    return "🝪 Al.Sys 🝪 and 5,000 ⚿ Rev.Pts ⚿"
                else
                    return "Al.Sys and 5,000 ??????"
            },
            currencyInternalName: "alchemicalSymbols",
            canAfford() {return hasUpgrade("ssp", 101) && player.ssp.alchemicalSymbols >= 50000 && player.tlb.revelationPoints >= 500},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "transparent" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#ffffff"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 3px white, 0 0 3px white"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff00ff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff00ff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-radial-gradient(circle, transparent, transparent 9%, #ff00ff78 10%, #ff00ff78 11%, transparent 12%), repeating-radial-gradient(circle, transparent, #ff00ff78 9%, #ff00ff78 10%, transparent 25%), conic-gradient( #c7442fab, #5d0000ab, transparent, #002f00ab, #008e48ab, #002f00ab, transparent, #002b4aab, #1e8eb3ab, #002b4aab, transparent, #2f3208ab, #c7c796ab, #2f3208ab, transparent, #5d0000ab, #c7442fab), radial-gradient(circle, #880088, #330033)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #550055 75%, #ff00ff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            }
        },
        104: {
            title () {return hasUpgrade("ssp", 104) ? "<h3>Pagefinder</h3><br>[PURCHASED]" : (hasUpgrade("ssp", 101) && player.tlb.revelationPoints >= 37500) || hasUpgrade("ssp", 104) ? "<h3>Pagefinder</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (hasUpgrade("ssp", 101) && player.tlb.revelationPoints >= 37500) || hasUpgrade("ssp", 104) ? "<hr>Unlocks more alteration options and bargaining mechanics." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(37500),
            currencyLocation() {return player.tlb},
            currencyDisplayName() {
                if (hasUpgrade("ssp", 101) && (player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true))
                    return "⚿ Rev.Pts ⚿"
                else
                    return "??????"
            },
            currencyInternalName: "revelationPoints",
            canAfford() {return hasUpgrade("ssp", 101)},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#ffffff"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 5px #ffffff"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            }
        },
        105: {
            title () {return hasUpgrade("ssp", 105) ? "<h3>Synthetoner</h3><br>[PURCHASED]" : (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 104) && player.tlb.revelationPoints >= 250000 && player.ssp.advAlchemicalSymbols >= 100) ? "<h3>Synthetoner</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 104) && player.tlb.revelationPoints >= 25000 && player.ssp.advAlchemicalSymbols >= 100) || hasUpgrade("ssp", 105) ? "<hr>Unlocks the Syntheton Trinkets." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(250000),
            currencyLocation() {return player.tlb},
            currencyDisplayName() {
                if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 104) && (player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true))
                    return "⚿ Rev.Pts ⚿ and 100 ✩🝪 Adv.Al.Sys 🝪✩"
                else if (hasUpgrade("ssp", 101) && !hasUpgrade("ssp", 104))
                    return "⚿ Rev.Pts ⚿ and 100 ??????"
                else
                    return "?????? and 100 ??????"
            },
            currencyInternalName: "revelationPoints",
            pay() {
                player.tlb.revelationPoints = player.tlb.revelationPoints.sub(250000)
                player.ssp.advAlchemicalSymbols = player.ssp.advAlchemicalSymbols.sub(100)
            },
            canAfford() {return hasUpgrade("ssp", 101) && hasUpgrade("ssp", 104) && player.ssp.advAlchemicalSymbols >= 100},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000055, #0000ff, #5555ff)" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#ffffff"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 5px #ffffff"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(0deg, transparent, transparent 9%, #ffffff88 9%, #ffffff88 10%), repeating-linear-gradient(90deg, transparent, transparent 9%, #ffffff88 9%, #ffffff88 10%), linear-gradient(to top, #000055, #0000ff, #5555ff)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #0000ff 75%, #ffffff) 1" : !canAffordUpgrade(this.layer, this.id) ? look.borderImage = "radial-gradient(circle, #000000 75%, #ff0000) 1" : look.borderImage = "radial-gradient(circle, #000000 75%, #565656) 1"
                return look
            }
        },
        106: {
            title () {return hasUpgrade("ssp", 106) ? "<h3>Elemenfusion</h3><br>[PURCHASED]" : (hasUpgrade("ssp", 101) && player.tlb.revelationPoints >= 1500000) ? "<h3>Elemenfusion</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (hasUpgrade("ssp", 101) && player.tlb.revelationPoints >= 1500000) || hasUpgrade("ssp", 106) ? "<hr>Unlocks the 1st Order Elemental Starmetal Alterations in the Alchemy Altar." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(1500000),
            currencyLocation() {return player.tlb},
            currencyDisplayName() {
                if (hasUpgrade("ssp", 101) && (player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true))
                    return "⚿ Rev.Pts ⚿"
                else
                    return "??????"
            },
            currencyInternalName: "revelationPoints",
            canAfford() {return hasUpgrade("ssp", 101)},
            style() {
                let look = {color: "rgba(0,0,0,0.8", border: "3px solid rgba(0,0,0,0.5)", width: "136px", height: "136px", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 5px 1px #000000"}
                hasUpgrade(this.layer, this.id) ? look.background = "transparent" : !canAffordUpgrade(this.layer, this.id) ? look.background = "linear-gradient(to top, #000000, #330033, #550055)" : look.background = "linear-gradient(to top, #343434, #565656, #787878)"
                hasUpgrade(this.layer, this.id) ? look.color = "#ffffff" : !canAffordUpgrade(this.layer, this.id) ? look.color = "#ff00ff" : look.color = "#ffffff"
                hasUpgrade(this.layer, this.id) ? look.textStroke = "1px #00000022" : !canAffordUpgrade(this.layer, this.id) ? look.textStroke = "1px #ffc0cb22" : look.textStroke = "1px #ffffff22"
                hasUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #000000, 0 0 3px #000000" : !canAffordUpgrade(this.layer, this.id) ? look.textShadow = "0 0 3px #ff0000, 0 0 3px #ff0000" : look.textShadow = "0 0 5px #ffffff"
                hasUpgrade(this.layer, this.id) ? look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff00ff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff00ff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-radial-gradient(circle, transparent, transparent 9%, #ff00ff78 10%, #ff00ff78 11%, transparent 12%), repeating-radial-gradient(circle, transparent, #ff00ff78 9%, #ff00ff78 10%, transparent 25%), conic-gradient( #c7442fab, #5d0000ab, transparent, #002f00ab, #008e48ab, #002f00ab, transparent, #002b4aab, #1e8eb3ab, #002b4aab, transparent, #2f3208ab, #c7c796ab, #2f3208ab, transparent, #5d0000ab, #c7442fab), radial-gradient(circle, #880088, #330033)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ff0000 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ff000067 90%), repeating-linear-gradient(45deg, transparent, transparent 10%, #ff000077 10%, #ff000077 11%, #ff000045 11%, #ff000045 19%, #ff000077 19%, #ff000077 20%), linear-gradient(to top, black, #330033, #550055)" : look.backgroundImage = "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), linear-gradient(to top, #343434, #565656, #787878)"
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
            "Arcane Table": {
                buttonStyle() {return {color: "#F8C898", backgroundColor: "#6B4423", backgroundImage: "linear-gradient(0deg, #6B4423, #9b541a)", borderColor: "#F8C898", borderRadius: "10px", boxShadow: "0 0 3px 1px black inset"}},
                unlocked() { return true },
                content: [
                    ["blank", "5px"],
                    ["row",
                        [
                            ["raw-html", () => {return "You are currently in the"}, {color: "#ffffff", fontSize: "18px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                            ["blank", "2px"],
                            ["raw-html", () => {return "-<u>Arcane Table</u>-."}, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                        ]
                    ],
                    ["blank", "10px"],
                    ["blank", "100px"],
                    ["style-column",
                        [
                            ["blank", "300px"],
                            ["style-column", [], {width: "900px", height: "250px", background: "transparent", backgroundImage: "radial-gradient(circle, #000000 70%, transparent 100%), repeating-linear-gradient(-45deg, #772277 10px, #551155 20px)", border:"3px solid #330033", boxShadow: "0 0 5px 5px #330033a6 inset, 0 0 8px 8px #551155 inset, 0 0 20px 20px #00000050 inset", marginBottom: "-555px"}], 
                            ["style-row",
                                [
                                    ["style-column",
                                        [
                                            ["style-row", [], {width: "700px", height: "250px", backgroundImage: "radial-gradient(ellipse at 50% -40%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at -10% 20%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", borderTop: "3px solid #b18961", borderLeft: "3px solid #b18961", borderRight: "3px solid #b18961", borderBottom: "3px solid #330033", borderRadius: "15px 15px 0 0", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                                            ["style-row", [], {width: "700px", height: "250px", backgroundImage: "repeating-linear-gradient(-45deg, #772277 10px, #551155 20px)", borderLeft: "3px solid #330333", borderRight: "3px solid #330033", boxShadow: "0 0 5px 5px #330033a6 inset, 0 0 8px 8px #551155 inset, 0 0 20px 20px #00000050 inset"}],
                                            ["style-row", [], {width: "700px", height: "250px", backgroundImage: "radial-gradient(ellipse at 50% 140%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 110% 80%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(180deg, #382413, #523116)", borderTop: "3px solid #330033", borderLeft: "3px solid #b18961", borderRight: "3px solid #b18961", borderBottom: "3px solid #b18961", borderRadius: "0 0 15px 15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                                            ["style-row",
                                                [
                                                    ["raw-html", () => {
                                                        if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                            return "<img src='resources/alchemyworld/arcaneTableCircle.png' style='width:700px;height:700px'></img>"
                                                        else
                                                            return "<img src='resources/alchemyworld/arcaneTableCircle2.png' style='width:700px;height:700px'></img>"
                                                        }
                                                    ]
                                                ], {width: "0px", height: "0px", marginTop:"-380px"}
                                            ]
                                        ]
                                    ]
                                ]
                            ],
                            ["style-column",
                                [
                                    ["style-column",
                                        [
                                            ["style-row", // 1st row
                                                [
                                                    ["style-column",
                                                        [
                                                            ["style-column",
                                                                [
                                                                    ["style-row",
                                                                        [
                                                                            ["raw-html", () => {
                                                                                if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circlePurchased2.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                else if (player.tlb.revelationPoints >= 1000 && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                }
                                                                            ]
                                                                        ], {width: "0px", height: "0px", margin: "0px"}
                                                                    ]
                                                                ]
                                                            ],
                                                            () => {
                                                                if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                    return ["upgrade", 100]
                                                            }
                                                        ], () => {
                                                            if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)) 
                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                            else if (player.tlb.revelationPoints >= 1000 && (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)))
                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                            else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
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
                                                                                if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circlePurchased2.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                else if (player.tlb.revelationPoints >= 1000 && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                }
                                                                            ]
                                                                        ], {width: "0px", height: "0px", margin: "0px"}
                                                                    ]
                                                                ]
                                                            ],
                                                            () => {
                                                                if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                    return ["upgrade", 100]
                                                            }
                                                        ], () => {
                                                            if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)) 
                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                            else if (player.tlb.revelationPoints >= 1000 && (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)))
                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                            else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
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
                                                                                if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circlePurchased2.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                else if (player.tlb.revelationPoints >= 1000 && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                }
                                                                            ]
                                                                        ], {width: "0px", height: "0px", margin: "0px"}
                                                                    ]
                                                                ]
                                                            ],
                                                            () => {
                                                                if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                    return ["upgrade", 100]
                                                            }
                                                        ], () => {
                                                            if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)) 
                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                            else if (player.tlb.revelationPoints >= 1000 && (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)))
                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                            else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        }
                                                    ]
                                                ]
                                            ],
                                            ["blank", "10px"],
                                            ["style-row", // 2nd row
                                                [
                                                    ["style-column", // 1st subcolumn
                                                        [
                                                            ["style-column",
                                                                [
                                                                    ["style-column",
                                                                        [
                                                                            ["style-row",
                                                                                [
                                                                                    ["raw-html", () => {
                                                                                        if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circlePurchased2.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        else if (player.tlb.revelationPoints >= 1000 && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        }
                                                                                    ]
                                                                                ], {width: "0px", height: "0px", margin: "0px"}
                                                                            ]
                                                                        ]
                                                                    ],
                                                                    () => {
                                                                        if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                            return ["upgrade", 100]
                                                                    }
                                                                ], () => {
                                                                    if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)) 
                                                                        return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                                    else if (player.tlb.revelationPoints >= 1000 && (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)))
                                                                        return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                                    else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
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
                                                                                        if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circlePurchased2.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        else if (player.tlb.revelationPoints >= 1000 && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        }
                                                                                    ]
                                                                                ], {width: "0px", height: "0px", margin: "0px"}
                                                                            ]
                                                                        ]
                                                                    ],
                                                                    () => {
                                                                        if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                            return ["upgrade", 100]
                                                                    }
                                                                ], () => {
                                                                    if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)) 
                                                                        return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                                    else if (player.tlb.revelationPoints >= 1000 && (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)))
                                                                        return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                                    else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
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
                                                                                        if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circlePurchased2.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        else if (player.tlb.revelationPoints >= 1000 && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        }
                                                                                    ]
                                                                                ], {width: "0px", height: "0px", margin: "0px"}
                                                                            ]
                                                                        ]
                                                                    ],
                                                                    () => {
                                                                        if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                            return ["upgrade", 100]
                                                                    }
                                                                ], () => {
                                                                    if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)) 
                                                                        return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                                    else if (player.tlb.revelationPoints >= 1000 && (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)))
                                                                        return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                                    else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                        return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                                }
                                                            ]
                                                        ]
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column", // 2nd subcolumn
                                                        [
                                                            ["style-row", 
                                                                [
                                                                    ["style-column",
                                                                        
                                                                        [
                                                                            ["style-column",
                                                                                [
                                                                                    ["style-row",
                                                                                        [
                                                                                            ["raw-html", () => {
                                                                                                if (hasUpgrade("ssp", 101))
                                                                                                    return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                                else if (player.ssp.alchemicalSymbols >= 50)
                                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                                else
                                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
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
                                                                                                    return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                                else if (hasUpgrade("ssp", 101) && player.ssp.alchemicalSymbols >= 1000 && player.tlb.revelationPoints >= 100)
                                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                                else
                                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
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
                                                                            else if (hasUpgrade("ssp", 101) && player.ssp.alchemicalSymbols >= 1000 && player.tlb.revelationPoints >= 100)
                                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
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
                                                                            ["style-column",
                                                                                [
                                                                                    ["style-row",
                                                                                        [
                                                                                            ["raw-html", () => {
                                                                                                if (hasUpgrade("ssp", 106))
                                                                                                    return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                                else if (hasUpgrade("ssp", 101) && player.tlb.revelationPoints >= 1500000)
                                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                                else
                                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
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
                                                                            else if (hasUpgrade("ssp", 101) && player.tlb.revelationPoints >= 1500000)
                                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                                            else
                                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                                        }
                                                                    ],
                                                                    ["blank", "10px"],
                                                                    ["style-column",
                                                                        [], {width: "156px", height: "156px", background: "#9b514a", backgroundImage: "radial-gradient(circle, transparent, transparent 50%, #6b4423 90%)", border: "3px solid #F8C898", boxShadow: "0 0 10px #97795b, 0 0 10px #97795b", borderRadius: "20px"}
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
                                                                                                    return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                                else if (hasUpgrade("ssp", 101) && player.ssp.alchemicalSymbols >= 50000 && player.tlb.revelationPoints >= 5000)
                                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                                else
                                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
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
                                                                            else if (hasUpgrade("ssp", 101) && player.ssp.alchemicalSymbols >= 50000 && player.tlb.revelationPoints >= 5000)
                                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
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
                                                                            ["style-column",
                                                                                [
                                                                                    ["style-row",
                                                                                        [
                                                                                            ["raw-html", () => {
                                                                                                if (hasUpgrade("ssp", 105))
                                                                                                    return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                                else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 104) && player.tlb.revelationPoints >= 250000 && player.ssp.advAlchemicalSymbols >= 100)
                                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                                else
                                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
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
                                                                            else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 104) && player.tlb.revelationPoints >= 250000 && player.ssp.advAlchemicalSymbols >= 100)
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
                                                                                                    return "<img src='resources/alchemyworld/circlePurchased1.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                                else if (hasUpgrade("ssp", 101) && player.tlb.revelationPoints >= 37500)
                                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                                else
                                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
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
                                                                            else if (hasUpgrade("ssp", 101) && player.tlb.revelationPoints >= 37500)
                                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                                            else
                                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                                        }
                                                                    ]
                                                                ]
                                                            ]
                                                        ]
                                                    ],
                                                    ["blank", "10px"],
                                                    ["style-column", // 3rd subcolumn
                                                        [
                                                            ["style-column",
                                                                [
                                                                    ["style-column",
                                                                        [
                                                                            ["style-row",
                                                                                [
                                                                                    ["raw-html", () => {
                                                                                        if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circlePurchased2.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        else if (player.tlb.revelationPoints >= 1000 && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        }
                                                                                    ]
                                                                                ], {width: "0px", height: "0px", margin: "0px"}
                                                                            ]
                                                                        ]
                                                                    ],
                                                                    () => {
                                                                        if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                            return ["upgrade", 100]
                                                                    }
                                                                ], () => {
                                                                    if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)) 
                                                                        return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                                    else if (player.tlb.revelationPoints >= 1000 && (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)))
                                                                        return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                                    else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
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
                                                                                        if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circlePurchased2.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        else if (player.tlb.revelationPoints >= 1000 && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        }
                                                                                    ]
                                                                                ], {width: "0px", height: "0px", margin: "0px"}
                                                                            ]
                                                                        ]
                                                                    ],
                                                                    () => {
                                                                        if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                            return ["upgrade", 100]
                                                                    }
                                                                ], () => {
                                                                    if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)) 
                                                                        return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                                    else if (player.tlb.revelationPoints >= 1000 && (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)))
                                                                        return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                                    else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
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
                                                                                        if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circlePurchased2.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        else if (player.tlb.revelationPoints >= 1000 && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                            return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                        }
                                                                                    ]
                                                                                ], {width: "0px", height: "0px", margin: "0px"}
                                                                            ]
                                                                        ]
                                                                    ],
                                                                    () => {
                                                                        if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                            return ["upgrade", 100]
                                                                    }
                                                                ], () => {
                                                                    if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)) 
                                                                        return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                                    else if (player.tlb.revelationPoints >= 1000 && (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)))
                                                                        return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                                    else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                        return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                                }
                                                            ]
                                                        ]
                                                    ]
                                                ]
                                            ],
                                            ["blank", "10px"],
                                            ["style-row", // 3rd row
                                                [
                                                    ["style-column",
                                                        [
                                                            ["style-column",
                                                                [
                                                                    ["style-row",
                                                                        [
                                                                            ["raw-html", () => {
                                                                                if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circlePurchased2.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                else if (player.tlb.revelationPoints >= 1000 && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                }
                                                                            ]
                                                                        ], {width: "0px", height: "0px", margin: "0px"}
                                                                    ]
                                                                ]
                                                            ],
                                                            () => {
                                                                if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                    return ["upgrade", 100]
                                                            }
                                                        ], () => {
                                                            if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)) 
                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                            else if (player.tlb.revelationPoints >= 1000 && (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)))
                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                            else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
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
                                                                                if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circlePurchased2.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                else if (player.tlb.revelationPoints >= 1000 && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                }
                                                                            ]
                                                                        ], {width: "0px", height: "0px", margin: "0px"}
                                                                    ]
                                                                ]
                                                            ],
                                                            () => {
                                                                if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                    return ["upgrade", 100]
                                                            }
                                                        ], () => {
                                                            if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)) 
                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                            else if (player.tlb.revelationPoints >= 1000 && (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)))
                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                            else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
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
                                                                                if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circlePurchased2.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                else if (player.tlb.revelationPoints >= 1000 && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circlePending.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                                    return "<img src='resources/alchemyworld/circleProhibited.png' style='width:166px;height:166px;margin-bottom:-140px'></img>"
                                                                                }
                                                                            ]
                                                                        ], {width: "0px", height: "0px", margin: "0px"}
                                                                    ]
                                                                ]
                                                            ],
                                                            () => {
                                                                if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                    return ["upgrade", 100]
                                                            }
                                                        ], () => {
                                                            if (hasUpgrade("ssp", 100) && hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)) 
                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff00ff", boxShadow: "0 0 10px #ffc0cb, 0 0 10px #ffc0cb inset", borderRadius: "156px"}
                                                            else if (player.tlb.revelationPoints >= 1000 && (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106)))
                                                                return {width: "156px", height: "156px", background: "#abababcc", border: "3px solid #ffffff", boxShadow: "0 0 10px #cdcdcd, 0 0 10px #cdcdcd inset", borderRadius: "156px"}
                                                            else if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                                return {width: "156px", height: "156px", background: "#550055cc", border: "3px solid #ff0000", boxShadow: "0 0 10px #000000, 0 0 10px #000000 inset", borderRadius: "156px"}
                                                        }
                                                    ]
                                                ]
                                            ],
                                        ], () => {
                                            if (hasUpgrade("ssp", 101) && hasUpgrade("ssp", 102) && hasUpgrade("ssp", 103) && hasUpgrade("ssp", 104) && hasUpgrade("ssp", 105) && hasUpgrade("ssp", 106))
                                                return {width: "900px", height: "900px", backgroundImage: "radial-gradient(circle, transparent 30%, #ffdb8e 30%, #ffdb8e 32%, transparent 32%, transparent 56%, #ffdb8e 56%, #ffdb8e 58%, transparent 58%), radial-gradient(circle, #ffdb8e78, #ffdb8e78 16%, transparent 26%), radial-gradient(circle, #ffdb8e78 20%, #c8750978 40%, transparent, transparent), repeating-radial-gradient(circle, transparent, transparent 9%, #ff00ff78 10%, #ff00ff78 11%, transparent 12%), repeating-radial-gradient(circle, transparent, transparent 9%, #88008834 10%, #55005578 11%, transparent 25%), conic-gradient( #bb00bb33, transparent, #ff00ff33, transparent, #bb00bb33, transparent, #ff00ff33, transparent, #bb00bb33, transparent, #ff00ff33, transparent, #bb00bb33, transparent, #ff00ff33, transparent, #bb00bb33)", border: "5px solid #ff00ffab", boxShadow: "0 0 10px #ff00ffab, 0 0 10px #ff00ffab inset", borderRadius: "476px 476px 476px 476px"}
                                            else
                                                return {width: "900px", height: "900px", backgroundImage: "radial-gradient(circle, transparent 30%, #ffdb8e 30%, #ffdb8e 32%, transparent 32%), radial-gradient(circle, #ffdb8e78, #ffdb8e78 16%, transparent 26%), radial-gradient(circle, #ffdb8e78 20%, #c8750978 40%, transparent, transparent), repeating-radial-gradient(circle, transparent, transparent 9%, #00ff0078 10%, #00ff0078 11%, transparent 12%), repeating-radial-gradient(circle, transparent, transparent 9%, #00880034 10%, #00550078 11%, transparent 25%), conic-gradient( #00bb0033, transparent, #00ff0033, transparent, #00bb0033, transparent, #00ff0033, transparent, #00bb0033, transparent, #00ff0033, transparent, #00bb0033, transparent, #00ff0033, transparent, #00bb0033)", border: "5px solid #00ff00ab", boxShadow: "0 0 10px #00ff00ab, 0 0 10px #00ff00ab inset", borderRadius: "476px 476px 476px 476px"}
                                        }
                                    ]
                                ], {marginTop: "-456px"}
                            ],
                        ]
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
                    ["raw-html", () => {return "-<u>Symbol Space</u>, Louki's Hideout-."}, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                ]
            ],
            ["blank", "10px"],
            ["microtabs", "tabs", {'border-width': '0px'}],
            ["blank", "50px"],
        ]
    }
)
