import { InputComponent } from "./InputComponent";

export class KeyboardInptComponent extends InputComponent {
    #cursorKeys;

    #inputLocked;

    constructor(scene) {
        super();
        this.#cursorKeys = scene.input.keyboard.createCursorKeys();
        this.#inputLocked = false;
    }

    set lockInput(val){
        this.#inputLocked = val;
    }

    update() {
        if(this.#inputLocked){
            this.reset();
            return;
        }

        this._Up = this.#cursorKeys.up.isDown;
        this._Down = this.#cursorKeys.down.isDown;
        this._Left = this.#cursorKeys.left.isDown;
        this._Right = this.#cursorKeys.right.isDown;
        this._Attack = this.#cursorKeys.space.isDown;
    }
}