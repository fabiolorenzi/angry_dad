class GameUI extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text) {
        super(scene, x, y, text);

        this.ui;
        this.scene = scene;
        this.create(x, y, text);
    }

    create(x, y, text) {
        this.ui = this.scene.add.text(
            x,
            y,
            text,
            {
                fontFamily: "Permanent Marker",
                fontSize: 32,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center"
            }
        ).setOrigin(0.5).setDepth(100);
    };

    updateText(text) {
        text ? this.ui.setText(text) : null;
    };
};

export default GameUI;