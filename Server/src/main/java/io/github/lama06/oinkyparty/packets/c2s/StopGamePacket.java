package io.github.lama06.oinkyparty.packets.c2s;

import io.github.lama06.oinkyparty.NetworkHandler;
import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ClientPacket;

/**
 * Beendet das aktuelle Spiel
 */
public final class StopGamePacket extends ClientPacket {
    @Override
    public void apply(Player player, NetworkHandler listener) {
        listener.handleStopGamePacket(player, this);
    }
}
