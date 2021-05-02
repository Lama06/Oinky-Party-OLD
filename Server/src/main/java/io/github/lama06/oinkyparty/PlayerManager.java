package io.github.lama06.oinkyparty;

import org.java_websocket.WebSocket;

import java.util.HashSet;
import java.util.Set;

public final class PlayerManager {
    private Set<Player> players = new HashSet<>();

    public void addPlayer(WebSocket socket) {
        players.add(new Player(socket));
    }

    public void removePlayer(WebSocket socket) {
        players.remove(getPlayerByWebSocket(socket));
    }

    public Player getPlayerByWebSocket(WebSocket socket) {
        for(Player player : players) {
            if(player.getSocket().equals(socket)) {
                return player;
            }
        }

        return null;
    }
}
