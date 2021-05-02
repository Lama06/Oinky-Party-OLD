package io.github.lama06.oinkyparty.packets.s2c;

import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ServerPacket;

public final class PlayerJoinedPartyPacket extends ServerPacket {
    public String name;
    public int id;

    public PlayerJoinedPartyPacket(Player player) {
        super("playerJoinedParty");

        name = player.getName();
        id = player.getId();
    }
}
