package io.github.lama06.oinkyparty.packets.s2c;

import io.github.lama06.oinkyparty.packet.ServerPacket;

public final class ClientLeftPartyPacket extends ServerPacket {
    public ClientLeftPartyPacket() {
        super("clientLeftParty");
    }
}
