
var game = new Phaser.Game(600, 800, Phaser.AUTO, 'game');
let palabras = ['pedroflop', 'adrianaflop', 'izanflop', 'urga', 'ejhgs'];
let active;
let enemies;
let spawn;
let urga;
let player;
let urgapalabra;
var style = { font: "bold 32px Arial", fill: "#fff", backgroundColor: "#000"};
//var styleActive ={ font: "bold 20px Arial", fill: "#FFAA00", backgroundColor: "#000"};
var arraypalabras = [];
var arrayOwps = [];
//let inicio;
let activeword = -1;
let activeletter = 0;
let checker = false;
let levelConfig;
let waves = 3;
let number = 5;
let rate = 1;
let speed = 200;
const T = 1000/rate;
let x = 0;


let mainState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

game.state.add("main", mainState);
game.state.add("menu", menuState);
game.state.start('main');

function loadAssets(){
    game.load.image('fondo','assets/imgs/Space.png');
    game.load.image('player','assets/imgs/player.png');
    game.load.spritesheet('owp','assets/imgs/asteroide.png');
    game.load.text('info', 'partA.json');
}



function initialiseGame(){
    levelConfig = JSON.parse(game.cache.getText('info'));

    game.input.keyboard.addCallbacks(this, null, null, keyPress);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0,0,600,800);
    game.add.image(0,0,'fondo');

    player = game.add.image(260,700,'player');
    player.scale.setTo(0.06,0.06);
    player.enableBody = true;
    game.physics.enable(player,Phaser.Physics.ARCADE);

    enemies = game.add.group();
    enemies.enableBody = true;
    game.physics.arcade.enable(enemies);
    //enemies.physics.setCollideWorldBounds(true);
    //enemies.body.ARCADE.

    //palabras = game.add.group();
    
    enemies.timer = setInterval(() => {
        createWave(x);
        x++;
    }, T);;
    //spawn('owp', 'pedroflop');
    //game.physics.arcade.overlap(player, enemies ,checkOverlap, gameOver);


    cursors = game.input.keyboard.createCursorKeys();

}

function createWave(x){
    //for(let i = 0; i < palabras.length; i++){
    if (x < number){
        spawnOWP('owp',palabras[x]);
        //x++;
    }
    else{
        clearInterval(enemies.timer);
        x = 0;
    }
}

function spawnOWP(image, palabra){
    urga = enemies.create(Phaser.Math.between(0,600),10,image);
    urga.scale.setTo(0.05,0.05);
    arrayOwps.push(urga);

    urgapalabra = game.add.text(urga.x,urga.y + urga.width,palabra, style);
    urgapalabra.enableBody = true;
    game.physics.arcade.enable(urgapalabra);
    arraypalabras.push(urgapalabra);

    urga.body.bounce.x = urga.body.bounce.y = 1;
    urga.body.setBounds = Phaser.CANVAS.x, Phaser.CANVAS.y;
    urga.enableBody = true;
    let angle = Phaser.Math.between(-10,10);
    let tangente = Math.tan(angle*Math.PI/180);
    let distancia = Phaser.Math.distance(urga.x,urga.y, player.x, player.y);
    //console.log("playerpos " ,player.x, player.y);
    //console.log("urgapos " ,urga.x,urga.y);
    game.physics.arcade.moveToXY(urga, player.x + (player.width/2) + (tangente*distancia), player.y + 100, 30);
    //console.log("tangente*distancia= " ,tangente*distancia , tangente, distancia);
}

function wordFollowsenemie() {
    for(let i = 0; i < arraypalabras.length; i++){
        game.physics.arcade.moveToXY(arraypalabras[i], arrayOwps[i].x, arrayOwps[i].y + arrayOwps[i].width, 30);
    }
    
}

function gameUpdate(){

    wordFollowsenemie();
    if (checkOverlap(player , enemies) && checker){
        gameOver();
    }
    checker = true;


}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function gameOver(){
    //console.log("pedroflop");
    game.state.start('menu');
    
}

function keyPress(char){

    if (activeword == -1){
        for(let i = 0; i < arraypalabras.length; i++){
            if(arraypalabras[i].text.charAt(0) == char){
                activeletter++;
                activeword = i;
                //console.log(arraypalabras[i].text.charAt(activeletter));
                arraypalabras[activeword].addColor("#000000", 0);
                arraypalabras[activeword].addColor("#ff0000", activeletter);
                break;
            }
        }
    }
    else if (arraypalabras[activeword].text.charAt(activeletter) == char){
        //console.log(arraypalabras[0].text.charAt(activeletter));
        arraypalabras[activeword].addColor("#000000", activeletter);
        arraypalabras[activeword].addColor("#ff0000", activeletter + 1);
        activeletter++;
       
    }
    if (arraypalabras[activeword].text.length  == activeletter){
        arraypalabras[activeword].kill();
        arrayOwps[activeword].kill();
        activeword = -1;
        activeletter = 0;
    }

    console.log(char);
}