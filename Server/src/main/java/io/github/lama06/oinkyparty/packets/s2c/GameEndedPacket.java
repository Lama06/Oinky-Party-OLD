package io.github.lama06.oinkyparty.packets.s2c;

import io.github.lama06.oinkyparty.packet.ServerPacket;

public final class GameEndedPacket extends ServerPacket {
    public GameEndedPacket() {
        super("gameEnded");
    }
}
