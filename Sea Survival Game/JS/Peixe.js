//import { Phaser } from "../phaser";

class Peixe extends Phaser.Physics.Arcade.Sprite{

    constructor(_HP, _speed, _player){
        this.HP = _HP;
        this.speed = _speed;
        this.player = _player;

        this.setTexture('assets/peixe-lanterna.jpg');

        console.log("TERTRETERT");  
    }

    update(){
        console.log("EEWE");

    }

    behaviour(){
        console.log("EEWE");

    }

}