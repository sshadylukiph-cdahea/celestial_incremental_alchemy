addLayer("tlb", {
    name: "Tome Library",
    symbol: "🕮",
    row: 1,
    universe: "LU",
    position: 1,
    startData() {return {
        unlocked: true,
        buyMaxSymbols: false,

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
        crimsonSymbolGain: new Decimal(0),
        crimsonSymbolMult: new Decimal(0),
        goldSymbolGain: new Decimal(0),
        goldSymbolMult: new Decimal(0),
        jadeSymbolGain: new Decimal(0),
        jadeSymbolMult: new Decimal(0),
        celesteSymbolGain: new Decimal(0),
        celesteSymbolMult: new Decimal(0),
        cobaltSymbolGain: new Decimal(0),
        cobaltSymbolMult: new Decimal(0),
        amethystSymbolGain: new Decimal(0),
        amethystSymbolMult: new Decimal(0),

        // base symbols' parts generated
        crimsonSymbolParts: new Decimal(0),
        crimsonSymbolPartsGain: new Decimal(0),
        crimsonSymbolPartsMult: new Decimal(0),

        // 1st order symbols
        arcaneSymbols: new Decimal (0),
        starmetalAlloySymbols: new Decimal (0),
        starmetalEssenceSymbols: new Decimal (0),
        eclipseShardSymbols: new Decimal (0),
        spaceGemSymbols: new Decimal (0),
        planetSymbols: new Decimal (0),
        spaceRockSymbols: new Decimal (0),

        // 1st order symbols' powers
        // arcaneSymbolPower: new Decimal (0),
        // starmetalAlloySymbolPower: new Decimal (0),
        // starmetalEssenceSymbolPower: new Decimal (0),
        // eclipseShardSymbolPower: new Decimal (0),
        // spaceGemSymbolPower: new Decimal (0),
        // planetSymbolPower: new Decimal (0),
        // spaceRockSymbolPower: new Decimal (0),
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
                        look.textStroke = "1px #00ff00ab"
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
                        look.textStroke = "1px #ff00ffab"
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
                if (player.tlb.buyMaxSymbols == true)
                    return "Create " + formatShortWhole(player.tlb.crimsonSymbolGain) + "<br>Crimson Symbol/s."
                else
                    return "Create 1<br>Crimson Symbol."
            },
            canClick() {return player.ssp.alchemicalSymbols >= 100 && player.tlb.crimsonSymbolParts >= 1000},
            unlocked() {return true},
            onClick() { 
                // if (player.btb.symbolBuyMax == false) {
                //     player.btb.symbolStarmetalAlloy = player.btb.symbolStarmetalAlloy.add(1);
                //     player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(10);
                //     player.sma.starmetalAlloy = player.sma.starmetalAlloy.sub(1000000);
                // } 
                // else if (player.btb.symbolBuyMax == true) {
                //     let val1 = player.ktb.alchemicalSymbols.div(10).floor();
                //     let val2 = player.sma.starmetalAlloy.div(1000000).floor();
                //     let result = val1;
                //     if(val2.lt(val1)) result = val2;

                //     player.btb.symbolStarmetalAlloy = player.btb.symbolStarmetalAlloy.add(result);
                //     player.ktb.alchemicalSymbols = player.ktb.alchemicalSymbols.sub(Decimal.mul(10, result));
                //     player.sma.starmetalAlloy = player.sma.starmetalAlloy.sub(Decimal.mul(1000000, result))
                // }
            },
            style() {
            let look = {width: '300px', minHeight: '80px', border: "3px solid rgba(0,0,0,0.3)", fontSize: "20px", borderRadius: "0px"}
            if (this.canClick()) {
                look.backgroundImage = "radial-gradient(ellipse, transparent 80%, #000000ab), radial-gradient(ellipse, transparent 70%, #330000), radial-gradient(ellipse, #00000045 40%, #000000ab), repeating-linear-gradient(-45deg, transparent, transparent 9%, #550000ab 9%, #550000ab 10%, #55000067 10%, #55000067 19%, #550000ab 19%, #550000ab 20%, transparent 20%, transparent 29%, #aa5555ab 29%, #aa5555ab 30%, #aa555567 30%, #aa555567 39%, #aa5555ab 39%, #aa5555ab 40%), repeating-linear-gradient(45deg, transparent, transparent 9%, #550000ab 9%, #550000ab 10%, #55000067 10%, #55000067 19%, #550000ab 19%, #550000ab 20%, transparent 20%, transparent 29%, #aa5555ab 29%, #aa5555ab 30%, #aa555567 30%, #aa555567 39%, #aa5555ab 39%, #aa5555ab 40%), radial-gradient(ellipse, transparent, #000000ab), linear-gradient(180deg, #ff7777, #ff0000, #ff0078, #77003b)"
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
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        tabs: {
            "Alteration Room": {
                buttonStyle() {return {color: "#000000", backgroundImage: "radial-gradient(circle, #787878 25%, #ababab 50%, #ededed 75%)", borderImage: "radial-gradient(circle, #000000 50%, #ababab 75%, #ffffff) 1", borderRadius: "0px", boxShadow: "0 0 3px 1px #000000 inset"}},
                unlocked() {return true},
                content: [
                    ["blank", "5px"],
                    ["row",
                        [
                            ["raw-html", () => {return "You are currently in the"}, {color: "#ffffff", fontSize: "18px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                            ["blank", "2px"],
                            ["raw-html", () => {return "-<u>Alteration Room</u>-."}, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffcd 10%, transparent 20%, transparent 80%, #000000cd 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': " 0 0 5px #ffffffcd, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                        ]
                    ],
                    ["blank", "10px"],
                    ["style-column",
                        [
                            ["row", [["clickable", "buyMaxOff"], ["blank", "5px"], ["clickable", "buyMaxOn"]]]
                        ]
                    ],
                    ["blank", "20px"],
                    ["style-row",
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
                                                ], {width: "100px", height: "20px", backgroundImage: "radial-gradient(ellipse, #000000cd, transparent 70%, transparent)"}
                                            ]
                                        ], {width: "120px", height: "120px", color: "transparent", background: "linear-gradient(180deg, #ff7777, #ff0000, #ff0078, #77003b)", fontSize: "25px", textStroke: "1px #ffddddab", 'textShadow': "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffffff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset, 0 0 3px 1px #000000"}],
                                    ["column", [[]], {width: "20px"}],
                                    ["style-column",
                                        [
                                            ["clickable", "crimsonAlter"],
                                            ["blank", "5px"],
                                            ["row",
                                                [
                                                    ["raw-html", () => {return "Requires:"}, {color: "#ffffff", fontSize: "18px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}]
                                                ]
                                            ],
                                            ["row",
                                                [
                                                    ["raw-html", () => {return "100 🝪 Al.Sys 🝪"}, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "16px", textStroke: "1px #00ff00ab", 'textShadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {return "&"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                                    ["blank", "2px"],
                                                    ["raw-html", () => {return "1,000 Cr.Sy.Prts"}, {color: "transparent", background: "linear-gradient(180deg, #ff7777, #ff0000, #ff0078, #77003b)", fontSize: "16px", textStroke: "1px #ffddddab", 'textShadow': "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}]
                                                ]
                                            ]
                                        ]
                                    ]
                                ], {width: "480px", height: "160px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffffff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ],
                            ["style-row",
                                [
                                    ["column",
                                        [
                                            ["raw-html", () => {return "You are gaining"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShortWhole(player.tlb.crimsonSymbolPartsGain) + "</h3> Cr.Sy.Prts per second."}, {color: "transparent", background: "linear-gradient(180deg, #ff7777, #ff0000, #ff0078, #77003b)", fontSize: "16px", textStroke: "1px #ffddddab", 'textShadow': "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "(Based on Radioactive Core Fragments<br>and Radioactive Pylon Energy.)"}, {color: "#ffffff", fontSize: "13px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "20px"],
                                            ["raw-html", () => {return "You have"}, {color: "#ffffff", fontSize: "16px", 'text-shadow': "0 0 5px #ffffff, 0 0 10px #000000, 0 0 10px #000000", fontFamily: "monospace"}],
                                            ["blank", "1px"],
                                            ["raw-html", () => {return "<h3>" + formatShortWhole(player.tlb.crimsonSymbolParts) + "</h3> Cr.Sy.Pts."}, {color: "transparent", background: "linear-gradient(180deg, #ff7777, #ff0000, #ff0078, #77003b)", fontSize: "16px", textStroke: "1px #ffddddab", 'textShadow': "0 0 5px #ff0000, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}]
                                        ]
                                    ]
                                ], {width: "260px", height: "160px", border: "3px solid transparent", borderImage: "radial-gradient(circle, #000000 75%, #ffffff) 1", backgroundImage: "radial-gradient(circle, #000000ab, transparent 75%), linear-gradient(to top, #000000 1%, transparent 10%, transparent 90%, #ffffff 99%), linear-gradient(to top, #00000067 10%, transparent 50%, #ffffff67 90%), radial-gradient(circle, transparent 60%, #000000), repeating-linear-gradient(45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(-45deg, transparent, #00000022 5%, transparent 10%), repeating-linear-gradient(45deg, transparent, #00000022 5%), repeating-linear-gradient(-45deg, transparent, #00000022 5%), linear-gradient(to top, #787878, #ababab, #ededed)", boxShadow: "0 0 3px 1px #000000 inset"}
                            ]
                        ]
                    ]
                    // ["style-row", [
                    //     ["style-column",
                    //         [
                    //             ["clickable", 1],
                    //             ["blank", "10px"],
                    //             ["raw-html", () => {return "You have " + formatWhole(player.sma.starmetalAlloy) + " Starmetal Alloy."}, {color: "transparent", background: "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%,  #60cfeb 100%)", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                    //             ["blank", "30px"],
                    //             ["clickable", 2],
                    //             ["blank", "10px"],
                    //             ["raw-html", () => {return "You have " + formatWhole(player.sme.starmetalEssence) + " Starmetal Essence."}, {color: "transparent", background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%, #eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                    //             ["blank", "30px"],
                    //             ["clickable", 3],
                    //             ["blank", "10px"],
                    //             ["raw-html", () => {return "You have " + formatWhole(player.sma.eclipseShards) + " Eclipse Shards."}, {color: "transparent", background: "linear-gradient(135deg, #ffb700, #ffe866)", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}]
                    //         ], {width: "447px", height: "500px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088), repeating-linear-gradient(0deg, transparent, transparent 19px, #ffffff88 20px, #ffffff88 19px), repeating-linear-gradient(90deg, transparent, transparent 19px, #ffffff88 20px, #ffffff88 19px)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}
                    //     ],
                    //     ["style-column",
                    //         [
                    //             ["clickable", 4],
                    //             ["blank", "10px"],
                    //             ["raw-html", () => {return "You have " + formatWhole(player.ir.spaceGem) + " Space Gems."}, {color: "transparent", background: "radial-gradient(circle, #564BCC, #000000)", fontSize: "16px", textStroke: "1px #dbd7ff", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                    //             ["blank", "30px"],
                    //             ["clickable", 5],
                    //             ["blank", "10px"],
                    //             ["raw-html", () => {return "You have " + formatWhole(player.pl.spaceDust) + " Space Dust."}, {color: "transparent", background: "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                    //             ["blank", "30px"],
                    //             ["clickable", 6],
                    //             ["blank", "10px"],
                    //             ["raw-html", () => {return "You have " + formatWhole(player.ir.spaceRock) + " Space Rocks."}, {color: "transparent", background: "linear-gradient(15deg, #5f5f5f 0%, #a8a8a8 50%, #5f5f5f 100%)", fontSize: "16px", fontSize: "16px", textStroke: "1px #ffffff88", 'text-shadow': "0 0 5px white", backgroundClip: "text", fontFamily: "monospace"}],
                    //         ], {width: "447px", height: "500px", background: "#000055", backgroundImage: "radial-gradient(circle, transparent, #00000088), repeating-linear-gradient(0deg, transparent, transparent 19px, #ffffff88 20px, #ffffff88 19px), repeating-linear-gradient(270deg, transparent, transparent 19px, #ffffff88 20px, #ffffff88 19px)", border: "3px solid white", borderRadius: "0 0 0 0", boxShadow: "0 0 5px 5px #aaaaff inset, 0 0 10px 10px #0000aa inset, 0 0 10px 10px #ffffff50 inset"}]
                    //     ]
                    // ],
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
                                    ["style-row", [], {width: "300px", height: "100px", backgroundImage: "radial-gradient(ellipse at 50% 0%, transparent, #000000ab), radial-gradient(ellipse at 50% 140%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 0% 100%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(180deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 15px 15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}]
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
                                        ["style-row", [], {width: "300px", height: "100px", backgroundImage: "radial-gradient(ellipse at 50% 0%, transparent, #000000ab), radial-gradient(ellipse at 50% 140%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 0% 100%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(180deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 15px 15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}]
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
                                        ["style-row", [], {width: "300px", height: "100px", backgroundImage: "radial-gradient(ellipse at 50% 0%, transparent, #000000ab), radial-gradient(ellipse at 50% 140%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 0% 100%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(180deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "0 0 15px 15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}]
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
                            ["raw-html", () => {return "You have <h3>" + formatWhole(player.ssp.alchemicalSymbols) + "</h3> 🝪 Al.Sys 🝪."}, {color: "transparent", background: "linear-gradient(to bottom, #ddffdd, #00ff00, #7fff00)", fontSize: "15px", textStroke: "1px #00ff00ab", 'text-shadow': "0 0 5px #00ff00, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"}],
                            ["raw-html", () => {
                                if (hasUpgrade("ssp", 104))
                                    return "You have <h3>" + formatWhole(player.ssp.advAlchemicalSymbols) + "</h3> ✩🝪 Adv.Al.Sys 🝪✩."}, {color: "transparent", background: "linear-gradient(to bottom, #8b609c, #ff00ff, #ffc0cb)", fontSize: "15px", textStroke: "1px #ff00ffab", 'text-shadow': "0 0 5px #ff00ff, 0 0 10px #000000, 0 0 10px #000000", backgroundClip: "text", fontFamily: "monospace"
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
