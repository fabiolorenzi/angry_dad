class Cannon {
    constructor(scene, x, y) {
        this.scene = scene;
        this.shootingInterval;
        this.body;
        this.create(x, y);
    };

    create(x, y) {
        this.scene.cannons.create(x, y, "cannon").setScale(2).refreshBody();
        this.body = this.scene.cannons.children.entries[this.scene.cannons.children.entries.length -1];
        this.startShooting();
    };

    startShooting() {
        this.shootingInterval = setInterval(() => {
            this.scene.bullets.create(this.body.x, this.body.y - 5, "bullet");
        }, 5000);
    };

    stopShooting() {
        clearInterval(this.shootingInterval);
    };
};

export default Cannon;