package io.github.lama06.oinkyparty.flappy_bird.packets;

import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ServerPacket;

public final class S2CPlayerJumpedPacket extends ServerPacket {
    public int id;
    public double y;

    public S2CPlayerJumpedPacket(Player player, C2SPlayerJumpedPacket packet) {
        super("flappyBird-playerJumped");
        this.id = player.getId();
        this.y = packet.y;
    }
}
