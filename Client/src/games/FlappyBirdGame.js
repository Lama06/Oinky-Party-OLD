import { Graphics } from "@pixi/graphics";
import { ClientPacket } from "../network/Packets";
import { game } from "../OinkyParty";
import { GameScreen } from "./GameScreen";

class PlayerDiedPacket extends ClientPacket {
    constructor() {
        super("flappyBird-playerDied");
    }
}

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

        this.beginFill(game.party.ownId == id ? 0xff0000 : 0xffffff);
        this.drawRect(0, 0, 50, 50);
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

const obstaclesCoordinates = [0.5, 0.3, 0.6, 0.1, 0.7, 0.5, 0.3, 0.0];

function getObstacleCoordinate(id) {
    return obstaclesCoordinates[id % obstaclesCoordinates.length];
}

class Obstacle extends Graphics {
    constructor(id) {
        super();

        this.id = id;
        this.coordinate = getObstacleCoordinate(id);

        this.beginFill(0xffffff);
        this.drawRect(0, 0, 60, this.coordinate * game.renderer.height);
        this.drawRect(
            0,
            this.coordinate * game.renderer.height + 250,
            60,
            game.renderer.height - this.coordinate * game.renderer.height + 250
        );
        this.endFill();

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
        this.handlePlayerJumpedPacket = this.handlePlayerJumpedPacket.bind(
            this
        );

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
        for (let bird of this.birds) {
            bird.tick(delta);
        }

        for (let obstacle of this.obstacles) {
            obstacle.tick(delta);
        }

        this.ticksToNextObstacle -= 1 * delta;

        if (this.ticksToNextObstacle <= 0) {
            this.spawnObstacle();
            this.ticksToNextObstacle = 500;
            this.nextObstacleId++;
        }
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
        if (event.code == "Space") {
            this.jumpOwnBird();
        }
    }

    handleClicked() {
        this.jumpOwnBird();
    }

    jumpOwnBird() {
        this.getOwnBird().jump();
        game.socket.sendPacket(new PlayerJumpedPacket(this.getOwnBird().yPos));
    }

    handlePlayerDiedPacket(event) {
        let packet = event.detail;

        this.birds = this.birds.filter((bird) => bird.id != packet.id);
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
