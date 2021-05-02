import { Container, Text } from "pixi.js"
import { Button } from "../gui/Button"
import { JoinPartyPacket, QueryPartiesPacket } from "../network/Packets"
import { TitleScreen } from "./TitleScreen"

export class PartyListScreen extends Container {
    constructor() {
        super()

        this.title = new Text("Offene Partys (werden geladen...)", {
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

        game.listener.addEventListener(
            "listParties",
            this.handleListPartiesPacket.bind(this),
            {
                once: true,
            }
        )
        game.socket.sendPacket(new QueryPartiesPacket())
    }

    handleListPartiesPacket(event) {
        console.log("Recieved Party List")
        this.title.text = "Offene Partys"

        let packet = event.detail
        let parties = packet.parties

        for (let i = 0; i < parties.length; i++) {
            let party = parties[i]

            let gameButton = new Button({
                width: 400,
                height: 40,
                label: new Text(party.name, {
                    color: ["#ffffff"],
                    fontsize: 30,
                }),
                action: () => this.joinParty(party.id),
            })
            gameButton.pivot.set(gameButton.width / 2, gameButton.height / 2)
            gameButton.position.set(
                game.renderer.width / 2,
                game.renderer.height / 3 + 50 + i * 50
            )
            this.addChild(gameButton)
        }
    }

    joinParty(id) {
        game.socket.sendPacket(new JoinPartyPacket(id))
    }
}
