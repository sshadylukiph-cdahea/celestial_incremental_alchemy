addLayer("ssp", {
    name: "Symbol Space",
    symbol: "🝪",
    row: 1,
    universe: "LU",
    position: 0,
    startData() {return {
        unlocked: true,

        // unlock arcane table
        earthReq1Get: false,
        earthReq2Get: false,
        earthReq3Get: false,
        earthReq4Get: false,
        waterReq1Get: false,
        waterReq2Get: false,
        waterReq3Get: false,
        waterReq4Get: false,
        airReq1Get: false,
        airReq2Get: false,
        airReq3Get: false,
        airReq4Get: false,
        fireReq1Get: false,
        fireReq2Get: false,
        fireReq3Get: false,
        fireReq4Get: false,
        earthOrbCount: new Decimal(0),
        waterOrbCount: new Decimal(0),
        airOrbCount: new Decimal(0),
        fireOrbCount: new Decimal(0),
        earthUnlocked: false,
        waterUnlocked: false,
        airUnlocked: false,
        fireUnlocked: false,
        thaumicOrbCount: new Decimal(0),
        thaumicOrbHit: new Decimal(0),
        arcaneTableUnlocked: false,

        // anti-autoclick cheese
        canAlSyReset: false,

        // alchemical symbol generation
        alchemicalSymbols: new Decimal(0),
        alchemicalSymbolsGain: new Decimal(0),

        // advanced alchemical symbol generation
        advAlchemicalSymbols: new Decimal(0),
        advAlchemicalSymbolsGain: new Decimal(0),
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
    tooltip() {
        if(player.ssp.arcaneTableUnlocked == true)
            return "Symbol Space"
        else
            return "?????? ?????"
    },
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
    clickables: {
        thaumicOrb: { // activation button
            title() {
                if(player.ssp.arcaneTableUnlocked == true && player.ssp.earthUnlocked == true && player.ssp.waterUnlocked == true && player.ssp.airUnlocked == true && player.ssp.fireUnlocked == true)
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-OrbBROKEN.png' style='width:80px;height:80px;margin-top:4px'></img>"
                else if(player.ssp.arcaneTableUnlocked == false && player.ssp.earthUnlocked == true && player.ssp.waterUnlocked == true && player.ssp.airUnlocked == true && player.ssp.fireUnlocked == true)
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-OrbON.png' style='width:80px;height:80px;margin-top:4px'></img>"
                else
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-OrbOFF.png' style='width:80px;height:80px;margin-top:4px'></img>"
            },
            canClick() {return player.ssp.arcaneTableUnlocked == false && player.ssp.earthUnlocked == true && player.ssp.waterUnlocked == true && player.ssp.airUnlocked == true && player.ssp.fireUnlocked == true},
            unlocked() {return true},
            tooltip() {
                if(player.ssp.arcaneTableUnlocked == true && player.ssp.earthUnlocked == true && player.ssp.waterUnlocked == true && player.ssp.airUnlocked == true && player.ssp.fireUnlocked == true)
                    return "The Thaumic Orb is BROKEN!<br><u>Louki-syhda</u> has been freed!"
                else if(this.canClick()) {
                    if(player.ssp.thaumicOrbHit <= 0)
                        return "Break the ??????? ??? imprisoning<br><u>?????-?????</u>!<br><br>Assemble the elemental forks and place them near the ??????? ???!<br>[0/3]"
                    else if(player.ssp.thaumicOrbHit >= 1 || player.ssp.thaumicOrbHit <= 2)
                        return "Break the ??????? ??? imprisoning<br><u>?????-?????</u>!<br><br>Aim the forks towards the ??????? ???!<br>[" + formatShortWhole(player.ssp.thaumicOrbHit) + "/3]"
                }   
                else
                    return "You have broken " + formatShortWhole(player.ssp.thaumicOrbCount) + " / 4 Elemental Orbs to activate the ??????? ???."
            },
            onClick() { 
                player.ssp.thaumicOrbHit = player.ssp.thaumicOrbHit.add(1)
                if(player.ssp.thaumicOrbHit >= 3) player.ssp.arcaneTableUnlocked = true
            },
            style() {
                if(player.ssp.arcaneTableUnlocked == true && player.ssp.earthUnlocked == true && player.ssp.waterUnlocked == true && player.ssp.airUnlocked == true && player.ssp.fireUnlocked == true)
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff55 10%, transparent 70%), radial-gradient(circle, #ff00ff 10%, transparent 70%)", borderRadius: "100px"}
                else if(player.ssp.arcaneTableUnlocked == false && player.ssp.earthUnlocked == true && player.ssp.waterUnlocked == true && player.ssp.airUnlocked == true && player.ssp.fireUnlocked == true)
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff33 10%, transparent 70%), radial-gradient(circle, #ff00ff33 10%, transparent 70%)", borderRadius: "100px"}
                else
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff33 10%, transparent 70%)", borderRadius: "100px"}
            }
        },
        earthOrb: { // activation button
            title() {
                if(player.ssp.earthUnlocked == true && player.ssp.earthReq1Get == true && player.ssp.earthReq2Get == true && player.ssp.earthReq3Get == true && player.ssp.earthReq4Get == true)
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-EarthBROKEN.png' style='width:80px;height:80px;margin-top:4px'></img>"
                else if(player.ssp.earthUnlocked == false && player.ssp.earthReq1Get == true && player.ssp.earthReq2Get == true && player.ssp.earthReq3Get == true && player.ssp.earthReq4Get == true)
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-EarthON.png' style='width:80px;height:80px;margin-top:4px'></img>"
                else
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-EarthOFF.png' style='width:80px;height:80px;margin-top:4px'></img>"
            },
            canClick() {return player.ssp.earthUnlocked == false && player.ssp.earthReq1Get == true && player.ssp.earthReq2Get == true && player.ssp.earthReq3Get == true && player.ssp.earthReq4Get == true},
            unlocked() {return true},
            branches() {
                if(player.ssp.earthUnlocked == true)
                    return [["thaumicOrb", "#008e4b"]]
                else if(this.canClick())
                    return [["thaumicOrb", "#008e4b55"]]
                else
                    return [["thaumicOrb", "#ffffff11"]]
            },
            tooltip() {
                if(player.ssp.earthOrbCount >= 4 && player.ssp.earthUnlocked == true)
                    return "The Earth Orb is BROKEN!"
                else if(player.ssp.earthOrbCount >= 4 && player.ssp.earthUnlocked == false)
                    return "Break the Earth Orb using the Earth Fork!"
                else
                    return "You have met " + formatShortWhole(player.ssp.earthOrbCount) + " / 4 requirements to activate the Earth Orb."
            },
            onClick() { 
                player.ssp.earthUnlocked = true
                player.ssp.thaumicOrbCount = player.ssp.thaumicOrbCount.add(1)
            },
            style() {
                if(player.ssp.earthUnlocked == true && player.ssp.earthReq1Get == true && player.ssp.earthReq2Get == true && player.ssp.earthReq3Get == true && player.ssp.earthReq4Get == true)
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff55 10%, transparent 70%), radial-gradient(circle, #008e4b 10%, transparent 70%)", borderRadius: "100px"}
                else if(this.canClick())
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff33 10%, transparent 70%), radial-gradient(circle, #008e4b55 10%, transparent 70%)", borderRadius: "100px"}
                else
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff33 10%, transparent 70%)", borderRadius: "100px"}
            }
        },
        waterOrb: { // activation button
            title() {
                if(player.ssp.waterUnlocked == true && player.ssp.waterReq1Get == true && player.ssp.waterReq2Get == true && player.ssp.waterReq3Get == true && player.ssp.waterReq4Get == true)
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-WaterBROKEN.png' style='width:80px;height:80px;margin-top:4px'></img>"
                else if(player.ssp.waterUnlocked == false && player.ssp.waterReq1Get == true && player.ssp.waterReq2Get == true && player.ssp.waterReq3Get == true && player.ssp.waterReq4Get == true)
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-WaterON.png' style='width:80px;height:80px;margin-top:4px'></img>"
                else
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-WaterOFF.png' style='width:80px;height:80px;margin-top:4px'></img>"
            },
            canClick() {return player.ssp.waterUnlocked == false && player.ssp.waterReq1Get == true && player.ssp.waterReq2Get == true && player.ssp.waterReq3Get == true && player.ssp.waterReq4Get == true},
            unlocked() {return true},
            branches() {
                if(player.ssp.waterUnlocked == true)
                    return [["thaumicOrb", "#1d8eb3"]]
                else if(this.canClick())
                    return [["thaumicOrb", "#1d8eb355"]]
                else
                    return [["thaumicOrb", "#ffffff11"]]
            },
            tooltip() {
                if(player.ssp.waterOrbCount >= 4 && player.ssp.waterUnlocked == true)
                    return "The Water Orb is BROKEN!"
                else if(player.ssp.waterOrbCount >= 4 && player.ssp.waterUnlocked == false)
                    return "Break the Water Orb using the Water Fork!"
                else
                    return "You have met " + formatShortWhole(player.ssp.waterOrbCount) + " / 4 requirements to activate the Water Orb."
            },
            onClick() { 
                player.ssp.waterUnlocked = true
                player.ssp.thaumicOrbCount = player.ssp.thaumicOrbCount.add(1)
            },
            style() {
                if(player.ssp.waterUnlocked == true && player.ssp.waterReq1Get == true && player.ssp.waterReq2Get == true && player.ssp.waterReq3Get == true && player.ssp.waterReq4Get == true)
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff55 10%, transparent 70%), radial-gradient(circle, #1d8eb3 10%, transparent 70%)", borderRadius: "100px"}
               else if(this.canClick())
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff33 10%, transparent 70%), radial-gradient(circle, #1d8eb355 10%, transparent 70%)", borderRadius: "100px"}
                else
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff33 10%, transparent 70%)", borderRadius: "100px"}
            }
        },
        airOrb: { // activation button
            title() {
                if(player.ssp.airUnlocked == true && player.ssp.airReq1Get == true && player.ssp.airReq2Get == true && player.ssp.airReq3Get == true && player.ssp.airReq4Get == true)
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-AirBROKEN.png' style='width:80px;height:80px;margin-top:4px'></img>"
                else if(player.ssp.airUnlocked == false && player.ssp.airReq1Get == true && player.ssp.airReq2Get == true && player.ssp.airReq3Get == true && player.ssp.airReq4Get == true)
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-AirON.png' style='width:80px;height:80px;margin-top:4px'></img>"
                else
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-AirOFF.png' style='width:80px;height:80px;margin-top:4px'></img>"
            },
            canClick() {return player.ssp.airUnlocked == false && player.ssp.airReq1Get == true && player.ssp.airReq2Get == true && player.ssp.airReq3Get == true && player.ssp.airReq4Get == true},
            unlocked() {return true},
            branches() {
                if(player.ssp.airUnlocked == true)
                    return [["thaumicOrb", "#c7c796"]]
                else if(this.canClick())
                    return [["thaumicOrb", "#c7c79655"]]
                else
                    return [["thaumicOrb", "#ffffff11"]]
            },
            tooltip() {
                if(player.ssp.airOrbCount >= 4 && player.ssp.airUnlocked == true)
                    return "The Air Orb is BROKEN!"
                else if(player.ssp.airOrbCount >= 4 && player.ssp.airUnlocked == false)
                    return "Break the Air Orb using the Air Fork!"
                else
                    return "You have met " + formatShortWhole(player.ssp.airOrbCount) + " / 4 requirements to activate the Air Orb."
            },
            onClick() { 
                player.ssp.airUnlocked = true
                player.ssp.thaumicOrbCount = player.ssp.thaumicOrbCount.add(1)
            },
            style() {
                if(player.ssp.airUnlocked == true)
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff55 10%, transparent 70%), radial-gradient(circle, #c7c796 10%, transparent 70%)", borderRadius: "100px"}
                else if(this.canClick())
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff33 10%, transparent 70%), radial-gradient(circle, #c7c79655 10%, transparent 70%)", borderRadius: "100px"}
                else
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff33 10%, transparent 70%)", borderRadius: "100px"}
            }
        },
        fireOrb: { // activation button
            title() {
                if(player.ssp.fireUnlocked == true && player.ssp.fireReq1Get == true && player.ssp.fireReq2Get == true && player.ssp.fireReq3Get == true && player.ssp.fireReq4Get == true)
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-FireBROKEN.png' style='width:80px;height:80px;margin-top:4px'></img>"
                else if(player.ssp.fireUnlocked == false && player.ssp.fireReq1Get == true && player.ssp.fireReq2Get == true && player.ssp.fireReq3Get == true && player.ssp.fireReq4Get == true)
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-FireON.png' style='width:80px;height:80px;margin-top:4px'></img>"
                else
                    return "<img src='resources/alchemyworld/alcNode-Thaumic-Orb-FireOFF.png' style='width:80px;height:80px;margin-top:4px'></img>"
            },
            canClick() {return player.ssp.fireUnlocked == false && player.ssp.fireReq1Get == true && player.ssp.fireReq2Get == true && player.ssp.fireReq3Get == true && player.ssp.fireReq4Get == true},
            unlocked() {return true},
            branches() {
                if(player.ssp.fireUnlocked == true)
                    return [["thaumicOrb", "#c7442f"]]
                else if(this.canClick())
                    return [["thaumicOrb", "#c7442f55"]]
                else
                    return [["thaumicOrb", "#ffffff11"]]
            },
            tooltip() {
                if(player.ssp.fireOrbCount >= 4 && player.ssp.fireUnlocked == true)
                    return "The Fire Orb is BROKEN!"
                else if(player.ssp.fireOrbCount >= 4 && player.ssp.fireUnlocked == false)
                    return "Break the Fire Orb using the Fire Fork!"
                else
                    return "You have met " + formatShortWhole(player.ssp.fireOrbCount) + " / 4 requirements to activate the Fire Orb."
            },
            onClick() { 
                player.ssp.fireUnlocked = true
                player.ssp.thaumicOrbCount = player.ssp.thaumicOrbCount.add(1)
            },
            style() {
                if(player.ssp.fireUnlocked == true)
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff55 10%, transparent 70%), radial-gradient(circle, #c7442f 10%, transparent 70%)", borderRadius: "100px"}
                else if(this.canClick())
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff33 10%, transparent 70%), radial-gradient(circle, #c7442f55 10%, transparent 70%)", borderRadius: "100px"}
                else
                    return {width: "100px", minHeight: "100px", border: "transparent", backgroundColor: "transparent", backgroundImage: "radial-gradient(circle, #ffffff33 10%, transparent 70%)", borderRadius: "100px"}
            }
        },
        earthOrbReq1: {
            title() {return "Req.1"},
            canClick() {return player.ssp.earthReq1Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.ssp.earthReq1Get == true) return [["earthOrb", "#008e4b"]]
                else if (this.canClick()) return [["earthOrb", "#008e4b55"]]
                else return [["earthOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.earthReq1Get = true
                player.ssp.earthOrbCount = player.ssp.earthOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.earthReq1Get == true) {
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
            title() {return "Req.2"},
            canClick() {return player.ssp.earthReq2Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.ssp.earthReq2Get == true) return [["earthOrb", "#008e4b"]]
                else if (this.canClick()) return [["earthOrb", "#008e4b55"]]
                else return [["earthOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.earthReq2Get = true
                player.ssp.earthOrbCount = player.ssp.earthOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.earthReq2Get == true) {
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
            title() {return "Req.3"},
            canClick() {return player.ssp.earthReq3Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.ssp.earthReq3Get == true) return [["earthOrb", "#008e4b"]]
                else if (this.canClick()) return [["earthOrb", "#008e4b55"]]
                else return [["earthOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.earthReq3Get = true
                player.ssp.earthOrbCount = player.ssp.earthOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.earthReq3Get == true) {
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
            title() {return "Req.4"},
            canClick() {return player.ssp.earthReq4Get == false},  
            unlocked() {return true},
            branches() {
                if(player.ssp.earthReq4Get == true) return [["earthOrb", "#008e4b"]]
                else if (this.canClick()) return [["earthOrb", "#008e4b55"]]
                else return [["earthOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.earthReq4Get = true
                player.ssp.earthOrbCount = player.ssp.earthOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.earthReq4Get == true) {
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
        waterOrbReq1: {
            title() {return "Req.1"},
            canClick() {return player.ssp.waterReq1Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.ssp.waterReq1Get == true) return [["waterOrb", "#1d8eb3"]]
                else if (this.canClick()) return [["waterOrb", "#1d8eb355"]]
                else return [["waterOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.waterReq1Get = true
                player.ssp.waterOrbCount = player.ssp.waterOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.waterReq1Get == true) {
                look.background = "linear-gradient(to bottom, #0000ff, #0000bb, #000055";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #1d8eb3, #000000) 1";
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
        waterOrbReq2: {
            title() {return "Req.2"},
            canClick() {return player.ssp.waterReq2Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.ssp.waterReq2Get == true) return [["waterOrb", "#1d8eb3"]]
                else if (this.canClick()) return [["waterOrb", "#1d8eb355"]]
                else return [["waterOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.waterReq2Get = true
                player.ssp.waterOrbCount = player.ssp.waterOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.waterReq2Get == true) {
                look.background = "linear-gradient(to bottom, #0000ff, #0000bb, #000055";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #1d8eb3, #000000) 1";
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
        waterOrbReq3: {
            title() {return "Req.3"},
            canClick() {return player.ssp.waterReq3Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.ssp.waterReq3Get == true) return [["waterOrb", "#1d8eb3"]]
                else if (this.canClick()) return [["waterOrb", "#1d8eb355"]]
                else return [["waterOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.waterReq3Get = true
                player.ssp.waterOrbCount = player.ssp.waterOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.waterReq3Get == true) {
                look.background = "linear-gradient(to bottom, #0000ff, #0000bb, #000055";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #1d8eb3, #000000) 1";
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
        waterOrbReq4: {
            title() {return "Req.4"},
            canClick() {return player.ssp.waterReq4Get == false},  
            unlocked() {return true},
            branches() {
                if(player.ssp.waterReq4Get == true) return [["waterOrb", "#1d8eb3"]]
                else if (this.canClick()) return [["waterOrb", "#1d8eb355"]]
                else return [["waterOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.waterReq4Get = true
                player.ssp.waterOrbCount = player.ssp.waterOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.waterReq4Get == true) {
                look.background = "linear-gradient(to bottom, #0000ff, #0000bb, #000055";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #1d8eb3, #000000) 1";
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
        airOrbReq1: {
            title() {return "Req.1"},
            canClick() {return player.ssp.airReq1Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.ssp.airReq1Get == true) return [["airOrb", "#c7c796"]]
                else if (this.canClick()) return [["airOrb", "#c7c79655"]]
                else return [["airOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.airReq1Get = true
                player.ssp.airOrbCount = player.ssp.airOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.airReq1Get == true) {
                look.background = "linear-gradient(to bottom, #ffff00, #bbbb00, #555500";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #c7c796, #000000) 1";
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
        airOrbReq2: {
            title() {return "Req.2"},
            canClick() {return player.ssp.airReq2Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.ssp.airReq2Get == true) return [["airOrb", "#c7c796"]]
                else if (this.canClick()) return [["airOrb", "#c7c79655"]]
                else return [["airOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.airReq2Get = true
                player.ssp.airOrbCount = player.ssp.airOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.airReq2Get == true) {
                look.background = "linear-gradient(to bottom, #ffff00, #bbbb00, #555500";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #c7c796, #000000) 1";
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
        airOrbReq3: {
            title() {return "Req.3"},
            canClick() {return player.ssp.airReq3Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.ssp.airReq3Get == true) return [["airOrb", "#c7c796"]]
                else if (this.canClick()) return [["airOrb", "#c7c79655"]]
                else return [["airOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.airReq3Get = true
                player.ssp.airOrbCount = player.ssp.airOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.airReq3Get == true) {
                look.background = "linear-gradient(to bottom, #ffff00, #bbbb00, #555500";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #c7c796, #000000) 1";
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
        airOrbReq4: {
            title() {return "Req.4"},
            canClick() {return player.ssp.airReq4Get == false},  
            unlocked() {return true},
            branches() {
                if(player.ssp.airReq4Get == true) return [["airOrb", "#c7c796"]]
                else if (this.canClick()) return [["airOrb", "#c7c79655"]]
                else return [["airOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.airReq4Get = true
                player.ssp.airOrbCount = player.ssp.airOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.airReq4Get == true) {
                look.background = "linear-gradient(to bottom, #ffff00, #bbbb00, #555500";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #c7c796, #000000) 1";
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
        fireOrbReq1: {
            title() {return "Req.1"},
            canClick() {return player.ssp.fireReq1Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.ssp.fireReq1Get == true) return [["fireOrb", "#c7442f"]]
                else if (this.canClick()) return [["fireOrb", "#c7442f55"]]
                else return [["fireOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.fireReq1Get = true
                player.ssp.fireOrbCount = player.ssp.fireOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.fireReq1Get == true) {
                look.background = "linear-gradient(to bottom, #ff0000, #bb0000, #550000";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #c7442f, #000000) 1";
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
        fireOrbReq2: {
            title() {return "Req.2"},
            canClick() {return player.ssp.fireReq2Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.ssp.fireReq2Get == true) return [["fireOrb", "#c7442f"]]
                else if (this.canClick()) return [["fireOrb", "#c7442f55"]]
                else return [["fireOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.fireReq2Get = true
                player.ssp.fireOrbCount = player.ssp.fireOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.fireReq2Get == true) {
                look.background = "linear-gradient(to bottom, #ff0000, #bb0000, #550000";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #c7442f, #000000) 1";
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
        fireOrbReq3: {
            title() {return "Req.3"},
            canClick() {return player.ssp.fireReq3Get == false}, 
            unlocked() {return true},
            branches() {
                if(player.ssp.fireReq3Get == true) return [["fireOrb", "#c7442f"]]
                else if (this.canClick()) return [["fireOrb", "#c7442f55"]]
                else return [["fireOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.fireReq3Get = true
                player.ssp.fireOrbCount = player.ssp.fireOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.fireReq3Get == true) {
                look.background = "linear-gradient(to bottom, #ff0000, #bb0000, #550000";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #c7442f, #000000) 1";
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
        fireOrbReq4: {
            title() {return "Req.4"},
            canClick() {return player.ssp.fireReq4Get == false},  
            unlocked() {return true},
            branches() {
                if(player.ssp.fireReq4Get == true) return [["fireOrb", "#c7442f"]]
                else if (this.canClick()) return [["fireOrb", "#c7442f55"]]
                else return [["fireOrb", "#ffffff11"]]
            },
            onClick() { 
                player.ssp.fireReq4Get = true
                player.ssp.fireOrbCount = player.ssp.fireOrbCount.add(1)
            },
            style() {
            let look = {width: '100px', minHeight: '100px', fontSize: "8px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px"}
            if(player.ssp.fireReq4Get == true) {
                look.background = "linear-gradient(to bottom, #ff0000, #bb0000, #550000";
                look.borderColor = "transparent";
                look.borderImage = "linear-gradient(to bottom, #c7442f, #000000) 1";
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
        encoder1: {
            title() {
                if(player.ssp.arcaneTableUnlocked == true) {
                    if(player.ssp.alchemicalSymbolsGain == 1)
                        return "<h2>Symbol Encoder I</h2><hr>Encode <h2>" + formatWhole(player.ssp.alchemicalSymbolsGain) + "</h2><br>🝪 Al.Sy 🝪.<br><br><small>(Req.: e10,000,000 Cel.Pts.)</small>"
                    else
                        return "<h2>Symbol Encoder I</h2><hr>Encode <h2>" + formatWhole(player.ssp.alchemicalSymbolsGain) + "</h2><br>🝪 Al.Sys 🝪.<br><br><small>(Req.: e10,000,000 Cel.Pts.)</small>"
                }
                else
                    return "<h2>You haven't unlocked this button yet!</h2>"
            },
            canClick() {return player.ssp.arcaneTableUnlocked == true && player.ssp.canAlSyReset == true && player.points.gte("e10000000")},
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
            title () {return hasUpgrade("ssp", 101) ? "<h3>Symbolwriter</h3><br>[PURCHASED]" : player.ssp.alchemicalSymbols >= 50 ? "<h3>Symbolicraft</h3>" : "<h3>??????</h3>"},
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
            title () {return hasUpgrade("ssp", 102) ? "<h3>Alchemicraft</h3><br>[PURCHASED]" : (hasUpgrade("ssp", 101) && player.tlb.revelationPoints >= 1000) && (player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true) ? "<h3>Alchemfactory</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (hasUpgrade("ssp", 101) && player.tlb.revelationPoints >= 1000) && (player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true) || hasUpgrade("ssp", 102) ? "<hr>Unlocks the ability to craft alchemical nodes." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(1000),
            currencyLocation() {return player.tlb},
            currencyDisplayName() {
                if (hasUpgrade("ssp", 101) && (player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true))
                    return "⚿ Rev.Pts ⚿"
                else
                    return "??????"
            },
            currencyInternalName: "revelationPoints",
            canAfford() {return hasUpgrade("ssp", 101) && (player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true)},
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
            title () {return hasUpgrade("ssp", 103) ? "<h3>Starmetalism</h3><br>[PURCHASED]" : (hasUpgrade("ssp", 102) && player.tlb.revelationPoints >= 5000) ? "<h3>Starmetalism</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (hasUpgrade("ssp", 102) && player.tlb.revelationPoints >= 5000) || hasUpgrade("ssp", 103) ? "<hr>Unlocks the art of Elemental Starmetal Transmutation." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(5000),
            currencyLocation() {return player.tlb},
            currencyDisplayName() {
                if (hasUpgrade("ssp", 101) && (player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true))
                    return "⚿ Rev.Pts ⚿"
                else
                    return "??????"
            },
            currencyInternalName: "revelationPoints",
            canAfford() {return hasUpgrade("ssp", 102)},
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
            title () {return hasUpgrade("ssp", 104) ? "<h3>Pagefinder</h3><br>[PURCHASED]" : (hasUpgrade("ssp", 103) && player.tlb.revelationPoints >= 37500) || hasUpgrade("ssp", 104) ? "<h3>Pagefinder</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (hasUpgrade("ssp", 103) && player.tlb.revelationPoints >= 37500) || hasUpgrade("ssp", 104) ? "<hr>Unlocks more alteration options and bargaining mechanics." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(37500),
            currencyLocation() {return player.tlb},
            currencyDisplayName() {
                if (hasUpgrade("ssp", 101) && (player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true))
                    return "⚿ Rev.Pts ⚿"
                else
                    return "??????"
            },
            currencyInternalName: "revelationPoints",
            canAfford() {return hasUpgrade("ssp", 103)},
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
            title () {return hasUpgrade("ssp", 105) ? "<h3>Synthetoner</h3><br>[PURCHASED]" : (hasUpgrade("ssp", 104) && player.ssp.advAlchemicalSymbols >= 100) ? "<h3>Synthetoner</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (hasUpgrade("ssp", 104) && player.ssp.advAlchemicalSymbols >= 100) || hasUpgrade("ssp", 105) ? "<hr>Unlocks the Syntheton Trinkets." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(100),
            currencyLocation() {return player.ssp},
            currencyDisplayName() {
                if (hasUpgrade("ssp", 104))
                    return "✩🝪 Adv.Al.Sys 🝪✩"
                else
                    return "??????"
            },
            currencyInternalName: "advAlchemicalSymbols",
            canAfford() {return hasUpgrade("ssp", 104)},
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
            title () {return hasUpgrade("ssp", 106) ? "<h3>Elemenfusion</h3><br>[PURCHASED]" : (hasUpgrade("ssp", 105) && player.tlb.revelationPoints >= 1500000) ? "<h3>Elemenfusion</h3>" : "<h3>??????</h3>"},
            unlocked() {return true},
            description () {return (hasUpgrade("ssp", 105) && player.tlb.revelationPoints >= 1500000) || hasUpgrade("ssp", 106) ? "<hr>Unlocks the 1st Order Elemental Starmetal Alterations in the Alchemy Altar." : "<hr><i>You haven't unlocked this Symbol Space upgrade yet!</i>"},
            cost: new Decimal(1500000),
            currencyLocation() {return player.tlb},
            currencyDisplayName() {
                if (hasUpgrade("ssp", 101) && (player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true))
                    return "⚿ Rev.Pts ⚿"
                else
                    return "??????"
            },
            currencyInternalName: "revelationPoints",
            canAfford() {return hasUpgrade("ssp", 105)},
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
            "Forgotten Chamber": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "5px"],
                    ["row",
                        [
                            ["raw-html", () => {return "You are currently in the"}, {color: "#ffffff", fontSize: "18px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                            ["blank", "2px"],
                            ["raw-html", () => {return "-<u>Forgotten Chamber</u>-."}, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                        ]
                    ],
                    ["blank", "10px"],
                    ["column",
                        [
                            ["column",
                                [
                                    ["row",
                                        [
                                            ["column",
                                                [
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "fireOrbReq2"],
                                                                ], {width: "100px", height: "100px"}
                                                            ]
                                                        ]
                                                    ],
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "fireOrbReq1"],
                                                                ], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ]
                                                        ]
                                                    ]
                                                ]
                                            ],
                                            ["raw-html", () => {
                                                if(player.ssp.thaumicOrbHit == 0 && player.ssp.fireUnlocked == true && player.ssp.fireReq1Get == true && player.ssp.fireReq2Get == true && player.ssp.fireReq3Get == true && player.ssp.fireReq4Get == true)
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-Radioactive.png' style='width:112px;height:160px;margin-bottom:-124px'></img>"
                                                else if(player.ssp.thaumicOrbHit >= 1 && player.ssp.fireUnlocked == true && player.ssp.fireReq1Get == true && player.ssp.fireReq2Get == true && player.ssp.fireReq3Get == true && player.ssp.fireReq4Get == true)
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-verticalNone.png' style='width:112px;height:160px;margin-bottom:-124px'</img>"
                                                else if(player.ssp.thaumicOrbHit == 0 && player.ssp.fireUnlocked == false && player.ssp.fireReq1Get == true && player.ssp.fireReq2Get == true && player.ssp.fireReq3Get == true && player.ssp.fireReq4Get == true)
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-Radioactive-active.png' style='width:112px;height:160px;margin-bottom:-4px'></img>"
                                                else
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-Radioactive.png' style='width:112px;height:160px;margin-bottom:-4px'></img>"
                                                }
                                            ],
                                            ["column",
                                                [
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "fireOrbReq3"],
                                                                ], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ]
                                                        ]
                                                    ],
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "fireOrbReq4"],
                                                                ], {width: "100px", height: "100px"}
                                                            ],
                                                        ]
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ],
                                    ["row",
                                        [
                                            ["hoverless-clickable", "fireOrb"]
                                        ]
                                    ],
                                ]
                            ],
                            ["row",
                                [
                                    ["column",
                                        [
                                            ["column",
                                                [
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "airOrbReq1"],
                                                                ], {width: "100px", height: "100px"}
                                                            ]
                                                        ]
                                                    ],
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "airOrbReq2"],
                                                                ], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ],
                                                        ]
                                                    ]
                                                ]
                                            ],
                                            ["raw-html", () => {
                                                if(player.ssp.thaumicOrbHit == 0 && player.ssp.airUnlocked == true && player.ssp.airReq1Get == true && player.ssp.airReq2Get == true && player.ssp.airReq3Get == true && player.ssp.airReq4Get == true)
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-Technological.png' style='width:160px;height:112px;margin-right:-120px;margin-bottom:-4px'></img>"
                                                else if(player.ssp.thaumicOrbHit >= 1 && player.ssp.airUnlocked == true && player.ssp.airReq1Get == true && player.ssp.airReq2Get == true && player.ssp.airReq3Get == true && player.ssp.airReq4Get == true)
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-horizontalNone.png' style='width:160px;height:112px;margin-right:-120px;margin-bottom:-4px'></img>"
                                                else if(player.ssp.thaumicOrbHit == 0 && player.ssp.airReq1Get == true && player.ssp.airReq2Get == true && player.ssp.airReq3Get == true && player.ssp.airReq4Get == true)
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-Technological-active.png' style='width:160px;height:112px;margin-bottom:-4px'></img>"
                                                else
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-Technological.png' style='width:160px;height:112px;margin-bottom:-4px'></img>"
                                                }
                                            ],
                                            ["column",
                                                [
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "airOrbReq3"],
                                                                ], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ],
                                                        ]
                                                    ],
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "airOrbReq4"],
                                                                ], {width: "100px", height: "100px"}
                                                            ]
                                                        ]
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ],
                                    ["row",
                                        [
                                            ["hoverless-clickable", "airOrb"]
                                        ]
                                    ],
                                    ["column",
                                        [
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        if(player.ssp.thaumicOrbHit == 1)
                                                            return "<img src='resources/alchemyworld/alcNode-Pylon-Radioactive.png' style='width:112px;height:160px;margin-bottom:-4px'></img>"
                                                        else if(player.ssp.thaumicOrbHit == 2)
                                                            return "<img src='resources/alchemyworld/alcNode-Pylon-Radioactive-active.png' style='width:112px;height:160px;margin-bottom:54px'></img>"
                                                        else if(player.ssp.thaumicOrbHit >= 3)
                                                            return "<img src='resources/alchemyworld/alcNode-Pylon-Radioactive.png' style='width:112px;height:160px;margin-bottom:-60px'></img>"
                                                        }
                                                    ]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        if(player.ssp.thaumicOrbHit == 1)
                                                            return "<img src='resources/alchemyworld/alcNode-Pylon-Technological.png' style='width:160px;height:112px;margin-bottom:-4px'></img>"
                                                        else if(player.ssp.thaumicOrbHit == 2)
                                                            return "<img src='resources/alchemyworld/alcNode-Pylon-Technological-active.png' style='width:160px;height:112px;margin-right:50px;margin-bottom:-4px'></img>"
                                                        else if(player.ssp.thaumicOrbHit >= 3)
                                                            return "<img src='resources/alchemyworld/alcNode-Pylon-Technological.png' style='width:160px;height:112px;margin-right:-50px;margin-bottom:-4px'></img>"
                                                        }
                                                    ],
                                                    ["hoverless-clickable", "thaumicOrb"],
                                                    ["raw-html", () => {
                                                        if(player.ssp.thaumicOrbHit == 1)
                                                            return "<img src='resources/alchemyworld/alcNode-Pylon-Natural.png' style='width:160px;height:112px;margin-bottom:-4px'></img>"
                                                        else if(player.ssp.thaumicOrbHit == 2)
                                                            return "<img src='resources/alchemyworld/alcNode-Pylon-Natural-active.png' style='width:160px;height:112px;margin-left:50px;margin-bottom:-4px'></img>"
                                                        else if(player.ssp.thaumicOrbHit >= 3)
                                                            return "<img src='resources/alchemyworld/alcNode-Pylon-Natural.png' style='width:160px;height:112px;margin-left:-50px;margin-bottom:-4px'></img>"
                                                        }
                                                    ]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {
                                                        if(player.ssp.thaumicOrbHit == 1)
                                                            return "<img src='resources/alchemyworld/alcNode-Pylon-Paradox.png' style='width:112px;height:160px;margin-top:-4px'></img>"
                                                        else if(player.ssp.thaumicOrbHit == 2)
                                                            return "<img src='resources/alchemyworld/alcNode-Pylon-Paradox-active.png' style='width:112px;height:160px;margin-top:54px'></img>"
                                                        else if(player.ssp.thaumicOrbHit >= 3)
                                                            return "<img src='resources/alchemyworld/alcNode-Pylon-Paradox.png' style='width:112px;height:160px;margin-top:-56px'></img>"
                                                        }
                                                    ]
                                                ]
                                            ]
                                        ], {width: "520px", height: "520px"}

                                    ],
                                    ["row",
                                        [
                                            ["hoverless-clickable", "earthOrb"]
                                        ]
                                    ],
                                    ["column",
                                        [
                                            ["column",
                                                [
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "earthOrbReq1"],
                                                                ], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ]
                                                        ]
                                                    ],
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "earthOrbReq2"],
                                                                ], {width: "100px", height: "100px"}
                                                            ]
                                                        ]
                                                    ]
                                                ]
                                            ],
                                            ["raw-html", () => {
                                                if(player.ssp.thaumicOrbHit == 0 && player.ssp.earthUnlocked == true && player.ssp.earthReq1Get == true && player.ssp.earthReq2Get == true && player.ssp.earthReq3Get == true && player.ssp.earthReq4Get == true)
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-Natural.png' style='width:160px;height:112px;margin-left:-120px;margin-bottom:-4px'></img>"
                                                else if(player.ssp.thaumicOrbHit >= 1 && player.ssp.earthUnlocked == true && player.ssp.earthReq1Get == true && player.ssp.earthReq2Get == true && player.ssp.earthReq3Get == true && player.ssp.earthReq4Get == true)
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-horizontalNone.png' style='width:160px;height:112px;margin-left:-120px;margin-bottom:-4px'></img>"
                                                else if(player.ssp.thaumicOrbHit == 0 && player.ssp.earthUnlocked == false && player.ssp.earthReq1Get == true && player.ssp.earthReq2Get == true && player.ssp.earthReq3Get == true && player.ssp.earthReq4Get == true)
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-Natural-active.png' style='width:160px;height:112px;margin-bottom:-4px'></img>"
                                                else
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-Natural.png' style='width:160px;height:112px;margin-bottom:-4px'></img>"
                                                }
                                            ],
                                            ["column",
                                                [
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "earthOrbReq3"],
                                                                ], {width: "100px", height: "100px"}
                                                            ]
                                                        ]
                                                    ],
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "earthOrbReq4"],
                                                                ], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ]
                                                        ]
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                            ],
                            ["column",
                                [
                                    ["row",
                                        [
                                            ["hoverless-clickable", "waterOrb"]
                                        ]
                                    ],
                                    ["row",
                                        [
                                            ["column",
                                                [
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "waterOrbReq1"],
                                                                ], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ]
                                                        ]
                                                    ],
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "waterOrbReq2"],
                                                                ], {width: "100px", height: "100px"}
                                                            ]
                                                        ]
                                                    ]
                                                ]
                                            ],
                                            ["raw-html", () => {
                                                if(player.ssp.thaumicOrbHit == 0 && player.ssp.waterUnlocked == true && player.ssp.waterReq1Get == true && player.ssp.waterReq2Get == true && player.ssp.waterReq3Get == true && player.ssp.waterReq4Get == true)
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-Paradox.png' style='width:112px;height:160px;margin-top:-116px'></img>"
                                                else if(player.ssp.thaumicOrbHit >= 1 && player.ssp.waterUnlocked == true && player.ssp.waterReq1Get == true && player.ssp.waterReq2Get == true && player.ssp.waterReq3Get == true && player.ssp.waterReq4Get == true)
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-verticalNone.png' style='width:112px;height:160px;margin-top:-116px'></img>"
                                                else if(player.ssp.thaumicOrbHit == 0 && player.ssp.waterUnlocked == false && player.ssp.waterReq1Get == true && player.ssp.waterReq2Get == true && player.ssp.waterReq3Get == true && player.ssp.waterReq4Get == true)
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-Paradox-active.png' style='width:112px;height:160px;margin-top:-4px'></img>"
                                                else
                                                    return "<img src='resources/alchemyworld/alcNode-Pylon-Paradox.png' style='width:112px;height:160px;margin-top:-4px'></img>"
                                                }
                                            ],
                                            ["column",
                                                [
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "waterOrbReq4"],
                                                                ], {width: "100px", height: "100px"}
                                                            ], 
                                                        ]
                                                    ],
                                                    ["row",
                                                        [
                                                            ["column",
                                                                [
                                                                    ["hoverless-clickable", "waterOrbReq3"],
                                                                ], {width: "100px", height: "100px"}
                                                            ],
                                                            ["column",
                                                                [], {width: "100px", height: "100px"}
                                                            ]
                                                        ]
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ], {width: "1200px", height: "1200px"}
                    ]
                ]
            },
            "Arcane Table": {
                buttonStyle() {return {color: "#f8c898", backgroundColor: "#6b4423", backgroundImage: "linear-gradient(0deg, #6B4423, #9b541a)", borderColor: "#F8C898", borderRadius: "10px", boxShadow: "0 0 3px 1px black inset"}},
                unlocked() {return player.ssp.arcaneTableUnlocked == true},
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
                                                                                                else if (hasUpgrade("ssp", 101) && player.ssp.alchemicalSymbols >= 1000 && player.tlb.revelationPoints >= 100 && (player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true))
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
                                                                            else if (hasUpgrade("ssp", 101) && player.ssp.alchemicalSymbols >= 1000 && player.tlb.revelationPoints >= 100 && (player.tlb.firstTomeForce == true && player.tlb.firstTomeInsight == true && player.tlb.firstTomeMerit == true))
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
                                                                                                else if (hasUpgrade("ssp", 105) && player.tlb.revelationPoints >= 1500000)
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
                                                                            else if (hasUpgrade("ssp", 105) && player.tlb.revelationPoints >= 1500000)
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
                                                                                                else if (hasUpgrade("ssp", 102) && player.tlb.revelationPoints >= 5000)
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
                                                                            else if (hasUpgrade("ssp", 102) && player.tlb.revelationPoints >= 5000)
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
                                                                                                else if (hasUpgrade("ssp", 104) && player.ssp.advAlchemicalSymbols >= 100)
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
                                                                            else if (hasUpgrade("ssp", 104) && player.ssp.advAlchemicalSymbols >= 100)
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
                                                                                                else if (hasUpgrade("ssp", 103) && player.tlb.revelationPoints >= 37500)
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
                                                                            else if (hasUpgrade("ssp", 103) && player.tlb.revelationPoints >= 37500)
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
                            ["raw-html", () => {
                                if(player.ssp.arcaneTableUnlocked == true)
                                    return "You have <h3>" + formatWhole(player.ssp.alchemicalSymbols) + "</h3> 🝪 Al.Sys 🝪."}, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "15px", textStroke: "1px #aaffaaab", 'text-shadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"
                                }
                            ],
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
                            ["raw-html", () => {
                                if(player.ssp.arcaneTableUnlocked == true)
                                    return "You have <h3>" + format(player.points) + "</h3> ✸ Cel.Pts ✸."
                                else
                                    return "A powerful presence prevents you from<br>undoing part of His secret plans...<hr>You must seek some clues throughout<br>the multiverse to break the ??????? ???."}, {color: "#ffffff", fontSize: "15px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"
                                }
                            ]
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
                    ["raw-html", () => {
                        if(player.ssp.arcaneTableUnlocked == true)
                            return "-<u>Symbol Space</u>, Louki's Hideout-."
                        else
                            return "-<u>?????? ?????</u>, ?????'? ???????-."
                    }, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                ]
            ],
            ["blank", "10px"],
            ["microtabs", "tabs", {'border-width': '0px'}],
            ["blank", "50px"],
        ]
    }
)
