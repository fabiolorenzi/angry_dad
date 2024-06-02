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
import { addFiles } from "../components/Loader";
import Player from "../components/Player";
import { formatTime } from "../components/Timer";
import { devHelper } from "../components/DevHelper";

export class LevelOne extends Scene {
    constructor () {
        super("LevelOne");
    }

    preload() {
        addFiles(this);

        this.time = 120;
        this.background;
        this.background_sound;
        this.floors = this.physics.add.staticGroup();
        this.platforms = this.physics.add.group({immovable: true, allowGravity: false});
        this.traps = this.physics.add.group({immovable: true, allowGravity: false});
        this.cannons = this.physics.add.group({immovable: true, allowGravity: false});
        this.bullets = this.physics.add.group({immovable: true, allowGravity: false});
        this.power_ups = this.physics.add.group({immovable: true, allowGravity: false});
        this.enemies = this.physics.add.group({immovable: true, allowGravity: false});
        this.direction_left;
        this.player;
        this.isPlayerInvincible = false;
        this.cursors;
        this.timer_label;
        this.timer_value;
        this.life_label;
        this.life_value_ui;
        this.life_value = this.physics.add.staticGroup();
        this.camera;
        this.pubs = this.physics.add.group({immovable: true, allowGravity: false});

        this.time_interval;
        this.enemies_interval;

        this.player_jump_audio;
        this.player_attack_audio;
        this.player_drink_audio;
        this.player_smoke_audio;
        this.player_hurt_audio;
        this.player_death_audio;
        this.enemy_death_audio;
        this.victory_audio;
    }

    create() {
        const {width, height} = this.scale;
        this.background = this.add.tileSprite(512, 384, width, height, "background_levelOne").setScale(1);
        this.background_sound = this.sound.add("level_one_background", {volume: 0.7});
        this.player_jump_audio = this.sound.add("player_jump_audio");
        this.player_attack_audio = this.sound.add("player_attack_audio");
        this.player_drink_audio = this.sound.add("player_drink_audio");
        this.player_smoke_audio = this.sound.add("player_smoke_audio");
        this.player_hurt_audio = this.sound.add("player_hurt_audio");
        this.player_death_audio = this.sound.add("player_death_audio", {volume: 0.7});
        this.enemy_death_audio = this.sound.add("enemy_death_audio");
        this.victory_audio = this.sound.add("victory_audio");
        this.background_sound.play();

        this.floors.create(950, 830, "floor");
        this.pubs.create(12300, 630, "pub");
        createPlatformsLevelOne(this.platforms);
        createTrapsLevelOne(this.traps);
        createCannonsLevelOne(this);
        createPowerUpsLevelOne(this);
        createEnemiesLevelOne(this);

        this.direction_left = true;

        // This is to help the development
        // Set the 0 to the new x position to go directly there
        devHelper(this, 0);

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
                player.scene.player_death_audio.play();
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
            power_up.name === "power_up_time" ? player.scene.time += 90 : player.scene.player.updateLife(true);
            power_up.name === "power_up_time" ? player.scene.player_smoke_audio.play() : player.scene.player_drink_audio.play();
            power_up.destroy();
        });
        this.physics.add.overlap(this.player.player, this.enemies, function(player, enemy) {
            if (player.scene.player.isAttacking) {
                this.isPlayerInvincible = true;
                enemy.setName(enemy.name + "_dead_enemy");
                enemy.anims.play(`${enemy.name}_hurt_anim`);
                player.scene.enemy_death_audio.play();
                setTimeout(() => {
                    enemy.destroy();
                    this.isPlayerInvincible = false;
                }, 1000);
            } else if (!this.isPlayerInvincible) {
                player.scene.player.updateLife(false);
                player.scene.player_hurt_audio.play();
                if (player.scene.player.life === 0) {
                    player.scene.player.isDead = true;
                    player.scene.player_death_audio.play();
                    endGame(player.scene, false);
                };
            };
        });

        this.time_interval = setInterval(() => {
            this.time -= 1;
            this.time >= 0 && this.timer_value.updateText(formatTime(this.time));
        }, 1000);
        this.enemies_interval = setInterval(() => this.direction_left = !this.direction_left, 2000);
    }

    update() {
        this.player.playerIsTouchingDown = this.player.player.body.touching.down;
        this.player.move(this.cursors, this.background, 0, 12000);
        this.bullets.children.entries.forEach(b => b.x -= 5);
        this.enemies.children.entries.forEach(e => {
            if (!e.name.includes("enemy_dead")) {
                e.x += this.direction_left ? -3 : 3;
                e.setFlipX(this.direction_left);
            } else {
                e.x += this.direction_left ? -1 : 1;
            };
        });
        if (this.time <= 0 && !this.player.isDead) {
            this.player.isDead = true;
            this.life_value.children.entries.forEach(l => l.visible = false);
            endGame(this.player.scene, false);
        };
    };

    moveGroups(isPlus) {
        removeBlocks(this.platforms, -3000);
        removeBlocks(this.traps, -3000);
        removeBlocks(this.cannons, -3000);
        removeBlocks(this.power_ups, -3000);
        removeBlocks(this.enemies, -3000);

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