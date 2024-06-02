class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.player;
        this.playerIsTouchingDown;
        this.life;
        this.scene = scene;
        this.isHurted;
        this.isAttacking;
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
        this.isAttacking = false;
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

        this.scene.anims.create({
            key: "player_attack_anim",
            frames: this.scene.anims.generateFrameNumbers("player_attack"),
            frameRate: 1,
            repeat: -1
        });
    };

    move(cursors, background, min, max) {
        if (!this.hasFinishedLevel && !this.isDead) {
            if (cursors.left.isDown && background.tilePositionX > min) {
                this.player.body.velocity.x < -1 && this.scene.moveGroups(false);
                this.player.setFlipX(true);
                this.player.setVelocityX(-3);
                this.isHurted ? this.player.anims.play("player_hurt_anim", true) : this.playerIsTouchingDown && !this.isAttacking && this.player.anims.play("player_run_anim", true);
            } else if (cursors.right.isDown && background.tilePositionX <= max) {
                this.player.body.velocity.x > 1 && this.scene.moveGroups(true);
                this.player.setFlipX(false);
                this.player.setVelocityX(3);
                this.isHurted ? this.player.anims.play("player_hurt_anim", true) : this.playerIsTouchingDown && !this.isAttacking && this.player.anims.play("player_run_anim", true);
            } else {
                this.player.setVelocityX(0);
                this.isHurted ? this.player.anims.play("player_hurt_anim", true) : this.playerIsTouchingDown && !this.isAttacking && this.player.play("player_idle_anim", true);
            };

            if (cursors.space.isDown && this.playerIsTouchingDown) {
                this.player.setVelocityY(-330);
                this.isHurted ? this.player.anims.play("player_hurt_anim", true) : !this.isAttacking && this.player.anims.play("player_jump_anim", true);
                !this.isHurted && this.player.scene.player_jump_audio.play();
            };

            if (cursors.up.isDown && !this.isHurted && !this.isAttacking) {
                this.isAttacking = true;
                this.isAttacking && this.player.anims.play("player_attack_anim", true);
                this.isAttacking && this.player.scene.player_attack_audio.play();
                setTimeout(() => {
                    this.isAttacking = false;
                    !this.playerIsTouchingDown && this.player.anims.play("player_idle_anim", true);
                }, 500);
            };
        } else if (this.hasFinishedLevel) {
            this.player.anims.play("player_idle_anim", true);
        } else if (this.isDead) {
            this.player.visible = false;
        };
    }

    updateLife(isPlus, timeFinished) {
        if (!this.isHurted && !timeFinished) {
            if (isPlus && this.life < 5) {
                this.life += 1;
                this.scene.life_value_ui.updateLifeUI(isPlus, this.scene.life_value.children.entries.length + 1);
            } else if (!isPlus) {
                this.life -= 1;
                this.isHurted = true;
                this.scene.player_hurt_audio.play();
                setTimeout(() => this.isHurted = false, 1000);
                this.life >= 0 && this.scene.life_value_ui.updateLifeUI(isPlus, this.scene.life_value.children.entries.length - 1);
            };
        };
    };
};

export default Player;