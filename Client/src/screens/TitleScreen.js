import { Text } from "pixi.js";
import { Button } from "../gui/Button";
import { CreatePartyScreen } from "./CreatePartyScreen";
import { PartyListScreen } from "./PartyListScreen";
import {
    buttonTextColor,
    buttonTextSize,
    titleColor,
    titleSize,
} from "../Screen";
import { game } from "../OinkyParty";
import { GuiScreen } from "./GuiScreen";

export class TitleScreen extends GuiScreen {
    constructor() {
        super();
        // Titel
        this.title = new Text("Oinky Party", {
            fill: titleColor,
            fontSize: titleSize,
        });
        this.title.anchor.set(0.5, 0.5);
        this.title.position.set(
            game.renderer.width / 2,
            game.renderer.height / 3
        );
        this.addChild(this.title);

        // Party erstellen
        this.createParty = new Button({
            width: 400,
            height: 40,
            label: new Text("Party erstellen", {
                fill: buttonTextColor,
                fontSize: buttonTextSize,
            }),
            action: () => game.openScreen(new CreatePartyScreen()),
        });
        this.createParty.pivot.set(
            this.createParty.width / 2,
            this.createParty.height / 2
        );
        this.createParty.position.set(
            game.renderer.width / 2,
            game.renderer.height / 3 + 100
        );
        this.addChild(this.createParty);

        // Partys anzeigen
        this.listParties = new Button({
            width: 400,
            height: 40,
            label: new Text("Alle Partys anzeigen", {
                fill: buttonTextColor,
                fontSize: buttonTextSize,
            }),
            action: () => game.openScreen(new PartyListScreen()),
        });
        this.listParties.pivot.set(
            this.listParties.width / 2,
            this.listParties.height / 2
        );
        this.listParties.position.set(
            game.renderer.width / 2,
            game.renderer.height / 3 + 180
        );
        this.addChild(this.listParties);
    }
}
