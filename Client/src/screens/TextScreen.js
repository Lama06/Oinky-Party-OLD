import { Text } from "@pixi/text";
import { game } from "../OinkyParty";
import { Screen, titleColor, titleSize } from "../Screen";

export class TextScreen extends Screen {
    constructor(text) {
        super();

        this.text = text;

        this.title = new Text(text, {
            fill: titleColor,
            fontSize: titleSize,
        });
        this.title.pivot.set(this.title.width / 2, this.title.height / 2);
        this.title.position.set(
            game.renderer.width / 2,
            game.renderer.height / 3
        );
        this.addChild(this.title);
    }
}
