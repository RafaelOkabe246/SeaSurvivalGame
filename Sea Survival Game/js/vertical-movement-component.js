export class VerticalMovementComponent {
    #gameObject;
    #inputComponent;

    #speed;

    constructor(_gameObject, _inputComponent) {
        this.#gameObject = _gameObject;
        this.#inputComponent = _inputComponent;

        this.#speed = 10;

        this.#gameObject.body.setDamping(true);
        this.#gameObject.body.setDrag(0.01);
        this.#gameObject.body.setMaxVelocity(200);
    }

    reset() {
        this.#gameObject.body.velocity.y = 0;
    }

    increaseSpeed(value){
        this.#speed += value;
    }

    update() {
        if (this.#inputComponent.downIsDown) {
            this.#gameObject.body.velocity.y += this.#speed;
        }
        else if (this.#inputComponent.upIsDown) {
            this.#gameObject.body.velocity.y -= this.#speed;
        }
        else {
            //this.#gameObject.body.setAngularAcceleration(0);
            this.#gameObject.body.velocity.y = 0;
        }
    }
}   