package io.github.lama06.oinkyparty.counter_game;

import io.github.lama06.oinkyparty.packet.ServerPacket;

public class S2CUpdateCounterPacket extends ServerPacket {
    public int counter;

    public S2CUpdateCounterPacket(int counter) {
        super("counterGame-updateCounter");
        this.counter = counter;
    }
}
