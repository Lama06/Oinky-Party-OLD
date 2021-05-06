package io.github.lama06.oinkyparty.packets.c2s;

import io.github.lama06.oinkyparty.NetworkHandler;
import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ClientPacket;

/**
 * Auf Antwort auf dieses Packet erhält man eine Liste aller Partys, die gerade auf dem Server laufen
 */
public final class QueryPartiesPacket extends ClientPacket {
    @Override
    public void apply(Player player, NetworkHandler listener) {
        listener.handleQueryPartiesPacket(player, this);
    }
}
