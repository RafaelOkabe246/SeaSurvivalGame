import { HealthComponent } from "./health-component.js";
import { ColliderComponent } from "./collider-component.js";
import { PeixeInputComponent } from "./peixe-input-component.js";
import { VerticalMovementComponent } from "./vertical-movement-component.js";

export class PeixeDourado extends Phaser.GameObjects.Container{

    #peixeSprite;

    #verticalMovementComponent;
    #horizontalMovementComponent;

    #inputComponent;

        #healthComponent;
    #colliderComponent;

    constructor(scene, x, y) {
        super(scene,  x, y, []);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setSize(24, 24);
        this.body.setOffset(-12, -12);


        this.#peixeSprite = scene.physics.add.sprite(0, 0, 'peixe-dourado');
        this.add([this.#peixeSprite]);


        this.#inputComponent = new PeixeInputComponent();
        this.#verticalMovementComponent = new VerticalMovementComponent(this, this.#inputComponent);

        this.#healthComponent = new HealthComponent(3);
        this.#colliderComponent = new ColliderComponent(this.#healthComponent);



        //Event listener
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

        //Stop event listenes
        this.once(
            Phaser.GameObjects.Events.DESTROY, () => {
                this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
            }, this);
    }

    get colliderComponent(){
        return this.#colliderComponent;
    }
    get healthComponent(){
        return this.#healthComponent;
    }

    update(timeStamp, deltaTime) {
        if(this.#healthComponent.isDead){
            this.setActive(false);
            this.setVisible(false);
        }
        this.#inputComponent.update();
        this.#verticalMovementComponent.update();

        if(this.body.y > 500){
            console.log("respawn");
            this.body.y = 0;
            this.body.x = Phaser.Math.Between(100, 500);
            this.setActive(true);
            this.setVisible(true);
            this.#healthComponent.reset();
        }
    }

}