addLayer("ssp", {
    name: "Symbol Space",
    symbol: "⚿",
    row: 1,
    universe: "LU",
    position: 0,
    startData() { return {
        unlocked: true,
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
    branches: [],
    clickables: {
        1: {
            title() {return "<h2>Symbol Encoder</h1><hr><small>Gain <h2>" + formatWhole(player.ssp.alchemicalSymbolsGain) + "</h3> Alchemical Symbols.<br> Requires: e1,000,000 Celestial Points<small>"},
            canClick() {return player.ssp.alchemicalSymbolsGain.gte(1) & player.points.gte("1e1000000")},
            unlocked() {return true},
            onClick() { 
                layers.ssp.alchemicalSymbolsReset()
            },
            style() {
            let look = {fontSize: "12px", width: "250px", height: "150px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "20px"}
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
    upgrades: {},
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
                    ["raw-html", () => {return "You have " + formatWhole(player.ssp.alchemicalSymbols) + " 🝪 Alchemical Symbols 🝪."}, {"color": "white", "font-size": "24px", "font-family": "monospace"}],
                    ["blank", "10px"],
                    ["clickable", 1],
                    ["blank", "10px"],
                    ["raw-html", () => { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, {"color": "white", "font-size": "24px", "font-family": "monospace"}],
                ]
            },
        },
    },
    tabFormat: [
        ["microtabs", "tabs", {'border-width': '0px'}],
        ["blank", "20px"]
        ],
    }
)
