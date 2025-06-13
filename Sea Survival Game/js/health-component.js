export class HealthComponent{
    #startLife;
    #currentLife;

    #isDead;

    constructor(life){
        this.#currentLife = life;
        this.#startLife = life;
        this.#isDead = false;
    }

    get life(){
        return this.#currentLife;
    }

    get isDead(){
        return this.#isDead;
    }

    reset(){
        this.#currentLife = this.#startLife;
        this.#isDead = false;
    }

    hit(){
        if(this.#isDead){
            //Activates invencibility
            return;
        }
        
        this.#currentLife -=1;
        if(this.#currentLife <= 0){
            this.#isDead = true;
        }
    }

    die(){
        this.#currentLife = 0;
        this.#isDead = true;
    }

}