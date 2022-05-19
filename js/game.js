let game = new Phaser.Game(600, 800, Phaser.CANVAS, 'game');
let palabras;
let active;

let mainState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

let player; 

game.state.add("main", mainState);
game.state.start('main');

function loadAssets(){
    game.load.image('fondo','/assets/imgs/Space.png');
    game.load.image('player','/assets/imgs/player.png');
}

function initialiseGame(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.image(0,0,'fondo');
    let player = game.add.image(260,730,'player').scale.setTo(0.04,0.04);
    palabras = ['trial','bad','had','hard','joke','eat','my','pussy'];
    

    cursors = game.input.keyboard.createCursorKeys();

}

function gameUpdate(){

}