package io.github.lama06.oinkyparty.packet;

import io.github.lama06.oinkyparty.NetworkHandler;
import io.github.lama06.oinkyparty.Player;

public abstract class ClientPacket {
    public String packetName;

    public abstract void apply(Player player, NetworkHandler listener);
}
