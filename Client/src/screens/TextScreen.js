import { Text } from "@pixi/text";
import { game } from "../OinkyParty";
import { titleColor, titleSize } from "../Screen";
import { GuiScreen } from "./GuiScreen";

export class TextScreen extends GuiScreen {
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
