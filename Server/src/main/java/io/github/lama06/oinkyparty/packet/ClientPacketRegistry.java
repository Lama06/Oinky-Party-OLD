package io.github.lama06.oinkyparty.packet;

import io.github.lama06.oinkyparty.counter_game.C2SAddCounterPacket;
import io.github.lama06.oinkyparty.flappy_bird.packets.C2SPlayerDiedPacket;
import io.github.lama06.oinkyparty.flappy_bird.packets.C2SPlayerJumpedPacket;
import io.github.lama06.oinkyparty.packets.c2s.*;

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
        register("startGame", StartGamePacket.class);
        register("stopGame", StopGamePacket.class);

        register("counterGame-addCounter", C2SAddCounterPacket.class);

        register("flappyBird-playerDied", C2SPlayerDiedPacket.class);
        register("flappyBird-playerJumped", C2SPlayerJumpedPacket.class);
    }
}
