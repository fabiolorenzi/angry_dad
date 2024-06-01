import { createWall } from "./Builder";
import Cannon from "./Cannon";
import Enemy from "./Enemy";
import PowerUp from "./PowerUp";

function createPlatformsLevelOne(plats) {
    createWall(plats, 1200, 760, 6, true);
    createWall(plats, 1220, 660, 4, false);
    createWall(plats, 1500, 760, 9, true);
    createWall(plats, 1520, 640, 4, false);
    createWall(plats, 1700, 560, 8, false);
    createWall(plats, 1800, 760, 14, true);
    createWall(plats, 1960, 600, 2, false);
    createWall(plats, 2000, 760, 16, true);
    createWall(plats, 1660, 300, 14, false);
    createWall(plats, 2020, 460, 3, false);
    createWall(plats, 2080, 460, 15, true);
    createWall(plats, 2080, 160, 20, false);
    createWall(plats, 2560, 640, 37, true);
    createWall(plats, 2200, 300, 18, false);
    createWall(plats, 2100, 460, 18, false);
    createWall(plats, 2160, 640, 20, false);
    createWall(plats, 2340, 620, 3, true);
    createWall(plats, 2800, 760, 30, true);
    createWall(plats, 2580, 640, 3, false);
    createWall(plats, 2740, 500, 3, false);
    createWall(plats, 2580, 400, 3, false);
    createWall(plats, 2740, 250, 3, false);
    createWall(plats, 2900, 620, 35, true);
    createWall(plats, 2900, 640, 20, false);
    createWall(plats, 3460, 760, 20, true);
    createWall(plats, 3460, 260, 15, true);
    createWall(plats, 2920, 480, 2, false);
    createWall(plats, 3060, 380, 20, false);
    createWall(plats, 3140, 260, 16, false);
    createWall(plats, 2920, 260, 6, false);
    createWall(plats, 2920, 160, 16, false);
    createWall(plats, 3000, 140, 2, true);
    createWall(plats, 3460, 600, 50, false);
    createWall(plats, 3900, 580, 5, true);
    createWall(plats, 4600, 600, 40, true);
    createWall(plats, 4760, 600, 48, false);
    createWall(plats, 4620, 500, 50, false);
    createWall(plats, 5720, 760, 20, true);
    createWall(plats, 4760, 380, 48, false);
    createWall(plats, 4760, 280, 56, false);
    createWall(plats, 5720, 260, 20, true);
    createWall(plats, 5880, 660, 20, true);
    createWall(plats, 6200, 760, 32, true);
    createWall(plats, 5900, 660, 3, false);
    createWall(plats, 6140, 500, 3, false);
    createWall(plats, 5900, 360, 3, false);
    createWall(plats, 5900, 140, 15, false);
    createWall(plats, 6220, 140, 40, false);
    createWall(plats, 6360, 280, 40, false);
    createWall(plats, 6220, 420, 40, false);
    createWall(plats, 6360, 540, 40, false);
    createWall(plats, 6220, 660, 40, false);
    createWall(plats, 7140, 660, 40, true);
    createWall(plats, 7500, 760, 33, true);
    createWall(plats, 7160, 660, 3, false);
    createWall(plats, 7440, 600, 3, false);
    createWall(plats, 7160, 460, 3, false);
    createWall(plats, 7440, 400, 3, false);
    createWall(plats, 7160, 260, 3, false);
    createWall(plats, 8000, 100, 45, false);
    createWall(plats, 7980, 540, 23, true);
    createWall(plats, 7600, 660, 70, false);
    createWall(plats, 8000, 540, 45, false);
    createWall(plats, 8100, 420, 45, false);
    createWall(plats, 8000, 320, 45, false);
    createWall(plats, 8100, 220, 45, false);
    createWall(plats, 9000, 660, 33, true);
    createWall(plats, 9400, 760, 4, true);
    createWall(plats, 9550, 760, 8, true);
    createWall(plats, 9700, 580, 4, true);
    createWall(plats, 9850, 500, 4, true);
    createWall(plats, 9550, 300, 4, false);
    createWall(plats, 9800, 200, 4, false);
    createWall(plats, 10000, 200, 4, false);
    createWall(plats, 10200, 200, 4, false);
    createWall(plats, 10360, 240, 1, false);
    createWall(plats, 10560, 240, 1, false);
    createWall(plats, 10800, 340, 2, false);
    createWall(plats, 11000, 280, 2, false);
    createWall(plats, 11300, 180, 1, false);
    createWall(plats, 11400, 140, 1, false);
    createWall(plats, 11500, 760, 32, true);
};

function createPowerUpsLevelOne(scene) {
    new PowerUp(scene, 1840, 740, true);
    new PowerUp(scene, 2960, 130, false);
    new PowerUp(scene, 3500, 740, true);
    new PowerUp(scene, 5320, 240, false);
    new PowerUp(scene, 5660, 240, true);
    new PowerUp(scene, 7700, 120, true);
    new PowerUp(scene, 8000, 60, false);
    new PowerUp(scene, 8050, 60, true);
    new PowerUp(scene, 8500, 740, false);
    new PowerUp(scene, 10800, 740, true);
};

function createCannonsLevelOne(scene) {
    new Cannon(scene, 3400, 230);
    new Cannon(scene, 6500, 110);
    new Cannon(scene, 7850, 630);
    new Cannon(scene, 11450, 745);
};

function createEnemiesLevelOne(scene) {
    new Enemy(scene, 1000, 728, "enemy_one", "one", true);
};

function createTrapsLevelOne(target) {
    target.create(3120, 630, "trap");
    target.create(3120, 150, "trap");
    target.create(3820, 590, "trap");
    target.create(3860, 590, "trap");
    target.create(3920, 590, "trap");
    target.create(3950, 765, "trap");
    target.create(4150, 765, "trap");
    target.create(4950, 765, "trap");
    target.create(5350, 765, "trap");
    target.create(4400, 590, "trap");
    target.create(5100, 260, "trap");
    target.create(5400, 260, "trap");
    target.create(5600, 260, "trap");
    target.create(6240, 400, "trap");
    target.create(7340, 765, "trap");
    target.create(7640, 645, "trap");
    target.create(7780, 645, "trap");
    target.create(9500, 765, "trap");
    target.create(9700, 765, "trap");
    target.create(10000, 765, "trap");
    target.create(10200, 765, "trap");
    target.create(10600, 765, "trap");
    target.create(11000, 765, "trap");
    target.create(11300, 765, "trap");
};

export {
    createPlatformsLevelOne,
    createPowerUpsLevelOne,
    createCannonsLevelOne,
    createEnemiesLevelOne,
    createTrapsLevelOne
};