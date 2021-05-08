package io.github.lama06.oinkyparty;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;

public final class SocketServer extends WebSocketServer {
    private OinkyPartyServer server;

    public SocketServer(OinkyPartyServer server) {
        super(new InetSocketAddress(3010));
        this.server = server;
        start();
    }

    @Override
    public void onOpen(WebSocket socket, ClientHandshake handshake) {
        System.out.println("Neue Verbindung von: " + socket.getRemoteSocketAddress());
        server.listener.handleSocketConnected(socket);
    }

    @Override
    public void onClose(WebSocket socket, int code, String reason, boolean remote) {
        System.out.println("Verbindung geschlossen");
        server.listener.handleSocketDisconnected(socket);
    }

    @Override
    public void onMessage(WebSocket socket, String message) {
        System.out.println("Neues Packet: " + message);
        server.listener.handlePacket(socket, message);
    }

    @Override
    public void onError(WebSocket socket, Exception ex) {
        System.out.println("Error im WebSocket Server");
        ex.printStackTrace();
    }

    @Override
    public void onStart() {
        System.out.println("WebSocket Server gestartet");
    }
}
