package io.github.lama06.oinkyparty.packets.c2s;

import io.github.lama06.oinkyparty.NetworkHandler;
import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ClientPacket;

/**
 * Wenn man aktuell in einer Party ist, verlässt man diese. Wenn das geklappt hat erhält man das ClientLeftPartyPacket
 */
public final class LeavePartyPacket extends ClientPacket {
    @Override
    public void apply(Player player, NetworkHandler listener) {
        listener.handleLeavePartyPacket(player, this);
    }
}
