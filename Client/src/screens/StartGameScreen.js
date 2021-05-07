import { Text } from "@pixi/text";
import { Button } from "../gui/Button";
import { StartGamePacket } from "../network/Packets";
import { game } from "../OinkyParty";
import {
    buttonTextColor,
    buttonTextSize,
    titleColor,
    titleSize,
} from "../Screen";
import { GuiScreen } from "./GuiScreen";
import { PartyScreen } from "./PartyScreen";

const games = [
    {
        name: "Counter",
        type: "counter",
    },
];

export class StartGameScreen extends GuiScreen {
    constructor() {
        super();

        this.title = new Text("Spiel starten", {
            fill: titleColor,
            fontSize: titleSize,
        });
        this.title.pivot.set(this.title.width / 2, this.title.height / 2);
        this.title.position.set(
            game.renderer.width / 2,
            game.renderer.height / 3
        );
        this.addChild(this.title);

        this.closeButton = new Button({
            width: 400,
            height: 40,
            label: new Text("Zurück", {
                fill: buttonTextColor,
                fontSize: buttonTextSize,
            }),
            action: () => game.openScreen(new PartyScreen()),
        });
        this.closeButton.pivot.set(
            this.closeButton.width,
            this.closeButton.height
        );
        this.closeButton.position.set(
            game.renderer.width - 10,
            game.renderer.height - 10
        );
        this.addChild(this.closeButton);

        for (let i = 0; i < games.length; i++) {
            let gameData = games[i];

            let button = new Button({
                width: 400,
                height: 40,
                label: new Text(gameData.name, {
                    fill: buttonTextColor,
                    fontSize: buttonTextSize,
                }),
                action: () =>
                    game.socket.sendPacket(new StartGamePacket(gameData.type)),
            });
            button.pivot.set(button.width / 2, button.height / 2);
            button.position.set(
                game.renderer.width / 2,
                game.renderer.height / 3 + 40 + 50 * i
            );
            this.addChild(button);
        }
    }
}
