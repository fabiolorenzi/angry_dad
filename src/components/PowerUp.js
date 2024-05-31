class PowerUp {
    constructor(scene, x, y, isTime) {
        this.scene = scene;
        this.isTime = isTime;
        this.create(x, y);
    };

    create(x, y) {
        if (this.isTime) {
            this.scene.power_ups.create(x, y, "power_up_time").setName("power_up_time").setScale(2).refreshBody();
        } else {
            this.scene.power_ups.create(x, y, "power_up_life").setName("power_up_life");
        };
    };
};

export default PowerUp;