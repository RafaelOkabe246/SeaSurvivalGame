export class InputComponent {
    _Up;
    _Down;
    _Left;
    _Right;
    _Attack;

    constructor() {
        this.reset();
    }

    get leftIsDown() {
        return this._Left;
    }

    get rightIsDown() {
        return this._Right;
    }
    get upIsDown() {
        return this._Up;
    }
    get downIsDown() {
        return this._Down;
    }
    get attackIsDown() {
        return this._Attack;
    }

    reset() {
        this._Up = false;
        this._Down = false;
        this._Left = false;
        this._Right = false;
        this._Attack = false;
    }


}

