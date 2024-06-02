import { endGame } from "./EndGame";

function createCollisions(scene) {
    scene.physics.add.collider(scene.player.player, scene.floors, null);
    scene.physics.add.collider(scene.player.player, scene.platforms, null);
    scene.physics.add.collider(scene.player.player, scene.pubs, function(player) {
        player.scene.player.hasFinishedLevel = true;
        endGame(player.scene, true);
    });
    scene.physics.add.collider(scene.player.player, scene.traps, function(player) {
        player.scene.player.updateLife(false);
        if (player.scene.player.life === 0) {
            player.scene.player.isDead = true;
            player.scene.player_death_audio.play();
            endGame(player.scene, false);
        };
    });
    scene.physics.add.collider(scene.player.player, scene.cannons, null);
    scene.physics.add.collider(scene.player.player, scene.bullets, function(player, bullet) {
        player.scene.player.updateLife(false);
        bullet.destroy();
        if (player.scene.player.life === 0) {
            player.scene.player.isDead = true;
            endGame(player.scene, false);
        };
    });
    scene.physics.add.collider(scene.platforms, scene.bullets, function(platform, bullet) {
        bullet.destroy();
    });
    scene.physics.add.collider(scene.player.player, scene.power_ups, function(player, power_up) {
        power_up.name === "power_up_time" ? player.scene.time += 90 : player.scene.player.updateLife(true);
        power_up.name === "power_up_time" ? player.scene.player_smoke_audio.play() : player.scene.player_drink_audio.play();
        power_up.destroy();
    });
    scene.physics.add.overlap(scene.player.player, scene.enemies, function(player, enemy) {
        if (player.scene.player.isAttacking) {
            scene.isPlayerInvincible = true;
            enemy.setName(enemy.name + "_dead_enemy");
            enemy.anims.play(`${enemy.name}_hurt_anim`);
            player.scene.enemy_death_audio.play();
            setTimeout(() => {
                enemy.destroy();
                scene.isPlayerInvincible = false;
            }, 1000);
        } else if (!scene.isPlayerInvincible) {
            player.scene.player.updateLife(false);
            !player.scene.player.isHurted && player.scene.player_hurt_audio.play();
            if (player.scene.player.life === 0) {
                player.scene.player.isDead = true;
                player.scene.player_death_audio.play();
                endGame(player.scene, false);
            };
        };
    });
};

export { createCollisions };