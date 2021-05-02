import { Container, Text } from "pixi.js"
import { Button } from "../gui/Button"
import { CreatePartyPacket } from "../network/Packets"
import { TitleScreen } from "./TitleScreen"

export class CreatePartyScreen extends Container {
    constructor() {
        super()

        this.name = "Unbenannt"

        this.title = new Text("Party erstellen", {
            fill: ["#ffffff"],
            fontSize: 30,
        })
        this.title.anchor.set(0.5, 0.5)
        this.title.position.set(
            game.renderer.width / 2,
            game.renderer.height / 3
        )
        this.title.interactive = true
        this.title.on("pointerdown", () => game.openScreen(new TitleScreen()))
        this.addChild(this.title)

        this.partyNameText = new Text(
            "Name der Party: " + this.name + "\n(Zum ändern des Names klicken)",
            {
                fill: ["#ffffff"],
                fontSize: 22,
            }
        )
        this.partyNameText.anchor.set(0.5)
        this.partyNameText.position.set(
            game.renderer.width / 2,
            game.renderer.height / 3 + 50
        )
        this.partyNameText.interactive = true
        this.partyNameText.on("pointerdown", () => {
            let name = window.prompt("Namen der Party bitte hier eingeben: ")
            if (name != null) {
                this.partyNameText.text = "Name der Party: " + name
                this.name = name
            }
        })
        this.addChild(this.partyNameText)

        this.submitButton = new Button({
            width: 400,
            height: 40,
            label: new Text("Party erstellen", {
                fill: ["#ffffff"],
                fontSize: 30,
            }),
            action: this.submit.bind(this),
        })
        this.submitButton.pivot.set(
            this.submitButton.width / 2,
            this.submitButton.height / 2
        )
        this.submitButton.position.set(
            game.renderer.width / 2,
            game.renderer.height / 3 + 100
        )
        this.addChild(this.submitButton)
    }

    submit() {
        game.socket.sendPacket(new CreatePartyPacket(this.name))
        game.openScreen(new TitleScreen())
    }
}
