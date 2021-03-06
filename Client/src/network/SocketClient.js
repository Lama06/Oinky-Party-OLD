export class SocketClient extends EventTarget {
    constructor() {
        try {
            super();

            this.socket = new WebSocket(`ws://${location.hostname}:3010/`);

            this.socket.onopen = this.handleConnected.bind(this);
            this.socket.onclose = this.handleDisconnected.bind(this);
            this.socket.onmessage = this.handleMessage.bind(this);
            this.socket.onerror = this.handleError.bind(this);
        } catch (err) {
            alert("WebSocket Verbindung konnte nicht hergestellt werden");
        }
    }

    sendPacket(packet) {
        this.socket.send(JSON.stringify(packet));
    }

    handleConnected() {
        console.log("WebSocket Verbindung mit dem Server hergestellt");
    }

    handleDisconnected() {
        console.log("WebSocket Verbindung mit dem Server getrennt");
    }

    handleMessage(event) {
        console.log(`WebSocket Nachricht erhalten: ${event.data}`);

        let packet = JSON.parse(event.data);
        let name = packet.packetName;

        this.dispatchEvent(new CustomEvent(name, { detail: packet }));
    }

    handleError() {
        alert(
            "WebSocket Error. Versuche die Seite neu zu laden, um dich erneut zu verbinden."
        );
    }
}
