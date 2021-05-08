package io.github.lama06.oinkyparty.flappy_bird.packets;

import io.github.lama06.oinkyparty.NetworkHandler;
import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ClientPacket;

public final class C2SPlayerJumpedPacket extends ClientPacket {
    public double y;

    @Override
    public void apply(Player player, NetworkHandler listener) {
        listener.handleGamePacket(player, this);
    }   
}
