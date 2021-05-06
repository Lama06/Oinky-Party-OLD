package io.github.lama06.oinkyparty.packets.s2c;

import io.github.lama06.oinkyparty.packet.ServerPacket;

public final class GameStartedPacket extends ServerPacket {
    public String type;

    public GameStartedPacket(String type) {
        super("gameStarted");
        this.type = type;
    }
}
