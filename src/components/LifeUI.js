class LifeUI {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.createLifeUI(x, y);
    };

    createLifeUI(x, y) {
        for (let times = 0; times < 5; times++) {
            this.scene.life_value.create(x + (40 * times), y, "heart").setScale(0.07).refreshBody();
        };
    };

    updateLifeUI(isPlus, length) {
        isPlus 
            ? this.scene.life_value.create(130 + (40 * length), 85, "heart").setScale(0.07).refreshBody()
            : this.scene.life_value.children.entries[length].destroy();
    };
};

export default LifeUI;