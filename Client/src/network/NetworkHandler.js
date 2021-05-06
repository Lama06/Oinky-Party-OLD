import { CounterGame } from "../games/CounterGame";
import { game } from "../OinkyParty";
import { PartyScreen } from "../screens/PartyScreen";
import { TitleScreen } from "../screens/TitleScreen";

export class NetworkHandler {
    constructor() {
        game.socket.addEventListener(
            "clientLeftParty",
            this.handleClientLeftPartyPacket
        );
        game.socket.addEventListener("gameEnded", this.handleGameEndedPacket);
        game.socket.addEventListener(
            "gameStarted",
            this.handleGameStartedPacket
        );
        game.socket.addEventListener(
            "initialPartyState",
            this.handleClientJoinedPartyPacket
        );
        game.socket.addEventListener(
            "playerJoinedParty",
            this.handlePlayerJoinedPartyPacket
        );
        game.socket.addEventListener(
            "playerLeftParty",
            this.handlePlayerLeftPartyPacket
        );
    }

    handleClientJoinedPartyPacket(event) {
        let packet = event.detail;

        game.party.handleClientJoinedPartyPacket(packet);

        game.openScreen(new PartyScreen(packet));
    }

    handleClientLeftPartyPacket(event) {
        let packet = event.packet;

        game.party.handleClientLeftPartyPacket(packet);

        game.openScreen(new TitleScreen());
    }

    handlePlayerJoinedPartyPacket(event) {
        let packet = event.detail;

        game.party.handlePlayerJoinedPartyPaket(packet);
    }

    handlePlayerLeftPartyPacket(event) {
        let packet = event.detail;

        game.party.handlePlayerLeftPartyPacket(packet);
    }

    handleGameStartedPacket(event) {
        let packet = event.detail;
        let type = packet.type;

        if (type == "counter") {
            game.openScreen(new CounterGame());
        }
    }

    handleGameEndedPacket(event) {
        game.openScreen(new PartyScreen());
    }
}
