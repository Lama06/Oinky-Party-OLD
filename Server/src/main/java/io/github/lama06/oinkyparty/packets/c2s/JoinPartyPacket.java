package io.github.lama06.oinkyparty.packets.c2s;

import io.github.lama06.oinkyparty.NetworkHandler;
import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ClientPacket;

/**
 * Man tritt einer Party bei. Wenn das erfolgreich war erhält man das InitialPartyStatePacket
 */
public final class JoinPartyPacket extends ClientPacket {
    /**
     * Die id der Party
     */
    public int id;

    @Override
    public void apply(Player player, NetworkHandler listener) {
        listener.handleJoinPartyPacket(player, this);
    }
}
