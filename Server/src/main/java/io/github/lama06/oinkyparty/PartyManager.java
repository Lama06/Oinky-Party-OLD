package io.github.lama06.oinkyparty;

import java.util.HashSet;
import java.util.Set;

public final class PartyManager {
    private Set<Party> parties = new HashSet<>();

    public void createParty(Party party) {
        parties.add(party);
    }

    public Party getPartyById(int id) {
        for(Party party : parties) {
            if(party.getId() == id) {
                return party;
            }
        }

        return null;
    }

    public Party getPartyByPlayer(Player player) {
        for(Party party : parties) {
            if(party.containsPlayer(player)) {
                return party;
            }
        }

        return null;
    }

    public void tick() {
        for(Party party : parties) {
            party.tick();
        }
    }

    public Set<Party> getParties() {
        return parties;
    }
}
