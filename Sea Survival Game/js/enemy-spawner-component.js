export class EnemySpawnerComponent {
    #scene;
    #spawnInterval;
    #spawnAt;
    #group;

    constructor(scene, enemyClass, _spawnInterval) {
        this.#scene = scene;
        this.#group = this.#scene.add.group({
            name: '${this.constructor.name}-${Phaser.Math.RND.uuid()}',
            classType: enemyClass,
            runChildUpdate: true,
        });

        this.#spawnInterval = _spawnInterval;
        this.#spawnAt = 50;

        //Event listener
        this.#scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.#scene.physics.world.on(Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);

        //Stop event listenes
        this.#scene.events.once(
            Phaser.GameObjects.Events.DESTROY, () => {
                this.#scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
            }, this);
    }

    update(timeStamp, deltaTime) {

    }
    worldStep(deltaTime) {

    }
}