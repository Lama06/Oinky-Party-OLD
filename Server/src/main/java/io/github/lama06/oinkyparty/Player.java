package io.github.lama06.oinkyparty;

import io.github.lama06.oinkyparty.packet.ServerPacket;
import io.github.lama06.oinkyparty.util.RandomPlayerNameProvider;
import io.github.lama06.oinkyparty.util.Util;
import org.java_websocket.WebSocket;

public final class Player {
    private final WebSocket socket;
    public final String name = RandomPlayerNameProvider.getRandomName();
    private final int id = Util.generateRandomId();

    public Player(WebSocket socket) {
        this.socket = socket;
    }

    public void sendPacket(ServerPacket packet) {
        socket.send(packet.toJson());
    }

    public WebSocket getSocket() {
        return socket;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
