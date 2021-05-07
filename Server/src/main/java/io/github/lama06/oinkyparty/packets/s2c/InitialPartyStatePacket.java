package io.github.lama06.oinkyparty.packets.s2c;

import io.github.lama06.oinkyparty.Party;
import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ServerPacket;

import java.util.ArrayList;
import java.util.List;

public final class InitialPartyStatePacket extends ServerPacket {
    public String name;
    public int id;
    public int ownId;
    public List<SerializedPlayer> players = new ArrayList<>();

    public InitialPartyStatePacket(Player player, Party party) {
        super("initialPartyState");

        name = party.getName();
        id = party.getId();
        ownId = player.getId();
        for(Player partyPlayer : party.getPlayers()) {
            players.add(new SerializedPlayer(partyPlayer));
        }
    }

    public static final class SerializedPlayer {
        public String name;
        public int id;

        public SerializedPlayer(Player player) {
            name = player.getName();
            id = player.getId();
        }
    }
}
