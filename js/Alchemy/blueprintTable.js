addLayer("btb", {
    name: "The Blueprint Table",
    symbol: "▦",
    row: 2,
    universe: "LU",
    position: 1,
    
    startData() { return {
        unlocked: true,
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
    tooltip: "The Blueprint Table",
    color: "white",
    branches: ["ssp"],

    update(delta) {
        let onepersec = new Decimal(1)
    },

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
                    
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true }
})