//const { Point } = require("phaser-ce");
var game = new Phaser.Game(600, 800, Phaser.AUTO, 'game');
let palabras = [/*'pedroflop', 'adrianaflop', 'izanflop', 'urga', 'ejhgs', 'nuriolachola', 'lola', 'meme', 'titi', 'chula','fabulous', 'sharpay', 'orto', 'hebe','yolo'*/];
let active;
let palabrasEnpantalla;
let enemies;
let spawn;
let urga;
let player;
let urgapalabra;
var style = { font: "bold 32px Arial", fill: "#fff", backgroundColor: "#000"};
var arraypalabras = [];
var arrayOwps = [];

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
let contwaves = 0;
let puntos = 0;


let mainState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

game.state.add("main", mainState);
//game.state.add("menu", menuState);
game.state.add("main2", stage2State);
//game.state.start("menu");

function loadAssets(){
    game.load.image('fondo','assets/imgs/Space.png');
    game.load.image('player','assets/imgs/OWPReplicator.png');
    game.load.spritesheet('owp','assets/imgs/asteroide.png');
    game.load.text('info', 'partA.json', true);
}


function initialiseGame(){
    levelConfig = JSON.parse(game.cache.getText('info'));
    levelConfig.words.medium.p.forEach(p => almacenaPalabra1(p, 1));
    //levelConfig.waves.wave.forEach(p => almacenaPalabra1(p, 2));

    game.input.keyboard.addCallbacks(this, null, null, keyPress);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0,0,600,800);
    game.add.image(0,0,'fondo');

    player = game.add.image(260,700,'player');
    player.scale.setTo(0.2,0.2);
    player.enableBody = true;
    game.physics.enable(player,Phaser.Physics.ARCADE);

    enemies = game.add.group();
    enemies.enableBody = true;
    game.physics.arcade.enable(enemies);

    game.add.text(10, 10, 'Puntos:', style);
    //enemies.physics.setCollideWorldBounds(true);
    //enemies.body.ARCADE.

    //palabras = game.add.group();
    
    /*enemies.timer = setInterval(() => {
        createWave(x);
        //x++;
    }, T);;*/

    cursors = game.input.keyboard.createCursorKeys();

}

function getWordsInScreen(){
    palabrasEnpantalla = [];
    arraypalabras = [];
    arrayOwps = [];
   // let cont = 0;
    for (let d = x; d < number; d++){
        palabrasEnpantalla.push(palabras[d]);
        //cont++;
    }
    //return palabrasEnpantalla;
}

function createWave(y){
    //for(let i = 0; i < palabras.length; i++){
    if (y < number){
        //console.log(x);
        spawnOWP('owp',palabras[y]);
        x++;
       // console.log(arraypalabras);
    }
    else{
        clearInterval(enemies.timer);
       
        console.log( arraypalabras);
       /* for(let i = 0; i< palabrasEnpantalla.length; i++){
            console.log(palabrasEnpantalla[i].text);
        }*/
        number = number + 5;
        //x = 0;
        contwaves++;
        checker = true;
        //console.log()
    }
    
}

function palabrasEmpty(){
    /*for(let i = 0; i< arraypalabras.length; i++){
        if(arraypalabras[i] != null){
            return false;
        }
    }*/
    if (enemies.length == 0){
        return true;
    }
    else return false;
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
    game.physics.arcade.moveToXY(urgapalabra, player.x + (player.width/2) + (tangente*distancia), player.y + urga.width, 30);
    //console.log("tangente*distancia= " ,tangente*distancia , tangente, distancia);
}

function wordFollowsenemie() {
    for(let i = 0; i < arraypalabras.length; i++){
        if (arraypalabras[i].length != 0 ){
            console.log(arraypalabras[i]);
            game.physics.arcade.moveToXY(arraypalabras[i], arrayOwps[i].x, arrayOwps[i].y + arrayOwps[i].width, 30);
        }
    }
    
}

function gameUpdate(){

    //wordFollowsenemie();
    if (checkOverlap(player , enemies) && checker){
        gameOver();
    }

    if (!checker ){
        getWordsInScreen();
        enemies.timer = setInterval(() => {
            createWave(x);
            //x++;
        }, T);;
    }
    
    game.add.text(150, 10, puntos, style);
    checker = true;



}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function gameOver(){
    //console.log("pedroflop");
    reset();
    game.state.start('menu');
    
}

function keyPress(char){

    if (activeword == -1){
        for(let i = 0; i < arraypalabras.length; i++){
            if(arraypalabras[i] != null && arraypalabras[i].text.charAt(0) == char){
                activeletter++;
                activeword = i;
                //console.log(arraypalabras[i].text.charAt(activeletter));
                arraypalabras[activeword].addColor("#000000", 0);
                arraypalabras[activeword].addColor("#ff0000", activeletter);
                puntos++;
                break;
            }
        }
    }
    else if (arraypalabras[activeword].text.charAt(activeletter) == char){
        //console.log(arraypalabras[0].text.charAt(activeletter));
        arraypalabras[activeword].addColor("#000000", activeletter);
        arraypalabras[activeword].addColor("#ff0000", activeletter + 1);
        puntos++;
        activeletter++;
       
    }
    if ( activeword != -1 && arraypalabras[activeword].text.length  == activeletter){
        arraypalabras[activeword].destroy();
        arrayOwps[activeword].destroy();
        activeword = -1;
        activeletter = 0;

        //console.log(arraypalabras);
        if (palabrasEmpty() && contwaves <= waves){
            getWordsInScreen();
            enemies.timer = setInterval(() => {
                console.log(x);
                createWave(x);
                //x++;
            }, T);;
            //contwaves++;
            if(contwaves == waves && x == palabras.length){
                winGame();
                
            }
        }
    }

    //console.log(char, contwaves, x);
}

function winGame(){
    reset();
    game.state.start('main2');
}

function reset(){
    arraypalabras = [];
    arrayOwps = [];
    activeword = -1;
    activeletter = 0;
    checker = false;
    number = 5;
    x = 0;
    contwaves = 0;
}

//JSON
function almacenaPalabra1(palabra, size3)
{
    if(size3 == 1)
    {
        palabras.push(palabra);
    }
    /*else if(size3 == 2)
    {
        waves = palabra;
    }*/
    
}