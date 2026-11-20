// testing something rq

addLayer("lu-ssp", {
    name: "Symbol Space",
    symbol: "🝪",
    row: 1,
    universe: "LU",
    position: 0,
    startData() { return {
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
        return "[Test] Draggable Symbol Space"
        // if(player.ssp.arcaneTableUnlocked == true)
        //     return "Symbol Space"
        // else
        //     return "?????? ?????"
    },
    color: "#8b609c",
    update(delta) {
        let onepersec = new Decimal(1)
    },
    branches: [],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["centered-draggable-scroll-row",
                        [
                            ["row",
                                [
                                    // ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/guide.png)", position:"absolute", top: "0px", left: "0px", width:"2000px", height:"2000px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-innerRing.png)", position:"absolute", top: "726px", left: "726px", width:"548px", height:"548px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-middleRing.png)", position:"absolute", top: "562px", left: "562px", width:"876px", height:"876px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-pipeThaumic.png)", position:"absolute", top: "960px", left: "692px", width:"206px", height:"78px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-pipeThaumicFlipped.png)", position:"absolute", top: "692px", left: "960px", width:"78px", height:"206px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-pipeThaumic.png)", position:"absolute", top: "960px", left: "1102px", width:"206px", height:"78px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-pipeThaumicFlipped.png)", position:"absolute", top: "1102px", left: "960px", width:"78px", height:"206px", flexFlow:"column"}],
                                    
                                    // thaumic
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumSquare.png)", position:"absolute", top: "931px", left: "931px", width:"138px", height:"138px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumCircle.png)", position:"absolute", top: "890px", left: "890px", width:"220px", height:"220px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-magicCircleThaumic.png)", position:"absolute", top: "864px", left: "864px", width:"272px", height:"272px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumThaumic.png)", position:"absolute", top: "888px", left: "888px", width:"224px", height:"224px", flexFlow:"column"}],

                                    //air
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumSquare.png)", position:"absolute", top: "931px", left: "523px", width:"138px", height:"138px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumCircle.png)", position:"absolute", top: "890px", left: "482px", width:"220px", height:"220px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-magicCircleAir.png)", position:"absolute", top: "864px", left: "456px", width:"272px", height:"272px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumAir.png)", position:"absolute", top: "888px", left: "480px", width:"224px", height:"224px", flexFlow:"column"}],
                                    
                                    // fire
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumSquare.png)", position:"absolute", top: "523px", left: "931px", width:"138px", height:"138px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumCircle.png)", position:"absolute", top: "482px", left: "890px", width:"220px", height:"220px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-magicCircleFire.png)", position:"absolute", top: "456px", left: "864px", width:"272px", height:"272px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumFire.png)", position:"absolute", top: "480px", left: "888px", width:"224px", height:"224px", flexFlow:"column"}],
                                    
                                    // earth
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumSquare.png)", position:"absolute", top: "931px", left: "1339px", width:"138px", height:"138px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumCircle.png)", position:"absolute", top: "890px", left: "1298px", width:"220px", height:"220px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-magicCircleEarth.png)", position:"absolute", top: "864px", left: "1272px", width:"272px", height:"272px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumEarth.png)", position:"absolute", top: "888px", left: "1296px", width:"224px", height:"224px", flexFlow:"column"}],
                                    
                                    // water
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumSquare.png)", position:"absolute", top: "1339px", left: "931px", width:"138px", height:"138px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumCircle.png)", position:"absolute", top: "1298px", left: "890px", width:"220px", height:"220px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-magicCircleWater.png)", position:"absolute", top: "1272px", left: "864px", width:"272px", height:"272px", flexFlow:"column"}],
                                    ["row", [], {backgroundImage:"url(resources/alchemyworld/symbol-space/alcNode-Thaumic-App-podiumWater.png)", position:"absolute", top: "1296px", left: "888px", width:"224px", height:"224px", flexFlow:"column"}],
                                    
                                ], {backgroundImage:"", width:"2000px", height:"2000px", flexFlow:"column"}
                            ]
                        ], () => {
                        let look = {position: "absolute", top: "210px", left: "0", backgroundImage: "linear-gradient(45deg, #171717, #676767)", border: "transparent", flexFlow: "column"}
                        if (window.matchMedia("(orientation:landscape)").matches) {look.width = "calc(100vw - 400px)"; look.height = "calc(100vh - 210px)"}
                        else {look.width = "calc(100vw - 12px)"; look.height = "calc(86vh - 325px)"}
                        return look
                        }
                    ]
                ]
            },
        },
    },
    tabFormat: [
        ["column",
            [
                ["row",
                    [

                    ], {width: "200px", height: "75px", backgroundImage: "linear-gradient(-135deg, #ffffffcd, transparent)"}
                ],
                ["blank", "10px"],
                ["row",
                    [
                        ["raw-html", () => {return "You are currently in the"}, {color: "#ffffff", fontSize: "18px", 'text-shadow': "0 0 3px #ffffff", fontFamily: "monospace"}],
                        ["blank", "2px"],
                        ["raw-html", () => {
                            // if(player.ssp.arcaneTableUnlocked == true)
                                return "-<u>Symbol Space</u>, Louki's Hideout-."
                            // else
                            //     return "-<u>?????? ?????</u>, ?????'? ???????-."
                        }, {color: "transparent", backgroundImage: "linear-gradient(-135deg, #ffffffab 10%, transparent 20%, transparent 80%, #000000ab 90%), linear-gradient(-135deg, #ffffff12, #00000012), linear-gradient(-135deg, #ff00ff, #9a9a9a, #00ff00)", backgroundClip: "text", fontSize: "18px", 'text-shadow': "0 0 3px #ffffff", fontFamily: "monospace"}],
                    ]
                ],
            ], {marginTop:"-62px", width: "900px", height: "150px", backgroundImage: "radial-gradient(ellipse at 50% -40%, #9b541a78 20%, transparent), radial-gradient(ellipse, transparent 60%, #382413cd, #000000cd), radial-gradient(ellipse, transparent 45%, #00000078), repeating-radial-gradient(ellipse at 50% -20%, transparent, transparent 8%, #f8c89845 9%, #f8c89845 13%, transparent 14%, transparent 19%, #f8c89878 20%, #f8c89878 21%, transparent 22%), linear-gradient(0deg, #382413, #523116)", border: "3px solid #b18961", borderRadius: "15px", boxShadow: "0 0 5px 5px #b18961a6 inset, 0 0 10px 10px #382413 inset, 0 0 50px 50px #00000050 inset"}
        ],
        ["blank", "10px"],
        ["microtabs", "stuff", {'border-width': '0px'}],
        ["blank", "0"],
        
    ],
    layerShown() { return player.startedGame == true }
})