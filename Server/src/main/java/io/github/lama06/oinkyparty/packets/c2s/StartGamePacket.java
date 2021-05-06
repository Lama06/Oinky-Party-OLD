package io.github.lama06.oinkyparty.packets.c2s;

import io.github.lama06.oinkyparty.NetworkHandler;
import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ClientPacket;

/**
 * Startet ein Spiel in der aktuellen Party
 */
public final class StartGamePacket extends ClientPacket {
    /**
     * Das Spiel, das gestartet werden soll
     */
    public String type;

    @Override
    public void apply(Player player, NetworkHandler listener) {
        listener.handleStartGamePacket(player, this);
    }
}
