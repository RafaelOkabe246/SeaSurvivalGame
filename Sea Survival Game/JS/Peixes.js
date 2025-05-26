import { Phaser } from "../phaser";

class Peixe extends Phaser.Physics.Arcade.Sprite{

    constructor(_HP, _speed, _player){
        this.HP = _HP;
        this.speed = _speed;
        this.player = _player;

        this.setTexture('assets/peixe-lanterna.jpg');

        console.log("TERTRETERT");  
    }

    Update(){
        console.log("EEWE");

    }

    Behaviour(){

    }

}

class PeixeLanterna extends Peixe{
    
    Update(){

    }

    Behaviour(){
        const distance = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

        if (distance > 5) {
          this.scene.physics.moveToObject(this, this.player, this.speed);
        } 
        else {
          this.body.setVelocity(0);
        }
    }

}