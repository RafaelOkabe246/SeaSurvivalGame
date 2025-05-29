import Player from './player.js';

let cursors, bullets, lastFired = 0;
let asteroids;


export class mainScene extends Phaser.Scene{


    //Like the awake in unty, it plays before the create (start) method
    preload() {
        //Uses to load assets
        this.load.image('player', 'assets/peixe-lanterna.jpg')
        this.load.image('peixe', 'assets/peixe-lanterna.jpg')
        
    }

    create() {

        //const player = new Player[this];
        this.player = new Player(this, 100, 100, 'player');

        //Pontuação
        this.score = 0;
        let style = { font: '20px Arial', fill: "white" };
        this.scoreText = this.add.text(50, 50, 'Score: ' + this.score, style);


       
    }

    update() {

        this.player.update();
        //console.log("EEWE");


    }

}


const game = new Phaser.Game({
    width: 700,
    height: 500,
    backgroundColor: '#040483',
    scene: mainScene,
    physics: { default: 'arcade' },
    parent: 'game',
});

//game.scene.add('BootScene', BootScene);
//game.scene.add('PreloadScene', PreloadScene);
//game.scene.add('GameScene', GameScene);
//game.scene.start('GameScene');