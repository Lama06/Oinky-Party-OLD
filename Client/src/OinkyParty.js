import { Application } from "pixi.js";
import { SocketClient } from "./network/SocketClient";
import { NetworkHandler } from "./network/NetworkHandler";
import { PartyState } from "./network/PartyState";
import { TitleScreen } from "./screens/TitleScreen";

class OinkyParty extends Application {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        window.addEventListener("resize", () => {
            this.renderer.resize(window.innerWidth, window.innerHeight);
        });

        document.body.appendChild(this.view);
    }

    init() {
        this.socket = new SocketClient();
        this.party = new PartyState();
        this.listener = new NetworkHandler();
        this.currentScreen = null;
        this.openScreen(new TitleScreen());
    }

    openScreen(screen) {
        if (this.currentScreen != null) {
            this.currentScreen.destroy();
            this.stage.removeChild(this.currentScreen);
        }
        this.currentScreen = screen;
        this.stage.addChild(screen);
    }
}

export const game = new OinkyParty();
game.init();
window.game = game;
