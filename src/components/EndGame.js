function endGame(scene, hasWon) {
    clearInterval(scene.interval);
    scene.timer_label.ui.visible = false;
    scene.timer_value.ui.visible = false;
    scene.life_label.ui.visible = false;

    hasWon ? scene.victory_audio.play() : scene.player_death_audio.play();

    clearInterval(scene.time_interval);
    clearInterval(scene.enemies_interval);

    scene.enemies.clear();
    scene.bullets.clear();

    scene.add.text(512, 100, hasWon? "You won" : "You died", {
        fontFamily: "Permanent Marker", fontSize: 64, color: "#ff0000",
        stroke: "#000000", strokeThickness: 8,
        align: "center"
    }).setOrigin(0.5).setDepth(100);

    let nextButton;
    if (hasWon) {
        nextButton = scene.add.text(512, 300, "Next Level", {
            fontFamily: "Permanent Marker", fontSize: 44, color: "#ffffff",
            stroke: "#000000", strokeThickness: 4,
            align: "center"
        }).setOrigin(0.5).setDepth(100);

        nextButton.setInteractive();
        nextButton.on("pointerdown", () => {
            scene.scene.start("LevelTwo");
        });
    };

    let restartButton = scene.add.text(512, hasWon ? 350 : 300, "Restart", {
        fontFamily: "Permanent Marker", fontSize: 44, color: "#ffffff",
        stroke: "#000000", strokeThickness: 4,
        align: "center"
    }).setOrigin(0.5).setDepth(100);

    let menuButton = scene.add.text(512, hasWon ? 400 : 350, "Menu", {
        fontFamily: "Permanent Marker", fontSize: 44, color: "#ffffff",
        stroke: "#000000", strokeThickness: 4,
        align: "center"
    }).setOrigin(0.5).setDepth(100);

    restartButton.setInteractive();
    restartButton.on("pointerdown", () => {
        scene.background_sound.stop();
        for(let type in scene.cache) {
			if (type !== "game") {
				for (let entry in scene.cache[type]) {
					scene.cache[type].remove(entry);
				};
			};

		};
        scene.scene.restart();
    });

    menuButton.setInteractive();
    menuButton.on("pointerdown", () => {
        scene.background_sound.stop();
        scene.scene.start("Menu");
    });
};

export { endGame };