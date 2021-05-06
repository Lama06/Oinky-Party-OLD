import { Container, Text } from "pixi.js";
import { Button } from "../gui/Button";
import { LeavePartyPacket } from "../network/Packets";
import { game } from "../OinkyParty";
import { textColor, textSize } from "../Screen";
import { buttonTextColor, buttonTextSize, Screen } from "../Screen";
import { StartGameScreen } from "./StartGameScreen";

export class PartyScreen extends Screen {
    constructor() {
        super();

        this.handlePlayerListUpdated = this.handlePlayerListUpdated.bind(this);

        game.party.addEventListener(
            "playerListUpdated",
            this.handlePlayerListUpdated
        );

        // Title
        this.title = new Text("Willkommen in der Party: " + game.party.name, {
            fill: buttonTextColor,
            fontSize: buttonTextSize,
        });
        this.title.pivot.set(this.title.width / 2, this.title.height / 2);
        this.title.position.set(
            game.renderer.width / 2,
            game.renderer.height / 3
        );
        this.addChild(this.title);

        // Start Game Button
        this.startGame = new Button({
            width: 400,
            height: 40,
            label: new Text("Spiel starten", {
                fill: buttonTextColor,
                fontSize: buttonTextSize,
            }),
            action: () => game.openScreen(new StartGameScreen()),
        });
        this.startGame.pivot.set(
            this.startGame.width / 2,
            this.startGame.height / 2
        );
        this.startGame.position.set(
            game.renderer.width / 2,
            game.renderer.height / 3 + 50
        );
        this.addChild(this.startGame);

        // Player List
        this.playerList = new Container();
        this.playerList.pivot.set(
            this.playerList.width / 2,
            this.playerList.height / 2
        );
        this.playerList.position.set(
            game.renderer.width / 2,
            game.renderer.height / 3 + 110
        );
        this.addChild(this.playerList);

        // Leave Party Button
        this.leaveButton = new Button({
            width: 400,
            height: 40,
            label: new Text("Party verlassen", {
                fill: buttonTextColor,
                fontSize: buttonTextSize,
            }),
            action: () => game.socket.sendPacket(new LeavePartyPacket()),
        });
        this.leaveButton.pivot.set(
            this.leaveButton.width,
            this.leaveButton.height
        );
        this.leaveButton.position.set(
            game.renderer.width - 10,
            game.renderer.height - 10
        );
        this.addChild(this.leaveButton);

        this.updatePlayerList();
    }

    destroy() {
        game.party.removeEventListener(
            "playerListUpdated",
            this.handlePlayerListUpdated
        );
    }

    updatePlayerList() {
        this.playerList.removeChildren();

        let players = game.party.players;

        for (let i = 0; i < players.length; i++) {
            let player = players[i];

            let playerText = new Text(player.name, {
                fill: textColor,
                fontSize: textSize,
            });
            playerText.pivot.set(playerText.width / 2, playerText.height / 2);
            playerText.position.set(0, 30 * i);
            this.playerList.addChild(playerText);
        }
    }

    handlePlayerListUpdated() {
        this.updatePlayerList();
    }
}
