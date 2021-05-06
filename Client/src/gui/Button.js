import { Container, Graphics, Text } from "pixi.js";

/**
 * Ein Knopf
 */
export class Button extends Container {
    constructor(settings) {
        super();

        this.settings = settings;

        this.handleClick = this.handleClick.bind(this);
        this.handleHoverStart = this.handleHoverStart.bind(this);
        this.handleHoverEnd = this.handleHoverEnd.bind(this);

        // Background
        this.background = new Graphics();
        this.background.beginFill(0x0054d2);
        this.background.drawRoundedRect(
            0,
            0,
            settings.width,
            settings.height,
            15
        );
        this.background.endFill();
        this.addChild(this.background);

        // Label
        this.label = settings.label;
        this.label.anchor.set(0.5);
        this.label.x = settings.width / 2;
        this.label.y = settings.height / 2;
        this.addChild(this.label);

        // Event Listeners
        this.interactive = true;
        this.on("pointerdown", this.handleClick.bind(this));
        this.on("pointerover", this.handleHoverStart.bind(this));
        this.on("pointerout", this.handleHoverEnd.bind(this));
    }

    handleClick() {
        if (this.settings.action != null) {
            this.settings.action();
        }
    }

    handleHoverStart() {
        this.scale.set(1.1);
    }

    handleHoverEnd() {
        this.scale.set(1);
    }
}
