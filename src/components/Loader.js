import WebFontFile from "../components/WebFontFile";

function addFiles(scene) {
    scene.load.setPath("assets");

    scene.load.addFile(new WebFontFile(scene.load, "Permanent Marker"));
    scene.load.image("background_levelOne", "images/backgrounds/level_one_background.png");
    scene.load.image("background_levelTwo", "images/backgrounds/level_two_background.png");
    scene.load.image("floor", "images/buildings/road.png");
    scene.load.image("platform", "images/others/platform.png");
    scene.load.image("pub", "images/buildings/tavern.png");
    scene.load.image("trap", "images/others/trap.png");
    scene.load.image("cannon", "images/others/cannon.png");
    scene.load.image("bullet", "images/others/bullet.png");
    scene.load.image("power_up_time", "images/others/cigarette.png");
    scene.load.image("power_up_life", "images/others/rum.png");
    scene.heart = scene.load.image("heart", "images/others/heart.png");
    scene.load.spritesheet("player_idle", "images/characters/player/player_idle.png", {frameWidth: 32, frameHeight: 32});
    scene.load.spritesheet("player_run", "images/characters/player/player_run.png", {frameWidth: 32, frameHeight: 32});
    scene.load.spritesheet("player_jump", "images/characters/player/player_jump.png", {frameWidth: 32, frameHeight: 32});
    scene.load.spritesheet("player_hurt", "images/characters/player/player_hurt.png", {frameWidth: 32, frameHeight: 32});
    scene.load.spritesheet("player_attack", "images/characters/player/player_attack.png", {frameWidth: 32, frameHeight: 32});
    scene.load.spritesheet("enemy_one_idle", "images/characters/enemy_one/enemy_one_idle.png", {frameWidth: 32, frameHeight: 32});
    scene.load.spritesheet("enemy_one_run", "images/characters/enemy_one/enemy_one_run.png", {frameWidth: 32, frameHeight: 32});
    scene.load.spritesheet("enemy_one_hurt", "images/characters/enemy_one/enemy_one_hurt.png", {frameWidth: 32, frameHeight: 32});
    scene.load.spritesheet("enemy_two_idle", "images/characters/enemy_two/enemy_two_idle.png", {frameWidth: 32, frameHeight: 32});
    scene.load.spritesheet("enemy_two_run", "images/characters/enemy_two/enemy_two_run.png", {frameWidth: 32, frameHeight: 32});
    scene.load.spritesheet("enemy_two_hurt", "images/characters/enemy_two/enemy_two_hurt.png", {frameWidth: 32, frameHeight: 32});
    scene.load.audio("level_one_background", "audio/level_one_ambience.mp3");
    scene.load.audio("player_jump_audio", "audio/player_jump.mp3");
    scene.load.audio("player_attack_audio", "audio/player_attack.mp3");
    scene.load.audio("player_drink_audio", "audio/player_drink.mp3");
    scene.load.audio("player_smoke_audio", "audio/player_smoke.mp3");
    scene.load.audio("player_hurt_audio", "audio/player_hurt.mp3");
    scene.load.audio("player_death_audio", "audio/player_death.mp3");
    scene.load.audio("enemy_death_audio", "audio/enemy_death.mp3");
    scene.load.audio("victory_audio", "audio/victory.mp3");
};

export { addFiles };