package io.github.lama06.oinkyparty;

import org.java_websocket.WebSocket;

import java.util.HashSet;
import java.util.Set;

/**
 * Verwaltet die Socket Verbindungen mit dem Server
 */
public final class PlayerManager {
    private Set<Player> players = new HashSet<>();

    /**
     * Sollte aufgerufen werden, wenn einen neue Socket Verbindung mit dem Server hergestellt wird
     * @param socket die Socket Verbindung
     */
    public void addPlayer(WebSocket socket) {
        players.add(new Player(socket));
    }

    /**
     * Sollte aufgerufen werden, wenn eine Socket Verbindnung mit dem Server getrennt wird
     * @param socket
     */
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
