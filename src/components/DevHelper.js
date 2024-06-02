function devHelper(scene, xPos) {
    const tar = xPos;
    scene.background.tilePositionX += tar;
    scene.platforms.children.entries.forEach(plat => plat.x -= tar);
    scene.pubs.children.entries.forEach(b => b.x -= tar);
    scene.traps.children.entries.forEach(t => t.x -= tar);
    scene.cannons.children.entries.forEach(c => c.x -= tar);
    scene.power_ups.children.entries.forEach(p => p.x -= tar);
    scene.enemies.children.entries.forEach(e => e.x -= tar);
};

export { devHelper };