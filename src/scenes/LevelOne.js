import { Scene } from "phaser";
import { removeBlocks } from "../components/Builder";
import { endGame } from "../components/EndGame";
import GameUI from "../components/GameUI";
import {
    createPlatformsLevelOne,
    createPowerUpsLevelOne,
    createCannonsLevelOne,
    createEnemiesLevelOne,
    createTrapsLevelOne
} from "../components/LevelsBuildings";
import LifeUI from "../components/LifeUI";
import Player from "../components/Player";
import { formatTime } from "../components/Timer";
import WebFontFile from "../components/WebFontFile";

export class LevelOne extends Scene {
    constructor () {
        super("LevelOne");
    }

    preload() {
        this.addFiles();

        this.time = 60;
        this.background;
        this.floors = this.physics.add.staticGroup();
        this.platforms = this.physics.add.group({immovable: true, allowGravity: false});
        this.traps = this.physics.add.group({immovable: true, allowGravity: false});
        this.cannons = this.physics.add.group({immovable: true, allowGravity: false});
        this.bullets = this.physics.add.group({immovable: true, allowGravity: false});
        this.power_ups = this.physics.add.group({immovable: true, allowGravity: false});
        this.enemies = this.physics.add.group({immovable: true, allowGravity: false});
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
        createTrapsLevelOne(this.traps);
        createCannonsLevelOne(this);
        createPowerUpsLevelOne(this);
        createEnemiesLevelOne(this);

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------
        // This code below is just for dev---------------------------------------------------------------------------------------------------------------------------
        const tar = 0;
        this.background.tilePositionX += tar;
        this.platforms.children.entries.forEach(plat => plat.x -= tar);
        this.pubs.children.entries.forEach(b => b.x -= tar);
        this.traps.children.entries.forEach(t => t.x -= tar);
        this.cannons.children.entries.forEach(c => c.x -= tar);
        this.power_ups.children.entries.forEach(p => p.x -= tar);
        this.enemies.children.entries.forEach(e => e.x -= tar);
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------

        this.player = this.add.existing(new Player(this, 512, 650));
        this.camera = this.cameras.main;
        this.camera.setFollowOffset(0, 268);
        this.camera.setLerp(1, 1);

        this.timer_label = new GameUI(this, 55, 40, "Time:", 32, "#ffffff");
        this.timer_value = new GameUI(this, 145, 40, formatTime(this.time),  32, "#ffffff");
        this.life_label = new GameUI(this, 50, 80, "Life:", 32, "#ffffff");
        this.life_value_ui = new LifeUI(this, 130, 85);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player.player, this.floors, null);
        this.physics.add.collider(this.player.player, this.platforms, null);
        this.physics.add.collider(this.player.player, this.pubs, function(player) {
            player.scene.player.hasFinishedLevel = true;
            endGame(player.scene, true);
        });
        this.physics.add.collider(this.player.player, this.traps, function(player) {
            player.scene.player.updateLife(false);
            if (player.scene.player.life === 0) {
                player.scene.player.isDead = true;
                endGame(player.scene, false);
            };
        });
        this.physics.add.collider(this.player.player, this.cannons, null);
        this.physics.add.collider(this.player.player, this.bullets, function(player, bullet) {
            player.scene.player.updateLife(false);
            bullet.destroy();
            if (player.scene.player.life === 0) {
                player.scene.player.isDead = true;
                endGame(player.scene, false);
            };
        });
        this.physics.add.collider(this.platforms, this.bullets, function(platform, bullet) {
            bullet.destroy();
        });
        this.physics.add.collider(this.player.player, this.power_ups, function(player, power_up) {
            power_up.name === "power_up_time" ? player.scene.time += 45 : player.scene.player.updateLife(true);
            power_up.destroy();
        });
        this.physics.add.collider(this.player.player, this.enemies, function(player, enemy) {
            if (player.scene.player.isAttacking) {
                enemy.anims.play(`${enemy.name}_hurt_anim`);
                setTimeout(() => enemy.destroy(), 1000);
            } else {
                player.scene.player.updateLife(false);
                if (player.scene.player.life === 0) {
                    player.scene.player.isDead = true;
                    endGame(player.scene, false);
                };
            };
        });

        this.interval = setInterval(() => {
            this.time -= 1;
            this.time >= 0 && this.timer_value.updateText(formatTime(this.time));
        }, 1000);
    }

    update() {
        this.player.playerIsTouchingDown = this.player.player.body.touching.down;
        this.player.move(this.cursors, this.background, 0, 12000);
        this.bullets.children.entries.forEach(b => b.x -= 5);
        if (this.time <= 0 && !this.player.isDead) {
            this.player.isDead = true;
            this.life_value.children.entries.forEach(l => l.visible = false);
            endGame(this.player.scene, false);
        };
    }

    addFiles() {
        this.load.setPath("assets");

        this.load.addFile(new WebFontFile(this.load, "Permanent Marker"));
        this.load.image("background_levelOne", "background_at/Postapocalypce1/Bright/postapocalypse1.png");
        this.load.image("floor_levelOne", "background_at/Postapocalypce1/Bright/road_cropped.png");
        this.load.image("platform", "simple_platformer_kit/2 Locations/Tiles/Tile_10.png");
        this.load.image("pub", "tavern.png");
        this.load.image("trap", "pirate_stuff/Transperent/Icon28.png");
        this.load.image("cannon", "pirate_stuff/Transperent/Icon22.png");
        this.load.image("bullet", "pirate_stuff/Transperent/Icon42.png");
        this.load.image("power_up_time", "cigarette.png");
        this.load.image("power_up_life", "pirate_stuff/Transperent/Icon48.png");
        this.heart = this.load.image("heart", "hearts/heart.png");
        this.load.spritesheet("player_idle", "simple_platformer_kit/1 Main Characters/1/Idle.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("player_run", "simple_platformer_kit/1 Main Characters/1/Run.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("player_jump", "simple_platformer_kit/1 Main Characters/1/Jump.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("player_hurt", "simple_platformer_kit/1 Main Characters/1/Hit.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("player_attack", "simple_platformer_kit/1 Main Characters/1/Double_Jump.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("enemy_one_idle", "simple_platformer_kit/1 Main Characters/2/Idle.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("enemy_one_run", "simple_platformer_kit/1 Main Characters/2/Run.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("enemy_one_hurt", "simple_platformer_kit/1 Main Characters/2/Hit.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("enemy_two_idle", "simple_platformer_kit/1 Main Characters/3/Idle.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("enemy_two_run", "simple_platformer_kit/1 Main Characters/3/Run.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("enemy_two_hurt", "simple_platformer_kit/1 Main Characters/3/Hit.png", {frameWidth: 32, frameHeight: 32});
    };

    moveGroups(isPlus) {
        removeBlocks(this.platforms, -3000);
        removeBlocks(this.traps, -3000);
        removeBlocks(this.cannons, -3000);
        removeBlocks(this.power_ups, -3000);

        if (isPlus) {
            this.background.tilePositionX += 3;
            this.platforms.children.entries.forEach(plat => plat.x -= 3);
            this.pubs.children.entries.forEach(b => b.x -= 3);
            this.traps.children.entries.forEach(t => t.x -= 3);
            this.cannons.children.entries.forEach(c => c.x -= 3);
            this.bullets.children.entries.forEach(b => b.x -= 3);
            this.power_ups.children.entries.forEach(p => p.x -= 3);
            this.enemies.children.entries.forEach(e => e.x -= 3);
        } else {
            this.background.tilePositionX -= 3;
            this.platforms.children.entries.forEach(plat => plat.x += 3);
            this.pubs.children.entries.forEach(b => b.x += 3);
            this.traps.children.entries.forEach(t => t.x += 3);
            this.cannons.children.entries.forEach(c => c.x += 3);
            this.bullets.children.entries.forEach(b => b.x += 3);
            this.power_ups.children.entries.forEach(p => p.x += 3);
            this.enemies.children.entries.forEach(e => e.x += 3);
        };
    };
}