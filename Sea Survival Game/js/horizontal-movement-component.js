export class HorizontalMovementComponent{
    #gameObject;
    #inputComponent;

    constructor(_gameObject, _inputComponent){
        this.#gameObject = _gameObject;
        this.#inputComponent = _inputComponent;

        this.#gameObject.body.setDamping(true);
        this.#gameObject.body.setDrag(0.01);
        this.#gameObject.body.setMaxVelocity(200);
    }

    reset(){
                    this.#gameObject.body.velocity.x = 0;
    }

    update(){
        if (this.#inputComponent.leftIsDown){
            this.#gameObject.body.velocity.x -= 10;
        }
        else if(this.#inputComponent.rightIsDown){
            this.#gameObject.body.velocity.x += 10;
        }
        else{
            //this.#gameObject.body.setAngularAcceleration(0);
            this.#gameObject.body.velocity.x = 0;
        }
    }
}   