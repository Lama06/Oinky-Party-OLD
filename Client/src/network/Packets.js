export class ClientPacket {
    constructor(name) {
        this.packetName = name;
    }
}

export class QueryPartiesPacket extends ClientPacket {
    constructor() {
        super("queryParties");
    }
}

export class CreatePartyPacket extends ClientPacket {
    constructor(name) {
        super("createParty");
        this.name = name;
    }
}

export class JoinPartyPacket extends ClientPacket {
    constructor(id) {
        super("joinParty");
        this.id = id;
    }
}

export class LeavePartyPacket extends ClientPacket {
    constructor() {
        super("leaveParty");
    }
}

export class StartGamePacket extends ClientPacket {
    constructor(type) {
        super("startGame");
        this.type = type;
    }
}

export class StopGamePacket extends ClientPacket {
    constructor() {
        super("stopGame");
    }
}
