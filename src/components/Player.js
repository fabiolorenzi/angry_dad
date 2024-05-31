class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.player;
        this.playerIsTouchingDown;
        this.life;
        this.scene = scene;
        this.isHurted;
        this.hasFinishedLevel;
        this.isDead;
        this.preload(x, y);
    }

    preload(x, y) {
        this.player = this.scene.physics.add.sprite(x, y, "player_idle");
        this.player.setScale(2.5);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.life = 5;
        this.isHurted = false;
        this.hasFinishedLevel = false;
        this.isDead = false;

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

        this.scene.anims.create({
            key: "player_jump_anim",
            frames: this.scene.anims.generateFrameNumbers("player_jump"),
            frameRate: 1,
            repeat: 0
        });

        this.scene.anims.create({
            key: "player_hurt_anim",
            frames: this.scene.anims.generateFrameNumbers("player_hurt"),
            frameRate: 1,
            repeat: 0
        });
    };

    move(cursors, background, min, max) {
        if (!this.hasFinishedLevel && !this.isDead) {
            if (cursors.left.isDown && background.tilePositionX > min) {
                this.player.body.velocity.x < -1 && this.scene.moveGroups(false);
                this.player.setFlipX(true);
                this.player.setVelocityX(-3);
                this.isHurted ? this.player.anims.play("player_hurt_anim", true) : this.playerIsTouchingDown && this.player.anims.play("player_run_anim", true);
            } else if (cursors.right.isDown && background.tilePositionX <= max) {
                this.player.body.velocity.x > 1 && this.scene.moveGroups(true);
                this.player.setFlipX(false);
                this.player.setVelocityX(3);
                this.isHurted ? this.player.anims.play("player_hurt_anim", true) : this.playerIsTouchingDown && this.player.anims.play("player_run_anim", true);
            } else {
                this.player.setVelocityX(0);
                this.isHurted ? this.player.anims.play("player_hurt_anim", true) : this.playerIsTouchingDown && this.player.play("player_idle_anim", true);
            };

            if (cursors.space.isDown && this.playerIsTouchingDown) {
                this.player.setVelocityY(-330);
                this.isHurted ? this.player.anims.play("player_hurt_anim", true) : this.player.anims.play("player_jump_anim", true);
            };
        } else if (this.hasFinishedLevel) {
            this.player.anims.play("player_idle_anim", true);
        } else if (this.isDead) {
            this.player.visible = false;
        };
    }

    updateLife(isPlus) {
        if (!this.isHurted) {
            this.isHurted = true;
            if (isPlus) {
                this.life += 1;
            } else {
                this.life -= 1;
            };
            this.life >= 0 && this.scene.life_value_ui.updateLifeUI(isPlus, this.scene.life_value.children.entries.length - 1);
            setTimeout(() => this.isHurted = false, 1000);
        };
    };
};

export default Player;