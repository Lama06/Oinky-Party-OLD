package io.github.lama06.oinkyparty.packets.c2s;

import io.github.lama06.oinkyparty.NetworkHandler;
import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ClientPacket;

public class CreatePartyPacket extends ClientPacket {
    public String name;

    @Override
    public void apply(Player player, NetworkHandler listener) {
        listener.handleCreatePartyPacket(player, this);
    }
}
