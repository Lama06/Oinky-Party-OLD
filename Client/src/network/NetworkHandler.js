export class NetworkHandler extends EventTarget {
    handlePacket(message) {
        let packet = JSON.parse(message)
        let name = packet.packetName

        this.dispatchEvent(new CustomEvent(name, { detail: packet }))
    }
}
