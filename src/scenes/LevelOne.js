import { Scene } from "phaser";
import WebFontFile from "../tools/WebFontFile";
import { formatTime } from "../tools/Timer";

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

        this.initialTime = 90;

        this.add.text(55, 40, "Time:", {
            fontFamily: "Permanent Marker", fontSize: 32, color: "#ffffff",
            stroke: "#000000", strokeThickness: 8,
            align: "center"
        }).setOrigin(0.5).setDepth(100);
        
        this.timerText = this.add.text(145, 40, formatTime(this.initialTime), {
            fontFamily: "Permanent Marker", fontSize: 32, color: "#ffffff",
            stroke: "#000000", strokeThickness: 8,
            align: "center"
        }).setOrigin(0.5).setDepth(100);

        this.add.text(50, 80, "Life:", {
            fontFamily: "Permanent Marker", fontSize: 32, color: "#ffffff",
            stroke: "#000000", strokeThickness: 8,
            align: "center"
        }).setOrigin(0.5).setDepth(100);

        setInterval(() => {
            this.initialTime -= 1;
            console.log(this.initialTime);
            this.timerText.setText(formatTime(this.initialTime));
        }, 1000);
    }
}