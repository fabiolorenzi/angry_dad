function createWall(target, x, y, n, isVertical) {
    for (let a = 0; a < n; a++) {
        target.create(isVertical ? x : x + (20 * a), isVertical ? y - (20 * a) : y, "platform");
    };
    
};

function removeBlocks(target, thr) {
    if (target.children.entries[0].x < thr) {
        target.children.entries.forEach(block => block.x < thr ? target.remove(block, true, true) : null);
    };
};

export { 
    createWall,
    removeBlocks
};