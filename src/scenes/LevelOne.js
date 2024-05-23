import { Scene } from "phaser";
import WebFontFile from "../tools/WebFontFile";

export class LevelOne extends Scene {
    constructor () {
        super("LevelOne");
    }

    preload() {
        this.load.setPath("assets");
        this.load.addFile(new WebFontFile(this.load, "Permanent Marker"));
        this.load.image("background_levelOne", "background_at/Postapocalypce1/Bright/postapocalypse1.png");
    }

    create() {
        this.add.image(512, 384, "background_levelOne");

        this.add.text(50, 40, "Life", {
            fontFamily: "Permanent Marker", fontSize: 32, color: "#ffffff",
            stroke: "#000000", strokeThickness: 8,
            align: "center"
        }).setOrigin(0.5).setDepth(100);
    }
}