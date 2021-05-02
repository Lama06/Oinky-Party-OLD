package io.github.lama06.oinkyparty.packet;

import com.google.gson.Gson;

public abstract class ServerPacket {
    public String packetName;

    public ServerPacket(String packetName) {
        this.packetName = packetName;
    }

    public String toJson() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }
}
