

class mainScene extends Phaser.Scene{

    //Like the awake in unty, it plays before the create (start) method
    preload() {
        //Uses to load assets
        this.load.image('player', 'assets/peixe-lanterna.jpg')
        this.load.image('peixe', 'assets/peixe-lanterna.jpg')
    }

    create() {

        this.player = this.physics.add.sprite(500, 500, 'player');

        //Pontuação
        this.score = 0;
        let style = { font: '20px Arial', fill: "white" };
        this.scoreText = this.add.text(50, 50, 'Score: ' + this.score, style);

        //Adiciona input do teclado
        this.arrow = this.input.keyboard.createCursorKeys();
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

        //Peixes
        const peixe = this.physics.add.sprite(20, 20, 'peixe');
    }

    update() {

       
        
        if (this.arrow.right.isDown) {
            this.player.x += 3; //Move para a direita
        } else if (this.arrow.left.isDown) {
            this.player.x -= 3; //Move para a esquerda
        }

        //Movimentação vertical
        if (this.arrow.down.isDown) {
            this.player.y += 3; //Move para baixo
        } else if (this.arrow.up.isDown) {
            this.player.y -= 3; //Move para cima
        }

    }

}


new Phaser.Game({
    width: 700,
    height: 500,
    backgroundColor: '#040483',
    scene: mainScene,
    physics: { default: 'arcade' },
    parent: 'game',
});
