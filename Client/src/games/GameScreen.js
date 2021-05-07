import { Text } from "@pixi/text";
import { Button } from "../gui/Button";
import { StopGamePacket } from "../network/Packets";
import { game } from "../OinkyParty";
import { buttonTextColor, buttonTextSize, Screen } from "../Screen";

export class GameScreen extends Screen {
    constructor() {
        super();

        this.stopButton = new Button({
            width: 100,
            height: 40,
            label: new Text("Stop", {
                fill: buttonTextColor,
                fontSize: buttonTextSize,
            }),
            action: () => game.socket.sendPacket(new StopGamePacket()),
        });
        this.stopButton.pivot.set(
            this.stopButton.width / 2,
            this.stopButton.height
        );
        this.stopButton.position.set(
            game.renderer.width / 2,
            game.renderer.height
        );
        this.addChild(this.stopButton);
    }
}
