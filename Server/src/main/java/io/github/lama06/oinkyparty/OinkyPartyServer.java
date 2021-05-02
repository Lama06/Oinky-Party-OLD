package io.github.lama06.oinkyparty;

public final class OinkyPartyServer {
    public SocketServer sockets = new SocketServer(this);
    public PlayerManager players = new PlayerManager();
    public PartyManager parties = new PartyManager();
    public NetworkHandler listener = new NetworkHandler(this);

    public static void main(String[] args) {
        new OinkyPartyServer();
    }
}
