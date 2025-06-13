export class ColliderComponent {
    #heahthComponent;

    constructor(_lifeComponent) {
        this.#heahthComponent = _lifeComponent;
    }

    colliderWithEnemy(){
        if(this.#heahthComponent.isDead){
            return;
        }

        this.#heahthComponent.die();
    }

    //collideWithProjectile //For when TCC is not killing us
}