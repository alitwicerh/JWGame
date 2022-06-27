
var game = new Phaser.Game(600, 800, Phaser.AUTO, 'game');
let palabras;
let active;
let enemies;
let spawn;
let urga;
let player;
let urgapalabra;
var style = { font: "bold 32px Arial", fill: "#fff"};

let mainState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};



game.state.add("main", mainState);
game.state.start('main');

function loadAssets(){
    game.load.image('fondo','assets/imgs/Space.png');
    game.load.image('player','assets/imgs/player.png');
    game.load.spritesheet('owp','assets/imgs/asteroide.png');
}

function initialiseGame(){

    

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0,0,600,800);
    game.add.image(0,0,'fondo');

    player = game.add.image(260,730,'player');
    player.scale.setTo(0.04,0.04);
    game.physics.arcade.enable(player);

    enemies = game.add.group();
    enemies.enableBody = true;
    game.physics.arcade.enable(enemies);

    palabras = game.add.group();
    palabras.enableBody = true;
    game.physics.arcade.enable(palabras);

    function spawn(image){
        urga = enemies.create(Phaser.Math.between(0,600),10,image);
        urga.scale.setTo(0.05,0.05);
        urgapalabra = game.add.text(urga.x,urga.y + urga.width,'Drag me around', style ,palabras);
        //urgapalabra.position = urga.position;

        urga.body.bounce.x = urga.body.bounce.y = 1;
        urga.body.setBounds = Phaser.CANVAS.x, Phaser.CANVAS.y;
        urga.enableBody = true;
        let angle = Phaser.Math.between(-10,10);
        let tangente = Math.tan(angle*Math.PI/180);

        let distancia = Phaser.Math.distance(urga.x,urga.y, player.x, player.y);
        console.log("playerpos " ,player.x, player.y);
        console.log("urgapos " ,urga.x,urga.y);
        game.physics.arcade.moveToXY(urga, 270 + (tangente*distancia), 800, 30);
        console.log("tangente*distancia= " ,tangente*distancia , tangente, distancia);
    }
    spawn('owp');


    cursors = game.input.keyboard.createCursorKeys();

}

function enemyFollows() {
    //for(let i = 0; i < 9 ; i++){
    game.physics.arcade.moveToXY(urga, Phaser.Math.rotateToAngle(Phaser.Math.between(-10,10)), 730, 30);
   //}
    
}

function gameUpdate(){
    //for(urgapalabra in urgapalabra){
        game.physics.arcade.moveToXY(urgapalabra, urga.x, urga.y + urga.width, 30);
   // }

}