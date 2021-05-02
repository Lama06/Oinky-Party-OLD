package io.github.lama06.oinkyparty.packets.c2s;

import io.github.lama06.oinkyparty.NetworkHandler;
import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ClientPacket;

public class JoinPartyPacket extends ClientPacket {
    public int id;

    @Override
    public void apply(Player player, NetworkHandler listener) {
        listener.handleJoinPartyPacket(player, this);
    }
}
