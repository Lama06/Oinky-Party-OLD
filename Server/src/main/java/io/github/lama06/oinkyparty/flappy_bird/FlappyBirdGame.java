package io.github.lama06.oinkyparty.flappy_bird;

import io.github.lama06.oinkyparty.Game;
import io.github.lama06.oinkyparty.Party;
import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.flappy_bird.packets.C2SPlayerDiedPacket;
import io.github.lama06.oinkyparty.flappy_bird.packets.C2SPlayerJumpedPacket;
import io.github.lama06.oinkyparty.flappy_bird.packets.S2CPlayerDiedPacket;
import io.github.lama06.oinkyparty.flappy_bird.packets.S2CPlayerJumpedPacket;
import io.github.lama06.oinkyparty.packet.ClientPacket;

public final class FlappyBirdGame extends Game {
    public FlappyBirdGame(Party party) {
        super(party);
    }
    
    @Override
    public void handleGamePacket(Player player, ClientPacket packet) {
        if(packet instanceof C2SPlayerJumpedPacket) {
            party.brodcast(new S2CPlayerJumpedPacket(player, (C2SPlayerJumpedPacket) packet), player);
        } else if(packet instanceof C2SPlayerDiedPacket) {
            party.brodcast(new S2CPlayerDiedPacket(player));
        }
    }
}
