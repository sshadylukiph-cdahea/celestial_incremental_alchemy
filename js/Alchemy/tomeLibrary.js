addLayer("tl", {
    name: "Tome Library",
    symbol: "🕮",
    row: 1,
    universe: "LU",
    position: 1,
    startData() {return {
        unlocked: true,
    }},
    nodeStyle: {
        background: "radial-gradient(circle, #343434 25%, dimgrey 50%, silver 75%)",
        backgroundOrigin: "border-box",
        borderColor: "transparent",
        color: "silver",
        borderImage: "radial-gradient(circle, dimgrey, white) 1",
        boxShadow: "0 0 3px 1px black inset",
        borderRadius: "30px",
        transform: "translateY(-0px)"
    },
    tooltip: "Tome Library",
    color: "white",
    branches: ["ktb"],
    bars: {},
    layerShown() { return false } // player.startedGame == true && hasUpgrade("ktb", 210)
})