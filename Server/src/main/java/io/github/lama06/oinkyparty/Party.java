package io.github.lama06.oinkyparty;

import io.github.lama06.oinkyparty.packet.ServerPacket;
import io.github.lama06.oinkyparty.packets.s2c.InitialPartyStatePacket;
import io.github.lama06.oinkyparty.packets.s2c.PlayerJoinedPartyPacket;
import io.github.lama06.oinkyparty.packets.s2c.PlayerLeftPartyPacket;
import io.github.lama06.oinkyparty.util.Util;

import java.util.HashSet;
import java.util.Set;

public final class Party {
    private final String name;
    private final int id = Util.generateRandomId();
    private final Set<Player> players = new HashSet<>();
    private Game game = null;

    public Party(Player owner, String name) {
        players.add(owner);
        this.name = name;
    }

    public void addPlayer(Player player) {
        brodcast(new PlayerJoinedPartyPacket(player));
        players.add(player);
        player.sendPacket(new InitialPartyStatePacket(this));
    }

    public void removePlayer(Player player) {
        players.remove(player);
        brodcast(new PlayerLeftPartyPacket(player));
    }

    public boolean containsPlayer(Player player) {
        return players.contains(player);
    }

    public void brodcast(ServerPacket packet) {
        for(Player player : players) {
            player.sendPacket(packet);
        }
    }

    public boolean isGameRunning() {
        return game != null;
    }

    public Set<Player> getPlayers() {
        return players;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }
}
