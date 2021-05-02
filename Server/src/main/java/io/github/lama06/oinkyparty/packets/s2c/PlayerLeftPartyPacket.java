package io.github.lama06.oinkyparty.packets.s2c;

import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ServerPacket;

public final class PlayerLeftPartyPacket extends ServerPacket {
    public int id;

    public PlayerLeftPartyPacket(Player player) {
        super("playerLeftParty");
        id = player.getId();
    }
}
