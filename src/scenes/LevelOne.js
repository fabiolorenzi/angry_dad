import { Scene } from "phaser";
import GameUI from "../components/GameUI";
import Player from "../components/Player";
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
        this.player;
        this.cursors;
        this.timer_label;
        this.timer_value;
        this.life_label;
    }

    create() {
        const {width, height} = this.scale;
        this.background = this.add.tileSprite(512, 384, width, height, "background_levelOne").setScale(1);

        this.floors.create(950, 830, "floor_levelOne");

        this.timer_label = new GameUI(this, 55, 40, "Text:");
        this.timer_value = new GameUI(this, 145, 40, formatTime(this.initialTime));
        this.life_label = new GameUI(this, 50, 80, "Life:");

        this.player = this.add.existing(new Player(this, 512, 650));

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player.player, this.floors, function(player, floor) {});

        setInterval(() => {
            this.initialTime -= 1;
            this.timer_value.updateText(formatTime(this.initialTime));
        }, 1000);
    }

    update() {
        this.player.move(this.cursors, this.background, 0, 2500);
    }

    addFiles() {
        this.load.setPath("assets");

        this.load.addFile(new WebFontFile(this.load, "Permanent Marker"));
        this.load.image("background_levelOne", "background_at/Postapocalypce1/Bright/postapocalypse1.png");
        this.load.image("floor_levelOne", "background_at/Postapocalypce1/Bright/road_cropped.png");
        this.load.spritesheet("player_idle", "simple_platformer_kit/1 Main Characters/1/Idle.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("player_run", "simple_platformer_kit/1 Main Characters/1/Run.png", {frameWidth: 32, frameHeight: 32});
    };
}