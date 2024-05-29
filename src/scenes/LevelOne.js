import { Scene } from "phaser";
import GameUI from "../components/GameUI";
import LifeUI from "../components/LifeUI";
import Player from "../components/Player";
import { createWall } from "../components/Builder";
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
    }

    create() {
        const {width, height} = this.scale;
        this.background = this.add.tileSprite(512, 384, width, height, "background_levelOne").setScale(1);

        this.floors.create(950, 830, "floor_levelOne");
        this.createPlatforms();

        this.player = this.add.existing(new Player(this, 512, 650));
        this.camera = this.cameras.main;
        this.camera.setFollowOffset(0, 268);
        this.camera.setLerp(1, 1);

        this.timer_label = new GameUI(this, 55, 40, "Text:");
        this.timer_value = new GameUI(this, 145, 40, formatTime(this.initialTime));
        this.life_label = new GameUI(this, 50, 80, "Life:");
        this.life_value_ui = new LifeUI(this, 130, 85);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player.player, this.floors, null);
        this.physics.add.collider(this.player.player, this.platforms, null);

        setInterval(() => {
            this.initialTime -= 1;
            this.initialTime >= 0 && this.timer_value.updateText(formatTime(this.initialTime));
        }, 1000);
    }

    update() {
        this.player.playerIsTouchingDown = this.player.player.body.touching.down;
        this.player.move(this.cursors, this.background, 0, 2500);
    }

    addFiles() {
        this.load.setPath("assets");

        this.load.addFile(new WebFontFile(this.load, "Permanent Marker"));
        this.load.image("background_levelOne", "background_at/Postapocalypce1/Bright/postapocalypse1.png");
        this.load.image("floor_levelOne", "background_at/Postapocalypce1/Bright/road_cropped.png");
        this.load.image("platform", "simple_platformer_kit/2 Locations/Tiles/Tile_10.png");
        this.heart = this.load.image("heart", "hearts/heart.png");
        this.load.spritesheet("player_idle", "simple_platformer_kit/1 Main Characters/1/Idle.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("player_run", "simple_platformer_kit/1 Main Characters/1/Run.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("player_jump", "simple_platformer_kit/1 Main Characters/1/Jump.png", {frameWidth: 32, frameHeight: 32});
    };

    createPlatforms() {
        createWall(this.platforms, 1200, 760, 6, true);
        createWall(this.platforms, 1500, 760, 9, true);
        createWall(this.platforms, 1700, 560, 8, false);
        createWall(this.platforms, 1800, 760, 14, true);

        console.log(this.platforms);
    };

    moveGroups(isPlus) {
        if (isPlus) {
            this.background.tilePositionX += 3;
            this.platforms.children.entries.forEach(plat => plat.x -= 3);
        } else {
            this.background.tilePositionX -= 3;
            this.platforms.children.entries.forEach(plat => plat.x += 3);
        };
    };
}