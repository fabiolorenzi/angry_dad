import { Scene } from "phaser";
import GameUI from "../components/GameUI";
import WebFontFile from "../components/WebFontFile";

export class HelpMenu extends Scene {
    constructor () {
        super("HelpMenu");

        this.title;
        this.background_sound;
    }

    preload() {
        this.load.setPath("assets");
        this.load.addFile(new WebFontFile(this.load, "Permanent Marker"));
        this.load.audio("background", ["audio/menu_ambience.mp3"]);
        this.load.image("background", "images/backgrounds/menu_background.png");
    }

    create() {
        this.add.image(512, 384, "background");
        this.background_sound = this.sound.add("background", {volume: 0.5});
        this.background_sound.play();

        this.title = new GameUI(this, 512, 100, "Help menu", 64, "#ff0000");

        this.add.text(512, 300, "Game commands", {
            fontFamily: "Permanent Marker", fontSize: 44, color: "#ffffff",
            stroke: "#000000", strokeThickness: 4,
            align: "center"
        }).setOrigin(0.5).setDepth(100);

        this.add.text(512, 350, "Left: move left", {
            fontFamily: "Permanent Marker", fontSize: 24, color: "#ffffff",
            stroke: "#000000", strokeThickness: 4,
            align: "center"
        }).setOrigin(0.5).setDepth(100);

        this.add.text(512, 370, "Right: move right", {
            fontFamily: "Permanent Marker", fontSize: 24, color: "#ffffff",
            stroke: "#000000", strokeThickness: 4,
            align: "center"
        }).setOrigin(0.5).setDepth(100);

        this.add.text(512, 390, "Up: attack", {
            fontFamily: "Permanent Marker", fontSize: 24, color: "#ffffff",
            stroke: "#000000", strokeThickness: 4,
            align: "center"
        }).setOrigin(0.5).setDepth(100);

        this.add.text(512, 410, "Space: jump", {
            fontFamily: "Permanent Marker", fontSize: 24, color: "#ffffff",
            stroke: "#000000", strokeThickness: 4,
            align: "center"
        }).setOrigin(0.5).setDepth(100);
        
        let returnButton = this.add.text(512, 500, "Return", {
            fontFamily: "Permanent Marker", fontSize: 44, color: "#ffffff",
            stroke: "#000000", strokeThickness: 4,
            align: "center"
        }).setOrigin(0.5).setDepth(100);

        returnButton.setInteractive();
        returnButton.on("pointerdown", () => {
            this.background_sound.stop();
            this.scene.start("Menu");
        });
    }
}