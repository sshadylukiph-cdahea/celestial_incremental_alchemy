addLayer("tlb", {
    name: "Tome Library",
    symbol: "🕮",
    row: 1,
    universe: "LU",
    position: 1,
    startData() {return {
        unlocked: true,
        buyMaxSymbols: false,
        buyMaxTomes: false,
        stopTime: new Decimal(0),

        // Alteration Costs
        baseCostsAlchemicalSymbols: new Decimal(10),
        baseCostsCrimsonSymbols: new Decimal(1000),
        baseCostsGoldSymbols: new Decimal(1000),
        baseCostsJadeSymbols: new Decimal(1000),
        baseCostsCelesteSymbols: new Decimal(1000),
        baseCostsCobaltSymbols: new Decimal(1000),
        baseCostsAmethystSymbols: new Decimal(1000),

        baseCostsForceCr: new Decimal(15),
        baseCostsInsightGl: new Decimal(21),
        baseCostsMeritJd: new Decimal(23),
        baseCostsForceCe: new Decimal(18),
        baseCostsInsightCo: new Decimal(19),
        baseCostsMeritAm: new Decimal(14),

        // combinationsUnlocked: false, (LATER)

        // tomes and revelation points
        tomesForce: new Decimal(0),
        tomesForceGain: new Decimal(0),
        pointsForce: new Decimal(0),
        pointsForceGain: new Decimal(0),
        currentPointsForceGainTime: new Decimal(60),

        tomesInsight: new Decimal(0),
        tomesInsightGain: new Decimal(0),
        pointsInsight: new Decimal(0),
        pointsInsightGain: new Decimal(0),
        currentPointsInsightGainTime: new Decimal(60),

        tomesMerit: new Decimal(0),
        tomesMeritGain: new Decimal(0),
        pointsMerit: new Decimal(0),
        pointsMeritGain: new Decimal(0),
        currentPointsMeritGainTime: new Decimal(60),

        unlockCountStudy: new Decimal(0),
        purchaseCountForceTome: new Decimal(0),
        purchaseCountInsightTome: new Decimal(0),
        purchaseCountMeritTome: new Decimal(0),
        firstTomeForce: false,
        firstTomeInsight: false,
        firstTomeMerit: false,
        preparationPhaseForce: true,
        preparationPhaseInsight: true,
        preparationPhaseMerit: true,
        gainBlockerForce: false,
        gainBlockerInsight: false,
        gainBlockerMerit: false,
        revelationPoints: new Decimal(0),
        revelationPointsGainForce: new Decimal(0),
        revelationPointsGainInsight: new Decimal(0),
        revelationPointsGainMerit: new Decimal(0),

        // base symbols
        crimsonSymbols: new Decimal(0),
        goldSymbols: new Decimal(0),
        jadeSymbols: new Decimal(0),
        celesteSymbols: new Decimal(0),
        cobaltSymbols: new Decimal(0),
        amethystSymbols: new Decimal(0),

        // base symbols' gains/mults
        crimsonSymbolsGain: new Decimal(0),
        goldSymbolsGain: new Decimal(0),
        jadeSymbolsGain: new Decimal(0),
        celesteSymbolsGain: new Decimal(0),
        cobaltSymbolsGain: new Decimal(0),
        amethystSymbolsGain: new Decimal(0),

        // base symbols' parts generated
        crimsonSymbolParts: new Decimal(0),
        crimsonSymbolPartsGain: new Decimal(0),
        goldSymbolParts: new Decimal(0),
        goldSymbolPartsGain: new Decimal(0),
        jadeSymbolParts: new Decimal(0),
        jadeSymbolPartsGain: new Decimal(0),
        celesteSymbolParts: new Decimal(0),
        celesteSymbolPartsGain: new Decimal(0),
        cobaltSymbolParts: new Decimal(0),
        cobaltSymbolPartsGain: new Decimal(0),
        amethystSymbolParts: new Decimal(0),
        amethystSymbolPartsGain: new Decimal(0),

        crimsonSymbolPartsSoftcap: new Decimal(10000),
        crimsonSymbolPartsSoftcapEffect: new Decimal(0),
        goldSymbolPartsSoftcap: new Decimal(10000),
        goldSymbolPartsSoftcapEffect: new Decimal(0),
        jadeSymbolPartsSoftcap: new Decimal(10000),
        jadeSymbolPartsSoftcapEffect: new Decimal(0),
        celesteSymbolPartsSoftcap: new Decimal(10000),
        celesteSymbolPartsSoftcapEffect: new Decimal(0),
        cobaltSymbolPartsSoftcap: new Decimal(10000),
        cobaltSymbolPartsSoftcapEffect: new Decimal(0),
        amethystSymbolPartsSoftcap: new Decimal(10000),
        amethystSymbolPartsSoftcapEffect: new Decimal(0),

        // anti-autoclick cheese
        canBuyCrimSys: false,
        canBuyGoldSys: false,
        canBuyJadeSys: false,
        canBuyCeleSys: false,
        canBuyCobaSys: false,
        canBuyAmetSys: false,

        // 1st order symbols // LATER
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

        // Symbol Parts generation
        if(hasUpgrade("ssp", 101)) {
            // softcap start
            let softcapStart = 10000

            // put softcap modifiers in this section
            
            // actual generation
            player.tlb.crimsonSymbolParts = player.tlb.crimsonSymbolParts.add(onepersec.mul(delta).mul(player.tlb.crimsonSymbolPartsGain))
            player.tlb.crimsonSymbolPartsGain = player.tlb.crimsonSymbolsGain.add(Decimal.log10(player.cof.coreFragments[4].add(1)))
            if(player.tlb.crimsonSymbolParts >= softcapStart) {
                player.tlb.crimsonSymbolPartsSoftcapEffect = player.tlb.crimsonSymbolParts.div(player.tlb.crimsonSymbolPartsSoftcap).sub(1).div(0.05)
                player.tlb.crimsonSymbolPartsGain = player.tlb.crimsonSymbolsGain.add(Decimal.log10(player.cof.coreFragments[4].add(1))).sub(player.tlb.crimsonSymbolPartsSoftcapEffect)
                if(player.tlb.crimsonSymbolPartsGain <= 0) {
                    player.tlb.crimsonSymbolPartsGain = new Decimal(0)
                }
            }

            player.tlb.goldSymbolParts = player.tlb.goldSymbolParts.add(onepersec.mul(delta).mul(player.tlb.goldSymbolPartsGain))
            player.tlb.goldSymbolPartsGain = player.tlb.goldSymbolsGain.add(Decimal.log10(player.cof.coreFragments[2].add(1)))
            if(player.tlb.goldSymbolParts >= softcapStart) {
                player.tlb.goldSymbolPartsSoftcapEffect = player.tlb.goldSymbolParts.div(player.tlb.goldSymbolPartsSoftcap).sub(1).div(0.05)
                player.tlb.goldSymbolPartsGain = player.tlb.goldSymbolsGain.add(Decimal.log10(player.cof.coreFragments[2].add(1))).sub(player.tlb.goldSymbolPartsSoftcapEffect)
                if(player.tlb.goldSymbolPartsGain <= 0) {
                    player.tlb.goldSymbolPartsGain = new Decimal(0)
                }
            }

            player.tlb.jadeSymbolParts = player.tlb.jadeSymbolParts.add(onepersec.mul(delta).mul(player.tlb.jadeSymbolPartsGain))
            player.tlb.jadeSymbolPartsGain = player.tlb.jadeSymbolsGain.add(Decimal.log10(player.cof.coreFragments[1].add(1)))
            if(player.tlb.jadeSymbolParts >= softcapStart) {
                player.tlb.jadeSymbolPartsSoftcapEffect = player.tlb.jadeSymbolParts.div(player.tlb.jadeSymbolPartsSoftcap).sub(1).div(0.05)
                player.tlb.jadeSymbolPartsGain = player.tlb.jadeSymbolsGain.add(Decimal.log10(player.cof.coreFragments[1].add(1))).sub(player.tlb.jadeSymbolPartsSoftcapEffect)
                if(player.tlb.jadeSymbolPartsGain <= 0) {
                    player.tlb.jadeSymbolPartsGain = new Decimal(0)
                }
            }

            player.tlb.celesteSymbolParts = player.tlb.celesteSymbolParts.add(onepersec.mul(delta).mul(player.tlb.celesteSymbolPartsGain))
            player.tlb.celesteSymbolPartsGain = player.tlb.celesteSymbolsGain.add(Decimal.log10(player.cof.coreFragments[0].add(1)))
            if(player.tlb.celesteSymbolParts >= softcapStart) {
                player.tlb.celesteSymbolPartsSoftcapEffect = player.tlb.celesteSymbolParts.div(player.tlb.celesteSymbolPartsSoftcap).sub(1).div(0.05)
                player.tlb.celesteSymbolPartsGain = player.tlb.celesteSymbolsGain.add(Decimal.log10(player.cof.coreFragments[0].add(1))).sub(player.tlb.celesteSymbolPartsSoftcapEffect)
                if(player.tlb.celesteSymbolPartsGain <= 0) {
                    player.tlb.celesteSymbolPartsGain = new Decimal(0)
                }
            }

            player.tlb.cobaltSymbolParts = player.tlb.cobaltSymbolParts.add(onepersec.mul(delta).mul(player.tlb.cobaltSymbolPartsGain))
            player.tlb.cobaltSymbolPartsGain = player.tlb.cobaltSymbolsGain.add(Decimal.log10(player.cof.coreFragments[3].add(1)))
            if(player.tlb.cobaltSymbolParts >= softcapStart) {
                player.tlb.cobaltSymbolPartsSoftcapEffect = player.tlb.cobaltSymbolParts.div(player.tlb.cobaltSymbolPartsSoftcap).sub(1).div(0.05)
                player.tlb.cobaltSymbolPartsGain = player.tlb.cobaltSymbolsGain.add(Decimal.log10(player.cof.coreFragments[3].add(1))).sub(player.tlb.cobaltSymbolPartsSoftcapEffect)
                if(player.tlb.cobaltSymbolPartsGain <= 0) {
                    player.tlb.cobaltSymbolPartsGain = new Decimal(0)
                }
            }

            player.tlb.amethystSymbolParts = player.tlb.amethystSymbolParts.add(onepersec.mul(delta).mul(player.tlb.amethystSymbolPartsGain))
            player.tlb.amethystSymbolPartsGain = player.tlb.amethystSymbolsGain.add(Decimal.log10(player.cof.coreFragments[5].add(1)))
            if(player.tlb.amethystSymbolParts >= softcapStart) {
                player.tlb.amethystSymbolPartsSoftcapEffect = player.tlb.amethystSymbolParts.div(player.tlb.amethystSymbolPartsSoftcap).sub(1).div(0.05)
                player.tlb.amethystSymbolPartsGain = player.tlb.amethystSymbolsGain.add(Decimal.log10(player.cof.coreFragments[5].add(1))).sub(player.tlb.amethystSymbolPartsSoftcapEffect)
                if(player.tlb.amethystSymbolPartsGain <= 0) {
                    player.tlb.amethystSymbolPartsGain = new Decimal(0)
                }
            }

            // Start of first six symbol and their parts' modifiers
            if (hasUpgrade("tlb", 31)) {
                player.tlb.crimsonSymbolPartsGain = player.tlb.crimsonSymbolPartsGain.mul(upgradeEffect("tlb", 11).floor())
                player.tlb.goldSymbolPartsGain = player.tlb.goldSymbolPartsGain.mul(upgradeEffect("tlb", 11).floor())
                player.tlb.jadeSymbolPartsGain = player.tlb.jadeSymbolPartsGain.mul(upgradeEffect("tlb", 11).floor())
                player.tlb.celesteSymbolPartsGain = player.tlb.celesteSymbolPartsGain.mul(upgradeEffect("tlb", 11).floor())
                player.tlb.cobaltSymbolPartsGain = player.tlb.cobaltSymbolPartsGain.mul(upgradeEffect("tlb", 11).floor())
                player.tlb.amethystSymbolPartsGain = player.tlb.amethystSymbolPartsGain.mul(upgradeEffect("tlb", 11).floor())
            }
            if (hasUpgrade("tlb", 11)) {
                player.tlb.crimsonSymbolPartsGain = player.tlb.crimsonSymbolPartsGain.mul(upgradeEffect("tlb", 11).floor())
                player.tlb.goldSymbolPartsGain = player.tlb.goldSymbolPartsGain.mul(upgradeEffect("tlb", 11).floor())
                player.tlb.jadeSymbolPartsGain = player.tlb.jadeSymbolPartsGain.mul(upgradeEffect("tlb", 11).floor())
                player.tlb.celesteSymbolPartsGain = player.tlb.celesteSymbolPartsGain.mul(upgradeEffect("tlb", 11).floor())
                player.tlb.cobaltSymbolPartsGain = player.tlb.cobaltSymbolPartsGain.mul(upgradeEffect("tlb", 11).floor())
                player.tlb.amethystSymbolPartsGain = player.tlb.amethystSymbolPartsGain.mul(upgradeEffect("tlb", 11).floor())
            }

            // Secondary Tome Point generation
            // force
            if(player.tlb.tomesForce >= 1) {
                player.tlb.currentPointsForceGainTime = player.tlb.currentPointsForceGainTime.sub(onepersec.mul(delta))
                player.tlb.pointsForceGain = player.tlb.tomesForce
                player.tlb.revelationPointsGainForce = player.tlb.tomesForce
            }
            if(player.tlb.currentPointsForceGainTime <= 0) {
                player.tlb.currentPointsForceGainTime = player.tlb.stopTime
                player.tlb.gainBlockerForce = false
            }
            // insight
            if(player.tlb.tomesInsight >= 1) {
                player.tlb.currentPointsInsightGainTime = player.tlb.currentPointsInsightGainTime.sub(onepersec.mul(delta))
                player.tlb.pointsInsightGain = player.tlb.tomesInsight
                player.tlb.revelationPointsGainInsight = player.tlb.tomesInsight
            }
            if(player.tlb.currentPointsInsightGainTime <= 0) {
                player.tlb.currentPointsInsightGainTime = player.tlb.stopTime
                player.tlb.gainBlockerInsight = false
            }
            // merit
            if(player.tlb.tomesMerit >= 1) {
                player.tlb.currentPointsMeritGainTime = player.tlb.currentPointsMeritGainTime.sub(onepersec.mul(delta))
                player.tlb.pointsMeritGain = player.tlb.tomesMerit
                player.tlb.revelationPointsGainMerit = player.tlb.tomesMerit
            }
            if(player.tlb.currentPointsMeritGainTime <= 0) {
                player.tlb.currentPointsMeritGainTime = player.tlb.stopTime
                player.tlb.gainBlockerMerit = false
            }

            // Start of first three tome types and their point forms' modifiers
            if(hasUpgrade("tlb", 14)) player.tlb.pointsForceGain = player.tlb.pointsForceGain.mul(upgradeEffect("tlb", 14))
            if(hasUpgrade("tlb", 14)) player.tlb.pointsInsightGain = player.tlb.pointsInsightGain.mul(upgradeEffect("tlb", 24))
            if(hasUpgrade("tlb", 34)) player.tlb.pointsMeritGain = player.tlb.pointsMeritGain.mul(upgradeEffect("tlb", 34))
            if(hasUpgrade("tlb", 21)) {
                player.tlb.revelationPointsGainForce = player.tlb.revelationPointsGainForce.mul(upgradeEffect("tlb", 21))
                player.tlb.revelationPointsGainInsight = player.tlb.revelationPointsGainInsight.mul(upgradeEffect("tlb", 21))
                player.tlb.revelationPointsGainMerit = player.tlb.revelationPointsGainMerit.mul(upgradeEffect("tlb", 21))
            }
            if(hasUpgrade("tlb", 22)) {
                player.tlb.pointsForceGain = player.tlb.pointsForceGain.mul(upgradeEffect("tlb", 22))
                player.tlb.pointsInsightGain = player.tlb.pointsInsightGain.mul(upgradeEffect("tlb", 22))
                player.tlb.pointsMeritGain = player.tlb.pointsMeritGain.mul(upgradeEffect("tlb", 22))
            }

            // anti-cheese fixes
            let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
            let secondReqCr = (player.tlb.baseCostsCrimsonSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
            let secondReqGl = (player.tlb.baseCostsGoldSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
            let secondReqGd = (player.tlb.baseCostsJadeSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
            let secondReqCe = (player.tlb.baseCostsCelesteSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
            let secondReqCo = (player.tlb.baseCostsCobaltSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
            let secondReqAm = (player.tlb.baseCostsAmethystSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()

            if(hasUpgrade("tlb", 12)) {
                if(player.tlb.crimsonSymbolParts.gte(secondReqCr) && player.ssp.alchemicalSymbols.gte(firstReq)) player.tlb.canBuyCrimSys = true
                if(player.tlb.goldSymbolParts.gte(secondReqGl) && player.ssp.alchemicalSymbols.gte(firstReq)) player.tlb.canBuyGoldSys = true
                if(player.tlb.jadeSymbolParts.gte(secondReqGd) && player.ssp.alchemicalSymbols.gte(firstReq)) player.tlb.canBuyJadeSys = true
                if(player.tlb.celesteSymbolParts.gte(secondReqCe) && player.ssp.alchemicalSymbols.gte(firstReq)) player.tlb.canBuyCeleSys = true
                if(player.tlb.cobaltSymbolParts.gte(secondReqCo) && player.ssp.alchemicalSymbols.gte(firstReq)) player.tlb.canBuyCobaSys = true
                if(player.tlb.amethystSymbolParts.gte(secondReqAm) && player.ssp.alchemicalSymbols.gte(firstReq)) player.tlb.canBuyAmetSys = true
            }
            else {
                if(player.tlb.crimsonSymbolParts.gte(player.tlb.baseCostsCrimsonSymbols) && player.ssp.alchemicalSymbols.gte(player.tlb.baseCostsAlchemicalSymbols)) player.tlb.canBuyCrimSys = true
                if(player.tlb.goldSymbolParts.gte(player.tlb.baseCostsGoldSymbols) && player.ssp.alchemicalSymbols.gte(player.tlb.baseCostsAlchemicalSymbols)) player.tlb.canBuyGoldSys = true
                if(player.tlb.jadeSymbolParts.gte(player.tlb.baseCostsJadeSymbols) && player.ssp.alchemicalSymbols.gte(player.tlb.baseCostsAlchemicalSymbols)) player.tlb.canBuyJadeSys = true
                if(player.tlb.celesteSymbolParts.gte(player.tlb.baseCostsCelesteSymbols) && player.ssp.alchemicalSymbols.gte(player.tlb.baseCostsAlchemicalSymbols)) player.tlb.canBuyCeleSys = true
                if(player.tlb.cobaltSymbolParts.gte(player.tlb.baseCostsCobaltSymbols) && player.ssp.alchemicalSymbols.gte(player.tlb.baseCostsAlchemicalSymbols)) player.tlb.canBuyCobaSys = true
                if(player.tlb.amethystSymbolParts.gte(player.tlb.baseCostsAmethystSymbols) && player.ssp.alchemicalSymbols.gte(player.tlb.baseCostsAlchemicalSymbols)) player.tlb.canBuyAmetSys = true

            }
        }
    },
    nodeStyle: {
        backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)",
        backgroundOrigin: "border-box",
        borderColor: "transparent",
        color: "#ffffff",
        'text-shadow' : "0 0 5px #ffffffab, 0 0 10px #000000, 0 0 10px #000000",
        textStroke: "1px #00000033",
        borderImage: "radial-gradient(circle, #000000 70%, #ffffff) 1",
        boxShadow: "0 0 3px 1px #000000 inset",
        borderRadius: "0px"
    },
    tooltip: "Tome Library",
    color: "#ababab",
    branches: ["ssp"],
    clickables: {
        buyMaxOff1: {
            title() {return player.tlb.buyMaxSymbols == false ? "Buy Max<br>OFF [ACTIVE]" : "Buy Max<br>OFF"},
            canClick() {return player.tlb.buyMaxSymbols == true},
            unlocked() {return true},
            onClick() { 
                player.tlb.buyMaxSymbols = false
            },
            style() {
                let look = {width: '100px', minHeight: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
                    if (this.canClick()) {
                        look.backgroundImage = "linear-gradient(to bottom, #555555,  #555555)"
                        look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                        look.color = "#000000";
                        look.boxShadow = "0 0 3px 1px #000000 inset"
                    } else {
                        look.backgroundImage = "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)"
                        look.borderImage = "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1"
                        look.color = "#000000"
                        look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 10px 1px #ffffff"
                    }
                return look
            }
        },
        buyMaxOn1: {
            title() {return player.tlb.buyMaxSymbols == true ? "Buy Max<br>ON [ACTIVE]" : "Buy Max<br>ON"},
            canClick() {return player.tlb.buyMaxSymbols == false},
            unlocked() {return true},
            onClick() { 
                player.tlb.buyMaxSymbols = true
            },
            style() {
                let look = {width: '100px', minHeight: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
                    if (this.canClick()) {
                        look.backgroundImage = "linear-gradient(to bottom, #555555,  #555555)"
                        look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                        look.color = "#000000";
                        look.boxShadow = "0 0 3px 1px #000000 inset"
                    } else {
                        look.backgroundImage = "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)"
                        look.borderImage = "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1"
                        look.color = "#000000"
                        look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 10px 1px #ffffff"
                    }
                return look
            }
        },
        buyMaxOff2: {
            title() {return player.tlb.buyMaxTomes == false ? "Buy Max<br>OFF [ACTIVE]" : "Buy Max<br>OFF"},
            canClick() {return player.tlb.buyMaxTomes == true},
            unlocked() {return hasUpgrade("tlb", 33)},
            onClick() { 
                player.tlb.buyMaxTomes = false
            },
            style() {
                let look = {width: '100px', minHeight: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
                    if (this.canClick()) {
                        look.backgroundImage = "linear-gradient(to bottom, #555555,  #555555)"
                        look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                        look.color = "#000000";
                        look.boxShadow = "0 0 3px 1px #000000 inset"
                    } else {
                        look.backgroundImage = "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)"
                        look.borderImage = "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1"
                        look.color = "#000000"
                        look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 10px 1px #ffffff"
                    }
                return look
            }
        },
        buyMaxOn2: {
            title() {return player.tlb.buyMaxTomes == true ? "Buy Max<br>ON [ACTIVE]" : "Buy Max<br>ON"},
            canClick() {return player.tlb.buyMaxTomes == false},
            unlocked() {return hasUpgrade("tlb", 33)},
            onClick() { 
                player.tlb.buyMaxTomes = true
            },
            style() {
                let look = {width: '100px', minHeight: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
                    if (this.canClick()) {
                        look.backgroundImage = "linear-gradient(to bottom, #555555,  #555555)"
                        look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                        look.color = "#000000";
                        look.boxShadow = "0 0 3px 1px #000000 inset"
                    } else {
                        look.backgroundImage = "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)"
                        look.borderImage = "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1"
                        look.color = "#000000"
                        look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 10px 1px #ffffff"
                    }
                return look
            }
        },
        encoder1: {
            title() {return "<h2>Symbol Encoder I</h2><hr>Encode <h2>" + formatWhole(player.ssp.alchemicalSymbolsGain) + "</h2><br>🝪 Al.Sys 🝪.<br><br><small>(Req.: e10,000,000 Cel.Pts.)</small>"},
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
        crimsonAlter: {
            title() {
                let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                let val2 = player.tlb.crimsonSymbolParts.div(player.tlb.baseCostsCrimsonSymbols).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsCrimsonSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                let secondReqTotal = player.tlb.crimsonSymbolParts.div(secondReq).floor()
                let result2 = secondReqTotal
                if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal
                
                if (player.tlb.buyMaxSymbols == true) {
                    if(hasUpgrade("tlb", 12))
                        return "Create <h3>" + formatShortWhole(player.tlb.crimsonSymbolsGain.add(result2)) + "</h3><br>Crimson Symbols."
                    else
                        return "Create <h3>" + formatShortWhole(player.tlb.crimsonSymbolsGain.add(result)) + "</h3><br>Crimson Symbols."
                }
                else
                    return "Create <h3>1</h3><br>Crimson Symbol."
            },
            canClick() {
                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsCrimsonSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()

                if(hasUpgrade("tlb", 12)) {
                    return player.tlb.canBuyCrimSys == true && player.tlb.crimsonSymbolParts.gte(secondReq) && player.ssp.alchemicalSymbols.gte(firstReq)
                }
                else {
                    return player.tlb.canBuyCrimSys == true && player.tlb.crimsonSymbolParts.gte(player.tlb.baseCostsCrimsonSymbols) && player.ssp.alchemicalSymbols.gte(player.tlb.baseCostsAlchemicalSymbols)
                }
            },
            unlocked() {return true},
            onClick() { 
                let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                let val2 = player.tlb.crimsonSymbolParts.div(player.tlb.baseCostsCrimsonSymbols).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsCrimsonSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                let secondReqTotal = player.tlb.crimsonSymbolParts.div(secondReq).floor()
                let result2 = secondReqTotal
                if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                player.tlb.canBuyCrimSys = false

                if (player.tlb.buyMaxSymbols == false) {
                    player.tlb.crimsonSymbols = player.tlb.crimsonSymbols.add(1)
                    if(hasUpgrade("tlb", 12)) {
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(firstReq)
                        player.tlb.crimsonSymbolParts = player.tlb.crimsonSymbolParts.sub(secondReq)
                    }
                    else {
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(player.tlb.baseCostsAlchemicalSymbols)
                        player.tlb.crimsonSymbolParts = player.tlb.crimsonSymbolParts.sub(player.tlb.baseCostsCrimsonSymbols)
                    }
                } 
                else if (player.tlb.buyMaxSymbols == true) {
                    if(hasUpgrade("tlb", 12)) {
                        player.tlb.crimsonSymbols = player.tlb.crimsonSymbols.add(result2)
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(firstReq.mul(result2))
                        player.tlb.crimsonSymbolParts = player.tlb.crimsonSymbolParts.sub(secondReq.mul(result2))
                    }
                    else {
                        player.tlb.crimsonSymbols = player.tlb.crimsonSymbols.add(result)
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(Decimal.mul(player.tlb.baseCostsAlchemicalSymbols, result))
                        player.tlb.crimsonSymbolParts = player.tlb.crimsonSymbolParts.sub(Decimal.mul(player.tlb.baseCostsCrimsonSymbols, result))
                    }
                }
            },
            style() {
            let look = {width: '300px', minHeight: '80px', border: "3px solid rgba(0,0,0,0.3)", fontSize: "18px", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundImage = "radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #330000), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #550000ab 9%, #550000ab 10%, #55000067 10%, #55000067 19%, #550000ab 19%, #550000ab 20%, transparent 20%, transparent 29%, #aa5555ab 29%, #aa5555ab 30%, #aa555567 30%, #aa555567 39%, #aa5555ab 39%, #aa5555ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #550000ab 9%, #550000ab 10%, #55000067 10%, #55000067 19%, #550000ab 19%, #550000ab 20%, transparent 20%, transparent 29%, #aa5555ab 29%, #aa5555ab 30%, #aa555567 30%, #aa555567 39%, #aa5555ab 39%, #aa5555ab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #ff7777, #ff0000, #ff007f, #7f003f)"
                look.borderImage = "radial-gradient(ellipse, #550000 70%, #ff0000) 1"
                look.color = "#770000"
                look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 10px #ff0000"
                look.textShadow = "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000"
                look.textStroke = "1px #ffddddab"
            } else {
                look.backgroundImage = "linear-gradient(0deg, #00000078, #00000078), radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #330000), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #550000ab 9%, #550000ab 10%, #55000067 10%, #55000067 19%, #550000ab 19%, #550000ab 20%, transparent 20%, transparent 29%, #aa5555ab 29%, #aa5555ab 30%, #aa555567 30%, #aa555567 39%, #aa5555ab 39%, #aa5555ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #550000ab 9%, #550000ab 10%, #55000067 10%, #55000067 19%, #550000ab 19%, #550000ab 20%, transparent 20%, transparent 29%, #aa5555ab 29%, #aa5555ab 30%, #aa555567 30%, #aa555567 39%, #aa5555ab 39%, #aa5555ab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #ff7777, #ff0000, #ff007f, #7f003f)"
                look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                look.color = "#000000"
                look.boxShadow = "0 0 3px 1px #000000 inset"
            }
            return look
            }
        },
        goldAlter: {
            title() {
                let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                let val2 = player.tlb.goldSymbolParts.div(player.tlb.baseCostsGoldSymbols).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsGoldSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                let secondReqTotal = player.tlb.goldSymbolParts.div(secondReq).floor()
                let result2 = secondReqTotal
                if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal
                
                if (player.tlb.buyMaxSymbols == true) {
                    if(hasUpgrade("tlb", 12))
                        return "Create <h3>" + formatShortWhole(player.tlb.goldSymbolsGain.add(result2)) + "</h3><br>Gold Symbols."
                    else
                        return "Create <h3>" + formatShortWhole(player.tlb.goldSymbolsGain.add(result)) + "</h3><br>Gold Symbols."
                }
                else
                    return "Create <h3>1</h3><br>Gold Symbol."
            },
            canClick() {
                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsGoldSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()

                if(hasUpgrade("tlb", 12)) {
                    return player.tlb.canBuyGoldSys == true && player.tlb.goldSymbolParts.gte(secondReq) && player.ssp.alchemicalSymbols.gte(firstReq)
                }
                else {
                    return player.tlb.canBuyGoldSys == true && player.tlb.goldSymbolParts.gte(player.tlb.baseCostsGoldSymbols) && player.ssp.alchemicalSymbols.gte(player.tlb.baseCostsAlchemicalSymbols)
                }
            },
            unlocked() {return true},
            onClick() { 
                let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                let val2 = player.tlb.goldSymbolParts.div(player.tlb.baseCostsGoldSymbols).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsGoldSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                let secondReqTotal = player.tlb.goldSymbolParts.div(secondReq).floor()
                let result2 = secondReqTotal
                if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                player.tlb.canBuyGoldSys = false

                if (player.tlb.buyMaxSymbols == false) {
                    player.tlb.goldSymbols = player.tlb.goldSymbols.add(1)
                    if(hasUpgrade("tlb", 12)) {
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(firstReq)
                        player.tlb.goldSymbolParts = player.tlb.goldSymbolParts.sub(secondReq)
                    }
                    else {
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(player.tlb.baseCostsAlchemicalSymbols)
                        player.tlb.goldSymbolParts = player.tlb.goldSymbolParts.sub(player.tlb.baseCostsGoldSymbols)
                    }
                } 
                else if (player.tlb.buyMaxSymbols == true) {
                    if(hasUpgrade("tlb", 12)) {
                        player.tlb.goldSymbols = player.tlb.goldSymbols.add(result2)
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(firstReq.mul(result2))
                        player.tlb.goldSymbolParts = player.tlb.goldSymbolParts.sub(secondReq.mul(result2))
                    }
                    else {
                        player.tlb.goldSymbols = player.tlb.goldSymbols.add(result)
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(Decimal.mul(player.tlb.baseCostsAlchemicalSymbols, result))
                        player.tlb.goldSymbolParts = player.tlb.goldSymbolParts.sub(Decimal.mul(player.tlb.baseCostsGoldSymbols, result))
                    }
                }
            },
            style() {
            let look = {width: '300px', minHeight: '80px', border: "3px solid rgba(0,0,0,0.3)", fontSize: "18px", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundImage = "radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #333300), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #555500ab 9%, #555500ab 10%, #55550067 10%, #55550067 19%, #555500ab 19%, #555500ab 20%, transparent 20%, transparent 29%, #aaaa55ab 29%, #aaaa55ab 30%, #aaaa5567 30%, #aaaa5567 39%, #aaaa55ab 39%, #aaaa55ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #555500ab 9%, #555500ab 10%, #55550067 10%, #55550067 19%, #555500ab 19%, #555500ab 20%, transparent 20%, transparent 29%, #aaaa55ab 29%, #aaaa55ab 30%, #aaaa5567 30%, #aaaa5567 39%, #aaaa55ab 39%, #aaaa55ab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #ffff77, #ffff00, #ff7f00, #7f3f00)"
                look.borderImage = "radial-gradient(ellipse, #555500 70%, #ffff00) 1"
                look.color = "#777700"
                look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 10px #ffff00"
                look.textShadow = "0 0 5px #ffff00, 0 0 10px #000000, 0 0 10px #000000"
                look.textStroke = "1px #ffffddab"
            } else {
                look.backgroundImage = "linear-gradient(0deg, #00000078, #00000078), radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #333300), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #555500ab 9%, #555500ab 10%, #55550067 10%, #55550067 19%, #555500ab 19%, #555500ab 20%, transparent 20%, transparent 29%, #aaaa55ab 29%, #aaaa55ab 30%, #aaaa5567 30%, #aaaa5567 39%, #aaaa55ab 39%, #aaaa55ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #555500ab 9%, #555500ab 10%, #55550067 10%, #55550067 19%, #555500ab 19%, #555500ab 20%, transparent 20%, transparent 29%, #aaaa55ab 29%, #aaaa55ab 30%, #aaaa5567 30%, #aaaa5567 39%, #aaaa55ab 39%, #aaaa55ab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #ffff77, #ffff00, #ff7f00, #7f3f00)"
                look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                look.color = "#000000"
                look.boxShadow = "0 0 3px 1px #000000 inset"
            }
            return look
            }
        },
        jadeAlter: {
            title() {
                let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                let val2 = player.tlb.jadeSymbolParts.div(player.tlb.baseCostsJadeSymbols).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsJadeSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                let secondReqTotal = player.tlb.jadeSymbolParts.div(secondReq).floor()
                let result2 = secondReqTotal
                if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal
                
                if(player.tlb.buyMaxSymbols == true) {
                    if(hasUpgrade("tlb", 12))
                        return "Create <h3>" + formatShortWhole(player.tlb.jadeSymbolsGain.add(result2)) + "</h3><br>Jade Symbols."
                    else
                        return "Create <h3>" + formatShortWhole(player.tlb.jadeSymbolsGain.add(result)) + "</h3><br>Jade Symbols."
                }
                else
                    return "Create <h3>1</h3><br>Jade Symbol."
            },
            canClick() {
                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsJadeSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()

                if(hasUpgrade("tlb", 12)) {
                    return player.tlb.canBuyJadeSys == true && player.tlb.jadeSymbolParts.gte(secondReq) && player.ssp.alchemicalSymbols.gte(firstReq)
                }
                else {
                    return player.tlb.canBuyJadeSys == true && player.tlb.jadeSymbolParts.gte(player.tlb.baseCostsJadeSymbols) && player.ssp.alchemicalSymbols.gte(player.tlb.baseCostsAlchemicalSymbols)
                }
            },
            unlocked() {return true},
            onClick() { 
                let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                let val2 = player.tlb.jadeSymbolParts.div(player.tlb.baseCostsJadeSymbols).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsJadeSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                let secondReqTotal = player.tlb.jadeSymbolParts.div(secondReq).floor()
                let result2 = secondReqTotal
                if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                player.tlb.canBuyJadeSys = false

                if(player.tlb.buyMaxSymbols == false) {
                    player.tlb.jadeSymbols = player.tlb.jadeSymbols.add(1)
                    if(hasUpgrade("tlb", 12)) {
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(firstReq)
                        player.tlb.jadeSymbolParts = player.tlb.jadeSymbolParts.sub(secondReq)
                    }
                    else {
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(player.tlb.baseCostsAlchemicalSymbols)
                        player.tlb.jadeSymbolParts = player.tlb.jadeSymbolParts.sub(player.tlb.baseCostsJadeSymbols)
                    }
                } 
                else if (player.tlb.buyMaxSymbols == true) {
                    if(hasUpgrade("tlb", 12)) {
                        player.tlb.jadeSymbols = player.tlb.jadeSymbols.add(result2)
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(firstReq.mul(result2))
                        player.tlb.jadeSymbolParts = player.tlb.jadeSymbolParts.sub(secondReq.mul(result2))
                    }
                    else {
                        player.tlb.jadeSymbols = player.tlb.jadeSymbols.add(result)
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(Decimal.mul(player.tlb.baseCostsAlchemicalSymbols, result))
                        player.tlb.jadeSymbolParts = player.tlb.jadeSymbolParts.sub(Decimal.mul(player.tlb.baseCostsJadeSymbols, result))
                    }
                }
            },
            style() {
            let look = {width: '300px', minHeight: '80px', border: "3px solid rgba(0,0,0,0.3)", fontSize: "18px", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundImage = "radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #003300), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #005500ab 9%, #005500ab 10%, #00550067 10%, #00550067 19%, #005500ab 19%, #005500ab 20%, transparent 20%, transparent 29%, #55aa55ab 29%, #55aa55ab 30%, #55aa5567 30%, #55aa5567 39%, #55aa55ab 39%, #55aa55ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #005500ab 9%, #005500ab 10%, #00550067 10%, #00550067 19%, #005500ab 19%, #005500ab 20%, transparent 20%, transparent 29%, #55aa55ab 29%, #55aa55ab 30%, #55aa5567 30%, #55aa5567 39%, #55aa55ab 39%, #55aa55ab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #77ff77, #00ff00, #7fff00, #3f7f00)"
                look.borderImage = "radial-gradient(ellipse, #005500 70%, #00ff00) 1"
                look.color = "#007700"
                look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 10px #00ff00"
                look.textShadow = "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000"
                look.textStroke = "1px #ddffddab"
            } else {
                look.backgroundImage = "linear-gradient(0deg, #00000078, #00000078), radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #003300), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #005500ab 9%, #005500ab 10%, #00550067 10%, #00550067 19%, #005500ab 19%, #005500ab 20%, transparent 20%, transparent 29%, #55aa55ab 29%, #55aa55ab 30%, #55aa5567 30%, #55aa5567 39%, #55aa55ab 39%, #55aa55ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #005500ab 9%, #005500ab 10%, #00550067 10%, #00550067 19%, #005500ab 19%, #005500ab 20%, transparent 20%, transparent 29%, #55aa55ab 29%, #55aa55ab 30%, #55aa5567 30%, #55aa5567 39%, #55aa55ab 39%, #55aa55ab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #77ff77, #00ff00, #7fff00, #3f7f00)"
                look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                look.color = "#000000"
                look.boxShadow = "0 0 3px 1px #000000 inset"
            }
            return look
            }
        },
        celesteAlter: {
            title() {
                let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                let val2 = player.tlb.celesteSymbolParts.div(player.tlb.baseCostsCelesteSymbols).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsCelesteSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                let secondReqTotal = player.tlb.celesteSymbolParts.div(secondReq).floor()
                let result2 = secondReqTotal
                if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal
                
                if(player.tlb.buyMaxSymbols == true) {
                    if(hasUpgrade("tlb", 12))
                        return "Create <h3>" + formatShortWhole(player.tlb.celesteSymbolsGain.add(result2)) + "</h3><br>Celeste Symbols."
                    else
                        return "Create <h3>" + formatShortWhole(player.tlb.celesteSymbolsGain.add(result)) + "</h3><br>Celeste Symbols."
                }
                else
                    return "Create <h3>1</h3><br>Celeste Symbol."
            },
            canClick() {
                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsCelesteSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()

                if(hasUpgrade("tlb", 12)) {
                    return player.tlb.canBuyCeleSys == true && player.tlb.celesteSymbolParts.gte(secondReq) && player.ssp.alchemicalSymbols.gte(firstReq)
                }
                else {
                    return player.tlb.canBuyCeleSys == true && player.tlb.celesteSymbolParts.gte(player.tlb.baseCostsCelesteSymbols) && player.ssp.alchemicalSymbols.gte(player.tlb.baseCostsAlchemicalSymbols)
                }
            },
            unlocked() {return true},
            onClick() { 
                let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                let val2 = player.tlb.celesteSymbolParts.div(player.tlb.baseCostsCelesteSymbols).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsCelesteSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                let secondReqTotal = player.tlb.celesteSymbolParts.div(secondReq).floor()
                let result2 = secondReqTotal
                if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                player.tlb.canBuyCeleSys = false

                if(player.tlb.buyMaxSymbols == false) {
                    player.tlb.celesteSymbols = player.tlb.celesteSymbols.add(1)
                    if(hasUpgrade("tlb", 12)) {
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(firstReq)
                        player.tlb.celesteSymbolParts = player.tlb.celesteSymbolParts.sub(secondReq)
                    }
                    else {
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(player.tlb.baseCostsAlchemicalSymbols)
                        player.tlb.celesteSymbolParts = player.tlb.celesteSymbolParts.sub(player.tlb.baseCostsCelesteSymbols)
                    }
                } 
                else if (player.tlb.buyMaxSymbols == true) {
                    if(hasUpgrade("tlb", 12)) {
                        player.tlb.celesteSymbols = player.tlb.celesteSymbols.add(result2)
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(firstReq.mul(result2))
                        player.tlb.celesteSymbolParts = player.tlb.celesteSymbolParts.sub(secondReq.mul(result2))
                    }
                    else {
                        player.tlb.celesteSymbols = player.tlb.celesteSymbols.add(result)
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(Decimal.mul(player.tlb.baseCostsAlchemicalSymbols, result))
                        player.tlb.celesteSymbolParts = player.tlb.celesteSymbolParts.sub(Decimal.mul(player.tlb.baseCostsCelesteSymbols, result))
                    }
                }
            },
            style() {
            let look = {width: '300px', minHeight: '80px', border: "3px solid rgba(0,0,0,0.3)", fontSize: "18px", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundImage = "radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #003333), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #005555ab 9%, #005555ab 10%, #00555567 10%, #00555567 19%, #005555ab 19%, #005555ab 20%, transparent 20%, transparent 29%, #55aaaaab 29%, #55aaaaab 30%, #55aaaa67 30%, #55aaaa67 39%, #55aaaaab 39%, #55aaaaab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #005555ab 9%, #005555ab 10%, #00555567 10%, #00555567 19%, #005555ab 19%, #005555ab 20%, transparent 20%, transparent 29%, #55aaaaab 29%, #55aaaaab 30%, #55aaaa67 30%, #55aaaa67 39%, #55aaaaab 39%, #55aaaaab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #77ffff, #00ffff, #00ff7f, #007f3f)"
                look.borderImage = "radial-gradient(ellipse, #005555 70%, #00ffff) 1"
                look.color = "#007777"
                look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 10px #00ffff"
                look.textShadow = "0 0 5px #00ffff, 0 0 10px #000000, 0 0 10px #000000"
                look.textStroke = "1px #ddffffab"
            } else {
                look.backgroundImage = "linear-gradient(0deg, #00000078, #00000078), radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #003333), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #005555ab 9%, #005555ab 10%, #00555567 10%, #00555567 19%, #005555ab 19%, #005555ab 20%, transparent 20%, transparent 29%, #55aaaaab 29%, #55aaaaab 30%, #55aaaa67 30%, #55aaaa67 39%, #55aaaaab 39%, #55aaaaab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #005555ab 9%, #005555ab 10%, #00555567 10%, #00555567 19%, #005555ab 19%, #005555ab 20%, transparent 20%, transparent 29%, #55aaaaab 29%, #55aaaaab 30%, #55aaaa67 30%, #55aaaa67 39%, #55aaaaab 39%, #55aaaaab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #77ffff, #00ffff, #00ff7f, #007f3f)"
                look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                look.color = "#000000"
                look.boxShadow = "0 0 3px 1px #000000 inset"
            }
            return look
            }
        },
        cobaltAlter: {
            title() {
                let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                let val2 = player.tlb.cobaltSymbolParts.div(1000).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsCobaltSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                let secondReqTotal = player.tlb.cobaltSymbolParts.div(secondReq).floor()
                let result2 = secondReqTotal
                if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal
                
                if (player.tlb.buyMaxSymbols == true) {
                    if(hasUpgrade("tlb", 12))
                        return "Create <h3>" + formatShortWhole(player.tlb.cobaltSymbolsGain.add(result2)) + "</h3><br>Cobalt Symbols."
                    else
                        return "Create <h3>" + formatShortWhole(player.tlb.cobaltSymbolsGain.add(result)) + "</h3><br>Cobalt Symbols."
                }
                else
                    return "Create <h3>1</h3><br>Cobalt Symbol."
            },
            canClick() {
                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsCobaltSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()

                if(hasUpgrade("tlb", 12)) {
                    return player.tlb.canBuyCobaSys == true && player.tlb.cobaltSymbolParts.gte(secondReq) && player.ssp.alchemicalSymbols.gte(firstReq)
                }
                else {
                    return player.tlb.canBuyCobaSys == true && player.tlb.cobaltSymbolParts.gte(player.tlb.baseCostsCobaltSymbols) && player.ssp.alchemicalSymbols.gte(player.tlb.baseCostsAlchemicalSymbols)
                }
            },
            unlocked() {return true},
            onClick() { 
                let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                let val2 = player.tlb.cobaltSymbolParts.div(player.tlb.baseCostsCobaltSymbols).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsCobaltSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                let secondReqTotal = player.tlb.cobaltSymbolParts.div(secondReq).floor()
                let result2 = secondReqTotal
                if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                player.tlb.canBuyCobaSys = false

                if (player.tlb.buyMaxSymbols == false) {
                    player.tlb.cobaltSymbols = player.tlb.cobaltSymbols.add(1)
                    if(hasUpgrade("tlb", 12)) {
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(firstReq)
                        player.tlb.cobaltSymbolParts = player.tlb.cobaltSymbolParts.sub(secondReq)
                    }
                    else {
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(player.tlb.baseCostsAlchemicalSymbols)
                        player.tlb.cobaltSymbolParts = player.tlb.cobaltSymbolParts.sub(player.tlb.baseCostsCobaltSymbols)
                    }
                } 
                else if (player.tlb.buyMaxSymbols == true) {
                    if(hasUpgrade("tlb", 12)) {
                        player.tlb.cobaltSymbols = player.tlb.cobaltSymbols.add(result2)
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(firstReq.mul(result2))
                        player.tlb.cobaltSymbolParts = player.tlb.cobaltSymbolParts.sub(secondReq.mul(result2))
                    }
                    else {
                        player.tlb.cobaltSymbols = player.tlb.cobaltSymbols.add(result)
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(Decimal.mul(player.tlb.baseCostsAlchemicalSymbols, result))
                        player.tlb.cobaltSymbolParts = player.tlb.cobaltSymbolParts.sub(Decimal.mul(player.tlb.baseCostsCobaltSymbols, result))
                    }
                }
            },
            style() {
            let look = {width: '300px', minHeight: '80px', border: "3px solid rgba(0,0,0,0.3)", fontSize: "18px", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundImage = "radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #000033), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #000055ab 9%, #000055ab 10%, #00005567 10%, #00005567 19%, #000055ab 19%, #000055ab 20%, transparent 20%, transparent 29%, #5555aaab 29%, #5555aaab 30%, #5555aa67 30%, #5555aa67 39%, #5555aaab 39%, #5555aaab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #000055ab 9%, #000055ab 10%, #00005567 10%, #00005567 19%, #000055ab 19%, #000055ab 20%, transparent 20%, transparent 29%, #5555aaab 29%, #5555aaab 30%, #5555aa67 30%, #5555aa67 39%, #5555aaab 39%, #5555aaab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #7777ff, #0000ff, #007fff, #003f7f)"
                look.borderImage = "radial-gradient(ellipse, #000055 70%, #0000ff) 1"
                look.color = "#000077"
                look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 10px #0000ff"
                look.textShadow = "0 0 5px #0000ff, 0 0 10px #000000, 0 0 10px #000000"
                look.textStroke = "1px #ddddffab"
            } else {
                look.backgroundImage = "linear-gradient(0deg, #00000078, #00000078), radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #000033), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #000055ab 9%, #000055ab 10%, #00005567 10%, #00005567 19%, #000055ab 19%, #000055ab 20%, transparent 20%, transparent 29%, #5555aaab 29%, #5555aaab 30%, #5555aa67 30%, #5555aa67 39%, #5555aaab 39%, #5555aaab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #000055ab 9%, #000055ab 10%, #00005567 10%, #00005567 19%, #000055ab 19%, #000055ab 20%, transparent 20%, transparent 29%, #5555aaab 29%, #5555aaab 30%, #5555aa67 30%, #5555aa67 39%, #5555aaab 39%, #5555aaab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #7777ff, #0000ff, #007fff, #003f7f)"
                look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                look.color = "#000000"
                look.boxShadow = "0 0 3px 1px #000000 inset"
            }
            return look
            }
        },
        amethystAlter: {
            title() {
                let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                let val2 = player.tlb.amethystSymbolParts.div(1000).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsAmethystSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                let secondReqTotal = player.tlb.amethystSymbolParts.div(secondReq).floor()
                let result2 = secondReqTotal
                if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal
                
                if (player.tlb.buyMaxSymbols == true) {
                    if(hasUpgrade("tlb", 12))
                        return "Create <h3>" + formatShortWhole(player.tlb.amethystSymbolsGain.add(result2)) + "</h3><br>Amethyst Symbols."
                    else
                        return "Create <h3>" + formatShortWhole(player.tlb.amethystSymbolsGain.add(result)) + "</h3><br>Amethyst Symbols."
                }
                else
                    return "Create <h3>1</h3><br>Amethyst Symbol."
            },
            canClick() {
                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsAmethystSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()

                if(hasUpgrade("tlb", 12)) {
                    return player.tlb.canBuyAmetSys == true && player.tlb.amethystSymbolParts.gte(secondReq) && player.ssp.alchemicalSymbols.gte(firstReq)
                }
                else {
                    return player.tlb.canBuyAmetSys == true && player.tlb.amethystSymbolParts.gte(player.tlb.baseCostsAmethystSymbols) && player.ssp.alchemicalSymbols.gte(player.tlb.baseCostsAlchemicalSymbols)
                }
            },
            unlocked() {return true},
            onClick() { 
                let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                let val2 = player.tlb.amethystSymbolParts.div(player.tlb.baseCostsAmethystSymbols).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                player.tlb.canBuyAmetSys = false

                let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let secondReq = (player.tlb.baseCostsAmethystSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                let secondReqTotal = player.tlb.amethystSymbolParts.div(secondReq).floor()
                let result2 = secondReqTotal
                if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                if (player.tlb.buyMaxSymbols == false) {
                    player.tlb.amethystSymbols = player.tlb.amethystSymbols.add(1)
                    if(hasUpgrade("tlb", 12)) {
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(firstReq)
                        player.tlb.amethystSymbolParts = player.tlb.amethystSymbolParts.sub(secondReq)
                    }
                    else {
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(player.tlb.baseCostsAlchemicalSymbols)
                        player.tlb.amethystSymbolParts = player.tlb.amethystSymbolParts.sub(player.tlb.baseCostsAmethystSymbols)
                    }
                } 
                else if (player.tlb.buyMaxSymbols == true) {
                    if(hasUpgrade("tlb", 12)) {
                        player.tlb.amethystSymbols = player.tlb.amethystSymbols.add(result2)
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(firstReq.mul(result2))
                        player.tlb.amethystSymbolParts = player.tlb.amethystSymbolParts.sub(secondReq.mul(result2))
                    }
                    else {
                        player.tlb.amethystSymbols = player.tlb.amethystSymbols.add(result)
                        player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(Decimal.mul(player.tlb.baseCostsAlchemicalSymbols, result))
                        player.tlb.amethystSymbolParts = player.tlb.amethystSymbolParts.sub(Decimal.mul(player.tlb.baseCostsAmethystSymbols, result))
                    }
                }
            },
            style() {
            let look = {width: '300px', minHeight: '80px', border: "3px solid rgba(0,0,0,0.3)", fontSize: "18px", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundImage = "radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #330033), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #550055ab 9%, #550055ab 10%, #55005567 10%, #55005567 19%, #550055ab 19%, #550055ab 20%, transparent 20%, transparent 29%, #aa55aaab 29%, #aa55aaab 30%, #aa55aa67 30%, #aa55aa67 39%, #aa55aaab 39%, #aa55aaab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #550055ab 9%, #550055ab 10%, #55005567 10%, #55005567 19%, #550055ab 19%, #550055ab 20%, transparent 20%, transparent 29%, #aa55aaab 29%, #aa55aaab 30%, #aa55aa67 30%, #aa55aa67 39%, #aa55aaab 39%, #aa55aaab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #ff77ff, #ff00ff, #7f00ff, #3f007f)"
                look.borderImage = "radial-gradient(ellipse, #550055 70%, #ff00ff) 1"
                look.color = "#770077"
                look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 10px #ff00ff"
                look.textShadow = "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000"
                look.textStroke = "1px #ffddffab"
            } else {
                look.backgroundImage = "linear-gradient(0deg, #00000078, #00000078), radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #330033), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #550055ab 9%, #550055ab 10%, #55005567 10%, #55005567 19%, #550055ab 19%, #550055ab 20%, transparent 20%, transparent 29%, #aa55aaab 29%, #aa55aaab 30%, #aa55aa67 30%, #aa55aa67 39%, #aa55aaab 39%, #aa55aaab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #550055ab 9%, #550055ab 10%, #55005567 10%, #55005567 19%, #550055ab 19%, #550055ab 20%, transparent 20%, transparent 29%, #aa55aaab 29%, #aa55aaab 30%, #aa55aa67 30%, #aa55aa67 39%, #aa55aaab 39%, #aa55aaab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(to bottom, #ff77ff, #ff00ff, #7f00ff, #3f007f)"
                look.borderImage = "linear-gradient(to bottom, #000000, #000000) 1"
                look.color = "#000000"
                look.boxShadow = "0 0 3px 1px #000000 inset"
            }
            return look
            }
        },
        forceTome: {
            title() {
                let val1 = player.tlb.crimsonSymbols.div(player.tlb.baseCostsForceCr).floor()
                let val2 = player.tlb.celesteSymbols.div(player.tlb.baseCostsForceCe).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                if(hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true) {
                    return "Bargain for <h3>" + formatShortWhole(player.tlb.tomesForceGain.add(result)) + "</h3><br>→ Force Tomes →.<hr><small>Total bought: <h3>" + formatShortWhole(player.tlb.purchaseCountForceTome) + "</h3></small>"
                }
                else {
                    return "Bargain for <h3>1</h3><br>→ Force Tome →.<hr><small>Total bought: <h3>" + formatShortWhole(player.tlb.purchaseCountForceTome) + "</h3></small>" 
                } 
            },
            canClick() {return (player.tlb.crimsonSymbols.gte(player.tlb.baseCostsForceCr) && player.tlb.celesteSymbols.gte(player.tlb.baseCostsForceCe))},
            unlocked() {return true},
            onClick() {
                let val1 = player.tlb.crimsonSymbols.div(player.tlb.baseCostsForceCr).floor()
                let val2 = player.tlb.celesteSymbols.div(player.tlb.baseCostsForceCe).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                if(player.tlb.firstTomeForce == false) player.tlb.unlockCountStudy = player.tlb.unlockCountStudy.add(1)
                player.tlb.firstTomeForce = true

                if(hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true) {
                    player.tlb.tomesForce = player.tlb.tomesForce.add(result)
                    player.tlb.purchaseCountForceTome = player.tlb.purchaseCountForceTome.add(result)
                    player.tlb.crimsonSymbols = player.tlb.crimsonSymbols.sub(Decimal.mul(player.tlb.baseCostsForceCr, result))
                    player.tlb.celesteSymbols = player.tlb.celesteSymbols.sub(Decimal.mul(player.tlb.baseCostsForceCe, result))
                }
                else {
                    player.tlb.tomesForce = player.tlb.tomesForce.add(1)
                    player.tlb.purchaseCountForceTome = player.tlb.purchaseCountForceTome.add(1)
                    player.tlb.crimsonSymbols = player.tlb.crimsonSymbols.sub(player.tlb.baseCostsForceCr)
                    player.tlb.celesteSymbols = player.tlb.celesteSymbols.sub(player.tlb.baseCostsForceCe)
                }  
            },
            style() {
                let look = {fontSize: "13px", width: "230px", minHeight: "90px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "20px", boxShadow: "0 0 5px 1px #000000 inset, 0 0 10px 1px #000000 inset, 0 0 5px 1px #000000, 0 0 5px 1px #000000"}
                    if (this.canClick()) {
                        look.backgroundImage = "linear-gradient(150deg, #ff000078, transparent, #00ffff78), radial-gradient(circle at 0% 0%, #ff0000ab 20px, transparent 20px, transparent 40px, #ff000078 40px, #ff000045 60px, transparent 60px, transparent 80px, #ff000045 80px, #ff000023 100px, transparent 100px), radial-gradient(circle at 100% 100%, #00ffffab 20px, transparent 20px, transparent 40px, #00ffff78 40px, #00ffff45 60px, transparent 60px, transparent 80px, #00ffff45 80px, #00ffff23 100px, transparent 100px), linear-gradient(150deg, #550000, #555555, #005555)"
                        look.border = "3px solid #f8c898"
                        look.color = "#f8c898"
                        look.textShadow = "0 0 5px #97795b, 0 0 10px #000000, 0 0 10px #000000"
                        look.textStroke = "1px #97795bab"
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
        insightTome: {
            title() {
                let val1 = player.tlb.goldSymbols.div(player.tlb.baseCostsInsightGl).floor()
                let val2 = player.tlb.cobaltSymbols.div(player.tlb.baseCostsInsightCo).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                if(hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true) {
                    return "Bargain for <h3>" + formatShortWhole(player.tlb.tomesInsightGain.add(result)) + "</h3><br>👁 Insight Tomes 👁.<hr><small>Total bought: <h3>" + formatShortWhole(player.tlb.purchaseCountInsightTome) + "</h3></small>"
                }
                else {
                    return "Bargain for <h3>1</h3><br>👁 Insight Tome 👁.<hr><small>Total bought: <h3>" + formatShortWhole(player.tlb.purchaseCountInsightTome) + "</h3></small>" 
                } 
            },
            canClick() {return (player.tlb.goldSymbols.gte(player.tlb.baseCostsInsightGl) && player.tlb.cobaltSymbols.gte(player.tlb.baseCostsInsightCo))},
            unlocked() {return true},
            onClick() {
                let val1 = player.tlb.goldSymbols.div(player.tlb.baseCostsInsightGl).floor()
                let val2 = player.tlb.cobaltSymbols.div(player.tlb.baseCostsInsightCo).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                if(player.tlb.firstTomeInsight == false) player.tlb.unlockCountStudy = player.tlb.unlockCountStudy.add(1)
                player.tlb.firstTomeInsight = true

                if(hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true) {
                    player.tlb.tomesInsight = player.tlb.tomesInsight.add(result)
                    player.tlb.purchaseCountInsightTome = player.tlb.purchaseCountInsightTome.add(result)
                    player.tlb.goldSymbols = player.tlb.goldSymbols.sub(Decimal.mul(player.tlb.baseCostsInsightGl, result))
                    player.tlb.cobaltSymbols = player.tlb.cobaltSymbols.sub(Decimal.mul(player.tlb.baseCostsInsightCo, result))
                }
                else {
                    player.tlb.tomesInsight = player.tlb.tomesInsight.add(1)
                    player.tlb.purchaseCountInsightTome = player.tlb.purchaseCountInsightTome.add(1)
                    player.tlb.goldSymbols = player.tlb.goldSymbols.sub(player.tlb.baseCostsInsightGl)
                    player.tlb.cobaltSymbols = player.tlb.cobaltSymbols.sub(player.tlb.baseCostsInsightCo)
                }  
            },
            style() {
                let look = {fontSize: "13px", width: "230px", minHeight: "90px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "20px", boxShadow: "0 0 5px 1px #000000 inset, 0 0 10px 1px #000000 inset, 0 0 5px 1px #000000, 0 0 5px 1px #000000"}
                    if (this.canClick()) {
                        look.backgroundImage = "linear-gradient(150deg, #0000ff78, transparent, #ffff0078), radial-gradient(circle at 0% 0%, #0000ffab 20px, transparent 20px, transparent 40px, #0000ff78 40px, #0000ff45 60px, transparent 60px, transparent 80px, #0000ff45 80px, #0000ff23 100px, transparent 100px), radial-gradient(circle at 100% 100%, #ffff00ab 20px, transparent 20px, transparent 40px, #ffff0078 40px, #ffff0045 60px, transparent 60px, transparent 80px, #ffff0045 80px, #ffff0023 100px, transparent 100px), linear-gradient(150deg, #000055, #555555, #555500)"
                        look.border = "3px solid #f8c898"
                        look.color = "#f8c898"
                        look.textShadow = "0 0 5px #97795b, 0 0 10px #000000, 0 0 10px #000000"
                        look.textStroke = "1px #97795bab"
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
        meritTome: {
            title() {
                let val1 = player.tlb.jadeSymbols.div(player.tlb.baseCostsMeritJd).floor()
                let val2 = player.tlb.amethystSymbols.div(player.tlb.baseCostsMeritAm).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                if(hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true) {
                    return "Bargain for <h3>" + formatShortWhole(player.tlb.tomesMeritGain.add(result)) + "</h3><br>✶ Merit Tomes ✶.<hr><small>Total bought: <h3>" + formatShortWhole(player.tlb.purchaseCountMeritTome) + "</h3></small>"
                }
                else {
                    return "Bargain for <h3>1</h3><br>✶ Merit Tome ✶.<hr><small>Total bought: <h3>" + formatShortWhole(player.tlb.purchaseCountMeritTome) + "</h3></small>" 
                } 
            },
            canClick() {return (player.tlb.jadeSymbols.gte(player.tlb.baseCostsMeritJd) && player.tlb.amethystSymbols.gte(player.tlb.baseCostsMeritAm))},
            unlocked() {return true},
            onClick() {
                let val1 = player.tlb.jadeSymbols.div(player.tlb.baseCostsMeritJd).floor()
                let val2 = player.tlb.amethystSymbols.div(player.tlb.baseCostsMeritAm).floor()
                let result = val1
                if(val2.lt(val1)) result = val2

                if(player.tlb.firstTomeMerit == false) player.tlb.unlockCountStudy = player.tlb.unlockCountStudy.add(1)
                player.tlb.firstTomeMerit = true
                
                if(hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true) {
                    player.tlb.tomesMerit = player.tlb.tomesMerit.add(result)
                    player.tlb.purchaseCountMeritTome = player.tlb.purchaseCountMeritTome.add(result)
                    player.tlb.jadeSymbols = player.tlb.jadeSymbols.sub(Decimal.mul(player.tlb.baseCostsMeritJd, result))
                    player.tlb.amethystSymbols = player.tlb.amethystSymbols.sub(Decimal.mul(player.tlb.baseCostsMeritAm, result))
                }
                else {
                    player.tlb.tomesMerit = player.tlb.tomesMerit.add(1)
                    player.tlb.purchaseCountMeritTome = player.tlb.purchaseCountMeritTome.add(1)
                    player.tlb.jadeSymbols = player.tlb.jadeSymbols.sub(player.tlb.baseCostsMeritJd)
                    player.tlb.amethystSymbols = player.tlb.amethystSymbols.sub(player.tlb.baseCostsMeritAm)
                }  
            },
            style() {
                let look = {fontSize: "13px", width: "230px", minHeight: "90px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "20px", boxShadow: "0 0 5px 1px #000000 inset, 0 0 10px 1px #000000 inset, 0 0 5px 1px #000000, 0 0 5px 1px #000000"}
                    if (this.canClick()) {
                        look.backgroundImage = "linear-gradient(150deg, #00ff0078, transparent, #ff00ff78), radial-gradient(circle at 0% 0%, #00ff00ab 20px, transparent 20px, transparent 40px, #00ff0078 40px, #00ff0045 60px, transparent 60px, transparent 80px, #00ff0045 80px, #00ff0023 100px, transparent 100px), radial-gradient(circle at 100% 100%, #ff00ffab 20px, transparent 20px, transparent 40px, #ff00ff78 40px, #ff00ff45 60px, transparent 60px, transparent 80px, #ff00ff45 80px, #ff00ff23 100px, transparent 100px), linear-gradient(150deg, #005500, #555555, #550055)"
                        look.border = "3px solid #f8c898"
                        look.color = "#f8c898"
                        look.textShadow = "0 0 5px #97795b, 0 0 10px #000000, 0 0 10px #000000"
                        look.textStroke = "1px #97795bab"
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
        forcePoints: {
            title() {
                if(player.tlb.currentPointsForceGainTime > 0 && player.tlb.preparationPhaseForce == false)
                    return "Reading <h3>" + formatShortWhole(player.tlb.tomesForce) + "</h3> → Force Tomes →.<hr>Gaining <h3>" + formatShortWhole(player.tlb.pointsForceGain) + "</h3> → For.Pts → and<br><h3>" + formatShortWhole(player.tlb.revelationPointsGainForce) + "</h3> ⚿ Rev.Pts ⚿ in<br><h3>"+ formatTime(player.tlb.currentPointsForceGainTime) + "</h3>.<hr>You have <h3>" + formatShortWhole(player.tlb.pointsForce) + "</h3> → For.Pts →."
                else if(player.tlb.currentPointsForceGainTime > 0 && player.tlb.preparationPhaseForce == true)
                    return "Preparing <h3>" + formatShortWhole(player.tlb.tomesForce) + "</h3> → Force Tomes →.<hr>Gaining <h3>" + formatShortWhole(player.tlb.pointsForceGain) + "</h3> → For.Pts → and<br><h3>" + formatShortWhole(player.tlb.revelationPointsGainForce) + "</h3> ⚿ Rev.Pts ⚿ in<br><h3>"+ formatTime(player.tlb.currentPointsForceGainTime) + "</h3>.<hr>You have <h3>" + formatShortWhole(player.tlb.pointsForce) + "</h3> → For.Pts →."
                else
                    return "You hold <h3>" + formatShortWhole(player.tlb.tomesForce) + "</h3> → Force Tomes →.<hr>Gain <h3>" + formatShortWhole(player.tlb.pointsForceGain) + "</h3> → For.Pts → and<br><h3>" + formatShortWhole(player.tlb.revelationPointsGainForce) + "</h3> ⚿ Rev.Pts ⚿.<hr>You have <h3>" + formatShortWhole(player.tlb.pointsForce) + "</h3> → For.Pts →."
            },
            canClick() {return player.tlb.currentPointsForceGainTime <= 0 && player.tlb.gainBlockerForce == false && player.tlb.gainBlockerInsight == false && player.tlb.gainBlockerMerit == false},
            unlocked() {return true},
            onClick() { 
                if(hasUpgrade("tlb", 32)) player.tlb.currentPointsForceGainTime = player.tlb.currentPointsForceGainTime.add(60).div(upgradeEffect("tlb", 32))
                else player.tlb.currentPointsForceGainTime = player.tlb.currentPointsForceGainTime.add(60)

                player.tlb.pointsForce = player.tlb.pointsForce.add(player.tlb.pointsForceGain)
                player.tlb.revelationPoints = player.tlb.revelationPoints.add(player.tlb.revelationPointsGainForce)
                player.tlb.preparationPhaseForce = false

                if (hasUpgrade("tlb", 23)) {
                    player.tlb.gainBlockerInsight = true
                    player.tlb.gainBlockerMerit = true
                }
                else {
                    player.tlb.gainBlockerForce = true
                    player.tlb.gainBlockerInsight = true
                    player.tlb.gainBlockerMerit = true
                }  
            },
            style() {
                let look = {fontSize: "8px", width: "270px", minHeight: "120px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "20px", boxShadow: "0 0 5px 1px #000000 inset, 0 0 10px 1px #000000 inset, 0 0 5px 1px #000000, 0 0 5px 1px #000000"}
                    if (this.canClick()) {
                        look.backgroundImage = "linear-gradient(150deg, #ff000078, transparent, #00ffff78), radial-gradient(circle at 0% 0%, #ff0000ab 20px, transparent 20px, transparent 40px, #ff000078 40px, #ff000045 60px, transparent 60px, transparent 80px, #ff000045 80px, #ff000023 100px, transparent 100px), radial-gradient(circle at 100% 100%, #00ffffab 20px, transparent 20px, transparent 40px, #00ffff78 40px, #00ffff45 60px, transparent 60px, transparent 80px, #00ffff45 80px, #00ffff23 100px, transparent 100px), linear-gradient(150deg, #550000, #555555, #005555)"
                        look.border = "3px solid #f8c898"
                        look.color = "#f8c898"
                        look.textShadow = "0 0 5px #97795b, 0 0 10px #000000, 0 0 10px #000000"
                        look.textStroke = "1px #97795bab"
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
        insightPoints: {
            title() {
                if(player.tlb.currentPointsInsightGainTime > 0 && player.tlb.preparationPhaseInsight == false)
                    return "Reading <h3>" + formatShortWhole(player.tlb.tomesInsight) + "</h3> 👁 Insight Tomes 👁.<hr>Gaining <h3>" + formatShortWhole(player.tlb.pointsInsightGain) + "</h3> 👁 Ins.Pts 👁 and<br><h3>" + formatShortWhole(player.tlb.revelationPointsGainInsight) + "</h3> ⚿ Rev.Pts ⚿ in<br><h3>"+ formatTime(player.tlb.currentPointsInsightGainTime) + "</h3>.<hr>You have <h3>" + formatShortWhole(player.tlb.pointsInsight) + "</h3> 👁 Ins.Pts 👁."
                else if(player.tlb.currentPointsInsightGainTime > 0 && player.tlb.preparationPhaseInsight == true)
                    return "Preparing <h3>" + formatShortWhole(player.tlb.tomesInsight) + "</h3> 👁 Insight Tomes 👁.<hr>Gaining <h3>" + formatShortWhole(player.tlb.pointsInsightGain) + "</h3> 👁 Ins.Pts 👁 and<br><h3>" + formatShortWhole(player.tlb.revelationPointsGainInsight) + "</h3> ⚿ Rev.Pts ⚿ in<br><h3>"+ formatTime(player.tlb.currentPointsInsightGainTime) + "</h3>.<hr>You have <h3>" + formatShortWhole(player.tlb.pointsInsight) + "</h3> 👁 Ins.Pts 👁."
                else
                    return "You hold <h3>" + formatShortWhole(player.tlb.tomesInsight) + "</h3> 👁 Insight Tomes 👁.<hr>Gain <h3>" + formatShortWhole(player.tlb.pointsInsightGain) + "</h3> 👁 Ins.Pts 👁 and<br><h3>" + formatShortWhole(player.tlb.revelationPointsGainInsight) + "</h3> ⚿ Rev.Pts ⚿.<hr>You have <h3>" + formatShortWhole(player.tlb.pointsInsight) + "</h3> 👁 Ins.Pts 👁."
            },
            canClick() {return player.tlb.currentPointsInsightGainTime <= 0 && player.tlb.gainBlockerForce == false && player.tlb.gainBlockerInsight == false && player.tlb.gainBlockerMerit == false},
            unlocked() {return true},
            onClick() { 
                if(hasUpgrade("tlb", 32)) player.tlb.currentPointsInsightGainTime = player.tlb.currentPointsInsightGainTime.add(60).div(upgradeEffect("tlb", 32))
                else player.tlb.currentPointsInsightGainTime = player.tlb.currentPointsInsightGainTime.add(60)

                player.tlb.pointsInsight = player.tlb.pointsInsight.add(player.tlb.pointsInsightGain)
                player.tlb.revelationPoints = player.tlb.revelationPoints.add(player.tlb.revelationPointsGainInsight)
                player.tlb.preparationPhaseInsight = false

                if (hasUpgrade("tlb", 23)) {
                    player.tlb.gainBlockerForce = true
                    player.tlb.gainBlockerMerit = true
                }
                else {
                    player.tlb.gainBlockerForce = true
                    player.tlb.gainBlockerInsight = true
                    player.tlb.gainBlockerMerit = true
                }  
            },
            style() {
                let look = {fontSize: "8px", width: "270px", minHeight: "120px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "20px", boxShadow: "0 0 5px 1px #000000 inset, 0 0 10px 1px #000000 inset, 0 0 5px 1px #000000, 0 0 5px 1px #000000"}
                    if (this.canClick()) {
                        look.backgroundImage = "linear-gradient(150deg, #0000ff78, transparent, #ffff0078), radial-gradient(circle at 0% 0%, #0000ffab 20px, transparent 20px, transparent 40px, #0000ff78 40px, #0000ff45 60px, transparent 60px, transparent 80px, #0000ff45 80px, #0000ff23 100px, transparent 100px), radial-gradient(circle at 100% 100%, #ffff00ab 20px, transparent 20px, transparent 40px, #ffff0078 40px, #ffff0045 60px, transparent 60px, transparent 80px, #ffff0045 80px, #ffff0023 100px, transparent 100px), linear-gradient(150deg, #000055, #555555, #555500)"
                        look.border = "3px solid #f8c898"
                        look.color = "#f8c898"
                        look.textShadow = "0 0 5px #97795b, 0 0 10px #000000, 0 0 10px #000000"
                        look.textStroke = "1px #97795bab"
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
        meritPoints: {
            title() {
                if(player.tlb.currentPointsMeritGainTime > 0 && player.tlb.preparationPhaseMerit == false)
                    return "Reading <h3>" + formatShortWhole(player.tlb.tomesMerit) + "</h3> ✶ Merit Tomes ✶.<hr>Gaining <h3>" + formatShortWhole(player.tlb.pointsMeritGain) + "</h3> ✶ Mer.Pts ✶ and<br><h3>" + formatShortWhole(player.tlb.revelationPointsGainMerit) + "</h3> ⚿ Rev.Pts ⚿ in<br><h3>"+ formatTime(player.tlb.currentPointsMeritGainTime) + "</h3>.<hr>You have <h3>" + formatShortWhole(player.tlb.pointsMerit) + "</h3> ✶ Mer.Pts ✶."
                if(player.tlb.currentPointsMeritGainTime > 0 && player.tlb.preparationPhaseMerit == true)
                    return "Preparing <h3>" + formatShortWhole(player.tlb.tomesMerit) + "</h3> ✶ Merit Tomes ✶.<hr>Gaining <h3>" + formatShortWhole(player.tlb.pointsMeritGain) + "</h3> ✶ Mer.Pts ✶ and<br><h3>" + formatShortWhole(player.tlb.revelationPointsGainMerit) + "</h3> ⚿ Rev.Pts ⚿ in<br><h3>"+ formatTime(player.tlb.currentPointsMeritGainTime) + "</h3>.<hr>You have <h3>" + formatShortWhole(player.tlb.pointsMerit) + "</h3> ✶ Mer.Pts ✶."
                else
                    return "You hold <h3>" + formatShortWhole(player.tlb.tomesMerit) + "</h3> ✶ Merit Tomes ✶.<hr>Gain <h3>" + formatShortWhole(player.tlb.pointsMeritGain) + "</h3> ✶ Mer.Pts ✶ and<br><h3>" + formatShortWhole(player.tlb.revelationPointsGainMerit) + "</h3> ⚿ Rev.Pts ⚿.<hr>You have <h3>" + formatShortWhole(player.tlb.pointsMerit) + "</h3> ✶ Mer.Pts ✶."
            },
            canClick() {return player.tlb.currentPointsMeritGainTime <= 0 && player.tlb.gainBlockerForce == false && player.tlb.gainBlockerInsight == false && player.tlb.gainBlockerMerit == false},
            unlocked() {return true},
            onClick() { 
                if(hasUpgrade("tlb", 32)) player.tlb.currentPointsMeritGainTime = player.tlb.currentPointsMeritGainTime.add(60).div(upgradeEffect("tlb", 32))
                else player.tlb.currentPointsMeritGainTime = player.tlb.currentPointsMeritGainTime.add(60)

                player.tlb.pointsMerit = player.tlb.pointsMerit.add(player.tlb.pointsMeritGain)
                player.tlb.revelationPoints = player.tlb.revelationPoints.add(player.tlb.revelationPointsGainMerit)
                player.tlb.preparationPhaseMerit = false

                if (hasUpgrade("tlb", 23)) {
                    player.tlb.gainBlockerForce = true
                    player.tlb.gainBlockerInsight = true
                }
                else {
                    player.tlb.gainBlockerForce = true
                    player.tlb.gainBlockerInsight = true
                    player.tlb.gainBlockerMerit = true
                }  
            },
            style() {
                let look = {fontSize: "8px", width: "270px", minHeight: "120px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "20px", boxShadow: "0 0 5px 1px #000000 inset, 0 0 10px 1px #000000 inset, 0 0 5px 1px #000000, 0 0 5px 1px #000000"}
                    if (this.canClick()) {
                        look.backgroundImage = "linear-gradient(150deg, #00ff0078, transparent, #ff00ff78), radial-gradient(circle at 0% 0%, #00ff00ab 20px, transparent 20px, transparent 40px, #00ff0078 40px, #00ff0045 60px, transparent 60px, transparent 80px, #00ff0045 80px, #00ff0023 100px, transparent 100px), radial-gradient(circle at 100% 100%, #ff00ffab 20px, transparent 20px, transparent 40px, #ff00ff78 40px, #ff00ff45 60px, transparent 60px, transparent 80px, #ff00ff45 80px, #ff00ff23 100px, transparent 100px), linear-gradient(150deg, #005500, #555555, #550055)"
                        look.border = "3px solid #f8c898"
                        look.color = "#f8c898"
                        look.textShadow = "0 0 5px #97795b, 0 0 10px #000000, 0 0 10px #000000"
                        look.textStroke = "1px #97795bab"
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
        // combinationsUnlocker: { // LATER
        //     title() {return "Unlock the Combinations Tab.<br><small>Requires: 10 of each basic altered symbols<br>and 1000 🝪 Al.Sys 🝪</small>"},
        //     canClick() {return player.tlb.crimsonSymbols >= 10 && player.tlb.goldSymbols >= 10 && player.tlb.jadeSymbols >= 10
        //                         && player.tlb.celesteSymbols >= 10 && player.tlb.cobaltSymbols >= 10 && player.tlb.amethystSymbols >= 10
        //                         && player.ssp.alchemicalSymbols >= 1000},
        //     unlocked() {
        //         if (player.tlb.combinationsUnlocked == false)
        //             return true
        //         else return false
        //     },
        //     onClick() {
        //         player.tlb.crimsonSymbols = player.tlb.crimsonSymbols.sub(10);
        //         player.tlb.goldSymbols = player.tlb.goldSymbols.sub(10);
        //         player.tlb.jadeSymbols = player.tlb.jadeSymbols.sub(10);
        //         player.tlb.celesteSymbols = player.tlb.celesteSymbols.sub(10);
        //         player.tlb.cobaltSymbols = player.tlb.cobaltSymbols.sub(10);
        //         player.tlb.amethystSymbols = player.tlb.amethystSymbols.sub(10);
        //         player.ssp.alchemicalSymbols = player.ssp.alchemicalSymbols.sub(1000);
        //         player.tlb.combinationsUnlocked = true;
        //     },
        //     style() {
        //     let look = {fontSize: "18px", width: '600px', minHeight: '100px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
        //     if (this.canClick()) {
        //         look.backgroundImage = "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffff00 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffff0067 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to left, #ffca1b, #855b00, #582900, #855b00, #ffca1b)"
        //         look.borderImage = "radial-gradient(ellipse, #ff7f00 70%, #ffff00) 1"
        //         look.color = "#000000"
        //         look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 10px #ffff00"
        //         look.textShadow = "0 0 5px #ffff00, 0 0 10px #000000, 0 0 10px #000000"
        //         look.textStroke = "1px #ffffddab"
        //     } else {
        //         look.backgroundImage = "linear-gradient(0deg, #00000078, #00000078), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffff00 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffff0067 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to left, #ffca1b, #855b00, #582900, #855b00, #ffca1b)"
        //         look.borderImage = "radial-gradient(ellipse, #7f3f00 70%, #7f7f00) 1"
        //         look.color = "#000000"
        //         look.boxShadow = "0 0 3px 1px #000000 inset, 0 0 5px #000000"
        //         look.textShadow = "0 0 5px #7f7f00, 0 0 10px #000000, 0 0 10px #000000"
        //         look.textStroke = "1px #7f7f6eab"
        //     }
        //     return look
        //     }
        // },
    },
    // bars: {
    //     forceTomeBar:
    // },
    upgrades: {
        11: {
            title () {return hasUpgrade("tlb", 11) ? "<h3>Chromatis</h3><br>[PURCHASED]" : "<h3>Chromatis</h3>"},
            unlocked() {return true},
            description: "<hr>The 1st 6 basic symbol parts are boosted based on → For.Pts →.",
            cost: new Decimal(10),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "→ For.Pts →",
            currencyInternalName: "pointsForce",
            effect() {
                return player.tlb.pointsForce.add(1).root(10)
            },
            effectDisplay() {
                return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
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
        12: {
            title () {return hasUpgrade("tlb", 12) ? "<h3>Merchandus</h3><br>[PURCHASED]" : "<h3>Merchandus</h3>"},
            unlocked() {return true},
            description: "<hr>Alteration costs of the 1st 6 basic symbols are divided based on → Force Tomes →.",
            cost: new Decimal(50),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "→ For.Pts →",
            currencyInternalName: "pointsForce",
            effect() {
                return player.tlb.tomesForce.add(1).root(20)
            },
            effectDisplay() {
                return "/" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
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
        13: {
            title () {return hasUpgrade("tlb", 13) ? "<h3>Avaritae</h3><br>[PURCHASED]" : "<h3>Avaritae</h3>"},
            unlocked() {return true},
            description: "<hr>Base 🝪 Al.Sy 🝪 gain is doubled and then boosted based on itself.",
            cost: new Decimal(250),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "→ For.Pts →",
            currencyInternalName: "pointsForce",
            effect() {
                return player.ssp.alchemicalSymbols.add(1).log10(player.ssp.alchemicalSymbols).add(1).root(3)
            },
            effectDisplay() {
                return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
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
        14: {
            title () {return hasUpgrade("tlb", 14) ? "<h3>Tyrranium</h3><br>[PURCHASED]" : "<h3>Tyrranium</h3>"},
            unlocked() {return true},
            description: "<hr>Current Realm Essence (Universe α) boosts → For.Pt → gain.",
            cost: new Decimal(1000),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "→ For.Pts →",
            currencyInternalName: "pointsForce",
            effect() {
                return player.hrm.realmEssence.add(1).pow(0.5).add(1).log(20).add(1).root(5)
            },
            effectDisplay() {
                return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
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
        21: {
            title () {return hasUpgrade("tlb", 21) ? "<h3>Atheneia</h3><br>[PURCHASED]" : "<h3>Atheneia</h3>"},
            unlocked() {return true},
            description: "<hr>⚿ Rev.Pt ⚿ gains from 1st 3 Tome types are boosted based on 👁 Ins.Pts 👁.",
            cost: new Decimal(10),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "👁 Ins.Pts 👁",
            currencyInternalName: "pointsInsight",
            effect() {
                return player.tlb.pointsInsight.add(1).root(10)
            },
            effectDisplay() {
                return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
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
        22: {
            title () {return hasUpgrade("tlb", 22) ? "<h3>Unitarii</h3><br>[PURCHASED]" : "<h3>Unitarii</h3>"},
            unlocked() {return true},
            description: "<hr>All secondary point types are boosted based on 👁 Insight Tomes 👁.",
            cost: new Decimal(50),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "👁 Ins.Pts 👁",
            currencyInternalName: "pointsInsight",
            effect() {
                return player.tlb.tomesInsight.add(1).root(20)
            },
            effectDisplay() {
                return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
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
        23: {
            title () {return hasUpgrade("tlb", 23) ? "<h3>Cogninzo</h3><br>[PURCHASED]" : "<h3>Cogninzo</h3>"},
            unlocked() {return true},
            description: "<hr>You can read two different Tome types at the same time.",
            cost: new Decimal(250),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "👁 Ins.Pts 👁",
            currencyInternalName: "pointsInsight",
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
        24: {
            title () {return hasUpgrade("tlb", 24) ? "<h3>Hekatorr</h3><br>[PURCHASED]" : "<h3>Hekatorr</h3>"},
            unlocked() {return true},
            description: "<hr>Current Stars (Alt-Universe 2) boosts 👁 Ins.Pts 👁 gain.",
            cost: new Decimal(1000),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "👁 Ins.Pts 👁",
            currencyInternalName: "pointsInsight",
            effect() {
                return player.au2.stars.add(1).pow(0.5).add(1).log(20).add(1).root(5)
            },
            effectDisplay() {
                return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
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
        31: {
            title () {return hasUpgrade("tlb", 31) ? "<h3>Echoschol</h3><br>[PURCHASED]" : "<h3>Echoshcol</h3>"},
            unlocked() {return true},
            description: "<hr>🝪 Al.Sy 🝪 gain is boosted based on ✶ Mer.Pts ✶.",
            cost: new Decimal(10),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "✶ Mer.Pts ✶",
            currencyInternalName: "pointsMerit",
            effect() {
                return player.tlb.pointsMerit.add(1).root(10)
            },
            effectDisplay() {
                return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
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
        32: {
            title () {return hasUpgrade("tlb", 32) ? "<h3>Ephetera</h3><br>[PURCHASED]" : "<h3>Ephetera</h3>"},
            unlocked() {return true},
            description: "<hr>Reading times are divided based on ✶ Merit Tomes ✶.",
            cost: new Decimal(50),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "✶ Mer.Pts ✶",
            currencyInternalName: "pointsMerit",
            effect() {
                return player.tlb.tomesMerit.add(1).root(20)
            },
            effectDisplay() {
                return "/" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
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
        33: {
            title () {return hasUpgrade("tlb", 33) ? "<h3>Studiwyrm</h3><br>[PURCHASED]" : "<h3>Studiwyrm</h3>"},
            unlocked() {return true},
            description: "<hr>You can bulk buy Tomes in the Bookshop.",
            cost: new Decimal(250),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "✶ Mer.Pts ✶",
            currencyInternalName: "pointsMerit",
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
        34: {
            title () {return hasUpgrade("tlb", 34) ? "<h3>Alealyah</h3><br>[PURCHASED]" : "<h3>Alealyah</h3>"},
            unlocked() {return true},
            description: "<hr>Current Card Generators (Universe ε) boosts ✶ Mer.Pts ✶ gain.",
            cost: new Decimal(1000),
            currencyLocation() {return player.tlb},
            currencyDisplayName: "✶ Mer.Pts ✶",
            currencyInternalName: "pointsMerit",
            effect() {
                return player.car.cardGenerators.add(1).pow(0.5).add(1).log(20).add(1).root(5)
            },
            effectDisplay() {
                return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2)
            },
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
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        tabs: {
            "Alterations": {
                buttonStyle() {return {color: "#000000", backgroundImage: "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset"}},
                unlocked() {return true},
                content: [
                    ["blank", "5px"],
                    ["row",
                        [
                            ["raw-html", () => {return "You are currently in the"}, {color: "#ffffff", fontSize: "18px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                            ["blank", "2px"],
                            ["raw-html", () => {return "-<u>Alterations</u>-."}, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                        ]
                    ],
                    ["blank", "10px"],
                    ["style-column",
                        [
                            ["row", [["clickable", "buyMaxOff1"], ["blank", "5px"], ["clickable", "buyMaxOn1"]]]
                        ]
                    ],
                    ["blank", "20px"],
                    // () => {if(player.tlb.combinationsUnlocked == false) {
                    //         return ["column", [["clickable", "combinationsUnlocker"], ["blank", "20px"]]]     
                    //     }
                    // }, LATER
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
                                        ], {width: "120px", height: "120px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffdddd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff000023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                    ],
                                    ["column", [[]], {width: "30px"}],
                                    ["style-column",
                                        [
                                            ["clickable", "crimsonAlter"],
                                            ["blank", "15px"],
                                            ["row",
                                                [
                                                    ["raw-html", () => {return "Alteration Cost:"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                                                        let val2 = player.tlb.crimsonSymbolParts.div(player.tlb.baseCostsCrimsonSymbols).floor()
                                                        let result = val1
                                                        if(val2.lt(val1)) result = val2

                                                        let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let secondReq = (player.tlb.baseCostsCrimsonSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                                                        let secondReqTotal = player.tlb.crimsonSymbolParts.div(secondReq).floor()
                                                        let result2 = secondReqTotal
                                                        if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(firstReq.mul(result2)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsAlchemicalSymbols.mul(result)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        else {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(firstReq) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsAlchemicalSymbols) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "14px", textStroke: "1px #aaffaaab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {return "&"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {
                                                        let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                                                        let val2 = player.tlb.crimsonSymbolParts.div(player.tlb.baseCostsCrimsonSymbols).floor()
                                                        let result = val1
                                                        if(val2.lt(val1)) result = val2

                                                        let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let secondReq = (player.tlb.baseCostsCrimsonSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                                                        let secondReqTotal = player.tlb.crimsonSymbolParts.div(secondReq).floor()
                                                        let result2 = secondReqTotal
                                                        if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(secondReq.mul(result2)) + "</h3><small> Cr.Sy.Prts</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsCrimsonSymbols.mul(result)) + "</h3><small> Cr.Sy.Prts</small>"
                                                            }
                                                        else {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(secondReq) + "</h3><small> Cr.Sy.Prts</small>" 
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsCrimsonSymbols) + "</h3><small> Cr.Sy.Prts</small>"
                                                            }
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ff7777, #ff0000, #ff007f, #7f003f)", fontSize: "14px", textStroke: "1px #ffddddab", 'textShadow': "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ], {width: "560px", height: "180px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ffdddd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff000023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ],
                            ["style-row",
                                [
                                    ["column",
                                        [
                                            ["raw-html", () => {return "The Crimson Symbol Part<br>Encoder is producing"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShort(player.tlb.crimsonSymbolPartsGain) + "</h3> Cr.Sy.Prts per second."}, {color: "transparent", background: "linear-gradient(to bottom, #ff7777, #ff0000, #ff007f, #7f003f)", fontSize: "14px", textStroke: "1px #ffddddab", 'textShadow': "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "(Based on Radioactive Core Fragments.)"}, {color: "#ffffff", fontSize: "13px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "10px"],
                                            ["raw-html", () => {
                                                let softcapStart = 10000
                                                if (player.tlb.crimsonSymbolParts >= softcapStart)
                                                    return "You have<br><small>[SOFTCAPPED: +<h3>" + formatShort(player.tlb.crimsonSymbolPartsSoftcapEffect) + "</h3> Breakdown Magnitude</small>]"
                                                else
                                                    return "You have"
                                            }, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShortWhole(player.tlb.crimsonSymbolParts) + "</h3> Cr.Sy.Prts."}, {color: "transparent", background: "linear-gradient(to bottom, #ff7777, #ff0000, #ff007f, #7f003f)", fontSize: "16px", textStroke: "1px #ffddddab", 'textShadow': "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}]
                                        ]
                                    ]
                                ], {width: "300px", height: "180px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ffdddd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff000023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
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
                                        ], {width: "120px", height: "120px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ffff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                    ],
                                    ["column", [[]], {width: "30px"}],
                                    ["style-column",
                                        [
                                            ["clickable", "goldAlter"],
                                            ["blank", "15px"],
                                            ["row",
                                                [
                                                    ["raw-html", () => {return "Alteration Cost:"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                                                        let val2 = player.tlb.goldSymbolParts.div(player.tlb.baseCostsGoldSymbols).floor()
                                                        let result = val1
                                                        if(val2.lt(val1)) result = val2

                                                        let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let secondReq = (player.tlb.baseCostsGoldSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                                                        let secondReqTotal = player.tlb.goldSymbolParts.div(secondReq).floor()
                                                        let result2 = secondReqTotal
                                                        if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(firstReq.mul(result2)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsAlchemicalSymbols.mul(result)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        else {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(firstReq) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsAlchemicalSymbols) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "14px", textStroke: "1px #aaffaaab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {return "&"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {
                                                        let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                                                        let val2 = player.tlb.goldSymbolParts.div(player.tlb.baseCostsGoldSymbols).floor()
                                                        let result = val1
                                                        if(val2.lt(val1)) result = val2

                                                        let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let secondReq = (player.tlb.baseCostsGoldSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                                                        let secondReqTotal = player.tlb.goldSymbolParts.div(secondReq).floor()
                                                        let result2 = secondReqTotal
                                                        if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(secondReq.mul(result2)) + "</h3><small> Gl.Sy.Prts</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsGoldSymbols.mul(result)) + "</h3><small> Gl.Sy.Prts</small>"
                                                            }
                                                        else {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(secondReq) + "</h3><small> Gl.Sy.Prts</small>" 
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsGoldSymbols) + "</h3><small> Gl.Sy.Prts</small>"
                                                            }
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ffff77, #ffff00, #ff7f00, #7f3f00)", fontSize: "14px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #ffff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ], {width: "560px", height: "180px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ffffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ffff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ],
                            ["style-row",
                                [
                                    ["column",
                                        [
                                            ["raw-html", () => {return "The Gold Symbol Part<br>Encoder is producing"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShort(player.tlb.goldSymbolPartsGain) + "</h3> Gl.Sy.Prts per second."}, {color: "transparent", background: "linear-gradient(to bottom, #ffff77, #ffff00, #ff7f00, #7f3f00)", fontSize: "14px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #ffff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "(Based on Technological Core Fragments.)"}, {color: "#ffffff", fontSize: "13px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "10px"],
                                            ["raw-html", () => {
                                                let softcapStart = 10000
                                                if (player.tlb.goldSymbolParts >= softcapStart)
                                                    return "You have<br><small>[SOFTCAPPED: +<h3>" + formatShort(player.tlb.goldSymbolPartsSoftcapEffect) + "</h3> Breakdown Magnitude</small>]"
                                                else
                                                    return "You have"
                                            }, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShortWhole(player.tlb.goldSymbolParts) + "</h3> Gl.Sy.Prts."}, {color: "transparent", background: "linear-gradient(to bottom, #ffff77, #ffff00, #ff7f00, #7f3f00)", fontSize: "16px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #ffff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}]
                                        ]
                                    ]
                                ], {width: "300px", height: "180px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ffffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ffff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
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
                                        ], {width: "120px", height: "120px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ddffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                    ],
                                    ["column", [[]], {width: "30px"}],
                                    ["style-column",
                                        [
                                            ["clickable", "jadeAlter"],
                                            ["blank", "15px"],
                                            ["row",
                                                [
                                                    ["raw-html", () => {return "Alteration Cost:"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                                                        let val2 = player.tlb.jadeSymbolParts.div(player.tlb.baseCostsJadeSymbols).floor()
                                                        let result = val1
                                                        if(val2.lt(val1)) result = val2

                                                        let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let secondReq = (player.tlb.baseCostsJadeSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                                                        let secondReqTotal = player.tlb.jadeSymbolParts.div(secondReq).floor()
                                                        let result2 = secondReqTotal
                                                        if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(firstReq.mul(result2)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsAlchemicalSymbols.mul(result)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        else {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(firstReq) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsAlchemicalSymbols) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "14px", textStroke: "1px #aaffaaab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {return "&"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {
                                                        let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                                                        let val2 = player.tlb.jadeSymbolParts.div(player.tlb.baseCostsJadeSymbols).floor()
                                                        let result = val1
                                                        if(val2.lt(val1)) result = val2

                                                        let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let secondReq = (player.tlb.baseCostsJadeSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                                                        let secondReqTotal = player.tlb.jadeSymbolParts.div(secondReq).floor()
                                                        let result2 = secondReqTotal
                                                        if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(secondReq.mul(result2)) + "</h3><small> Jd.Sy.Prts</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsJadeSymbols.mul(result)) + "</h3><small> Jd.Sy.Prts</small>"
                                                            }
                                                        else {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(secondReq) + "</h3><small> Jd.Sy.Prts</small>" 
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsJadeSymbols) + "</h3><small> Jd.Sy.Prts</small>"
                                                            }
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #77ff77, #00ff00, #7fff00, #3f7f00)", fontSize: "14px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ], {width: "560px", height: "180px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ddffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ],
                            ["style-row",
                                [
                                    ["column",
                                        [
                                            ["raw-html", () => {return "The Jade Symbol Part<br>Encoder is producing"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShort(player.tlb.jadeSymbolPartsGain) + "</h3> Jd.Sy.Prts per second."}, {color: "transparent", background: "linear-gradient(to bottom, #77ff77, #00ff00, #7fff00, #3f7f00)", fontSize: "14px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "(Based on Nature Core Fragments.)"}, {color: "#ffffff", fontSize: "13px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "10px"],
                                            ["raw-html", () => {
                                                let softcapStart = 10000
                                                if (player.tlb.jadeSymbolParts >= softcapStart)
                                                    return "You have<br><small>[SOFTCAPPED: +<h3>" + formatShort(player.tlb.jadeSymbolPartsSoftcapEffect) + "</h3> Breakdown Magnitude</small>]"
                                                else
                                                    return "You have"
                                            }, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShortWhole(player.tlb.jadeSymbolParts) + "</h3> Jd.Sy.Prts."}, {color: "transparent", background: "linear-gradient(to bottom, #77ff77, #00ff00, #7fff00, #3f7f00)", fontSize: "16px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}]
                                        ]
                                    ]
                                ], {width: "300px", height: "180px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ddffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ]
                        ]
                    ],
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
                                                ], {width: "100px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #77ffff, #00ffff, #00ff7f, #007f3f)", fontSize: "25px", textStroke: "1px #ddffffab", 'textShadow': "0 0 5px #00ffff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                            ]
                                        ], {width: "120px", height: "120px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ddffff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ffff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                    ],
                                    ["column", [[]], {width: "30px"}],
                                    ["style-column",
                                        [
                                            ["clickable", "celesteAlter"],
                                            ["blank", "15px"],
                                            ["row",
                                                [
                                                    ["raw-html", () => {return "Alteration Cost:"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                                                        let val2 = player.tlb.celesteSymbolParts.div(player.tlb.baseCostsCelesteSymbols).floor()
                                                        let result = val1
                                                        if(val2.lt(val1)) result = val2

                                                        let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let secondReq = (player.tlb.baseCostsCelesteSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                                                        let secondReqTotal = player.tlb.celesteSymbolParts.div(secondReq).floor()
                                                        let result2 = secondReqTotal
                                                        if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(firstReq.mul(result2)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsAlchemicalSymbols.mul(result)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        else {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(firstReq) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsAlchemicalSymbols) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "14px", textStroke: "1px #aaffaaab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {return "&"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {
                                                        let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                                                        let val2 = player.tlb.celesteSymbolParts.div(player.tlb.baseCostsCelesteSymbols).floor()
                                                        let result = val1
                                                        if(val2.lt(val1)) result = val2

                                                        let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let secondReq = (player.tlb.baseCostsCelesteSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                                                        let secondReqTotal = player.tlb.celesteSymbolParts.div(secondReq).floor()
                                                        let result2 = secondReqTotal
                                                        if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(secondReq.mul(result2)) + "</h3><small> Ce.Sy.Prts</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsCelesteSymbols.mul(result)) + "</h3><small> Ce.Sy.Prts</small>"
                                                            }
                                                        else {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(secondReq) + "</h3><small> Ce.Sy.Prts</small>" 
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsCelesteSymbols) + "</h3><small> Ce.Sy.Prts</small>"
                                                            }
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #77ffff, #00ffff, #00ff7f, #007f3f)", fontSize: "14px", textStroke: "1px #ddffffab", 'textShadow': "0 0 5px #00ffff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ], {width: "560px", height: "180px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ddffff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ffff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ],
                            ["style-row",
                                [
                                    ["column",
                                        [
                                            ["raw-html", () => {return "The Celeste Symbol Part<br>Encoder is producing"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShort(player.tlb.celesteSymbolPartsGain) + "</h3> Ce.Sy.Prts per second."}, {color: "transparent", background: "linear-gradient(to bottom, #77ffff, #00ffff, #00ff7f, #007f3f)", fontSize: "14px", textStroke: "1px #ddffffab", 'textShadow': "0 0 5px #00ffff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "(Based on Ancient Core Fragments.)"}, {color: "#ffffff", fontSize: "13px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "10px"],
                                            ["raw-html", () => {
                                                let softcapStart = 10000
                                                if (player.tlb.celesteSymbolParts >= softcapStart)
                                                    return "You have<br><small>[SOFTCAPPED: +<h3>" + formatShort(player.tlb.celesteSymbolPartsSoftcapEffect) + "</h3> Breakdown Magnitude</small>]"
                                                else
                                                    return "You have"
                                            }, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShortWhole(player.tlb.celesteSymbolParts) + "</h3> Ce.Sy.Prts."}, {color: "transparent", background: "linear-gradient(to bottom, #77ffff, #00ffff, #00ff7f, #007f3f)", fontSize: "16px", textStroke: "1px #ddffffab", 'textShadow': "0 0 5px #00ffff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}]
                                        ]
                                    ]
                                ], {width: "300px", height: "180px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ddffff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ffff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
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
                                        ], {width: "120px", height: "120px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ddddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #0000ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                    ],
                                    ["column", [[]], {width: "30px"}],
                                    ["style-column",
                                        [
                                            ["clickable", "cobaltAlter"],
                                            ["blank", "15px"],
                                            ["row",
                                                [
                                                    ["raw-html", () => {return "Alteration Cost:<br>"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                                                        let val2 = player.tlb.cobaltSymbolParts.div(player.tlb.baseCostsCobaltSymbols).floor()
                                                        let result = val1
                                                        if(val2.lt(val1)) result = val2

                                                        let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let secondReq = (player.tlb.baseCostsCobaltSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                                                        let secondReqTotal = player.tlb.cobaltSymbolParts.div(secondReq).floor()
                                                        let result2 = secondReqTotal
                                                        if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(firstReq.mul(result2)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsAlchemicalSymbols.mul(result)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        else {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(firstReq) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsAlchemicalSymbols) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "14px", textStroke: "1px #aaffaaab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {return "&"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {
                                                        let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                                                        let val2 = player.tlb.cobaltSymbolParts.div(player.tlb.baseCostsCobaltSymbols).floor()
                                                        let result = val1
                                                        if(val2.lt(val1)) result = val2

                                                        let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let secondReq = (player.tlb.baseCostsCobaltSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                                                        let secondReqTotal = player.tlb.cobaltSymbolParts.div(secondReq).floor()
                                                        let result2 = secondReqTotal
                                                        if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(secondReq.mul(result2)) + "</h3><small> Co.Sy.Prts</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsCobaltSymbols.mul(result)) + "</h3><small> Co.Sy.Prts</small>"
                                                            }
                                                        else {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(secondReq) + "</h3><small> Co.Sy.Prts</small>" 
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsCobaltSymbols) + "</h3><small> Co.Sy.Prts</small>"
                                                            }
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #7777ff, #0000ff, #007fff, #003f7f)", fontSize: "14px", textStroke: "1px #ddddffab", 'textShadow': "0 0 5px #0000ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ], {width: "560px", height: "180px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ddddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #0000ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ],
                            ["style-row",
                                [
                                    ["column",
                                        [
                                            ["raw-html", () => {return "The Cobalt Symbol Part<br>Encoder is producing"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShort(player.tlb.cobaltSymbolPartsGain) + "</h3> Co.Sy.Prts per second."}, {color: "transparent", background: "linear-gradient(to bottom, #7777ff, #0000ff, #007fff, #003f7f)", fontSize: "14px", textStroke: "1px #ddddffab", 'textShadow': "0 0 5px #0000ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "(Based on Paradox Core Fragments.)"}, {color: "#ffffff", fontSize: "13px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "10px"],
                                            ["raw-html", () => {
                                                let softcapStart = 10000
                                                if (player.tlb.cobaltSymbolParts >= softcapStart)
                                                    return "You have<br><small>[SOFTCAPPED: +<h3>" + formatShort(player.tlb.cobaltSymbolPartsSoftcapEffect) + "</h3> Breakdown Magnitude</small>]"
                                                else
                                                    return "You have"
                                            }, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShortWhole(player.tlb.cobaltSymbolParts) + "</h3> Co.Sy.Prts."}, {color: "transparent", background: "linear-gradient(to bottom, #7777ff, #0000ff, #007fff, #003f7f)", fontSize: "16px", textStroke: "1px #ddddffab", 'textShadow': "0 0 5px #0000ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}]
                                        ]
                                    ]
                                ], {width: "300px", height: "180px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ddddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #0000ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
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
                                        ], {width: "120px", height: "120px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff00ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                    ],
                                    ["column", [[]], {width: "30px"}],
                                    ["style-column",
                                        [
                                            ["clickable", "amethystAlter"],
                                            ["blank", "15px"],
                                            ["row",
                                                [
                                                    ["raw-html", () => {return "Alteration Cost:"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                                                        let val2 = player.tlb.amethystSymbolParts.div(player.tlb.baseCostsAmethystSymbols).floor()
                                                        let result = val1
                                                        if(val2.lt(val1)) result = val2

                                                        let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let secondReq = (player.tlb.baseCostsAmethystSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                                                        let secondReqTotal = player.tlb.amethystSymbolParts.div(secondReq).floor()
                                                        let result2 = secondReqTotal
                                                        if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(firstReq.mul(result2)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsAlchemicalSymbols.mul(result)) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        else {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(firstReq) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsAlchemicalSymbols) + "</h3><small> 🝪 Al.Sys 🝪</small>"
                                                            }
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "14px", textStroke: "1px #aaffaaab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {return "&"}, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {
                                                        let val1 = player.ssp.alchemicalSymbols.div(player.tlb.baseCostsAlchemicalSymbols).floor()
                                                        let val2 = player.tlb.amethystSymbolParts.div(player.tlb.baseCostsAmethystSymbols).floor()
                                                        let result = val1
                                                        if(val2.lt(val1)) result = val2

                                                        let firstReq = (player.tlb.baseCostsAlchemicalSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let secondReq = (player.tlb.baseCostsAmethystSymbols.div(upgradeEffect("tlb", 12)).floor()).floor()
                                                        let firstReqTotal = player.ssp.alchemicalSymbols.div(firstReq).floor()
                                                        let secondReqTotal = player.tlb.amethystSymbolParts.div(secondReq).floor()
                                                        let result2 = secondReqTotal
                                                        if(secondReqTotal.gt(firstReqTotal)) result2 = firstReqTotal

                                                        if (player.tlb.buyMaxSymbols == true) {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(secondReq.mul(result2)) + "</h3><small> Am.Sy.Prts</small>"
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsAmethystSymbols.mul(result)) + "</h3><small> Am.Sy.Prts</small>"
                                                            }
                                                        else {
                                                            if(hasUpgrade("tlb", 12))
                                                                return "<h3>" + formatShortWhole(secondReq) + "</h3><small> Am.Sy.Prts</small>" 
                                                            else
                                                                return "<h3>" + formatShortWhole(player.tlb.baseCostsAmethystSymbols) + "</h3><small> Am.Sy.Prts</small>"
                                                            }
                                                        }, {color: "transparent", background: "linear-gradient(to bottom, #ff77ff, #ff00ff, #7f00ff, #3f007f)", fontSize: "14px", textStroke: "1px #ffddffab", 'textShadow': "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ], {width: "560px", height: "180px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ffddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff00ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ],
                            ["style-row",
                                [
                                    ["column",
                                        [
                                            ["raw-html", () => {return "The Amethyst Symbol Part<br>Encoder is producing"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShort(player.tlb.amethystSymbolPartsGain) + "</h3> Am.Sy.Prts per second."}, {color: "transparent", background: "linear-gradient(to bottom, #ff77ff, #ff00ff, #7f00ff, #3f007f)", fontSize: "14px", textStroke: "1px #ffddffab", 'textShadow': "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "(Based on Cosmic Core Fragments.)"}, {color: "#ffffff", fontSize: "13px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "10px"],
                                            ["raw-html", () => {
                                                let softcapStart = 10000
                                                if (player.tlb.amethystSymbolParts >= softcapStart)
                                                    return "You have<br><small>[SOFTCAPPED: +<h3>" + formatShort(player.tlb.amethystSymbolPartsSoftcapEffect) + "</h3> Breakdown Magnitude</small>]"
                                                    return "You have"
                                            }, {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShortWhole(player.tlb.amethystSymbolParts) + "</h3> Am.Sy.Prts."}, {color: "transparent", background: "linear-gradient(to bottom, #ff77ff, #ff00ff, #7f00ff, #3f007f)", fontSize: "16px", textStroke: "1px #ffddffab", 'textShadow': "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}]
                                        ]
                                    ],
                                ], {width: "300px", height: "180px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ffddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff00ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ]
                        ]
                    ]
                ]
            },
            // "Combinations": { // LATER
            //     buttonStyle() {return {color: "#000000", backgroundImage: "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset"}},
            //     unlocked() {return player.tlb.combinationsUnlocked == true},
            //     content: [
            //         ["blank", "5px"],
            //         ["row",
            //             [
            //                 ["raw-html", () => {return "You are currently in the"}, {color: "#ffffff", fontSize: "18px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
            //                 ["blank", "2px"],
            //                 ["raw-html", () => {return "-<u>Combinations</u>-."}, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
            //             ]
            //         ],
            //         ["blank", "10px"],
            //         ["style-column",
            //             [
            //                 ["row", [["clickable", "buyMaxOff2"], ["blank", "5px"], ["clickable", "buyMaxOn2"]]] // not implemented yet
            //             ]
            //         ],
            //         ["blank", "20px"],
            //         ["style-row",
            //             [
            //                 ["style-column",
            //                     [
            //                         ["column",
            //                             [
            //                                 ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
            //                             ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
            //                         ],
            //                         ["blank", "5px"],
            //                         ["column",
            //                             [
            //                                 ["raw-html", () => {return formatShortWhole(player.tlb.crimsonSymbols)}]
            //                             ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #ff7777, #ff0000, #ff007f, #7f003f)", fontSize: "22px", textStroke: "1px #ffddddab", 'textShadow': "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
            //                         ]
            //                     ], {width: "80px", height: "80px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffdddd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff000023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
            //                 ],
            //                 ["blank", "3px"],
            //                 ["style-column",
            //                     [
            //                         ["column",
            //                             [
            //                                 ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
            //                             ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
            //                         ],
            //                         ["blank", "5px"],
            //                         ["column",
            //                             [
            //                                 ["raw-html", () => {return formatShortWhole(player.tlb.goldSymbols)}]
            //                             ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #ffff77, #ffff00, #ff7f00, #7f3f00)", fontSize: "22px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #ffff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
            //                         ]
            //                     ], {width: "80px", height: "80px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ffff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
            //                 ],
            //                 ["blank", "3px"],
            //                 ["style-column",
            //                     [
            //                         ["column",
            //                             [
            //                                 ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
            //                             ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
            //                         ],
            //                         ["blank", "5px"],
            //                         ["column",
            //                             [
            //                                 ["raw-html", () => {return formatShortWhole(player.tlb.jadeSymbols)}]
            //                             ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #77ff77, #00ff00, #7fff00, #3f7f00)", fontSize: "22px", textStroke: "1px #ddffddab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
            //                         ]
            //                     ], {width: "80px", height: "80px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ddffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
            //                 ],
            //                 ["blank", "3px"],
            //                 ["style-column",
            //                     [
            //                         ["column",
            //                             [
            //                                 ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
            //                             ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
            //                         ],
            //                         ["blank", "5px"],
            //                         ["column",
            //                             [
            //                                 ["raw-html", () => {return formatShortWhole(player.tlb.celesteSymbols)}]
            //                             ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #77ffff, #00ffff, #00ff7f, #007f3f)", fontSize: "22px", textStroke: "1px #ddffffab", 'textShadow': "0 0 5px #00ffff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
            //                         ]
            //                     ], {width: "80px", height: "80px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ddffff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ffff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
            //                 ],
            //                 ["blank", "3px"],
            //                 ["style-column",
            //                     [
            //                         ["column",
            //                             [
            //                                 ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
            //                             ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
            //                         ],
            //                         ["blank", "5px"],
            //                         ["column",
            //                             [
            //                                 ["raw-html", () => {return formatShortWhole(player.tlb.cobaltSymbols)}]
            //                             ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #7777ff, #0000ff, #007fff, #003f7f)", fontSize: "22px", textStroke: "1px #ddddffab", 'textShadow': "0 0 5px #0000ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
            //                         ]
            //                     ], {width: "80px", height: "80px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ddddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #0000ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
            //                 ],
            //                 ["blank", "3px"],
            //                 ["style-column",
            //                     [
            //                         ["column",
            //                             [
            //                                 ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
            //                             ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
            //                         ],
            //                         ["blank", "5px"],
            //                         ["column",
            //                             [
            //                                 ["raw-html", () => {return formatShortWhole(player.tlb.amethystSymbols)}]
            //                             ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #ff77ff, #ff00ff, #7f00ff, #3f007f)", fontSize: "22px", textStroke: "1px #ffddffab", 'textShadow': "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
            //                         ]
            //                     ], {width: "80px", height: "80px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff00ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
            //                 ]
            //             ]
            //         ],
            //         ["blank", "20px"],
            //         ["style-row", // 
            //             [
            //                 ["column",
            //                     [
            //                         ["column",
            //                             [
            //                                 ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:70px;height:70px'></img>"],
            //                             ], {width: "80px", height: "80px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
            //                         ],
            //                         ["blank", "5px"],
            //                         ["column",
            //                             [
            //                                 ["raw-html", () => {return "Gold"}]
            //                             ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #ffff77, #ffff00, #ff7f00, #7f3f00)", fontSize: "22px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #ffff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
            //                         ]
            //                     ]
            //                 ],
            //                 ["row",
            //                     [], {width: "20px"}
            //                 ],
            //                 ["raw-html", () => {return "+"}, {fontSize: "50px", fontFamily: "monospace"}],
            //                 ["row",
            //                     [], {width: "20px"}
            //                 ],
            //                 ["column",
            //                     [
            //                         ["column",
            //                             [
            //                                 ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:70px;height:70px'></img>"],
            //                             ], {width: "80px", height: "80px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
            //                         ],
            //                         ["blank", "5px"],
            //                         ["column",
            //                             [
            //                                 ["raw-html", () => {return "Jade"}]
            //                             ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #77ff77, #00ff00, #7fff00, #3f7f00)", fontSize: "22px", textStroke: "1px #ddffddab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
            //                         ]
            //                     ]
            //                 ],
            //                 ["row",
            //                     [], {width: "20px"}
            //                 ],
            //                 ["raw-html", () => {return "="}, {fontSize: "50px", fontFamily: "monospace"}],
            //                 ["row",
            //                     [], {width: "20px"}
            //                 ],
            //                 ["column",
            //                     [
            //                         ["column",
            //                             [
            //                                 ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:70px;height:70px'></img>"],
            //                             ], {width: "80px", height: "80px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
            //                         ],
            //                         ["blank", "5px"],
            //                         ["column",
            //                             [
            //                                 ["raw-html", () => {return "Luck"}]
            //                             ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #ff7f00, #ffff00, #7fff00, #00ff00)", fontSize: "22px", 'textShadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
            //                         ]
            //                     ]
            //                 ],
            //                 ["row",
            //                     [], {width: "20px"}
            //                 ],
            //                 ["clickable", "meritAlter"]
            //             ], {width: "700px", height: "120px", border: "3px solid transparent", borderImage: "radial-gradient(ellipse, #000000 75%, #ffffff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
            //         ],
            //     ]
            // },
            "Bookshop": {
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
                    ["blank", "10px"],
                    () => {
                        if(player.tlb.firstTomeForce == false || player.tlb.firstTomeInsight == false || player.tlb.firstTomeMerit == false) {
                            return ["column",
                                [
                                    ["row",
                                        [["raw-html", "<u>☢ ⏻ ☘︎ ᖫ᯽ᖭ ✸ ₴ ✧</u>", {width: "100px"}]]
                                    ],
                                    ["row",
                                        [
                                            ["raw-html", "Perhaps there is a way to", {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "2px"],
                                            ["raw-html", "open the Study", {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "14px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "2px"],
                                            ["raw-html", "by", {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "2px"],
                                            ["raw-html", "buying <h3>3</h3> different types of tomes...", {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "14px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "2px"],
                                            ["raw-html", "(<h3>" + formatShortWhole(player.tlb.unlockCountStudy) + "</h3>/<h3>3</h3>)", {color: "#ffffff", fontSize: "14px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                        ]
                                    ],
                                    ["row",
                                        [["raw-html", "<u>☢ ⏻ ☘︎ ᖫ᯽ᖭ ✸ ₴ ✧</u>", {width: "100px"}]]
                                    ]
                                ]
                            ],
                            ["blank", "10px"]
                        }
                        else if(player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true)
                            return ""
                    },
                    ["style-column",
                        [
                            ["row", [["clickable", "buyMaxOff2"], ["blank", "5px"], ["clickable", "buyMaxOn2"]]]
                        ]
                    ],
                    ["blank", "20px"],
                    ["style-row",
                        [
                            ["style-column",
                                [
                                    ["column",
                                        [
                                            ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                        ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                    ],
                                    ["blank", "5px"],
                                    ["column",
                                        [
                                            ["raw-html", () => {return formatShortWhole(player.tlb.crimsonSymbols)}]
                                        ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #ff7777, #ff0000, #ff007f, #7f003f)", fontSize: "20px", textStroke: "1px #ffddddab", 'textShadow': "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                    ]
                                ], {width: "80px", height: "80px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffdddd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff000023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                            ],
                            ["blank", "3px"],
                            ["style-column",
                                [
                                    ["column",
                                        [
                                            ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                        ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                    ],
                                    ["blank", "5px"],
                                    ["column",
                                        [
                                            ["raw-html", () => {return formatShortWhole(player.tlb.goldSymbols)}]
                                        ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #ffff77, #ffff00, #ff7f00, #7f3f00)", fontSize: "20px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #ffff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                    ]
                                ], {width: "80px", height: "80px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ffff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                            ],
                            ["blank", "3px"],
                            ["style-column",
                                [
                                    ["column",
                                        [
                                            ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                        ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                    ],
                                    ["blank", "5px"],
                                    ["column",
                                        [
                                            ["raw-html", () => {return formatShortWhole(player.tlb.jadeSymbols)}]
                                        ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #77ff77, #00ff00, #7fff00, #3f7f00)", fontSize: "20px", textStroke: "1px #ddffddab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                    ]
                                ], {width: "80px", height: "80px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ddffdd) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ff0023, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                            ],
                            ["blank", "3px"],
                            ["style-column",
                                [
                                    ["column",
                                        [
                                            ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                        ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                    ],
                                    ["blank", "5px"],
                                    ["column",
                                        [
                                            ["raw-html", () => {return formatShortWhole(player.tlb.celesteSymbols)}]
                                        ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #77ffff, #00ffff, #00ff7f, #007f3f)", fontSize: "20px", textStroke: "1px #ddffffab", 'textShadow': "0 0 5px #00ffff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                    ]
                                ], {width: "80px", height: "80px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ddffff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #00ffff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                            ],
                            ["blank", "3px"],
                            ["style-column",
                                [
                                    ["column",
                                        [
                                            ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                        ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                    ],
                                    ["blank", "5px"],
                                    ["column",
                                        [
                                            ["raw-html", () => {return formatShortWhole(player.tlb.cobaltSymbols)}]
                                        ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #7777ff, #0000ff, #007fff, #003f7f)", fontSize: "20px", textStroke: "1px #ddddffab", 'textShadow': "0 0 5px #0000ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                    ]
                                ], {width: "80px", height: "80px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ddddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #0000ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                            ],
                            ["blank", "3px"],
                            ["style-column",
                                [
                                    ["column",
                                        [
                                            ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                        ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                    ],
                                    ["blank", "5px"],
                                    ["column",
                                        [
                                            ["raw-html", () => {return formatShortWhole(player.tlb.amethystSymbols)}]
                                        ], {width: "70px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #ff77ff, #ff00ff, #7f00ff, #3f007f)", fontSize: "20px", textStroke: "1px #ffddffab", 'textShadow': "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                    ]
                                ], {width: "80px", height: "80px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffddff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), linear-gradient(to top, #ff00ff23, transparent), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                            ]
                        ]
                    ],
                    ["blank", "20px"],
                    ["column",
                        [
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
                                                    ["column", 
                                                        [
                                                            ["row",
                                                                [
                                                                    ["column",
                                                                        [
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                                                                ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                                                            ],
                                                                            ["blank", "5px"],
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", () => {
                                                                                        let val1 = player.tlb.crimsonSymbols.div(player.tlb.baseCostsForceCr).floor()
                                                                                        let val2 = player.tlb.celesteSymbols.div(player.tlb.baseCostsForceCe).floor()
                                                                                        let result = val1
                                                                                        if(val2.lt(val1)) result = val2

                                                                                        if(hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true) {
                                                                                            return formatShortWhole(player.tlb.baseCostsForceCr.mul(result))
                                                                                            }
                                                                                        else {
                                                                                            return formatShortWhole(player.tlb.baseCostsForceCr)
                                                                                            } 
                                                                                        }
                                                                                    ]
                                                                                ], {width: "50px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #ff7777, #ff0000, #ff007f, #7f003f)", fontSize: "22px", textStroke: "1px #ffddddab", 'textShadow': "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                                            ]
                                                                        ]
                                                                    ],
                                                                    ["blank", "1px"],
                                                                    ["column",
                                                                        [
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                                                                ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                                                            ],
                                                                            ["blank", "5px"],
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", () => {
                                                                                        let val1 = player.tlb.crimsonSymbols.div(player.tlb.baseCostsForceCr).floor()
                                                                                        let val2 = player.tlb.celesteSymbols.div(player.tlb.baseCostsForceCe).floor()
                                                                                        let result = val1
                                                                                        if(val2.lt(val1)) result = val2

                                                                                        if(hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true) {
                                                                                            return formatShortWhole(player.tlb.baseCostsForceCe.mul(result))
                                                                                            }
                                                                                        else {
                                                                                            return formatShortWhole(player.tlb.baseCostsForceCe)
                                                                                            } 
                                                                                        }
                                                                                    ]
                                                                                ], {width: "50px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #77ffff, #00ffff, #00ff7f, #007f3f)", fontSize: "22px", textStroke: "1px #ddffffab", 'textShadow': "0 0 5px #00ffff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                                            ]
                                                                        ]
                                                                    ],
                                                                    ["blank", "1px"],
                                                                    ["column",
                                                                        [
                                                                            ["raw-html", "→"]
                                                                        ], {fontSize: "70px"}
                                                                    ],
                                                                    ["blank", "1px"],
                                                                    ["column",
                                                                        [
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                                                                ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                                                            ],
                                                                            ["blank", "5px"],
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", () => {
                                                                                        let val1 = player.tlb.crimsonSymbols.div(player.tlb.baseCostsForceCr).floor()
                                                                                        let val2 = player.tlb.celesteSymbols.div(player.tlb.baseCostsForceCe).floor()
                                                                                        let result = val1
                                                                                        if(val2.lt(val1)) result = val2

                                                                                        if (hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true)
                                                                                            return formatShortWhole(player.tlb.tomesForceGain.add(result))
                                                                                        else
                                                                                            return "1"
                                                                                        }
                                                                                    ]
                                                                                ], {width: "50px", height: "20px", color: "transparent", background: "linear-gradient(0deg, #6b4423, #9b541a)", fontSize: "22px", textStroke: "1px #f8c898ab", 'text-shadow': "0 0 5px #9b541a, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                                            ]
                                                                        ]
                                                                    ]
                                                                ]
                                                            ]
                                                        ], {width: "254px", height: "100px", backgroundImage: "radial-gradient(ellipse, #00000023, #000000cd 80%), linear-gradient(135deg, #aa000067 20%, transparent, #aaaaaa23, transparent, #00aaaa67 80%), repeating-linear-gradient(-45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), linear-gradient(0deg, #382413, #523116)"}
                                                    ],
                                                    ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #550000, #005555)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}]
                                                ]
                                            ],
                                            ["style-row", [["clickable", "forceTome"]], {width: "300px", height: "100px", backgroundImage: "radial-gradient(ellipse at 50% 0%, transparent, #000000ab), radial-gradient(ellipse at 50% 140%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 0% 100%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(to bottom, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 15px 15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset, 0 20px 10px 0 #00000078"}]
                                        ]
                                    ],
                                    ["style-row",[], {width: "10px"}],
                                    ["style-column",
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
                                                    ["column",
                                                        [
                                                            ["row",
                                                                [
                                                                    ["column",
                                                                        [
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                                                                ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                                                            ],
                                                                            ["blank", "5px"],
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", () => {
                                                                                        let val1 = player.tlb.goldSymbols.div(player.tlb.baseCostsInsightGl).floor()
                                                                                        let val2 = player.tlb.cobaltSymbols.div(player.tlb.baseCostsInsightCo).floor()
                                                                                        let result = val1
                                                                                        if(val2.lt(val1)) result = val2

                                                                                        if(hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true) {
                                                                                            return formatShortWhole(player.tlb.baseCostsInsightCo.mul(result))
                                                                                            }
                                                                                        else {
                                                                                            return formatShortWhole(player.tlb.baseCostsInsightCo)
                                                                                            } 
                                                                                        }
                                                                                    ]
                                                                                ], {width: "50px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #7777ff, #0000ff, #007fff, #003f7f)", fontSize: "22px", textStroke: "1px #ddddffab", 'textShadow': "0 0 5px #0000ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                                            ]
                                                                        ]
                                                                    ],
                                                                    ["blank", "1px"],
                                                                    ["column",
                                                                        [
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                                                                ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                                                            ],
                                                                            ["blank", "5px"],
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", () => {
                                                                                        let val1 = player.tlb.goldSymbols.div(player.tlb.baseCostsInsightGl).floor()
                                                                                        let val2 = player.tlb.cobaltSymbols.div(player.tlb.baseCostsInsightCo).floor()
                                                                                        let result = val1
                                                                                        if(val2.lt(val1)) result = val2

                                                                                        if(hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true) {
                                                                                            return formatShortWhole(player.tlb.baseCostsInsightGl.mul(result))
                                                                                            }
                                                                                        else {
                                                                                            return formatShortWhole(player.tlb.baseCostsInsightGl)
                                                                                            } 
                                                                                        }
                                                                                    ]
                                                                                ], {width: "50px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #ffff77, #ffff00, #ff7f00, #7f3f00)", fontSize: "22px", textStroke: "1px #ffffddab", 'textShadow': "0 0 5px #ffff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                                            ]
                                                                        ]
                                                                    ],
                                                                    ["blank", "1px"],
                                                                    ["column",
                                                                        [
                                                                            ["raw-html", "→"]
                                                                        ], {fontSize: "70px"}
                                                                    ],
                                                                    ["blank", "1px"],
                                                                    ["column",
                                                                        [
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                                                                ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                                                            ],
                                                                            ["blank", "5px"],
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", () => {
                                                                                        let val1 = player.tlb.goldSymbols.div(player.tlb.baseCostsInsightGl).floor()
                                                                                        let val2 = player.tlb.cobaltSymbols.div(player.tlb.baseCostsInsightCo).floor()
                                                                                        let result = val1
                                                                                        if(val2.lt(val1)) result = val2

                                                                                        if (hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true)
                                                                                            return formatShortWhole(player.tlb.tomesInsightGain.add(result))
                                                                                        else
                                                                                            return "1"
                                                                                        }
                                                                                    ]
                                                                                ], {width: "50px", height: "20px", color: "transparent", background: "linear-gradient(0deg, #6b4423, #9b541a)", fontSize: "22px", textStroke: "1px #f8c898ab", 'text-shadow': "0 0 5px #9b541a, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                                            ]
                                                                        ]
                                                                    ]
                                                                ]
                                                            ]
                                                        ], {width: "254px", height: "100px", backgroundImage: "radial-gradient(ellipse, #00000023, #000000cd 80%), linear-gradient(135deg, #0000aa67 20%, transparent, #aaaaaa23, transparent, #aaaa0067 80%), repeating-linear-gradient(-45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), linear-gradient(0deg, #382413, #523116)"}],
                                                    ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #000055, #555500)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}]
                                                ]
                                            ],
                                            ["style-row", [["clickable", "insightTome"]], {width: "300px", height: "100px", backgroundImage: "radial-gradient(ellipse at 50% 0%, transparent, #000000ab), radial-gradient(ellipse at 50% 140%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 0% 100%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(to bottom, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 15px 15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset, 0 20px 10px 0 #00000078"}]
                                        ]
                                    ],
                                    ["style-row", [], {width: "10px"}],
                                    ["style-column",
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
                                                    ["column",
                                                        [
                                                            ["row",
                                                                [
                                                                    ["column",
                                                                        [
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                                                                ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                                                            ],
                                                                            ["blank", "5px"],
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", () => {
                                                                                        let val1 = player.tlb.jadeSymbols.div(player.tlb.baseCostsMeritJd).floor()
                                                                                        let val2 = player.tlb.amethystSymbols.div(player.tlb.baseCostsMeritAm).floor()
                                                                                        let result = val1
                                                                                        if(val2.lt(val1)) result = val2

                                                                                        if(hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true) {
                                                                                            return formatShortWhole(player.tlb.baseCostsMeritJd.mul(result))
                                                                                            }
                                                                                        else {
                                                                                            return formatShortWhole(player.tlb.baseCostsMeritJd)
                                                                                            } 
                                                                                        }
                                                                                    ]
                                                                                ], {width: "50px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #77ff77, #00ff00, #7fff00, #3f7f00)", fontSize: "22px", textStroke: "1px #ddffddab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                                            ]
                                                                        ]
                                                                    ],
                                                                    ["blank", "1px"],
                                                                    ["column",
                                                                        [
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                                                                ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                                                            ],
                                                                            ["blank", "5px"],
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", () => {
                                                                                        let val1 = player.tlb.jadeSymbols.div(player.tlb.baseCostsMeritJd).floor()
                                                                                        let val2 = player.tlb.amethystSymbols.div(player.tlb.baseCostsMeritAm).floor()
                                                                                        let result = val1
                                                                                        if(val2.lt(val1)) result = val2

                                                                                        if(hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true) {
                                                                                            return formatShortWhole(player.tlb.baseCostsMeritAm.mul(result))
                                                                                            }
                                                                                        else {
                                                                                            return formatShortWhole(player.tlb.baseCostsMeritAm)
                                                                                            } 
                                                                                        }
                                                                                    ]
                                                                                ], {width: "50px", height: "20px", color: "transparent", background: "linear-gradient(to bottom, #ff77ff, #ff00ff, #7f00ff, #3f007f)", fontSize: "22px", textStroke: "1px #ffddffab", 'textShadow': "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                                            ]
                                                                        ]
                                                                    ],
                                                                    ["blank", "1px"],
                                                                    ["column",
                                                                        [
                                                                            ["raw-html", "→"]
                                                                        ], {fontSize: "70px"}
                                                                    ],
                                                                    ["blank", "1px"],
                                                                    ["column",
                                                                        [
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", "<img src='resources/alchemyworld/symbolNone.png'style='width:40px;height:40px'></img>"]
                                                                                ], {width: "50px", height: "50px", backgroundImage: "radial-gradient(circle, #000000cd 50%, transparent)"}
                                                                            ],
                                                                            ["blank", "5px"],
                                                                            ["column",
                                                                                [
                                                                                    ["raw-html", () => {
                                                                                        let val1 = player.tlb.jadeSymbols.div(player.tlb.baseCostsMeritJd).floor()
                                                                                        let val2 = player.tlb.amethystSymbols.div(player.tlb.baseCostsMeritAm).floor()
                                                                                        let result = val1
                                                                                        if(val2.lt(val1)) result = val2

                                                                                        if (hasUpgrade("tlb", 33) && player.tlb.buyMaxTomes == true)
                                                                                            return formatShortWhole(player.tlb.tomesMeritGain.add(result))
                                                                                        else
                                                                                            return "1"
                                                                                        }
                                                                                    ]
                                                                                ], {width: "50px", height: "20px", color: "transparent", background: "linear-gradient(0deg, #6b4423, #9b541a)", fontSize: "22px", textStroke: "1px #f8c898ab", 'text-shadow': "0 0 5px #9b541a, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}
                                                                            ]
                                                                        ]
                                                                    ]
                                                                ]
                                                            ]
                                                        ], {width: "254px", height: "100px", backgroundImage: "radial-gradient(ellipse, #00000023, #000000cd 80%), linear-gradient(135deg, #00aa0067 20%, transparent, #aaaaaa23, transparent, #aa00aa67 80%), repeating-linear-gradient(-45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #9b541aab 9%, #9b541aab 10%, #9b541a67 10%, #9b541a67 19%, #9b541aab 19%, #9b541aab 20%, transparent 20%, transparent 29%, #f8c898ab 29%, #f8c898ab 30%, #f8c89867 30%, #f8c89867 39%, #f8c898ab 39%, #f8c898ab 40%), linear-gradient(0deg, #382413, #523116)"}],
                                                    ["column", [], {width: "20px", height: "100px", backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10%, #78787878 10%, #ababab78 20%, transparent 20%), linear-gradient(to top, #005500, #550055)", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", boxShadow: "0 0 3px 3px #abababa6 inset, 0 0 6px 6px #000000 inset"}]
                                                    ]
                                            ],
                                            ["style-row", [["clickable", "meritTome"]], {width: "300px", height: "100px", backgroundImage: "radial-gradient(ellipse at 50% 0%, transparent, #000000ab), radial-gradient(ellipse at 50% 140%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 0% 100%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(to bottom, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 15px 15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset, 0 20px 10px 0 #00000078"}],
                                        ]
                                    ]
                                ]
                            ],
                            ["style-row", [[]], {width: "1100px", height: "175px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset", marginTop: "-100px"}]
                        ]
                    ]
                ]
            },
            "Study": {
                buttonStyle() {return {color: "#000000", backgroundImage: "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset"}},
                unlocked() {return player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true},
                content: [
                    ["blank", "5px"],
                    ["row",
                        [
                            ["raw-html", () => {return "You are currently in the"}, {color: "#ffffff", fontSize: "18px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                            ["blank", "2px"],
                            ["raw-html", () => {return "-<u>Study</u>-."}, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                        ]
                    ],
                    ["blank", "10px"],
                    ["column",
                        [
                            ["style-column", [], {width: "340px", height: "550px", background: "transparent", backgroundImage: "radial-gradient(circle, #000000 70%, transparent 100%), repeating-linear-gradient(-45deg, #772277 10px, #551155 20px)", border:"3px solid #330033", boxShadow: "0 0 5px 5px #330033a6 inset, 0 0 8px 8px #551155 inset, 0 0 20px 20px #00000050 inset", marginBottom: "-535px"}]
                        ]
                    ],
                    ["column",
                        [
                            ["row",
                                [
                                    ["style-column",
                                        [
                                            ["style-column",
                                                [
                                                    ["clickable", "forcePoints"],
                                                ], {width: "314px", height: "140px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #ff000023, transparent, #00ffff23), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                            ],
                                            ["style-column",
                                                [
                                                    [],
                                                ], {width: "10px", height: "10px"}
                                            ],
                                            ["style-row",
                                                [
                                                    ["style-column",
                                                        [
                                                            ["upgrade", 11],
                                                        ], {width: "150px", height: "150px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #ff000023, transparent, #00ffff23), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                                    ],
                                                    ["style-column",
                                                        [
                                                            [],
                                                        ], {width: "10px", height: "10px"}
                                                    ],
                                                    ["style-column",
                                                        [
                                                            ["upgrade", 12],
                                                        ], {width: "150px", height: "150px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #ff000023, transparent, #00ffff23), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                                    ]
                                                ]
                                            ],
                                            ["style-column",
                                                [
                                                    [],
                                                ], {width: "10px", height: "10px"}
                                            ],
                                            ["style-row",
                                                [
                                                    ["style-column",
                                                        [
                                                            ["upgrade", 13],
                                                        ], {width: "150px", height: "150px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #ff000023, transparent, #00ffff23), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                                    ],
                                                    ["style-column",
                                                        [
                                                            [],
                                                        ], {width: "10px", height: "10px"}
                                                    ],
                                                    ["style-column",
                                                        [
                                                            ["upgrade", 14],
                                                        ], {width: "150px", height: "150px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #ff000023, transparent, #00ffff23), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                                    ]
                                                ]
                                            ]
                                        ], {width: "340px", height: "500px", backgroundImage: "radial-gradient(ellipse at 50% -40%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at -10% 20%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", borderTop: "3px solid #b18961", borderLeft: "3px solid #b18961", borderBottom: "3px solid #b18961", borderRight: "3px solid #330033", borderRadius: "15px 0 0 15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}
                                    ],
                                    ["style-column",
                                        [
                                            ["style-column",
                                                [
                                                    ["clickable", "insightPoints"],
                                                ], {width: "314px", height: "140px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #0000ff23, transparent, #ffff0023), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                            ],
                                            ["style-column",
                                                [
                                                    [],
                                                ], {width: "10px", height: "10px"}
                                            ],
                                            ["style-row",
                                                [
                                                    ["style-column",
                                                        [
                                                            ["upgrade", 21],
                                                        ], {width: "150px", height: "150px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #0000ff23, transparent, #ffff0023), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                                    ],
                                                    ["style-column",
                                                        [
                                                            [],
                                                        ], {width: "10px", height: "10px"}
                                                    ],
                                                    ["style-column",
                                                        [
                                                            ["upgrade", 22],
                                                        ], {width: "150px", height: "150px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #0000ff23, transparent, #ffff0023), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                                    ]
                                                ]
                                            ],
                                            ["style-column",
                                                [
                                                    [],
                                                ], {width: "10px", height: "10px"}
                                            ],
                                            ["style-row",
                                                [
                                                    ["style-column",
                                                        [
                                                            ["upgrade", 23],
                                                        ], {width: "150px", height: "150px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #0000ff23, transparent, #ffff0023), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                                    ],
                                                    ["style-column",
                                                        [
                                                            [],
                                                        ], {width: "10px", height: "10px"}
                                                    ],
                                                    ["style-column",
                                                        [
                                                            ["upgrade", 24],
                                                        ], {width: "150px", height: "150px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #0000ff23, transparent, #ffff0023), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                                    ]
                                                ]
                                            ]
                                        ], {width: "340px", height: "500px", backgroundImage: "repeating-linear-gradient(-45deg, #772277 10px, #551155 20px)", borderTop: "3px solid #330333", borderBottom: "3px solid #330033", boxShadow: "0 0 5px 5px #330033a6 inset, 0 0 8px 8px #551155 inset, 0 0 20px 20px #00000050 inset"}
                                    ],
                                    ["style-column",
                                        [
                                            ["style-column",
                                                [
                                                    ["clickable", "meritPoints"],
                                                ], {width: "314px", height: "140px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #00ff0023, transparent, #ff00ff23), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                            ],
                                            ["style-column",
                                                [
                                                    [],
                                                ], {width: "10px", height: "10px"}
                                            ],
                                            ["style-row",
                                                [
                                                    ["style-column",
                                                        [
                                                            ["upgrade", 31],
                                                        ], {width: "150px", height: "150px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #00ff0023, transparent, #ff00ff23), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                                    ],
                                                    ["style-column",
                                                        [
                                                            [],
                                                        ], {width: "10px", height: "10px"}
                                                    ],
                                                    ["style-column",
                                                        [
                                                            ["upgrade", 32],
                                                        ], {width: "150px", height: "150px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #00ff0023, transparent, #ff00ff23), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                                    ]
                                                ]
                                            ],
                                            ["style-column",
                                                [
                                                    [],
                                                ], {width: "10px", height: "10px"}
                                            ],
                                            ["style-row",
                                                [
                                                    ["style-column",
                                                        [
                                                            ["upgrade", 33],
                                                        ], {width: "150px", height: "150px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #00ff0023, transparent, #ff00ff23), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                                    ],
                                                    ["style-column",
                                                        [
                                                            [],
                                                        ], {width: "10px", height: "10px"}
                                                    ],
                                                    ["style-column",
                                                        [
                                                            ["upgrade", 34],
                                                        ], {width: "150px", height: "150px", backgroundImage: "linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(150deg, #00ff0023, transparent, #ff00ff23), repeating-linear-gradient(45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(-45deg, transparent, #00000022 5px, transparent 10px), repeating-linear-gradient(45deg, transparent, #00000022 5px), repeating-linear-gradient(-45deg, transparent, #00000022 5px), linear-gradient(to top, #787878, #ababab, #ededed)", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}
                                                    ]
                                                ]
                                            ]
                                        ], {width: "340px", height: "500px", backgroundImage: "radial-gradient(ellipse at 50% 140%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 110% 80%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(180deg, #382413, #523116)", borderLeft: "3px solid #330033", borderRight: "3px solid #b18961", borderTop: "3px solid #b18961", borderBottom: "3px solid #b18961", borderRadius: "0 15px 15px 0", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}
                                    ]
                                ]
                            ]
                        ], {width: "1050px", height: "510px"}
                    ],
                ]
            }
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
