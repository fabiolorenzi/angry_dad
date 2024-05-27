class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.player;
        this.scene = scene;
        this.preload(x, y);
    }

    preload(x, y) {
        this.player = this.scene.physics.add.sprite(x, y, "player_idle");
        this.player.setScale(2.5);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.create();
    };

    create() {
        this.scene.anims.create({
            key: "player_idle_anim",
            frames: this.scene.anims.generateFrameNumbers("player_idle"),
            frameRate: 30,
            repeat: -1
        });

        this.scene.anims.create({
            key: "player_run_anim",
            frames: this.scene.anims.generateFrameNumbers("player_run"),
            frameRate: 30,
            repeat: -1
        });
    };

    move(cursors, background, min, max) {
        if (cursors.left.isDown && background.tilePositionX > min) {
            background.tilePositionX -= 3;
            this.player.setFlipX(true);
            this.player.anims.play("player_run_anim", true);
        } else if (cursors.right.isDown && background.tilePositionX < max) {
            background.tilePositionX += 3;
            this.player.setFlipX(false);
            this.player.anims.play("player_run_anim", true);
        } else {
            this.player.play("player_idle_anim", true);
        };

        if (cursors.space.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        };
    }
};

export default Player;