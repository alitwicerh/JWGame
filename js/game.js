const TOTAL_STARS = 12;

let game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

let mainState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

let player; 

game.state.add("main", mainState);




game.state.start('main');

function loadAssets(){
    game.load.image();
}

function initialiseGame(){
    game.physics.startSystem(Phaser.Physics.ARCADE);


    cursors = game.input.keyboard.createCursorKeys();

}

function gameUpdate(){

}