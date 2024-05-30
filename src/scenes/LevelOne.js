import { Scene } from "phaser";
import GameUI from "../components/GameUI";
import LifeUI from "../components/LifeUI";
import Player from "../components/Player";
import { removeBlocks } from "../components/Builder";
import { createPlatformsLevelOne } from "../components/LevelsBuildings";
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
        createPlatformsLevelOne(this.platforms);

        //-------------------------------
        // This code below is just for dev
        const tar = 11200;
        this.background.tilePositionX += tar;
        this.platforms.children.entries.forEach(plat => plat.x -= tar);
        this.pubs.children.entries.forEach(b => b.x -= tar);
        //-------------------------------
        //-------------------------------

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