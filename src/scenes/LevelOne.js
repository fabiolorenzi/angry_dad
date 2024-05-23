import { Scene } from "phaser";
import WebFontFile from "../tools/WebFontFile";
import { formatTime } from "../tools/Timer";

export class LevelOne extends Scene {
    constructor () {
        super("LevelOne");
    }

    preload() {
        this.load.setPath("assets");
        this.load.addFile(new WebFontFile(this.load, "Permanent Marker"));
        this.load.image("background_levelOne", "background_at/Postapocalypce1/Bright/postapocalypse1.png");
        this.load.image("floor_levelOne", "background_at/Postapocalypce1/Bright/road.png");
        this.load.spritesheet("player_idle", "simple_platformer_kit/1 Main Characters/1/Idle.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.initialTime = 90;
        this.floors = this.physics.add.staticGroup();
        this.player;
    }

    create() {
        this.add.image(512, 384, "background_levelOne");

        this.floors.create(900, 300, "floor_levelOne");

        this.add.text(55, 40, "Time:", {
            fontFamily: "Permanent Marker", fontSize: 32, color: "#ffffff",
            stroke: "#000000", strokeThickness: 8,
            align: "center"
        }).setOrigin(0.5).setDepth(100);
        
        this.timerText = this.add.text(145, 40, formatTime(this.initialTime), {
            fontFamily: "Permanent Marker", fontSize: 32, color: "#ffffff",
            stroke: "#000000", strokeThickness: 8,
            align: "center"
        }).setOrigin(0.5).setDepth(100);

        this.add.text(50, 80, "Life:", {
            fontFamily: "Permanent Marker", fontSize: 32, color: "#ffffff",
            stroke: "#000000", strokeThickness: 8,
            align: "center"
        }).setOrigin(0.5).setDepth(100);

        this.anims.create({
            key: "player_idle_anim",
            frames: this.anims.generateFrameNumbers("player_idle"),
            frameRate: 30,
            repeat: -1
        });

        this.player = this.physics.add.sprite(280, 500, "player_idle");
        this.player.play("player_idle_anim");
        this.player.setScale(2.5);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.floors);

        setInterval(() => {
            this.initialTime -= 1;
            this.timerText.setText(formatTime(this.initialTime));
        }, 1000);
    }
}