import Player from './player.js';

import { Peixe } from './Peixe.js';
import { PeixeDourado } from './peixe-dourado.js';
import { PeixeEnguia } from './peixe-enguia.js';

let points =0 ;

// EndGameScene.js
export class EndGameScene extends Phaser.Scene {
    constructor() {
        super('EndGameScene');
        this.init(points);
    }

    init(data) {
        this.score = data || 0; // Pass data from the previous scene if needed
    }

    create() {
        // Add "Game Over" text
        this.add.text(this.scale.width / 2, 150, 'Game Over', {
            fontSize: '48px',
            color: '#fff'
        }).setOrigin(0.5);

        // Show score or any other info
        this.add.text(this.scale.width / 2, 220, `Score: ${points}`, {
            fontSize: '32px',
            color: '#fff'
        }).setOrigin(0.5);

        // Add a reset button
        const resetButton = this.add.text(this.scale.width / 2, 300, 'Restart', {
            fontSize: '28px',
            backgroundColor: '#000',
            color: '#fff',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.start('mainScene'); // Restart your main scene
            });

        // Optional: button hover effects
        resetButton.on('pointerover', () => resetButton.setStyle({ fill: '#f00' }));
        resetButton.on('pointerout', () => resetButton.setStyle({ fill: '#fff' }));
    }
}

export class mainScene extends Phaser.Scene {

    constructor() {
        super({ key: 'mainScene' });
    }

    #style;
    #score;

    //Like the awake in unty, it plays before the create (start) method
    preload() {
        //Uses to load assets
        this.load.image('player', 'assets/Sprites peixes - SereioFrente.gif')
        this.load.image('peixe', 'assets/peixe-lanterna.png')
        this.load.image('peixe-dourado', 'assets/peixe-dourado.png')
        this.load.image('peixe-enguia', 'assets/peixe-enguia.png')


        //Player positions
        this.load.image('player-frente', 'assets/Player/Costas/SereioCostaquadro0000.png')
        this.load.image('player-costas', 'assets/Player/Frente/SereioFrentequadro0000.png')
        this.load.image('player-direita', 'assets/Player/Direita/SereioDireitaquadro0000.png')
        this.load.image('player-esquerda', 'assets/Player/Esquerda/SereioEsquerdaquadro0000.png')


        //Enguia assets
        this.load.image('enguia1', './assets/Enguia/Enguiaquadro0000.png');
        this.load.image('enguia2', './assets/Enguia/Enguiaquadro0001.png');
        this.load.image('enguia3', './assets/Enguia/Enguiaquadro0002.png');
        this.load.image('enguia4', './assets/Enguia/Enguiaquadro0003.png');
    }

    create() {

         this.anims.create({
            key: 'enguiaIdle',
            frames: [
                { key: 'enguia1' },
                { key: 'enguia2' },
                { key: 'enguia3' },
                { key: 'enguia4' },
            ],
            frameRate: 8,
            repeat: -1 // -1 for infinite loop, 0 to play once
        });

        //const player = new Player(this);
        this.player = new Player(this, 100, 100, 'player');
        this.physics.add.sprite();




        //Pontuação
        this.score = 0;
        this.#score = this.score;

        let style = { font: '20px Arial', fill: "white" };
        this.#style = style;
        this.scoreText = this.add.text(50, 50, 'Score: ' + this.score, style);

        //End game ui


        //Enemies/Peixes
        //const enemy = new Peixe(this, this.scale.width/2, 100);
        //const peixeDourado = new PeixeDourado(this, this.scale.width/2, 100);
        const enguia = new PeixeEnguia(this, this.scale.width / 2, 10);
        const enguia1 = new PeixeEnguia(this, this.scale.width / 4, 10);
        const enguia2 = new PeixeEnguia(this, this.scale.width / 1, 10);
        const enguia3 = new PeixeEnguia(this, this.scale.width / 3, 10);

        enguia.playAnim();
        enguia1.playAnim();
        enguia2.playAnim();
        enguia3.playAnim();

        //Set collisions
        this.physics.add.overlap(this.player, [enguia, enguia1, enguia2, enguia3], (playerGameObject, enemyGameObject) => {
            playerGameObject.colliderComponent.colliderWithEnemy();
            enemyGameObject.colliderComponent.colliderWithEnemy();
            this.endGame();
        });
    }

    endGame() {
        points = this.#score;
        this.scene.start('EndGameScene');
    }

    update() {

        this.player.update();
    }



    addPoints(_score) {
        this.#score += _score;
        this.scoreText.setText('Score: ' + this.#score, this.#style);
    }

    showEndGameUi() {

    }
}


const config = ({
    type: Phaser.CANVAS,
    roundPixels: true,
    pixelArt: true,

    scale: {
        width: 700,
        height: 500,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
    },

    backgroundColor: '#040483',
    scene: [mainScene, EndGameScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: false,
        },
    },
    parent: 'game',
});

const game = new Phaser.Game(config);

//game.scene.add('BootScene', BootScene);
//game.scene.add('PreloadScene', PreloadScene);
//game.scene.add('GameScene', mainScene);
//game.scene.start('endGameScene', EndGameScene);