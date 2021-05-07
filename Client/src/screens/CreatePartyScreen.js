import { Text } from "pixi.js";
import { Button } from "../gui/Button";
import { CreatePartyPacket } from "../network/Packets";
import { game } from "../OinkyParty";
import {
    buttonTextColor,
    buttonTextSize,
    textColor,
    textSize,
    titleColor,
    titleSize,
} from "../Screen";
import { GuiScreen } from "./GuiScreen";
import { TextScreen } from "./TextScreen";
import { TitleScreen } from "./TitleScreen";

export class CreatePartyScreen extends GuiScreen {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePartyNameClick = this.handlePartyNameClick.bind(this);

        this.name = "Unbenannt";

        // Title
        this.title = new Text("Party erstellen", {
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

        // Party Name
        this.partyNameText = new Text(
            "Name der Party: " + this.name + "\n(Zum ändern des Names klicken)",
            {
                fill: textColor,
                fontSize: textSize,
            }
        );
        this.partyNameText.anchor.set(0.5);
        this.partyNameText.position.set(
            game.renderer.width / 2,
            game.renderer.height / 3 + 50
        );
        this.partyNameText.interactive = true;
        this.partyNameText.on("pointerdown", this.handlePartyNameClick);
        this.addChild(this.partyNameText);

        // Submit Button
        this.submitButton = new Button({
            width: 400,
            height: 40,
            label: new Text("Party erstellen", {
                fill: buttonTextColor,
                fontSize: buttonTextSize,
            }),
            action: this.handleSubmit,
        });
        this.submitButton.pivot.set(
            this.submitButton.width / 2,
            this.submitButton.height / 2
        );
        this.submitButton.position.set(
            game.renderer.width / 2,
            game.renderer.height / 3 + 100
        );
        this.addChild(this.submitButton);
    }

    handlePartyNameClick() {
        let name = window.prompt("Namen der Party hier eingeben: ");
        if (name != null) {
            this.partyNameText.text = "Name der Party: " + name;
            this.name = name;
        }
    }

    handleSubmit() {
        game.openScreen(new TextScreen("Party wird betreten..."));
        game.socket.sendPacket(new CreatePartyPacket(this.name));
    }
}
