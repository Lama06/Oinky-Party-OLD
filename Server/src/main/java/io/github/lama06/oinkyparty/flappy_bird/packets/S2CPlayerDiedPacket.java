package io.github.lama06.oinkyparty.flappy_bird.packets;

import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ServerPacket;

public final class S2CPlayerDiedPacket extends ServerPacket {
    public int id;

    public S2CPlayerDiedPacket(Player player) {
        super("flappyBird-playerDied");
        this.id = player.getId();
    }
}
