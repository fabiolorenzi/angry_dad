class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, isLast) {
        super(scene, x, y);
        this.scene = scene;
        this.type = type;
        this.enemy;

        this.preload(x, y, isLast);
    };

    preload(x, y, isLast) {
        this.enemy = this.scene.enemies.create(x, y, `${this.type}_idle`).setName(`${this.type}`);
        this.enemy.setScale(2.5);
        this.enemy.setBounce(0.2);

        this.create(isLast);
    };

    create(isLast) {
        if (isLast) {
            this.scene.anims.create({
                key: `${this.type}_idle_anim`,
                frames: this.scene.anims.generateFrameNumbers(`${this.type}_idle`),
                frameRate: 30,
                repeat: -1
            });

            this.scene.anims.create({
                key: `${this.type}_run_anim`,
                frames: this.scene.anims.generateFrameNumbers(`${this.type}_run`),
                frameRate: 30,
                repeat: -1
            });

            this.scene.anims.create({
                key: `${this.type}_dead_enemy_hurt_anim`,
                frames: this.scene.anims.generateFrameNumbers(`${this.type}_hurt`),
                frameRate: 1,
                repeat: 0
            });
        };
        this.enemy.anims.play(`${this.type}_run_anim`);
    };
};

export default Enemy;