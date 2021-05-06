import { Text } from "@pixi/text";
import { ClientPacket } from "../network/Packets";
import { game } from "../OinkyParty";
import { Screen, titleColor } from "../Screen";

class AddCounterPacket extends ClientPacket {
    constructor() {
        super("counterGame-addCounter");
    }
}

export class CounterGame extends Screen {
    constructor() {
        super();

        this.handleUpdateCounterPacket = this.handleUpdateCounterPacket.bind(
            this
        );
        this.handleClick = this.handleClick.bind(this);

        this.counter = 0;

        this.counterText = new Text("Counter: 0", {
            fill: titleColor,
            size: 50,
        });
        this.counterText.pivot.set(
            this.counterText.width / 2,
            this.counterText.height / 2
        );
        this.counterText.position.set(
            game.renderer.width / 2,
            game.renderer.height / 2
        );
        this.counterText.interactive = true;
        this.counterText.on("pointerdown", this.handleClick);
        this.addChild(this.counterText);

        game.socket.addEventListener(
            "counterGame-updateCounter",
            this.handleUpdateCounterPacket
        );
    }

    destroy() {
        game.socket.removeEventListener(
            "counterGame-updateCounter",
            this.handleUpdateCounterPacket
        );
    }

    handleClick() {
        this.counter++;
        game.socket.sendPacket(new AddCounterPacket());
    }

    handleUpdateCounterPacket(event) {
        let packet = event.detail;

        this.counter = packet.counter;
        this.counterText.text = "Counter: " + this.counter;
    }
}
