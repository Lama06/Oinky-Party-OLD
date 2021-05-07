class PartyPlayer {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export class PartyState extends EventTarget {
    constructor() {
        super();

        this.resetState();
    }

    resetState() {
        this.isInParty = false;
        this.players = null;
        this.ownId = null;
        this.name = null;
        this.id = null;
    }

    handleClientJoinedPartyPacket(packet) {
        this.isInParty = true;
        this.players = packet.players;
        this.ownId = packet.ownId;
        this.name = packet.name;
        this.id = packet.id;
    }

    handleClientLeftPartyPacket() {
        this.resetState();
    }

    handlePlayerJoinedPartyPaket(packet) {
        this.players.push(new PartyPlayer(packet.id, packet.name));

        this.dispatchEvent(
            new CustomEvent("playerListUpdated", { detail: this })
        );
    }

    handlePlayerLeftPartyPacket(packet) {
        this.players = this.players.filter((player) => player.id != packet.id);

        this.dispatchEvent(
            new CustomEvent("playerListUpdated", { detail: this })
        );
    }
}
