import { HealthComponent } from "./health-component.js";
import { ColliderComponent } from "./collider-component.js";
import { HorizontalMovementComponent } from "./horizontal-movement-component.js";
import { PeixeEnguiaInputComponent } from "./peixe-input-component.js";
import { VerticalMovementComponent } from "./vertical-movement-component.js";


export class PeixeEnguia extends Phaser.GameObjects.Container {

    #peixeSprite;
    #scene;
    #verticalMovementComponent;
    #horizontalMovementComponent;

    #inputComponent;

    #healthComponent;
    #colliderComponent;

    constructor(scene, x, y) {
        super(scene, x, y, []);
        this.#scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setSize(24, 24);
        this.body.setOffset(-12, -12);


        this.#peixeSprite = scene.physics.add.sprite(0, 0, 'peixe-enguia');
        this.add([this.#peixeSprite]);


        this.#inputComponent = new PeixeEnguiaInputComponent(this);
        this.#verticalMovementComponent = new VerticalMovementComponent(this, this.#inputComponent);
        this.#horizontalMovementComponent = new HorizontalMovementComponent(this, this.#inputComponent);
        this.#healthComponent = new HealthComponent(2);
        this.#colliderComponent = new ColliderComponent(this.#healthComponent);

        //Event listener
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);


        //Stop event listenes
        this.once(
            Phaser.GameObjects.Events.DESTROY, () => {
                this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
            }, this);
    }

    get colliderComponent() {
        return this.#colliderComponent;
    }
    get healthComponent() {
        return this.#healthComponent;
    }

    preload() {
        this.load.image('enguia1', './assets/Enguia/Enguiaquadro0000.png');
        this.load.image('enguia2', './assets/Enguia/Enguiaquadro0000.png');
        this.load.image('enguia3', './assets/Enguia/Enguiaquadro0000.png');
        this.load.image('enguia4', './assets/Enguia/Enguiaquadro0000.png');
    }

    create() {
        this.#peixeSprite.anims.create({
            key: 'walk',
            frames: [
                { key: 'enguia1' },
                { key: 'enguia2' },
                { key: 'enguia3' },
                { key: 'enguia4' }
            ],
            frameRate: 6,
            repeat: -1 // loop forever
        });
    }

    playAnim() {
        console.log("ERER");
        this.#peixeSprite.anims.play('enguiaIdle');
    }


    Respawn() {
        this.body.y = Phaser.Math.Between(-50, 0);//0;
        this.body.x = Phaser.Math.Between(100, 500);
        this.setActive(true);
        this.setVisible(true);
        this.#healthComponent.reset();
        this.#scene.addPoints(2);

        this.#verticalMovementComponent.increaseSpeed(1);
        this.#verticalMovementComponent.reset();

    }

    update(timeStamp, deltaTime) {
        if (this.#healthComponent.isDead) {
            this.setActive(false);
            this.setVisible(false);
        }
        this.#inputComponent.update();
        this.#verticalMovementComponent.update();
        this.#horizontalMovementComponent.update();

        if (this.body.y > 500) {
            this.Respawn();
        }
    }

}