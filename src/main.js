import { Menu } from "./scenes/Menu";
import { AUTO, Scale, Game } from "phaser";

const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: "game-container",
    backgroundColor: "#028af8",
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        Menu
    ]
};

export default new Game(config);