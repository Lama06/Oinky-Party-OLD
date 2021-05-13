import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { ClientPacket } from "../network/Packets";
import { game } from "../OinkyParty";
import { rectsIntersect } from "../util/Collision";
import { GameScreen } from "./GameScreen";

/**
 * Ein Packet, das an den Server gesendet wird, wenn der Spieler gestorben ist
 */
class PlayerDiedPacket extends ClientPacket {
    constructor() {
        super("flappyBird-playerDied");
    }
}

/**
 * Ein Packet, das an den Server gesendet wird, wenn der Spieler gesprungen ist
 */
class PlayerJumpedPacket extends ClientPacket {
    constructor(y) {
        super("flappyBird-playerJumped");
        this.y = y;
    }
}

const fallingSpeedAfterJump = -0.01;
const fallingSpeedIncrease = 0.0004;

class FlappyBird extends Graphics {
    constructor(id) {
        super();

        /**
         * Die id des Spielers
         */
        this.id = id;

        /**
         * Die Y-Position. 0 bedeutet ganz unten. 1 ganz oben.
         */
        this.setYPos(0.5);
        /**
         * Dieser Wert wird in jedem Tick von der yPos subtrahiert
         * Außerdem sinkt dieser Wert in jedem Tick
         */
        this.fallingSpeed = fallingSpeedAfterJump;

        let size = game.renderer.height / 25;

        this.beginFill(game.party.ownId == id ? 0xff0000 : 0xffffff);
        this.drawRect(0, 0, size, size);
        this.endFill();

        this.pivot.set(this.width / 2, this.height / 2);
        this.x = game.renderer.width / 2;
    }

    setYPos(y) {
        this.yPos = y;
        this.y = game.renderer.height - game.renderer.height * this.yPos;
    }

    /**
     * Gibt an, ob der Flappy Bird außerhalb des Bildschirmes ist
     */
    isOutsideDisplay() {
        if (this.yPos > 1 || this.yPos < 0) {
            return true;
        }

        return false;
    }

    tick(delta) {
        this.setYPos(this.yPos - this.fallingSpeed * delta);
        this.fallingSpeed += fallingSpeedIncrease * delta;
    }

    jump() {
        this.fallingSpeed = fallingSpeedAfterJump;
    }
}

/**
 * Die Koordinaten, bei denen jeweils der obere Anfang des Durchgangs bei den Hindernissen sein soll.
 *
 * Sie sind relativ zur Bildschirmgröße: 0 bedeutet ganz unten, 1 ganz oben.
 *
 * Damit man noch genug Platz hat, um durch zu fliegen, sollte der höchste Wert 0.8 sein, weil
 * die Höhe des Durchganges bei 2 / 10 der Höhe des Bildschirme liegt.
 */
const obstaclesCoordinates = [0.5, 0.1, 0.7, 0.8, 0.0, 0.5, 0.3, 0.5];
const obstacleColor = 0xffffff;

function getObstacleCoordinate(id) {
    return obstaclesCoordinates[id % obstaclesCoordinates.length];
}

class Obstacle extends Container {
    constructor(id) {
        super();

        this.id = id;
        /**
         * Der Punkt, wo die Lücke im Hinderniss ist.
         */
        this.coordinate = getObstacleCoordinate(id);

        let width = game.renderer.width / 24;

        // oberer Teil des Hindernisses
        let upper = new Graphics();
        upper.beginFill(obstacleColor);
        upper.drawRect(0, 0, width, this.coordinate * game.renderer.height);
        upper.endFill();
        this.addChild(upper);
        this.upper = upper;

        // unterer Teil des Hindernisses
        let lower = new Graphics();
        lower.beginFill(obstacleColor);
        lower.drawRect(
            0,
            this.coordinate * game.renderer.height + game.renderer.height / 5,
            width,
            game.renderer.height -
                this.coordinate * game.renderer.height +
                game.renderer.height / 5
        );
        lower.endFill();
        this.addChild(lower);
        this.lower = lower;

        this.position.set(game.renderer.width, 0);
    }

    tick(delta) {
        this.x -= (game.renderer.width / 600) * delta;
    }
}

export class FlappyBirdGame extends GameScreen {
    constructor() {
        super();

        this.tick = this.tick.bind(this);
        this.handleKeyPressed = this.handleKeyPressed.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
        this.handlePlayerDiedPacket = this.handlePlayerDiedPacket.bind(this);
        this.handlePlayerJumpedPacket =
            this.handlePlayerJumpedPacket.bind(this);

        /**
         * Ein Array aller Hindernisse
         */
        this.obstacles = [];
        /**
         * Gibt an, in wie vielen Ticks ein neues Hinderniss hinzugefügt wird
         */
        this.ticksToNextObstacle = 0;
        /**
         * Gibt die id des nächsten Hindernisses an
         */
        this.nextObstacleId = 0;
        this.isDead = false;

        /**
         * Die Flappy Birds der Spieler in der Runde
         */
        this.birds = [];
        for (let player of game.party.players) {
            let bird = new FlappyBird(player.id);
            this.birds.push(bird);
            this.addChild(bird);
        }

        // Event Listeners
        this.interactive = true;
        this.on("pointerdown", this.handleClicked);

        game.ticker.add(this.tick);

        document.addEventListener("keypress", this.handleKeyPressed);

        game.socket.addEventListener(
            "flappyBird-playerDied",
            this.handlePlayerDiedPacket
        );
        game.socket.addEventListener(
            "flappyBird-playerJumped",
            this.handlePlayerJumpedPacket
        );
    }

    destroy() {
        game.ticker.remove(this.tick);

        this.off("pointerdown", this.handleClicked);

        document.removeEventListener("keypress", this.handleKeyPressed);

        game.socket.removeEventListener(
            "flappyBird-playerDied",
            this.handlePlayerDiedPacket
        );
        game.socket.removeEventListener(
            "flappyBird-playerJumped",
            this.handlePlayerJumpedPacket
        );
    }

    tick(delta) {
        // Birds ticken
        for (let bird of this.birds) {
            bird.tick(delta);
        }

        // Hindernisse ticken
        for (let obstacle of this.obstacles) {
            obstacle.tick(delta);
        }

        // Neue Hindernisse spawnen
        this.ticksToNextObstacle -= 1 * delta;

        if (this.ticksToNextObstacle <= 0) {
            this.spawnObstacle();
            this.ticksToNextObstacle = 300;
            this.nextObstacleId++;
        }

        // Überprüfen, ob der Spieler gestorben ist
        if (!this.isDead) {
            if (
                this.getOwnBird().isOutsideDisplay() ||
                this.isBirdCollidingWithObstacle(this.getOwnBird())
            ) {
                game.socket.sendPacket(new PlayerDiedPacket());
                this.isDead = true;
            }
        }
    }

    isBirdCollidingWithObstacle(bird) {
        for (let obstacle of this.obstacles) {
            if (
                rectsIntersect(obstacle.upper, bird) ||
                rectsIntersect(obstacle.lower, bird)
            ) {
                return true;
            }
        }

        return false;
    }

    getBird(id) {
        for (let bird of this.birds) {
            if (bird.id == id) {
                return bird;
            }
        }

        return null;
    }

    getOwnBird() {
        return this.getBird(game.party.ownId);
    }

    spawnObstacle() {
        let obstacle = new Obstacle(this.nextObstacleId);
        this.obstacles.push(obstacle);
        this.addChild(obstacle);
    }

    handleKeyPressed(event) {
        if (event.code == "Space" && !this.isDead) {
            this.jumpOwnBird();
        }
    }

    handleClicked() {
        if (this.isDead) return;
        this.jumpOwnBird();
    }

    jumpOwnBird() {
        this.getOwnBird().jump();
        game.socket.sendPacket(new PlayerJumpedPacket(this.getOwnBird().yPos));
    }

    handlePlayerDiedPacket(event) {
        let packet = event.detail;

        let bird = this.getBird(packet.id);
        bird.visible = false;
    }

    handlePlayerJumpedPacket(event) {
        let packet = event.detail;

        if (packet.id == game.party.ownId) {
            return;
        }

        let bird = this.getBird(packet.id);
        bird.setYPos(packet.y);
        bird.jump();
    }
}
