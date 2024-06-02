import { Scene } from "phaser";
import { createSounds } from "../components/Audio";
import { removeBlocks } from "../components/Builder";
import { createCollisions } from "../components/Collisions";
import { endGame } from "../components/EndGame";
import GameUI from "../components/GameUI";
import {
    createPlatformsLevelTwo,
    createPowerUpsLevelTwo,
    createCannonsLevelTwo,
    createEnemiesLevelTwo,
    createTrapsLevelTwo
} from "../components/LevelsBuildings";
import LifeUI from "../components/LifeUI";
import { addFiles } from "../components/Loader";
import Player from "../components/Player";
import { formatTime } from "../components/Timer";
import { devHelper } from "../components/DevHelper";

export class LevelTwo extends Scene {
    constructor () {
        super("LevelTwo");
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
        this.background = this.add.tileSprite(512, 384, width, height, "background_levelTwo").setScale(1);
        createSounds(this);
        this.background_sound.play();

        this.floors.create(950, 830, "floor");
        this.pubs.create(12300, 630, "pub");
        createPlatformsLevelTwo(this.platforms);
        createTrapsLevelTwo(this.traps);
        createCannonsLevelTwo(this);
        createPowerUpsLevelTwo(this);
        createEnemiesLevelTwo(this);

        this.direction_left = true;

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

        createCollisions(this);

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