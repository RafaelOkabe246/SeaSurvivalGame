export class WeaponComponent {
    #gameObject;
    #inputComponent;
    #bullletGroup;
    #fireBulletInterval;
    #bulletConfig;

    constructor(_gameObject, _inputComponent, bulletConfig) {
        this.#gameObject = _gameObject;
        this.#inputComponent = _inputComponent;
        this.#bulletConfig = bulletConfig;

        this.#bullletGroup = this.#gameObject.scene.physics.add.group({
            name: 'bullets~$(Phaser.Math.RND.uuid())}',
            enable: false,
        });

        this.#bullletGroup.createMultiple({
            key: 'bullet',
            quantity: 10,
            active: false,
            visible: false,
        });
        console.log(this.#bullletGroup);


        //Event listener
        this.#gameObject.scene.physics.world.on( 
            Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);

        //Stop event listenes
        this.#gameObject.once(
            Phaser.GameObjects.Events.DESTROY, 
            () => {
                this.#gameObject.scene.physics.world.off(Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);
            }, this);
    }

    update(_deltaTime) {

        //const deltaTime = _deltaTime / 1000; // Convert from ms to seconds

        this.#fireBulletInterval -= _deltaTime;

        console.log(_deltaTime);

        if (this.#fireBulletInterval > 0) {
            console.log("Try shoot");
            return;
        }

        if (this.#inputComponent.attackIsDown) {
            const bullet = this.#bullletGroup.getFirstDead();
            if (bullet === undefined || bullet === null) {
                return;
            }

            const x = this.#gameObject.x;
            const y = this.#gameObject.y + this.#bulletConfig.yOffset;

            bullet.enableBody(true, x, y, true, true);

            bullet.body.velocity.y -= this.#bulletConfig.speed;
            bullet.setState(this.#bulletConfig.lifeSpan);
            bullet.setScale(0.8);
            bullet.body.setSize(14, 18);

            this.#fireBulletInterval = this.#bulletConfig.interval;
        }
    }

    worldStep(delta){
        this.#bullletGroup.getChildren().forEach((bullet) => {
            if(!bullet.active){
                return;
            }

            bullet.state -= delta;

            if(bullet.state <= 0){
                bullet.disableBody(true, true);
            }
        });
    }
}