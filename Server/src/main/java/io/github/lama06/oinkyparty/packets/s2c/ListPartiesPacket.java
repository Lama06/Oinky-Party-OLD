package io.github.lama06.oinkyparty.packets.s2c;

import io.github.lama06.oinkyparty.Party;
import io.github.lama06.oinkyparty.PartyManager;
import io.github.lama06.oinkyparty.packet.ServerPacket;

import java.util.ArrayList;
import java.util.List;

public final class ListPartiesPacket extends ServerPacket {
    public List<SerializedParty> parties = new ArrayList<>();

    public ListPartiesPacket(PartyManager partyManager) {
        super("listParties");

        for(Party party : partyManager.getParties()) {
            if(!party.isGameRunning()) {
                parties.add(new SerializedParty(party));
            }
        }
    }

    public static final class SerializedParty {
        public String name;
        public int id;

        public SerializedParty(Party party) {
            name = party.getName();
            id = party.getId();
        }
    }
}
