package io.github.lama06.oinkyparty;

import io.github.lama06.oinkyparty.counter_game.CounterGame;
import io.github.lama06.oinkyparty.packet.ClientPacket;
import io.github.lama06.oinkyparty.packet.ServerPacket;
import io.github.lama06.oinkyparty.packets.c2s.StartGamePacket;
import io.github.lama06.oinkyparty.packets.c2s.StopGamePacket;
import io.github.lama06.oinkyparty.packets.s2c.ClientLeftPartyPacket;
import io.github.lama06.oinkyparty.packets.s2c.GameEndedPacket;
import io.github.lama06.oinkyparty.packets.s2c.GameStartedPacket;
import io.github.lama06.oinkyparty.packets.s2c.InitialPartyStatePacket;
import io.github.lama06.oinkyparty.packets.s2c.PlayerJoinedPartyPacket;
import io.github.lama06.oinkyparty.packets.s2c.PlayerLeftPartyPacket;
import io.github.lama06.oinkyparty.util.Util;

import java.util.HashSet;
import java.util.Set;

import org.java_websocket.exceptions.WebsocketNotConnectedException;

public final class Party {
    private final String name;
    private final int id = Util.generateRandomId();
    private final Set<Player> players = new HashSet<>();
    private Game game = null;

    public Party(Player owner, String name) {
        this.name = name;
        addPlayer(owner);
    }

    public void addPlayer(Player player) {
        brodcast(new PlayerJoinedPartyPacket(player));
        players.add(player);
        player.sendPacket(new InitialPartyStatePacket(player, this));
    }

    public void removePlayer(Player player) {
        players.remove(player);
        try {
            player.sendPacket(new ClientLeftPartyPacket());
        } catch(WebsocketNotConnectedException e) {

        }
        brodcast(new PlayerLeftPartyPacket(player));
    }

    public boolean containsPlayer(Player player) {
        return players.contains(player);
    }

    public void handleStartGamePacket(StartGamePacket packet) {
        if(!isGameRunning()) {
            startGame(packet.type);
        }
    }

    public void handleStopGamePacket(StopGamePacket packet) {
        if(isGameRunning()) {
            endGame();
        }
    }

    public void endGame() {
        game = null;
        brodcast(new GameEndedPacket());
    }

    public void handleGamePacket(Player player, ClientPacket packet) {
        if(game != null) {
            game.handleGamePacket(player, packet);
        }
    }

    public void startGame(String type) {
        switch(type) {
            case "counter":
                game = new CounterGame(this);
                break;
        }
        brodcast(new GameStartedPacket(type));
    }

    public void brodcast(ServerPacket packet) {
        for(Player player : players) {
            player.sendPacket(packet);
        }
    }

    public void brodcast(ServerPacket packet, Player ignore) {
        for(Player player : players) {
            if(!player.equals(ignore)) {
                player.sendPacket(packet);
            }
        }
    }

    public void tick() {
        if(game != null) {
            game.tick();
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
