import { Menu } from "./scenes/Menu";
import { LevelOne } from "./scenes/LevelOne"
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
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: [
        Menu,
        LevelOne
    ]
};

export default new Game(config);