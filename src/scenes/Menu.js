import { Scene } from "phaser";
import GameUI from "../components/GameUI";
import WebFontFile from "../components/WebFontFile";

export class Menu extends Scene {
    constructor () {
        super("Menu");

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
        this.background_sound = this.sound.add("background");
        this.background_sound.play();

        this.title = new GameUI(this, 512, 100, "Angry dad", 64, "#ff0000");
        
        let playButton = this.add.text(512, 300, "Play", {
            fontFamily: "Permanent Marker", fontSize: 44, color: "#ffffff",
            stroke: "#000000", strokeThickness: 4,
            align: "center"
        }).setOrigin(0.5).setDepth(100);

        playButton.setInteractive();
        playButton.on("pointerdown", () => {
            this.background_sound.stop();
            this.scene.start("LevelOne");
        });
    }
}