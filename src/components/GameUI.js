class GameUI extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, fontSize, colour) {
        super(scene, x, y, text, fontSize, colour);

        this.ui;
        this.scene = scene;
        this.create(x, y, text, fontSize, colour);
    }

    create(x, y, text, fontSize, colour) {
        this.ui = this.scene.add.text(
            x,
            y,
            text,
            {
                fontFamily: "Permanent Marker",
                fontSize: fontSize,
                color: colour,
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