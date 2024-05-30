import { Scene } from "phaser";
import GameUI from "../components/GameUI";
import LifeUI from "../components/LifeUI";
import Player from "../components/Player";
import { createWall, removeBlocks } from "../components/Builder";
import WebFontFile from "../components/WebFontFile";
import { formatTime } from "../components/Timer";

export class LevelOne extends Scene {
    constructor () {
        super("LevelOne");
    }

    preload() {
        this.addFiles();

        this.initialTime = 90;
        this.background;
        this.floors = this.physics.add.staticGroup();
        this.platforms = this.physics.add.group({immovable: true, allowGravity: false});
        this.player;
        this.cursors;
        this.timer_label;
        this.timer_value;
        this.life_label;
        this.life_value_ui;
        this.life_value = this.physics.add.staticGroup();
        this.camera;
        this.pubs = this.physics.add.group({immovable: true, allowGravity: false});

        this.interval;
    }

    create() {
        const {width, height} = this.scale;
        this.background = this.add.tileSprite(512, 384, width, height, "background_levelOne").setScale(1);

        this.floors.create(950, 830, "floor_levelOne");
        this.pubs.create(12300, 630, "pub");
        this.createPlatforms();

        this.player = this.add.existing(new Player(this, 512, 650));
        this.camera = this.cameras.main;
        this.camera.setFollowOffset(0, 268);
        this.camera.setLerp(1, 1);

        this.timer_label = new GameUI(this, 55, 40, "Time:");
        this.timer_value = new GameUI(this, 145, 40, formatTime(this.initialTime));
        this.life_label = new GameUI(this, 50, 80, "Life:");
        this.life_value_ui = new LifeUI(this, 130, 85);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player.player, this.floors, null);
        this.physics.add.collider(this.player.player, this.platforms, null);
        this.physics.add.collider(this.player.player, this.pubs, function(player) {
            player.scene.player.hasFinishedLevel = true;
            player.scene.endGame(true);
        });

        this.interval = setInterval(() => {
            this.initialTime -= 1;
            this.initialTime >= 0 && this.timer_value.updateText(formatTime(this.initialTime));
        }, 1000);
    }

    update() {
        this.player.playerIsTouchingDown = this.player.player.body.touching.down;
        this.player.move(this.cursors, this.background, 0, 12000);
    }

    addFiles() {
        this.load.setPath("assets");

        this.load.addFile(new WebFontFile(this.load, "Permanent Marker"));
        this.load.image("background_levelOne", "background_at/Postapocalypce1/Bright/postapocalypse1.png");
        this.load.image("floor_levelOne", "background_at/Postapocalypce1/Bright/road_cropped.png");
        this.load.image("platform", "simple_platformer_kit/2 Locations/Tiles/Tile_10.png");
        this.load.image("pub", "tavern.png");
        this.heart = this.load.image("heart", "hearts/heart.png");
        this.load.spritesheet("player_idle", "simple_platformer_kit/1 Main Characters/1/Idle.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("player_run", "simple_platformer_kit/1 Main Characters/1/Run.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("player_jump", "simple_platformer_kit/1 Main Characters/1/Jump.png", {frameWidth: 32, frameHeight: 32});
    };

    createPlatforms() {
        createWall(this.platforms, 1200, 760, 6, true);
        createWall(this.platforms, 1220, 660, 4, false);
        createWall(this.platforms, 1500, 760, 9, true);
        createWall(this.platforms, 1520, 640, 4, false);
        createWall(this.platforms, 1700, 560, 8, false);
        createWall(this.platforms, 1800, 760, 14, true);
        createWall(this.platforms, 1960, 600, 2, false);
        createWall(this.platforms, 2000, 760, 16, true);
        createWall(this.platforms, 1660, 300, 14, false);
        createWall(this.platforms, 2020, 460, 3, false);
        createWall(this.platforms, 2080, 460, 15, true);
        createWall(this.platforms, 2080, 160, 20, false);
        createWall(this.platforms, 2560, 640, 37, true);
        createWall(this.platforms, 2200, 300, 18, false);
        createWall(this.platforms, 2100, 460, 18, false);
        createWall(this.platforms, 2160, 640, 20, false);
        createWall(this.platforms, 2340, 620, 3, true);
        createWall(this.platforms, 2800, 760, 30, true);
        createWall(this.platforms, 2580, 640, 3, false);
        createWall(this.platforms, 2740, 500, 3, false);
        createWall(this.platforms, 2580, 400, 3, false);
        createWall(this.platforms, 2740, 250, 3, false);
        createWall(this.platforms, 2900, 620, 35, true);
        createWall(this.platforms, 2900, 640, 20, false);
        createWall(this.platforms, 3460, 760, 20, true);
        createWall(this.platforms, 3460, 260, 15, true);
        createWall(this.platforms, 2920, 480, 2, false);
        createWall(this.platforms, 3060, 380, 20, false);
        createWall(this.platforms, 3140, 260, 16, false);
        createWall(this.platforms, 2920, 260, 6, false);
        createWall(this.platforms, 2920, 160, 16, false);
        createWall(this.platforms, 3000, 140, 2, true);
        createWall(this.platforms, 3460, 600, 50, false);
        createWall(this.platforms, 3900, 580, 5, true);
        createWall(this.platforms, 4600, 600, 40, true);
        createWall(this.platforms, 4760, 600, 48, false);
        createWall(this.platforms, 4620, 500, 50, false);
        createWall(this.platforms, 5720, 760, 20, true);
        createWall(this.platforms, 4760, 380, 48, false);
        createWall(this.platforms, 4760, 280, 56, false);
        createWall(this.platforms, 5720, 260, 20, true);
        createWall(this.platforms, 5880, 660, 20, true);
        createWall(this.platforms, 6200, 760, 32, true);
        createWall(this.platforms, 5900, 660, 3, false);
        createWall(this.platforms, 6140, 500, 3, false);
        createWall(this.platforms, 5900, 360, 3, false);
        createWall(this.platforms, 5900, 140, 15, false);
        createWall(this.platforms, 6220, 140, 40, false);
        createWall(this.platforms, 6360, 280, 40, false);
        createWall(this.platforms, 6220, 420, 40, false);
        createWall(this.platforms, 6360, 540, 40, false);
        createWall(this.platforms, 6220, 660, 40, false);
        createWall(this.platforms, 7140, 660, 40, true);
        createWall(this.platforms, 7500, 760, 33, true);
        createWall(this.platforms, 7160, 660, 3, false);
        createWall(this.platforms, 7440, 600, 3, false);
        createWall(this.platforms, 7160, 460, 3, false);
        createWall(this.platforms, 7440, 400, 3, false);
        createWall(this.platforms, 7160, 260, 3, false);
        createWall(this.platforms, 8000, 100, 45, false);
        createWall(this.platforms, 7980, 540, 23, true);
        createWall(this.platforms, 7600, 660, 70, false);
        createWall(this.platforms, 8000, 540, 45, false);
        createWall(this.platforms, 8100, 420, 45, false);
        createWall(this.platforms, 8000, 320, 45, false);
        createWall(this.platforms, 8100, 220, 45, false);
        createWall(this.platforms, 9000, 660, 33, true);
        createWall(this.platforms, 9400, 760, 4, true);
        createWall(this.platforms, 9550, 760, 8, true);
        createWall(this.platforms, 9700, 580, 4, true);
        createWall(this.platforms, 9850, 500, 4, true);
        createWall(this.platforms, 9550, 300, 4, false);
        createWall(this.platforms, 9800, 200, 4, false);
        createWall(this.platforms, 10000, 200, 4, false);
        createWall(this.platforms, 10200, 200, 4, false);
        createWall(this.platforms, 10360, 240, 1, false);
        createWall(this.platforms, 10560, 240, 1, false);
        createWall(this.platforms, 10800, 340, 2, false);
        createWall(this.platforms, 11000, 280, 2, false);
        createWall(this.platforms, 11300, 180, 1, false);
        createWall(this.platforms, 11400, 140, 1, false);
        createWall(this.platforms, 11500, 760, 32, true);

        // This code below is just for dev
        const tar = 11200;
        this.background.tilePositionX += tar;
        this.platforms.children.entries.forEach(plat => plat.x -= tar);
        this.pubs.children.entries.forEach(b => b.x -= tar);
    };

    moveGroups(isPlus) {
        //console.log(this.background.tilePositionX);
        removeBlocks(this.platforms, -3000);
        if (isPlus) {
            this.background.tilePositionX += 3;
            this.platforms.children.entries.forEach(plat => plat.x -= 3);
            this.pubs.children.entries.forEach(b => b.x -= 3);
        } else {
            this.background.tilePositionX -= 3;
            this.platforms.children.entries.forEach(plat => plat.x += 3);
            this.pubs.children.entries.forEach(b => b.x += 3);
        };
    };

    endGame(hasWon) {
        clearInterval(this.interval);
        this.add.text(512, 100, hasWon? "You won" : "You died", {
            fontFamily: "Permanent Marker", fontSize: 64, color: "#ff0000",
            stroke: "#000000", strokeThickness: 8,
            align: "center"
        }).setOrigin(0.5).setDepth(100);

        let nextButton;
        if (hasWon) {
            nextButton = this.add.text(512, 300, "Next Level", {
                fontFamily: "Permanent Marker", fontSize: 44, color: "#ffffff",
                stroke: "#000000", strokeThickness: 4,
                align: "center"
            }).setOrigin(0.5).setDepth(100);

            nextButton.setInteractive();
            nextButton.on("pointerdown", () => {
                this.scene.start("LevelTwo");
            });
        };

        let restartButton = this.add.text(512, hasWon ? 350 : 300, "Restart", {
            fontFamily: "Permanent Marker", fontSize: 44, color: "#ffffff",
            stroke: "#000000", strokeThickness: 4,
            align: "center"
        }).setOrigin(0.5).setDepth(100);

        let menuButton = this.add.text(512, hasWon ? 400 : 350, "Menu", {
            fontFamily: "Permanent Marker", fontSize: 44, color: "#ffffff",
            stroke: "#000000", strokeThickness: 4,
            align: "center"
        }).setOrigin(0.5).setDepth(100);

        restartButton.setInteractive();
        restartButton.on("pointerdown", () => {
            this.scene.start("LevelOne");
        });

        menuButton.setInteractive();
        menuButton.on("pointerdown", () => {
            this.scene.start("Menu");
        });
    }
}