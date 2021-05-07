import { Text } from "pixi.js";
import { Button } from "../gui/Button";
import { JoinPartyPacket, QueryPartiesPacket } from "../network/Packets";
import { game } from "../OinkyParty";
import {
    buttonTextColor,
    buttonTextSize,
    titleColor,
    titleSize,
} from "../Screen";
import { TitleScreen } from "./TitleScreen";
import { TextScreen } from "./TextScreen";
import { GuiScreen } from "./GuiScreen";

export class PartyListScreen extends GuiScreen {
    constructor() {
        super();

        this.handleListPartiesPacket = this.handleListPartiesPacket.bind(this);

        // Title
        this.title = new Text("Offene Partys (werden geladen...)", {
            fill: titleColor,
            fontSize: titleSize,
        });
        this.title.anchor.set(0.5, 0.5);
        this.title.position.set(
            game.renderer.width / 2,
            game.renderer.height / 3
        );
        this.title.interactive = true;
        this.title.on("pointerdown", () => game.openScreen(new TitleScreen()));
        this.addChild(this.title);

        game.socket.addEventListener(
            "listParties",
            this.handleListPartiesPacket,
            {
                once: true,
            }
        );
        game.socket.sendPacket(new QueryPartiesPacket());
    }

    destroy() {
        game.socket.removeEventListener(
            "listParties",
            this.handleListPartiesPacket
        );
    }

    handleListPartiesPacket(event) {
        console.log("Recieved Party List");
        this.title.text = "Offene Partys";

        let packet = event.detail;
        let parties = packet.parties;

        for (let i = 0; i < parties.length; i++) {
            let party = parties[i];

            let gameButton = new Button({
                width: 400,
                height: 40,
                label: new Text(party.name, {
                    fill: buttonTextColor,
                    fontsize: buttonTextSize,
                }),
                action: () => {
                    game.openScreen(
                        new TextScreen("Der Party wird beigetreten...")
                    );
                    game.socket.sendPacket(new JoinPartyPacket(party.id));
                },
            });
            gameButton.pivot.set(gameButton.width / 2, gameButton.height / 2);
            gameButton.position.set(
                game.renderer.width / 2,
                game.renderer.height / 3 + 50 + i * 50
            );
            this.addChild(gameButton);
        }
    }
}
