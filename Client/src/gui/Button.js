import { Container, Graphics, Text } from "pixi.js"

export class Button extends Container {
    constructor(settings) {
        super()

        this.settings = settings

        this.background = new Graphics()
        this.background.beginFill(settings.color || 0x0054d2)
        this.background.drawRoundedRect(
            0,
            0,
            settings.width,
            settings.height,
            15
        )
        this.background.endFill()
        this.addChild(this.background)

        this.label = settings.label
        this.label.anchor.set(0.5)
        this.label.x = settings.width / 2
        this.label.y = settings.height / 2
        this.addChild(this.label)

        this.interactive = true
        this.on("pointerdown", this.handleClick.bind(this))
        this.on("pointerover", this.handleHoverStart.bind(this))
        this.on("pointerout", this.handleHoverEnd.bind(this))
    }

    handleClick() {
        this.settings.action()
    }

    handleHoverStart() {
        this.scale.set(1.1)
    }

    handleHoverEnd() {
        this.scale.set(1)
    }
}
