package io.github.lama06.oinkyparty.packets.c2s;

import io.github.lama06.oinkyparty.NetworkHandler;
import io.github.lama06.oinkyparty.Player;
import io.github.lama06.oinkyparty.packet.ClientPacket;

/**
 * Erstellt eine Party. Der Ersteller der Party wird automatisch zur Party hinzugefügt.
 */
public class CreatePartyPacket extends ClientPacket {
    /**
     * Name der Party, die erstellt wird
     */
    public String name;

    @Override
    public void apply(Player player, NetworkHandler listener) {
        listener.handleCreatePartyPacket(player, this);
    }
}
