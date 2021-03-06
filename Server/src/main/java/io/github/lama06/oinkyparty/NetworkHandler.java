package io.github.lama06.oinkyparty;

import com.google.gson.Gson;
import com.google.gson.JsonParser;
import io.github.lama06.oinkyparty.packet.ClientPacket;
import io.github.lama06.oinkyparty.packet.ClientPacketRegistry;
import io.github.lama06.oinkyparty.packets.c2s.*;
import io.github.lama06.oinkyparty.packets.s2c.ClientLeftPartyPacket;
import io.github.lama06.oinkyparty.packets.s2c.ListPartiesPacket;
import org.java_websocket.WebSocket;

public final class NetworkHandler {
    private final OinkyPartyServer server;

    public NetworkHandler(OinkyPartyServer server) {
        this.server = server;
    }

    public void handleSocketConnected(WebSocket socket) {
        server.players.addPlayer(socket);
    }

    public void handleSocketDisconnected(WebSocket socket) {
        // Spieler aus aktueller Party entfernen
        Player player = server.players.getPlayerByWebSocket(socket);
        Party party = server.parties.getPartyByPlayer(player);
        if(party != null) {
            party.removePlayer(player);
        }

        server.players.removePlayer(socket);
    }

    public void handlePacket(WebSocket socket, String packetContent) {
        try {
            String packetName = JsonParser.parseString(packetContent).getAsJsonObject().get("packetName").getAsString();
            Class<? extends ClientPacket> packetType = ClientPacketRegistry.getPacketType(packetName);

            Gson gson = new Gson();
            ClientPacket packet = gson.fromJson(packetContent, packetType);

            Player player = server.players.getPlayerByWebSocket(socket);

            packet.apply(player, server.listener);
        } catch(Exception e) {
            System.out.println("Packet konnte nicht verarbeitet werden: " + packetContent);
            e.printStackTrace();
        }
    }

    public void handleCreatePartyPacket(Player player, CreatePartyPacket packet) {
        server.parties.createParty(new Party(player, packet.name));
    }

    public void handleJoinPartyPacket(Player player, JoinPartyPacket packet) {
        Party oldParty = server.parties.getPartyByPlayer(player);
        if(oldParty != null) {
            oldParty.removePlayer(player);
        }

        Party newParty = server.parties.getPartyById(packet.id);
        if(newParty != null) {
            // Spieler nur hinzuf??gen, wenn in der Party nicht gerade ein Spiel l??uft
            if(!newParty.isGameRunning()) {
                newParty.addPlayer(player);
            } else {
                player.sendPacket(new ClientLeftPartyPacket());
            }
        }
    }

    public void handleLeavePartyPacket(Player player, LeavePartyPacket packet) {
        Party oldParty = server.parties.getPartyByPlayer(player);
        if(oldParty != null) {
            oldParty.removePlayer(player);
        }
    }

    public void handleQueryPartiesPacket(Player player, QueryPartiesPacket packet) {
        player.sendPacket(new ListPartiesPacket(server.parties));
    }

    public void handleStartGamePacket(Player player, StartGamePacket packet) {
        Party party = server.parties.getPartyByPlayer(player);
        if(party != null) {
            party.handleStartGamePacket(packet);
        }
    }

    public void handleStopGamePacket(Player player, StopGamePacket packet) {
        Party party = server.parties.getPartyByPlayer(player);
        if(party != null) {
            party.handleStopGamePacket(packet);
        }
    }

    public void handleGamePacket(Player player, ClientPacket packet) {
        Party party = server.parties.getPartyByPlayer(player);
        if(party != null) {
            party.handleGamePacket(player, packet);
        }
    }
}
