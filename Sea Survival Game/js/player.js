import { HealthComponent } from "./health-component.js";
import { ColliderComponent } from "./collider-component.js";
import { HorizontalMovementComponent } from "./horizontal-movement-component.js";
import { KeyboardInputComponent } from "./keyboard-input-component.js";
import { VerticalMovementComponent } from "./vertical-movement-component.js";
import { WeaponComponent } from "./WeaponComponent.js";


export default class Player extends Phaser.GameObjects.Container {
    #playerSprite;

    #horizontalMovementComponent;
    #verticalMovementComponent;
    #keyboardInputComponent;

    #weaponComponent;

    #healthComponent;
    #colliderComponent;

    constructor(scene) {
        super(scene, scene.scale.width / 2, scene.scale.height / 2, []);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setSize(24, 24);
        this.body.setOffset(-12, -12);


        this.setDepth(2);

        this.#playerSprite = scene.physics.add.sprite(0, 0, 'player');
        this.add([this.#playerSprite]);

        //this.body.setCollideWorldBounds(true);
        this.#playerSprite.setCollideWorldBounds(true);

        //Create components
        this.#keyboardInputComponent = new KeyboardInputComponent(this.scene);
        this.#horizontalMovementComponent = new HorizontalMovementComponent(this, this.#keyboardInputComponent);

        this.#verticalMovementComponent = new VerticalMovementComponent(this, this.#keyboardInputComponent);

        this.#healthComponent = new HealthComponent(3);
        this.#colliderComponent = new ColliderComponent(this.#healthComponent);

        this.#weaponComponent = new WeaponComponent(this, this.#keyboardInputComponent, {
            maxCount: 10,
            yOffset: -20,
            interval: 300000000000000000,
            speed: 50,
            lifeSpan: 5
        });

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

    create() {

    }

    update(timeStamp, deltaTime) {
        if (this.#healthComponent.isDead) {
            this.setActive(false);
            this.setVisible(false);
        }

        this.#keyboardInputComponent.update();
        this.#horizontalMovementComponent.update();
        this.#verticalMovementComponent.update();
        //this.#weaponComponent.update(deltaTime);

        if (this.#keyboardInputComponent.downIsDown) {
            this.#playerSprite.setTexture('player-costas'); 
        }
        else if (this.#keyboardInputComponent.upIsDown) {
            this.#playerSprite.setTexture('player-frente'); 

        }
        else if (this.#keyboardInputComponent.rightIsDown) {
            this.#playerSprite.setTexture('player-direita'); 

        }
        else if (this.#keyboardInputComponent.leftIsDown) {
            this.#playerSprite.setTexture('player-esquerda'); 

        }
    }
}