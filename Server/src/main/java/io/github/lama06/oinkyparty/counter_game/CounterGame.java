package io.github.lama06.oinkyparty.counter_game;

import io.github.lama06.oinkyparty.Game;
import io.github.lama06.oinkyparty.Party;
import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ClientPacket;

public class CounterGame extends Game {
    private int counter;

    public CounterGame(Party party) {
        super(party);
    }

    @Override
    public void handleGamePacket(Player player, ClientPacket packet) {
        if(packet instanceof C2SAddCounterPacket) {
            counter++;
            party.brodcast(new S2CUpdateCounterPacket(counter));
        }
    }
}
