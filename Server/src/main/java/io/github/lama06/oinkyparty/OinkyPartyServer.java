package io.github.lama06.oinkyparty;

import java.util.Timer;
import java.util.TimerTask;

public final class OinkyPartyServer extends TimerTask {
    public static void main(String[] args) {
        new OinkyPartyServer();
    }

    public SocketServer sockets = new SocketServer(this);
    public PlayerManager players = new PlayerManager();
    public PartyManager parties = new PartyManager();
    public NetworkHandler listener = new NetworkHandler(this);

    public OinkyPartyServer() {
        Timer timer = new Timer();
        timer.schedule(this, 0, 50);
    }

    public void run() {
        parties.tick();
    }
}
