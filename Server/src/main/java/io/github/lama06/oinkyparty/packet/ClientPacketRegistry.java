package io.github.lama06.oinkyparty.packet;

import io.github.lama06.oinkyparty.packets.c2s.CreatePartyPacket;
import io.github.lama06.oinkyparty.packets.c2s.JoinPartyPacket;
import io.github.lama06.oinkyparty.packets.c2s.LeavePartyPacket;
import io.github.lama06.oinkyparty.packets.c2s.QueryPartiesPacket;

import java.util.HashMap;
import java.util.Map;

public final class ClientPacketRegistry {
    private static final Map<String, Class<? extends ClientPacket>> packets = new HashMap<>();

    private static void register(String name, Class<? extends ClientPacket> type) {
        packets.put(name, type);
    }

    public static Class<? extends ClientPacket> getPacketType(String name) {
        return packets.get(name);
    }

    static {
        register("createParty", CreatePartyPacket.class);
        register("joinParty", JoinPartyPacket.class);
        register("leaveParty", LeavePartyPacket.class);
        register("queryParties", QueryPartiesPacket.class);
    }
}
