import { Application } from "pixi.js"
import { NetworkHandler } from "./network/NetworkHandler"
import { SocketClient } from "./network/SocketClient"
import { TitleScreen } from "./screens/TitleScreen"

export class OinkyParty extends Application {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
        })

        window.addEventListener("resize", () => {
            this.renderer.resize(window.innerWidth, window.innerHeight)
        })

        document.body.appendChild(this.view)

        this.socket = new SocketClient()
        this.listener = new NetworkHandler()
        this.currentScreen = null
    }

    init() {
        this.openScreen(new TitleScreen())
    }

    openScreen(screen) {
        if (this.currentScreen != null) {
            this.stage.removeChild(this.currentScreen)
        }
        this.currentScreen = screen
        this.stage.addChild(screen)
    }
}
