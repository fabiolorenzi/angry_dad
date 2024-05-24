import { Scene } from "phaser";
import WebFontFile from "../components/WebFontFile";
import { formatTime } from "../components/Timer";

export class LevelOne extends Scene {
    constructor () {
        super("LevelOne");
    }

    preload() {
        this.load.setPath("assets");
        this.load.addFile(new WebFontFile(this.load, "Permanent Marker"));
        this.load.image("background_levelOne", "background_at/Postapocalypce1/Bright/postapocalypse1.png");
        this.load.image("floor_levelOne", "background_at/Postapocalypce1/Bright/road_cropped.png");

        this.load.spritesheet("player_idle", "simple_platformer_kit/1 Main Characters/1/Idle.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("player_run", "simple_platformer_kit/1 Main Characters/1/Run.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.initialTime = 90;
        this.background;
        this.floors = this.physics.add.staticGroup();
        this.player;
        this.cursors;
    }

    create() {
        const {width, height} = this.scale;
        this.background = this.add.tileSprite(512, 384, width, height, "background_levelOne").setScale(1);

        this.floors.create(950, 830, "floor_levelOne");

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

        this.anims.create({
            key: "player_run_anim",
            frames: this.anims.generateFrameNumbers("player_run"),
            frameRate: 30,
            repeat: -1
        });


        this.player = this.physics.add.sprite(512, 650, "player_idle");
        this.player.setScale(2.5);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.floors, function(player, floor) {});

        setInterval(() => {
            this.initialTime -= 1;
            this.timerText.setText(formatTime(this.initialTime));
        }, 1000);
    }

    update() {
        if (this.cursors.left.isDown && this.background.tilePositionX > 0) {
            this.background.tilePositionX -= 3;
            this.player.setFlipX(true);
            this.player.anims.play("player_run_anim", true);
        } else if (this.cursors.right.isDown && this.background.tilePositionX < 2500) {
            this.background.tilePositionX += 3;
            this.player.setFlipX(false);
            this.player.anims.play("player_run_anim", true);
        } else {
            this.player.setVelocityX(0);
            this.player.play("player_idle_anim", true);
        }

        if (this.cursors.space.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}