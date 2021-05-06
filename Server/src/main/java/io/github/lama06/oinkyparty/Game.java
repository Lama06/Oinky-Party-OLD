package io.github.lama06.oinkyparty;

import io.github.lama06.oinkyparty.packet.ClientPacket;

public abstract class Game {
    protected Party party;

    public Game(Party party) {
        this.party = party;
    }

    /**
     * Wird ca 20 mal in der Sekunde aufgerufen
     */
    public void tick() {

    }

    /**
     * Wird aufgerufen, wenn der Server ein Packet erhält 
     * @param player der Spieler, der das Packet gesendet hat
     * @param packet das Packet
     */
    public void handleGamePacket(Player player, ClientPacket packet) {

    }

    /**
     * Sollte vom Spiel aufgerufen werden, wenn das Spiel beendet ist
     */
    protected void gameHasEnded() {
        party.endGame();
    }
}
