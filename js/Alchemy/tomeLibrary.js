addLayer("tlb", {
    name: "Tome Library",
    symbol: "🕮",
    row: 1,
    universe: "LU",
    position: 1,
    startData() {return {
        unlocked: true,
        buyMaxSymbols: false,
        alchemicalSymbolsReq: new Decimal(0),
        crimsonSymbolsReq: new Decimal(0),
        goldSymbolsReq: new Decimal(0),
        jadeSymbolsReq: new Decimal(0),
        celesteSymbolsReq: new Decimal(0),
        cobaltSymbolsReq: new Decimal(0),
        amethystSymbolsReq: new Decimal(0),

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

        // base symbols' gains/mults
        crimsonSymbolsGain: new Decimal(0),
        crimsonSymbolsMult: new Decimal(0),
        goldSymbolsGain: new Decimal(0),
        goldSymbolsMult: new Decimal(0),
        jadeSymbolsGain: new Decimal(0),
        jadeSymbolsMult: new Decimal(0),
        celesteSymbolsGain: new Decimal(0),
        celesteSymbolsMult: new Decimal(0),
        cobaltSymbolsGain: new Decimal(0),
        cobaltSymbolsMult: new Decimal(0),
        amethystSymbolsGain: new Decimal(0),
        amethystSymbolsMult: new Decimal(0),

        // base symbols' parts generated
        crimsonSymbolParts: new Decimal(0),
        crimsonSymbolPartsGain: new Decimal(0),
        crimsonSymbolPartsMult: new Decimal(0),
        goldSymbolParts: new Decimal(0),
        goldSymbolPartsGain: new Decimal(0),
        goldSymbolPartsMult: new Decimal(0),
        jadeSymbolParts: new Decimal(0),
        jadeSymbolPartsGain: new Decimal(0),
        jadeSymbolPartsMult: new Decimal(0),
        celesteSymbolParts: new Decimal(0),
        celesteSymbolPartsGain: new Decimal(0),
        celesteSymbolPartsMult: new Decimal(0),
        cobaltSymbolParts: new Decimal(0),
        cobaltSymbolPartsGain: new Decimal(0),
        cobaltSymbolPartsMult: new Decimal(0),
        amethystSymbolParts: new Decimal(0),
        amethystSymbolPartsGain: new Decimal(0),
        amethystSymbolPartsMult: new Decimal(0),

        // 1st order symbols
        arcaneSymbols: new Decimal (0),
        starmetalAlloySymbols: new Decimal (0),
        starmetalEssenceSymbols: new Decimal (0),
        eclipseShardSymbols: new Decimal (0),
        spaceGemSymbols: new Decimal (0),
        planetSymbols: new Decimal (0),
        spaceRockSymbols: new Decimal (0),
        }
    },
    update(delta) {
        let onepersec = new Decimal(1)

        // Crimson Symbol Parts generation
        if(hasUpgrade("ssp", 101)) {
            player.tlb.crimsonSymbolParts = player.tlb.crimsonSymbolParts.add(onepersec.mul(delta).mul(player.tlb.crimsonSymbolPartsGain))
            player.tlb.crimsonSymbolPartsGain = player.tlb.crimsonSymbolsGain.add(Decimal.log10(player.cof.coreFragments[4].add(1)))
        }
        // Gold Symbol Parts generation
        if(hasUpgrade("ssp", 101)) {
            player.tlb.goldSymbolParts = player.tlb.goldSymbolParts.add(onepersec.mul(delta).mul(player.tlb.goldSymbolPartsGain))
            player.tlb.goldSymbolPartsGain = player.tlb.goldSymbolsGain.add(Decimal.log10(player.cof.coreFragments[2].add(1)))
        }
        // Jade Symbol Parts generation
        if(hasUpgrade("ssp", 101)) {
            player.tlb.jadeSymbolParts = player.tlb.jadeSymbolParts.add(onepersec.mul(delta).mul(player.tlb.jadeSymbolPartsGain))
            player.tlb.jadeSymbolPartsGain = player.tlb.jadeSymbolsGain.add(Decimal.log10(player.cof.coreFragments[1].add(1)))
        }
        if(hasUpgrade("ssp", 101)) {
            player.tlb.celesteSymbolParts = player.tlb.celesteSymbolParts.add(onepersec.mul(delta).mul(player.tlb.celesteSymbolPartsGain))
            player.tlb.celesteSymbolPartsGain = player.tlb.celesteSymbolsGain.add(Decimal.log10(player.cof.coreFragments[0].add(1)))
        }
        // Gold Symbol Parts generation
        if(hasUpgrade("ssp", 101)) {
            player.tlb.cobaltSymbolParts = player.tlb.cobaltSymbolParts.add(onepersec.mul(delta).mul(player.tlb.cobaltSymbolPartsGain))
            player.tlb.cobaltSymbolPartsGain = player.tlb.cobaltSymbolsGain.add(Decimal.log10(player.cof.coreFragments[3].add(1)))
        }
        // Jade Symbol Parts generation
        if(hasUpgrade("ssp", 101)) {
            player.tlb.amethystSymbolParts = player.tlb.amethystSymbolParts.add(onepersec.mul(delta).mul(player.tlb.amethystSymbolPartsGain))
            player.tlb.amethystSymbolPartsGain = player.tlb.amethystSymbolsGain.add(Decimal.log10(player.cof.coreFragments[5].add(1)))
        }
    },
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
    clickables: {
        buyMaxOff: {
            title() {return "Buy Max<br>OFF"},
            canClick() {return player.tlb.buyMaxSymbols == true},
            unlocked() {return true},
            onClick() { 
                player.tlb.buyMaxSymbols = false
            },
            style() {
                let look = {width: '100px', minHeight: '50px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
                    if (this.canClick()) {
                        look.backgroundImage = "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)"
                        look.borderImage = "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1"
                        look.color = "#000000"
                        look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 10px 1px #ffffff"
                    } else {
                        look.backgroundImage = "linear-gradient(to bottom, #333333,  #333333)"
                        look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                        look.color = "#000000";
                        look.boxShadow = "0 0 3px 1px #000000 inset"
                    }
                return look
            }
        },
        buyMaxOn: {
            title() {return "Buy Max<br>ON"},
            canClick() {return player.tlb.buyMaxSymbols == false},
            unlocked() {return true},
            onClick() { 
                player.tlb.buyMaxSymbols = true
            },
            style() {
                let look = {width: '100px', minHeight: '50px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
                    if (this.canClick()) {
                        look.backgroundImage = "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)"
                        look.borderImage = "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1"
                        look.color = "#000000"
                        look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 10px 1px #ffffff"
                    } else {
                        look.backgroundImage = "linear-gradient(to bottom, #333333,  #333333)"
                        look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                        look.color = "#000000";
                        look.boxShadow = "0 0 3px 1px #000000 inset"
                    }
                return look
            }
        },
        encoder: {
            title() {return "<h2>Symbol Encoder</h2><hr>Encode <h2>" + formatWhole(player.ssp.alchemicalSymbolsGain) + "</h2><br>🝪 Al.Sys 🝪.<br><br><small>(Req.: e1,000,000 Cel.Pts.)</small>"},
            canClick() {return player.ssp.alchemicalSymbolsGain.gte(1) & player.points.gte("1e1000000")},
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
                        look.textStroke = "1px #97795bab"
                    }
                return look
            }
        },
        combiner: {
            title() {
                if (hasUpgrade("ssp", 104))
                    return "<h2>Symbol Combiner</h2><hr>Make <h2>" + formatWhole(player.ssp.advAlchemicalSymbolsGain) + "</h2><br>✩🝪 Adv.Al.Sys 🝪✩.<br><br><small>(Req.: ??? 🝪 Al.Sys 🝪.)</small>"
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
                        look.textStroke = "1px #97795bab"
                    }
                return look
            }
        },
        crimsonAlter: {
            title() {
                if (player.tlb.buyMaxSymbols == true) {
                    let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                    let val2 = player.tlb.crimsonSymbolParts.div(1000).floor()
                    let result = val1
                    if(val2.lt(val1)) result = val2
                    return "Create <h3>" + formatShortWhole(player.tlb.crimsonSymbolsGain.add(result)) + "</h3><br>Crimson Symbol/s."
                }
                else
                    return "Create <h3>1</h3><br>Crimson Symbol."
            },
            canClick() {return player.ssp.alchemicalSymbols >= 100 && player.tlb.crimsonSymbolParts >= 1000},
            unlocked() {return true},
            onClick() { 
                if (player.tlb.buyMaxSymbols == false) {
                    player.tlb.crimsonSymbols = player.tlb.crimsonSymbols.add(1)
                    player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(100)
                    player.tlb.crimsonSymbolParts = player.tlb.crimsonSymbolParts.sub(1000)
                } 
                else if (player.tlb.buyMaxSymbols == true) {
                    let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                    let val2 = player.tlb.crimsonSymbolParts.div(1000).floor()
                    let result = val1
                    if(val2.lt(val1)) result = val2

                    player.tlb.crimsonSymbols = player.tlb.crimsonSymbols.add(result)
                    player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(Decimal.mul(100, result))
                    player.tlb.crimsonSymbolParts = player.tlb.crimsonSymbolParts.sub(Decimal.mul(1000, result))
                }
            },
            style() {
            let look = {width: '300px', minHeight: '80px', border: "3px solid rgba(0,0,0,0.3)", fontSize: "18px", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundImage = "radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #330000), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #550000ab 9%, #550000ab 10%, #55000067 10%, #55000067 19%, #550000ab 19%, #550000ab 20%, transparent 20%, transparent 29%, #aa5555ab 29%, #aa5555ab 30%, #aa555567 30%, #aa555567 39%, #aa5555ab 39%, #aa5555ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #550000ab 9%, #550000ab 10%, #55000067 10%, #55000067 19%, #550000ab 19%, #550000ab 20%, transparent 20%, transparent 29%, #aa5555ab 29%, #aa5555ab 30%, #aa555567 30%, #aa555567 39%, #aa5555ab 39%, #aa5555ab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #ff7777, #ff0000, #ff007f, #7f003f)"
                look.borderImage = "radial-gradient(ellipse, #550000 70%, #ff0000) 1"
                look.color = "#770000"
                look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 5px #ffffff"
                look.textShadow = "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000"
                look.textStroke = "1px #ffddddab"
            } else {
                look.backgroundImage = "linear-gradient(to bottom, #333333, #333333)"
                look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                look.color = "#000000";
                look.boxShadow = "0 0 3px 1px #000000 inset"
            }
            return look
            }
        },
        goldAlter: {
            title() {
                if (player.tlb.buyMaxSymbols == true) {
                    let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                    let val2 = player.tlb.goldSymbolParts.div(1000).floor()
                    let result = val1
                    if(val2.lt(val1)) result = val2
                    return "Create <h3>" + formatShortWhole(player.tlb.goldSymbolsGain.add(result)) + "</h3><br>Gold Symbol/s."
                }
                else
                    return "Create <h3>1</h3><br>Gold Symbol."
            },
            canClick() {return player.ssp.alchemicalSymbols >= 100 && player.tlb.goldSymbolParts >= 1000},
            unlocked() {return true},
            onClick() { 
                if (player.tlb.buyMaxSymbols == false) {
                    player.tlb.goldSymbols = player.tlb.goldSymbols.add(1)
                    player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(100)
                    player.tlb.goldSymbolParts = player.tlb.goldSymbolParts.sub(1000)
                } 
                else if (player.tlb.buyMaxSymbols == true) {
                    let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                    let val2 = player.tlb.goldSymbolParts.div(1000).floor()
                    let result = val1
                    if(val2.lt(val1)) result = val2

                    player.tlb.goldSymbols = player.tlb.goldSymbols.add(result)
                    player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(Decimal.mul(100, result))
                    player.tlb.goldSymbolParts = player.tlb.goldSymbolParts.sub(Decimal.mul(1000, result))
                }
            },
            style() {
            let look = {width: '300px', minHeight: '80px', border: "3px solid rgba(0,0,0,0.3)", fontSize: "18px", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundImage = "radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #333300), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #555500ab 9%, #555500ab 10%, #55550067 10%, #55550067 19%, #555500ab 19%, #555500ab 20%, transparent 20%, transparent 29%, #aaaa55ab 29%, #aaaa55ab 30%, #aaaa5567 30%, #aaaa5567 39%, #aaaa55ab 39%, #aaaa55ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #555500ab 9%, #555500ab 10%, #55550067 10%, #55550067 19%, #555500ab 19%, #555500ab 20%, transparent 20%, transparent 29%, #aaaa55ab 29%, #aaaa55ab 30%, #aaaa5567 30%, #aaaa5567 39%, #aaaa55ab 39%, #aaaa55ab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #ffff77, #ffff00, #ff7f00, #7f3f00)"
                look.borderImage = "radial-gradient(ellipse, #555500 70%, #ffff00) 1"
                look.color = "#777700"
                look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 5px #ffffff"
                look.textShadow = "0 0 5px #ffff00, 0 0 10px #000000, 0 0 10px #000000"
                look.textStroke = "1px #ffffddab"
            } else {
                look.backgroundImage = "linear-gradient(to bottom, #333333, #333333)"
                look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                look.color = "#000000";
                look.boxShadow = "0 0 3px 1px #000000 inset"
            }
            return look
            }
        },
        jadeAlter: {
            title() {
                if (player.tlb.buyMaxSymbols == true) {
                    let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                    let val2 = player.tlb.jadeSymbolParts.div(1000).floor()
                    let result = val1
                    if(val2.lt(val1)) result = val2
                    return "Create <h3>" + formatShortWhole(player.tlb.jadeSymbolsGain.add(result)) + "</h3><br>Jade Symbol/s."
                }
                else
                    return "Create <h3>1</h3><br>Jade Symbol."
            },
            canClick() {return player.ssp.alchemicalSymbols >= 100 && player.tlb.jadeSymbolParts >= 1000},
            unlocked() {return true},
            onClick() { 
                if (player.tlb.buyMaxSymbols == false) {
                    player.tlb.jadeSymbols = player.tlb.jadeSymbols.add(1)
                    player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(100)
                    player.tlb.jadeSymbolParts = player.tlb.jadeSymbolParts.sub(1000)
                } 
                else if (player.tlb.buyMaxSymbols == true) {
                    let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                    let val2 = player.tlb.jadeSymbolParts.div(1000).floor()
                    let result = val1
                    if(val2.lt(val1)) result = val2

                    player.tlb.jadeSymbols = player.tlb.jadeSymbols.add(result)
                    player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(Decimal.mul(100, result))
                    player.tlb.jadeSymbolParts = player.tlb.jadeSymbolParts.sub(Decimal.mul(1000, result))
                }
            },
            style() {
            let look = {width: '300px', minHeight: '80px', border: "3px solid rgba(0,0,0,0.3)", fontSize: "18px", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundImage = "radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #003300), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #005500ab 9%, #005500ab 10%, #00550067 10%, #00550067 19%, #005500ab 19%, #005500ab 20%, transparent 20%, transparent 29%, #55aa55ab 29%, #55aa55ab 30%, #55aa5567 30%, #55aa5567 39%, #55aa55ab 39%, #55aa55ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #005500ab 9%, #005500ab 10%, #00550067 10%, #00550067 19%, #005500ab 19%, #005500ab 20%, transparent 20%, transparent 29%, #55aa55ab 29%, #55aa55ab 30%, #55aa5567 30%, #55aa5567 39%, #55aa55ab 39%, #55aa55ab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #77ff77, #00ff00, #7fff00, #3f7f00)"
                look.borderImage = "radial-gradient(ellipse, #005500 70%, #00ff00) 1"
                look.color = "#007700"
                look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 5px #ffffff"
                look.textShadow = "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000"
                look.textStroke = "1px #ddffddab"
            } else {
                look.backgroundImage = "linear-gradient(to bottom, #333333, #333333)"
                look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                look.color = "#000000";
                look.boxShadow = "0 0 3px 1px #000000 inset"
            }
            return look
            }
        },
        celesteAlter: {
            title() {
                if (player.tlb.buyMaxSymbols == true) {
                    let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                    let val2 = player.tlb.celesteSymbolParts.div(1000).floor()
                    let result = val1
                    if(val2.lt(val1)) result = val2
                    return "Create <h3>" + formatShortWhole(player.tlb.celesteSymbolsGain.add(result)) + "</h3><br>Celeste Symbol/s."
                }
                else
                    return "Create <h3>1</h3><br>Celeste Symbol."
            },
            canClick() {return player.ssp.alchemicalSymbols >= 100 && player.tlb.celesteSymbolParts >= 1000},
            unlocked() {return true},
            onClick() { 
                if (player.tlb.buyMaxSymbols == false) {
                    player.tlb.celesteSymbols = player.tlb.celesteSymbols.add(1)
                    player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(100)
                    player.tlb.celesteSymbolParts = player.tlb.celesteSymbolParts.sub(1000)
                } 
                else if (player.tlb.buyMaxSymbols == true) {
                    let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                    let val2 = player.tlb.celesteSymbolParts.div(1000).floor()
                    let result = val1
                    if(val2.lt(val1)) result = val2

                    player.tlb.celesteSymbols = player.tlb.celesteSymbols.add(result)
                    player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(Decimal.mul(100, result))
                    player.tlb.celesteSymbolParts = player.tlb.celesteSymbolParts.sub(Decimal.mul(1000, result))
                }
            },
            style() {
            let look = {width: '300px', minHeight: '80px', border: "3px solid rgba(0,0,0,0.3)", fontSize: "18px", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundImage = "radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #003333), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #005555ab 9%, #005555ab 10%, #00555567 10%, #00555567 19%, #005555ab 19%, #005555ab 20%, transparent 20%, transparent 29%, #55aaaaab 29%, #55aaaaab 30%, #55aaaa67 30%, #55aaaa67 39%, #55aaaaab 39%, #55aaaaab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #005555ab 9%, #005555ab 10%, #00555567 10%, #00555567 19%, #005555ab 19%, #005555ab 20%, transparent 20%, transparent 29%, #55aaaaab 29%, #55aaaaab 30%, #55aaaa67 30%, #55aaaa67 39%, #55aaaaab 39%, #55aaaaab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #77ffff, #00ffff, #00ff7f, #007f3f)"
                look.borderImage = "radial-gradient(ellipse, #005555 70%, #00ffff) 1"
                look.color = "#007777"
                look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 5px #ffffff"
                look.textShadow = "0 0 5px #00ffff, 0 0 10px #000000, 0 0 10px #000000"
                look.textStroke = "1px #ddffffab"
            } else {
                look.backgroundImage = "linear-gradient(to bottom, #333333, #333333)"
                look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                look.color = "#000000";
                look.boxShadow = "0 0 3px 1px #000000 inset"
            }
            return look
            }
        },
        cobaltAlter: {
            title() {
                if (player.tlb.buyMaxSymbols == true) {
                    let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                    let val2 = player.tlb.cobaltSymbolParts.div(1000).floor()
                    let result = val1
                    if(val2.lt(val1)) result = val2
                    return "Create <h3>" + formatShortWhole(player.tlb.cobaltSymbolsGain.add(result)) + "</h3><br>Cobalt Symbol/s."
                }
                else
                    return "Create <h3>1</h3><br>Cobalt Symbol."
            },
            canClick() {return player.ssp.alchemicalSymbols >= 100 && player.tlb.cobaltSymbolParts >= 1000},
            unlocked() {return true},
            onClick() { 
                if (player.tlb.buyMaxSymbols == false) {
                    player.tlb.cobaltSymbols = player.tlb.cobaltSymbols.add(1)
                    player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(100)
                    player.tlb.cobaltSymbolParts = player.tlb.cobaltSymbolParts.sub(1000)
                } 
                else if (player.tlb.buyMaxSymbols == true) {
                    let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                    let val2 = player.tlb.cobaltSymbolParts.div(1000).floor()
                    let result = val1
                    if(val2.lt(val1)) result = val2

                    player.tlb.cobaltSymbols = player.tlb.cobaltSymbols.add(result)
                    player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(Decimal.mul(100, result))
                    player.tlb.cobaltSymbolParts = player.tlb.cobaltSymbolParts.sub(Decimal.mul(1000, result))
                }
            },
            style() {
            let look = {width: '300px', minHeight: '80px', border: "3px solid rgba(0,0,0,0.3)", fontSize: "18px", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundImage = "radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #000033), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #000055ab 9%, #000055ab 10%, #00005567 10%, #00005567 19%, #000055ab 19%, #000055ab 20%, transparent 20%, transparent 29%, #5555aaab 29%, #5555aaab 30%, #5555aa67 30%, #5555aa67 39%, #5555aaab 39%, #5555aaab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #000055ab 9%, #000055ab 10%, #00005567 10%, #00005567 19%, #000055ab 19%, #000055ab 20%, transparent 20%, transparent 29%, #5555aaab 29%, #5555aaab 30%, #5555aa67 30%, #5555aa67 39%, #5555aaab 39%, #5555aaab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #7777ff, #0000ff, #007fff, #003f7f)"
                look.borderImage = "radial-gradient(ellipse, #000055 70%, #0000ff) 1"
                look.color = "#000077"
                look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 5px #ffffff"
                look.textShadow = "0 0 5px #0000ff, 0 0 10px #000000, 0 0 10px #000000"
                look.textStroke = "1px #ddddffab"
            } else {
                look.backgroundImage = "linear-gradient(to bottom, #333333, #333333)"
                look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                look.color = "#000000";
                look.boxShadow = "0 0 3px 1px #000000 inset"
            }
            return look
            }
        },
        amethystAlter: {
            title() {
                if (player.tlb.buyMaxSymbols == true) {
                    let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                    let val2 = player.tlb.amethystSymbolParts.div(1000).floor()
                    let result = val1
                    if(val2.lt(val1)) result = val2
                    return "Create <h3>" + formatShortWhole(player.tlb.amethystSymbolsGain.add(result)) + "</h3><br>Amethyst Symbol/s."
                }
                else
                    return "Create <h3>1</h3><br>Amethyst Symbol."
            },
            canClick() {return player.ssp.alchemicalSymbols >= 100 && player.tlb.amethystSymbolParts >= 1000},
            unlocked() {return true},
            onClick() { 
                if (player.tlb.buyMaxSymbols == false) {
                    player.tlb.amethystSymbols = player.tlb.amethystSymbols.add(1)
                    player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(100)
                    player.tlb.amethystSymbolParts = player.tlb.amethystSymbolParts.sub(1000)
                } 
                else if (player.tlb.buyMaxSymbols == true) {
                    let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                    let val2 = player.tlb.amethystSymbolParts.div(1000).floor()
                    let result = val1
                    if(val2.lt(val1)) result = val2

                    player.tlb.amethystSymbols = player.tlb.amethystSymbols.add(result)
                    player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(Decimal.mul(100, result))
                    player.tlb.amethystSymbolParts = player.tlb.amethystSymbolParts.sub(Decimal.mul(1000, result))
                }
            },
            style() {
            let look = {width: '300px', minHeight: '80px', border: "3px solid rgba(0,0,0,0.3)", fontSize: "18px", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundImage = "radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #003300), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #550055ab 9%, #550055ab 10%, #55005567 10%, #55005567 19%, #550055ab 19%, #550055ab 20%, transparent 20%, transparent 29%, #aa55aaab 29%, #aa55aaab 30%, #aa55aa67 30%, #aa55aa67 39%, #aa55aaab 39%, #aa55aaab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #550055ab 9%, #550055ab 10%, #55005567 10%, #55005567 19%, #550055ab 19%, #550055ab 20%, transparent 20%, transparent 29%, #aa55aaab 29%, #aa55aaab 30%, #aa55aa67 30%, #aa55aa67 39%, #aa55aaab 39%, #aa55aaab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #ff77ff, #ff00ff, #7f00ff, #3f007f)"
                look.borderImage = "radial-gradient(ellipse, #550055 70%, #ff00ff) 1"
                look.color = "#770077"
                look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 5px #ffffff"
                look.textShadow = "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000"
                look.textStroke = "1px #ffddffab"
            } else {
                look.backgroundImage = "linear-gradient(to bottom, #333333, #333333)"
                look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                look.color = "#000000";
                look.boxShadow = "0 0 3px 1px #000000 inset"
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
        tabs: {
            "Alterations I": {
                buttonStyle() {return {color: "#000000", backgroundImage: "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset"}},
                unlocked() {return true},
                content: [
                    ["blank", "5px"],
                    ["row",
                        [
                            ["raw-html", () => {return "You are currently in the"}, {color: "#ffffff", fontSize: "18px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                            ["blank", "2px"],
                            ["raw-html", () => {return "-<u>Alterations I</u>-."}, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                        ]
                    ],
                    ["blank", "10px"],
                    ["style-column",
                        [
                            ["row", [["clickable", "buyMaxOff"], ["blank", "5px"], ["clickable", "buyMaxOn"]]]
                        ]
                    ],
                    ["blank", "20px"],
                    ["style-row", // crimson
                        [
                            ["style-row",
                                [
                                    ["style-column",
                                        [
                                            ["column",
                                                [
                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:70px;height:70px'></img>"]
                                                ], {width: "80px", height: "80px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                            ],
                                            ["blank", "5px"],
                                            ["column",
                                                [
                                                    ["raw-html", () => {return formatShortWhole(player.tlb.crimsonSymbols)}]
                                                ], {width: "100px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #ff7777, #ff0000, #ff007f, #7f003f)", fontSize: "25px", textStroke: "1px #ffddddab", 'textShadow': "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                            ]
                                        ], {width: "120px", height: "120px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffdddd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff000023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                    ],
                                    ["column", [[]], {width: "30px"}],
                                    ["style-column",
                                        [
                                            ["clickable", "crimsonAlter"],
                                            ["blank", "5px"],
                                            ["row",
                                                [
                                                    ["raw-html", () => {return "Alteration Cost:"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                                                            let val2 = player.tlb.crimsonSymbolParts.div(1000).floor()
                                                            let result = val1
                                                            if(val2.lt(val1)) result = val2
                                                            return "<h3>" + formatShortWhole(player.tlb.alchemicalSymbolsReq.add(result).mul(100)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        else
                                                            return "<h3>100</h3><small> 🝪 Al.Sys 🝪</small>"
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "14px", textStroke: "1px #aaffaaab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {return "&"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {
                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                                                            let val2 = player.tlb.crimsonSymbolParts.div(1000).floor()
                                                            let result = val1
                                                            if(val2.lt(val1)) result = val2
                                                            return "<h3>" + formatShortWhole(player.tlb.crimsonSymbolsReq.add(result).mul(1000)) + "</h3><small> Cr.Sy.Prts</small>"
                                                            }
                                                        else
                                                            return "<h3>1,000</h3><small> Cr.Sy.Prts</small>"
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ff7777, #ff0000, #ff007f, #7f003f)", fontSize: "14px", textStroke: "1px #ffddddab", 'textShadow': "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ], {width: "560px", height: "160px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ffdddd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff000023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ],
                            ["style-row",
                                [
                                    ["column",
                                        [
                                            ["raw-html", () => {return "You are gaining"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShort(player.tlb.crimsonSymbolPartsGain) + "</h3> Cr.Sy.Prts per second."}, {color: "transparent", background: "linear-gradient(to bottom, #ff7777, #ff0000, #ff007f, #7f003f)", fontSize: "14px", textStroke: "1px #ffddddab", 'textShadow': "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "(Based on Radioactive Core Fragments.)"}, {color: "#ffffff", fontSize: "13px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "20px"],
                                            ["raw-html", () => {return "You have"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShortWhole(player.tlb.crimsonSymbolParts) + "</h3> Cr.Sy.Prts."}, {color: "transparent", background: "linear-gradient(to bottom, #ff7777, #ff0000, #ff007f, #7f003f)", fontSize: "16px", textStroke: "1px #ffddddab", 'textShadow': "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}]
                                        ]
                                    ]
                                ], {width: "300px", height: "160px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ffdddd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff000023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ]
                        ]
                    ],
                    ["style-row", // gold
                        [
                            ["style-row",
                                [
                                    ["style-column",
                                        [
                                            ["column",
                                                [
                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:70px;height:70px'></img>"]
                                                ], {width: "80px", height: "80px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                            ],
                                            ["blank", "5px"],
                                            ["column",
                                                [
                                                    ["raw-html", () => {return formatShortWhole(player.tlb.goldSymbols)}]
                                                ], {width: "100px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #ffff77, #ffff00, #ff7f00, #7f3f00)", fontSize: "25px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #ffff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                            ]
                                        ], {width: "120px", height: "120px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ffff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                    ],
                                    ["column", [[]], {width: "30px"}],
                                    ["style-column",
                                        [
                                            ["clickable", "goldAlter"],
                                            ["blank", "5px"],
                                            ["row",
                                                [
                                                    ["raw-html", () => {return "Alteration Cost:"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                                                            let val2 = player.tlb.goldSymbolParts.div(1000).floor()
                                                            let result = val1
                                                            if(val2.lt(val1)) result = val2
                                                            return "<h3>" + formatShortWhole(player.tlb.alchemicalSymbolsReq.add(result).mul(100)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        else
                                                            return "<h3>100</h3><small> 🝪 Al.Sys 🝪</small>"
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "14px", textStroke: "1px #aaffaaab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {return "&"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {
                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                                                            let val2 = player.tlb.goldSymbolParts.div(1000).floor()
                                                            let result = val1
                                                            if(val2.lt(val1)) result = val2
                                                            return "<h3>" + formatShortWhole(player.tlb.goldSymbolsReq.add(result).mul(1000)) + "</h3><small> Gl.Sy.Prts</small>"
                                                            }
                                                        else
                                                            return "<h3>1,000</h3><small> Gl.Sy.Prts</small>"
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ffff77, #ffff00, #ff7f00, #7f3f00)", fontSize: "14px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #ffff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ], {width: "560px", height: "160px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ffffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ffff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ],
                            ["style-row",
                                [
                                    ["column",
                                        [
                                            ["raw-html", () => {return "You are gaining"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShort(player.tlb.goldSymbolPartsGain) + "</h3> Gl.Sy.Prts per second."}, {color: "transparent", background: "linear-gradient(to bottom, #ffff77, #ffff00, #ff7f00, #7f3f00)", fontSize: "14px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #ffff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "(Based on Technological Core Fragments.)"}, {color: "#ffffff", fontSize: "13px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "20px"],
                                            ["raw-html", () => {return "You have"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShortWhole(player.tlb.goldSymbolParts) + "</h3> Gl.Sy.Prts."}, {color: "transparent", background: "linear-gradient(to bottom, #ffff77, #ffff00, #ff7f00, #7f3f00)", fontSize: "16px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #ffff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}]
                                        ]
                                    ]
                                ], {width: "300px", height: "160px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ffffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ffff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ]
                        ]
                    ],
                    ["style-row", // jade
                        [
                            ["style-row",
                                [
                                    ["style-column",
                                        [
                                            ["column",
                                                [
                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:70px;height:70px'></img>"]
                                                ], {width: "80px", height: "80px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                            ],
                                            ["blank", "5px"],
                                            ["column",
                                                [
                                                    ["raw-html", () => {return formatShortWhole(player.tlb.jadeSymbols)}]
                                                ], {width: "100px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #77ff77, #00ff00, #7fff00, #3f7f00)", fontSize: "25px", textStroke: "1px #ddffddab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                            ]
                                        ], {width: "120px", height: "120px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ddffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                    ],
                                    ["column", [[]], {width: "30px"}],
                                    ["style-column",
                                        [
                                            ["clickable", "jadeAlter"],
                                            ["blank", "5px"],
                                            ["row",
                                                [
                                                    ["raw-html", () => {return "Alteration Cost:"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                                                            let val2 = player.tlb.jadeSymbolParts.div(1000).floor()
                                                            let result = val1
                                                            if(val2.lt(val1)) result = val2
                                                            return "<h3>" + formatShortWhole(player.tlb.alchemicalSymbolsReq.add(result).mul(100)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        else
                                                            return "<h3>100</h3><small> 🝪 Al.Sys 🝪</small>"
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "14px", textStroke: "1px #aaffaaab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {return "&"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {
                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                                                            let val2 = player.tlb.jadeSymbolParts.div(1000).floor()
                                                            let result = val1
                                                            if(val2.lt(val1)) result = val2
                                                            return "<h3>" + formatShortWhole(player.tlb.jadeSymbolsReq.add(result).mul(1000)) + "</h3><small> Gl.Sy.Prts</small>"
                                                            }
                                                        else
                                                            return "<h3>1,000</h3><small> Jd.Sy.Prts</small>"
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #77ff77, #00ff00, #7fff00, #3f7f00)", fontSize: "14px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ], {width: "560px", height: "160px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ddffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ],
                            ["style-row",
                                [
                                    ["column",
                                        [
                                            ["raw-html", () => {return "You are gaining"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShort(player.tlb.jadeSymbolPartsGain) + "</h3> Jd.Sy.Prts per second."}, {color: "transparent", background: "linear-gradient(to bottom, #77ff77, #00ff00, #7fff00, #3f7f00)", fontSize: "14px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "(Based on Nature Core Fragments.)"}, {color: "#ffffff", fontSize: "13px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "20px"],
                                            ["raw-html", () => {return "You have"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShortWhole(player.tlb.jadeSymbolParts) + "</h3> Jd.Sy.Prts."}, {color: "transparent", background: "linear-gradient(to bottom, #77ff77, #00ff00, #7fff00, #3f7f00)", fontSize: "16px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}]
                                        ]
                                    ]
                                ], {width: "300px", height: "160px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ddffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ]
                        ]
                    ]
                ]
            },
            "Alterations II": {
                buttonStyle() {return {color: "#000000", backgroundImage: "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset"}},
                unlocked() {return true},
                content: [
                    ["blank", "5px"],
                    ["row",
                        [
                            ["raw-html", () => {return "You are currently in the"}, {color: "#ffffff", fontSize: "18px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                            ["blank", "2px"],
                            ["raw-html", () => {return "-<u>Alterations II</u>-."}, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                        ]
                    ],
                    ["blank", "10px"],
                    ["style-column",
                        [
                            ["row", [["clickable", "buyMaxOff"], ["blank", "5px"], ["clickable", "buyMaxOn"]]]
                        ]
                    ],
                    ["blank", "20px"],
                    ["style-row", // celeste
                        [
                            ["style-row",
                                [
                                    ["style-column",
                                        [
                                            ["column",
                                                [
                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:70px;height:70px'></img>"]
                                                ], {width: "80px", height: "80px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                            ],
                                            ["blank", "5px"],
                                            ["column",
                                                [
                                                    ["raw-html", () => {return formatShortWhole(player.tlb.celesteSymbols)}]
                                                ], {width: "100px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #77ffff, #00ffff, #00ff7f, #007f3f)", fontSize: "25px", textStroke: "1px #00ffffab", 'textShadow': "0 0 5px #00ffff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                            ]
                                        ], {width: "120px", height: "120px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ddffff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ffff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                    ],
                                    ["column", [[]], {width: "30px"}],
                                    ["style-column",
                                        [
                                            ["clickable", "celesteAlter"],
                                            ["blank", "5px"],
                                            ["row",
                                                [
                                                    ["raw-html", () => {return "Alteration Cost:"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                                                            let val2 = player.tlb.celesteSymbolParts.div(1000).floor()
                                                            let result = val1
                                                            if(val2.lt(val1)) result = val2
                                                            return "<h3>" + formatShortWhole(player.tlb.alchemicalSymbolsReq.add(result).mul(100)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        else
                                                            return "<h3>100</h3><small> 🝪 Al.Sys 🝪</small>"
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "14px", textStroke: "1px #aaffaaab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {return "&"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {
                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                                                            let val2 = player.tlb.celesteSymbolParts.div(1000).floor()
                                                            let result = val1
                                                            if(val2.lt(val1)) result = val2
                                                            return "<h3>" + formatShortWhole(player.tlb.celesteSymbolsReq.add(result).mul(1000)) + "</h3><small> Ce.Sy.Prts</small>"
                                                            }
                                                        else
                                                            return "<h3>1,000</h3><small> Ce.Sy.Prts</small>"
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #77ffff, #00ffff, #00ff7f, #007f3f)", fontSize: "14px", textStroke: "1px #00ffffab", 'textShadow': "0 0 5px #00ffff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ], {width: "560px", height: "160px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ddffff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ffff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ],
                            ["style-row",
                                [
                                    ["column",
                                        [
                                            ["raw-html", () => {return "You are gaining"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShort(player.tlb.celesteSymbolPartsGain) + "</h3> Ce.Sy.Prts per second."}, {color: "transparent", background: "linear-gradient(to bottom, #77ffff, #00ffff, #00ff7f, #007f3f)", fontSize: "14px", textStroke: "1px #00ffffab", 'textShadow': "0 0 5px #00ffff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "(Based on Ancient Core Fragments.)"}, {color: "#ffffff", fontSize: "13px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "20px"],
                                            ["raw-html", () => {return "You have"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShortWhole(player.tlb.celesteSymbolParts) + "</h3> Ce.Sy.Prts."}, {color: "transparent", background: "linear-gradient(to bottom, #77ffff, #00ffff, #00ff7f, #007f3f)", fontSize: "16px", textStroke: "1px #00ffffab", 'textShadow': "0 0 5px #00ffff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}]
                                        ]
                                    ]
                                ], {width: "300px", height: "160px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ddffff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ffff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ]
                        ]
                    ],
                    ["style-row", // cobalt
                        [
                            ["style-row",
                                [
                                    ["style-column",
                                        [
                                            ["column",
                                                [
                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:70px;height:70px'></img>"]
                                                ], {width: "80px", height: "80px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                            ],
                                            ["blank", "5px"],
                                            ["column",
                                                [
                                                    ["raw-html", () => {return formatShortWhole(player.tlb.cobaltSymbols)}]
                                                ], {width: "100px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #7777ff, #0000ff, #007fff, #003f7f)", fontSize: "25px", textStroke: "1px #ddddffab", 'textShadow': "0 0 5px #0000ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                            ]
                                        ], {width: "120px", height: "120px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ddddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #0000ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                    ],
                                    ["column", [[]], {width: "30px"}],
                                    ["style-column",
                                        [
                                            ["clickable", "cobaltAlter"],
                                            ["blank", "5px"],
                                            ["row",
                                                [
                                                    ["raw-html", () => {return "Alteration Cost:"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                                                            let val2 = player.tlb.cobaltSymbolParts.div(1000).floor()
                                                            let result = val1
                                                            if(val2.lt(val1)) result = val2
                                                            return "<h3>" + formatShortWhole(player.tlb.alchemicalSymbolsReq.add(result).mul(100)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        else
                                                            return "<h3>100</h3><small> 🝪 Al.Sys 🝪</small>"
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "14px", textStroke: "1px #aaffaaab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {return "&"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {
                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                                                            let val2 = player.tlb.cobaltSymbolParts.div(1000).floor()
                                                            let result = val1
                                                            if(val2.lt(val1)) result = val2
                                                            return "<h3>" + formatShortWhole(player.tlb.cobaltSymbolsReq.add(result).mul(1000)) + "</h3><small> Co.Sy.Prts</small>"
                                                            }
                                                        else
                                                            return "<h3>1,000</h3><small> Co.Sy.Prts</small>"
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #7777ff, #0000ff, #007fff, #003f7f)", fontSize: "14px", textStroke: "1px #ddddffab", 'textShadow': "0 0 5px #0000ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ], {width: "560px", height: "160px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ddddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #0000ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ],
                            ["style-row",
                                [
                                    ["column",
                                        [
                                            ["raw-html", () => {return "You are gaining"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShort(player.tlb.cobaltSymbolPartsGain) + "</h3> Co.Sy.Prts per second."}, {color: "transparent", background: "linear-gradient(to bottom, #7777ff, #0000ff, #007fff, #003f7f)", fontSize: "14px", textStroke: "1px #ddddffab", 'textShadow': "0 0 5px #0000ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "(Based on Paradox Core Fragments.)"}, {color: "#ffffff", fontSize: "13px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "20px"],
                                            ["raw-html", () => {return "You have"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShortWhole(player.tlb.cobaltSymbolParts) + "</h3> Co.Sy.Prts."}, {color: "transparent", background: "linear-gradient(to bottom, #7777ff, #0000ff, #007fff, #003f7f)", fontSize: "16px", textStroke: "1px #ddddffab", 'textShadow': "0 0 5px #0000ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}]
                                        ]
                                    ]
                                ], {width: "300px", height: "160px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ddddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #0000ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ]
                        ]
                    ],
                    ["style-row", // amethyst
                        [
                            ["style-row",
                                [
                                    ["style-column",
                                        [
                                            ["column",
                                                [
                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:70px;height:70px'></img>"]
                                                ], {width: "80px", height: "80px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                            ],
                                            ["blank", "5px"],
                                            ["column",
                                                [
                                                    ["raw-html", () => {return formatShortWhole(player.tlb.amethystSymbols)}]
                                                ], {width: "100px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #ff77ff, #ff00ff, #7f00ff, #3f007f)", fontSize: "25px", textStroke: "1px #ffddffab", 'textShadow': "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                            ]
                                        ], {width: "120px", height: "120px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff00ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                    ],
                                    ["column", [[]], {width: "30px"}],
                                    ["style-column",
                                        [
                                            ["clickable", "amethystAlter"],
                                            ["blank", "5px"],
                                            ["row",
                                                [
                                                    ["raw-html", () => {return "Alteration Cost:"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                                                            let val2 = player.tlb.amethystSymbolParts.div(1000).floor()
                                                            let result = val1
                                                            if(val2.lt(val1)) result = val2
                                                            return "<h3>" + formatShortWhole(player.tlb.alchemicalSymbolsReq.add(result).mul(100)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        else
                                                            return "<h3>100</h3><small> 🝪 Al.Sys 🝪</small>"
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "14px", textStroke: "1px #aaffaaab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {return "&"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {
                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            let val1 = player.ssp.alchemicalSymbols.div(100).floor()
                                                            let val2 = player.tlb.amethystSymbolParts.div(1000).floor()
                                                            let result = val1
                                                            if(val2.lt(val1)) result = val2
                                                            return "<h3>" + formatShortWhole(player.tlb.amethystSymbolsReq.add(result).mul(1000)) + "</h3><small> Am.Sy.Prts</small>"
                                                            }
                                                        else
                                                            return "<h3>1,000</h3><small> Am.Sy.Prts</small>"
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ff77ff, #ff00ff, #7f00ff, #3f007f)", fontSize: "14px", textStroke: "1px #ffddffab", 'textShadow': "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ], {width: "560px", height: "160px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ffddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff00ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ],
                            ["style-row",
                                [
                                    ["column",
                                        [
                                            ["raw-html", () => {return "You are gaining"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShort(player.tlb.amethystSymbolPartsGain) + "</h3> Am.Sy.Prts per second."}, {color: "transparent", background: "linear-gradient(to bottom, #ff77ff, #ff00ff, #7f00ff, #3f007f)", fontSize: "14px", textStroke: "1px #ffddffab", 'textShadow': "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "(Based on Cosmic Core Fragments.)"}, {color: "#ffffff", fontSize: "13px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "20px"],
                                            ["raw-html", () => {return "You have"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShortWhole(player.tlb.amethystSymbolParts) + "</h3> Am.Sy.Prts."}, {color: "transparent", background: "linear-gradient(to bottom, #ff77ff, #ff00ff, #7f00ff, #3f007f)", fontSize: "16px", textStroke: "1px #ffddffab", 'textShadow': "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}]
                                        ]
                                    ]
                                ], {width: "300px", height: "160px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ffddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff00ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ]
                        ]
                    ]
                ]
            },
            "The Bookshop": {
                buttonStyle() {return {color: "#000000", backgroundImage: "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset"}},
                unlocked() {return true},
                content: [
                    ["blank", "5px"],
                    ["row",
                        [
                            ["raw-html", () => {return "You are currently in the"}, {color: "#ffffff", fontSize: "18px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                            ["blank", "2px"],
                            ["raw-html", () => {return "-<u>Bookshop</u>-."}, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                        ]
                    ],
                    ["blank", "20px"],
                    ["style-row",
                        [
                            ["style-column",
                                [
                                    ["style-row",
                                        [
                                            ["column", [], {width: "50px", height: "150px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #9b541a 12px, #ffdb8e)", marginBottom:"-25px", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "50px 0 50px 50px"}],
                                            ["column", [], {width: "50px", height: "125px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #005555 12px, #00aaaa)", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                            ["column", [], {width: "50px", height: "150px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #550000 12px, #aa0000)", marginBottom:"-25px", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                            ["column", [], {width: "50px", height: "125px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #9b541a 12px, #ffdb8e)", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                            ["column", [], {width: "50px", height: "150px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #550000 12px, #aa0000)", marginBottom:"-25px", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                            ["column", [], {width: "50px", height: "125px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #005555 12px, #00aaaa)", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                            ["column", [], {width: "50px", height: "150px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #9b541a 12px, #ffdb8e)", marginBottom:"-25px", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 50px 50px 50px"}],
                                        ], {marginBottom: "-60px"}
                                    ],
                                    ["style-row", [], {width: "300px", height: "100px", backgroundImage: "radial-gradient(ellipse at 50% 100%, transparent, #000000ab), radial-gradient(ellipse at 50% -40%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 100% 0%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "15px 15px 0 0", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                                    ["style-row",
                                        [
                                            ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #550000, #005555)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}],
                                            ["column", [], {width: "254px", height: "100px", backgroundImage: "radial-gradient(ellipse, #00000023, #000000cd 80%), linear-gradient(135deg, #aa000067 20%, transparent, #aaaaaa23, transparent, #00aaaa67 80%), repeating-linear-gradient(-45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), linear-gradient(0deg, #382413, #523116)"}],
                                            ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #550000, #005555)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}]
                                        ]
                                    ],
                                    ["style-row", [], {width: "300px", height: "30px", backgroundImage: "radial-gradient(ellipse at 50% 100%, transparent, #000000ab), radial-gradient(ellipse at 50% -40%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(circle, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                                    ["style-row",
                                        [
                                            ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #550000, #005555)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}],
                                            ["column", [], {width: "254px", height: "100px", backgroundImage: "radial-gradient(ellipse, #00000023, #000000cd 80%), linear-gradient(135deg, #aa000067 20%, transparent, #aaaaaa23, transparent, #00aaaa67 80%), repeating-linear-gradient(-45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), linear-gradient(0deg, #382413, #523116)"}],
                                            ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #550000, #005555)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}]
                                        ]
                                    ],
                                    ["style-row", [], {width: "300px", height: "30px", backgroundImage: "radial-gradient(ellipse at 50% 100%, transparent, #000000ab), radial-gradient(ellipse at 50% -40%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(circle, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                                    ["style-row",
                                        [
                                            ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #550000, #005555)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}],
                                            ["column", [], {width: "254px", height: "100px", backgroundImage: "radial-gradient(ellipse, #00000023, #000000cd 80%), linear-gradient(135deg, #aa000067 20%, transparent, #aaaaaa23, transparent, #00aaaa67 80%), repeating-linear-gradient(-45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), linear-gradient(0deg, #382413, #523116)"}],
                                            ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #550000, #005555)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}]
                                        ]
                                    ],
                                    ["style-row", [], {width: "300px", height: "100px", backgroundImage: "radial-gradient(ellipse at 50% 0%, transparent, #000000ab), radial-gradient(ellipse at 50% 140%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 0% 100%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(to bottom, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 15px 15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}]
                                ]
                            ],
                            () => {if(hasUpgrade("ssp", 104))
                                return ["style-row", // spawns the 2nd shelf
                                    [
                                        () => {if(hasUpgrade("ssp", 104))
                                            return ["blank", "1px"]
                                        }
                                    ], {width: "50px"}
                                ]
                            },
                            () => {if(hasUpgrade("ssp", 104))
                                return ["style-column",
                                    [
                                        ["style-row",
                                            [
                                                ["column", [], {width: "50px", height: "150px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #9b541a 12px, #ffdb8e)", marginBottom:"-25px", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "50px 0 50px 50px"}],
                                                ["column", [], {width: "50px", height: "125px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #555500 12px, #aaaa00)", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                                ["column", [], {width: "50px", height: "150px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #000055 12px, #0000aa)", marginBottom:"-25px", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                                ["column", [], {width: "50px", height: "125px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #9b541a 12px, #ffdb8e)", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                                ["column", [], {width: "50px", height: "150px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #000055 12px, #0000aa)", marginBottom:"-25px", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                                ["column", [], {width: "50px", height: "125px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #555500 12px, #aaaa00)", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                                ["column", [], {width: "50px", height: "150px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #9b541a 12px, #ffdb8e)", marginBottom:"-25px", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 50px 50px 50px"}],
                                            ], {marginBottom: "-60px"}
                                        ],
                                        ["style-row", [], {width: "300px", height: "100px", backgroundImage: "radial-gradient(ellipse at 50% 100%, transparent, #000000ab), radial-gradient(ellipse at 50% -40%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 100% 0%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "15px 15px 0 0", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                                        ["style-row",
                                            [
                                                ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #000055, #555500)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}],
                                                ["column", [], {width: "254px", height: "100px", backgroundImage: "radial-gradient(ellipse, #00000023, #000000cd 80%), linear-gradient(135deg, #0000aa67 20%, transparent, #aaaaaa23, transparent, #aaaa0067 80%), repeating-linear-gradient(-45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), linear-gradient(0deg, #382413, #523116)"}],
                                                ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #000055, #555500)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}]
                                            ]
                                        ],
                                        ["style-row", [], {width: "300px", height: "30px", backgroundImage: "radial-gradient(ellipse at 50% 100%, transparent, #000000ab), radial-gradient(ellipse at 50% -40%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(circle, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                                        ["style-row",
                                            [
                                                ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #000055, #555500)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}],
                                                ["column", [], {width: "254px", height: "100px", backgroundImage: "radial-gradient(ellipse, #00000023, #000000cd 80%), linear-gradient(135deg, #0000aa67 20%, transparent, #aaaaaa23, transparent, #aaaa0067 80%), repeating-linear-gradient(-45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), linear-gradient(0deg, #382413, #523116)"}],
                                                ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #000055, #555500)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}]
                                            ]
                                        ],
                                        ["style-row", [], {width: "300px", height: "30px", backgroundImage: "radial-gradient(ellipse at 50% 100%, transparent, #000000ab), radial-gradient(ellipse at 50% -40%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(circle, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                                        ["style-row",
                                            [
                                                ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #000055, #555500)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}],
                                                ["column", [], {width: "254px", height: "100px", backgroundImage: "radial-gradient(ellipse, #00000023, #000000cd 80%), linear-gradient(135deg, #0000aa67 20%, transparent, #aaaaaa23, transparent, #aaaa0067 80%), repeating-linear-gradient(-45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), linear-gradient(0deg, #382413, #523116)"}],
                                                ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #000055, #555500)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}]
                                            ]
                                        ],
                                        ["style-row", [], {width: "300px", height: "100px", backgroundImage: "radial-gradient(ellipse at 50% 0%, transparent, #000000ab), radial-gradient(ellipse at 50% 140%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 0% 100%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(to bottom, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 15px 15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}]
                                    ]
                                ]
                            },
                            () => {if(hasUpgrade("ssp", 104))
                                return ["style-row", // spawns the 3rd shelf
                                    [
                                        () => {if(hasUpgrade("ssp", 104))
                                            return ["blank", "1px"]
                                        }
                                    ], {width: "50px"}
                                ]
                            },
                            () => {if(hasUpgrade("ssp", 104))
                                return ["style-column",
                                    [
                                        ["style-row",
                                            [
                                                ["column", [], {width: "50px", height: "150px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #9b541a 12px, #ffdb8e)", marginBottom:"-25px", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "50px 0 50px 50px"}],
                                                ["column", [], {width: "50px", height: "125px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #550055 12px, #aa00aa)", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                                ["column", [], {width: "50px", height: "150px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #005500 12px, #00aa00", marginBottom:"-25px", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                                ["column", [], {width: "50px", height: "125px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #9b541a 12px, #ffdb8e)", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                                ["column", [], {width: "50px", height: "150px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #005500 12px, #00aa00)", marginBottom:"-25px", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                                ["column", [], {width: "50px", height: "125px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #550055 12px, #aa00aa)", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 0 50px 50px"}],
                                                ["column", [], {width: "50px", height: "150px", backgroundImage: "linear-gradient(to bottom, #000000ab, transparent, #ffffffab), repeating-radial-gradient(circle at 50% -100%, transparent, transparent 4%, #ffffff45 4%, #ffffff45 9%), linear-gradient(to bottom, #9b541a 12px, #ffdb8e)", marginBottom:"-25px", boxShadow: "0 0 5px #000000 inset, 0 0 10px #000000 inset", borderRadius: "0 50px 50px 50px"}],
                                            ], {marginBottom: "-60px"}
                                        ],
                                        ["style-row", [], {width: "300px", height: "100px", backgroundImage: "radial-gradient(ellipse at 50% 100%, transparent, #000000ab), radial-gradient(ellipse at 50% -40%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 100% 0%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "15px 15px 0 0", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                                        ["style-row",
                                            [
                                                ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #005500, #550055)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}],
                                                ["column", [], {width: "254px", height: "100px", backgroundImage: "radial-gradient(ellipse, #00000023, #000000cd 80%), linear-gradient(135deg, #00aa0067 20%, transparent, #aaaaaa23, transparent, #aa00aa67 80%), repeating-linear-gradient(-45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), linear-gradient(0deg, #382413, #523116)"}],
                                                ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #005500, #550055)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}]
                                            ]
                                        ],
                                        ["style-row", [], {width: "300px", height: "30px", backgroundImage: "radial-gradient(ellipse at 50% 100%, transparent, #000000ab), radial-gradient(ellipse at 50% -40%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(circle, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                                        ["style-row",
                                            [
                                                ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #005500, #550055)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}],
                                                ["column", [], {width: "254px", height: "100px", backgroundImage: "radial-gradient(ellipse, #00000023, #000000cd 80%), linear-gradient(135deg, #00aa0067 20%, transparent, #aaaaaa23, transparent, #aa00aa67 80%), repeating-linear-gradient(-45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), linear-gradient(0deg, #382413, #523116)"}],
                                                ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #005500, #550055)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}]
                                            ]
                                        ],
                                        ["style-row", [], {width: "300px", height: "30px", backgroundImage: "radial-gradient(ellipse at 50% 100%, transparent, #000000ab), radial-gradient(ellipse at 50% -40%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(circle, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}],
                                        ["style-row",
                                            [
                                                ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #005500, #550055)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}],
                                                ["column", [], {width: "254px", height: "100px", backgroundImage: "radial-gradient(ellipse, #00000023, #000000cd 80%), linear-gradient(135deg, #00aa0067 20%, transparent, #aaaaaa23, transparent, #aa00aa67 80%), repeating-linear-gradient(-45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), linear-gradient(0deg, #382413, #523116)"}],
                                                ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #005500, #550055)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}]
                                            ]
                                        ],
                                        ["style-row", [], {width: "300px", height: "100px", backgroundImage: "radial-gradient(ellipse at 50% 0%, transparent, #000000ab), radial-gradient(ellipse at 50% 140%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 0% 100%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(to bottom, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 15px 15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}]
                                    ]
                                ]
                            },
                        ]
                    ],
                    // ["style-row", [], {width: "1150px", height: "100px", backgroundImage: "radial-gradient(ellipse, #000000ab 50%, transparent), radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset", marginTop:"-50px"}],
                    // ["blank", "20px"]
                ]
            },
        },
    },
    tabFormat: [
            ["row",
                [
                    ["column",
                        [
                            ["clickable", "encoder"]
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
                                if (hasUpgrade("ssp", 101))
                                    return "You have <h3>" + formatWhole(player.tlb.revelationPoints) + "</h3> ⚿ Rev.Pts ⚿."}, {color: "transparent", background: "linear-gradient(0deg, #6b4423, #9b541a)", fontSize: "15px", textStroke: "1px #f8c898ab", 'text-shadow': "0 0 5px #9b541a, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"
                                }
                            ],
                            ["raw-html", () => {return "You have <h3>" + format(player.points) + "</h3> ✸ Cel.Pts ✸."}, {color: "#ffffff", fontSize: "15px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                        ], {width: "420px", height: "90px", border: "1px solid #ffdb8e", borderRadius: "20px", backgroundImage: "radial-gradient(ellipse, #000000ab 30%, transparent), linear-gradient(-135deg, #ffffffcd 10%, transparent 30%, transparent 70%, #000000cd 90%), linear-gradient(-135deg, #ffffff45, #00000045), repeating-linear-gradient(45deg, transparent, transparent 9%, #000000ab 9%, #000000ab 10%, #00000067 10%, #00000067 19%, #000000ab 19%, #000000ab 20%, transparent 20%, transparent 29%, #ffffffab 29%, #ffffffab 30%, #ffffff67 30%, #ffffff67 39%, #ffffffab 39%, #ffffffab 40%), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", boxShadow: "0 0 10px #000000, 0 0 10px #000000, 0 0 10px #000000 inset, 0 0 10px #000000 inset"}
                    ],
                    ["column", [], {width: "30px"}],
                    ["column",
                        [
                            ["clickable", "combiner"]
                        ]
                    ],
                ], {marginTop:"-62px", width: "900px", height: "150px", backgroundImage: "radial-gradient(ellipse at 50% -40%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 50% -20%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}
            ],
            ["blank", "10px"],
            ["row",
                [
                    ["raw-html", () => {return "You are currently in the"}, {color: "#ffffff", fontSize: "18px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                    ["blank", "2px"],
                    ["raw-html", () => {return "-<u>Tome Library</u>, Louki's Hideout-."}, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                ]
            ],
            ["blank", "10px"],
            ["microtabs", "tabs", {'border-width': '0px'}],
            ["blank", "50px"],
        ],
    layerShown() {return player.startedGame == true && hasUpgrade("ssp", 101)}
    }
)
