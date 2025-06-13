import { InputComponent } from "./InputComponent.js";

export class PeixeInputComponent extends InputComponent {

    constructor() {
        super();


        this._Down = true;
    }

    update() {

    }
}

export class PeixeEnguiaInputComponent extends InputComponent {

    #gameObject;
    #startX;
    #maxXMovement;

    constructor(_gameObject) {
        super();

        this.#gameObject = _gameObject;
        this.#startX = this.#gameObject.x;
        this.#maxXMovement = 20;
        this._Right = true;
        this._Down = true;
        this._Left = false;
    }

    update() {
        if(this.#gameObject.x > this.#startX + this.#maxXMovement){
            this._Left = true;
            this._Right = false;
        }
        else if(this.#gameObject.x < this.#startX - this.#maxXMovement){
            this._Left = false;
            this._Right = true;
        }
    }
}