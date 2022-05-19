
var game = new Phaser.Game(600, 800, Phaser.AUTO, 'game');
let palabras;
let active;
let enemies;
let spawn;



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
    game.load.spritesheet('owp','/assets/imgs/asteroide.png');
}

function initialiseGame(){

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0,0,600,800);
    game.add.image(0,0,'fondo');

    let player = game.add.image(260,730,'player').scale.setTo(0.04,0.04);
    game.physics.arcade.enable(player);

    enemies = game.add.group();
    enemies.enableBody = true;
    game.physics.arcade.enable(enemies);

    function spawn(image){
     let urga = enemies.create(280,20,image).scale.setTo(0.05,0.05);
     //urga.body.bounce.x = urga.body.bounce.y = 1;
     //urga.body.setBounds = Phaser.CANVAS.x, Phaser.CANVAS.y;
     urga.enableBody = true;
     //urga.body.
     //urga.body.gravity.y = 200;

    }
    spawn('owp');


    cursors = game.input.keyboard.createCursorKeys();

}

function gameUpdate(){
    //spawn('owp');
}