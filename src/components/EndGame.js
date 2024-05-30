function endGame(scene, hasWon) {
    clearInterval(scene.interval);
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
        scene.scene.start("LevelOne");
    });

    menuButton.setInteractive();
    menuButton.on("pointerdown", () => {
        scene.scene.start("Menu");
    });
};

export { endGame };