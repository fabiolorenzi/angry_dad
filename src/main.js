import { Menu } from "./scenes/Menu";
import { LevelOne } from "./scenes/LevelOne";
import { LevelTwo } from "./scenes/LevelTwo";
import { HelpMenu } from "./scenes/HelpMenu";
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
            debug: true
        }
    },
    scene: [
        Menu,
        LevelOne,
        LevelTwo,
        HelpMenu
    ]
};

export default new Game(config);