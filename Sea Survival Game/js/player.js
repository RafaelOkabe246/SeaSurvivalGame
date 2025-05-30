import { KeyboardInputComponent } from "./keyboard-input-component.js";
export default class Player extends Phaser.GameObjects.Container{
   #playerSprite;
   
   #keyboardInputComponent;

    constructor(scene){
        super(scene, scene.scale.width/2, scene.scale.height/2, []);

        scene.add.existing(this);   

        this.#playerSprite = scene.physics.add.sprite(0, 0, 'player');
        this.add([this.#playerSprite]);


        this.#keyboardInputComponent = new KeyboardInputComponent(this.scene);
       
        //Event listener
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
       
        //Stop event listenes
        this.once(
            Phaser.GameObjects.Events.DESTROY, () => {
            this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        }, this);
    } 

    
    update(timeStamp, deltaTime){
        
        console.log(timeStamp, deltaTime);
    }
}