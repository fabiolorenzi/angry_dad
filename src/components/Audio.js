function createSounds(scene) {
    scene.background_sound = scene.sound.add("level_one_background", {volume: 0.7});
    scene.player_jump_audio = scene.sound.add("player_jump_audio");
    scene.player_attack_audio = scene.sound.add("player_attack_audio");
    scene.player_drink_audio = scene.sound.add("player_drink_audio");
    scene.player_smoke_audio = scene.sound.add("player_smoke_audio");
    scene.player_hurt_audio = scene.sound.add("player_hurt_audio");
    scene.player_death_audio = scene.sound.add("player_death_audio", {volume: 0.7});
    scene.enemy_death_audio = scene.sound.add("enemy_death_audio");
    scene.victory_audio = scene.sound.add("victory_audio");
};

export { createSounds };