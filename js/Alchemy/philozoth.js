addLayer("phl", {
    name: "Philozoth, Celesteial of Alchemy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "♆", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 4,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle: {
        background: "linear-gradient(45deg, #AE9455, #E7DABA, #AE9455)",
        backgroundOrigin: "border-box",
        borderColor: "transparent",
        color: "#b87d26",
        borderImage: "linear-gradient(45deg, #E2AD2F, #FFDB8E) 1",
        boxShadow: "0 0 3px 1px #b87d26 inset",
        borderRadius: "0px",
        transform: "translateY(-0px)"
    },
    tooltip: "Philozoth, Celesteial of Alchemy",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)
    },

    branches: ["aal", "eft"],
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
    layerShown() { return false } // player.startedGame == true
})