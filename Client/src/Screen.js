import { Container } from "pixi.js"

/**
 * Ein Screen ist ein Bildschirm, der dem Spieler angezeigt wird.
 * Das kann sowohl ein Teil der GUI, als auch ein Spiel sein.
 */
export class Screen extends Container {
    constructor() {
        super()
    }

    /**
     * Die destroy Methode wird aufgerufen, wenn ein Bildschirm entfernt
     * oder durch einen anderen ersetzt wird.
     */
    destroy() {}
}

export const titleColor = ["#ffffff"]
export const titleSize = 30
export const textColor = ["#ffffff"]
export const textSize = 22
export const buttonTextColor = ["#ffffff"]
export const buttonTextSize = 25
