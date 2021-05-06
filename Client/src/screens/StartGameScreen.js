import { Text } from "@pixi/text";
import { Button } from "../gui/Button";
import { StartGamePacket } from "../network/Packets";
import { game } from "../OinkyParty";
import { buttonTextColor, buttonTextSize, Screen } from "../Screen";

export class StartGameScreen extends Screen {
    constructor() {
        super();

        this.counterButton = new Button({
            width: 400,
            height: 40,
            label: new Text("Counter", {
                fill: buttonTextColor,
                fontsize: buttonTextSize,
            }),
            action: () =>
                game.socket.sendPacket(new StartGamePacket("counter")),
        });
        this.addChild(this.counterButton);
    }
}
