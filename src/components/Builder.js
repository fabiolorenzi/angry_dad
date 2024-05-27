function createWall(target, x, y, n, isVertical) {
    for (let a = 0; a < n; a++) {
        target.create(isVertical ? x : x + (20 * a), isVertical ? y - (20 * a) : y, "platform");
    }
};

export { createWall };