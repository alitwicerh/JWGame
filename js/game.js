
var game = new Phaser.Game(600, 800, Phaser.AUTO, 'game');
let palabras;
let active;
let enemies;
let spawn;
let urga;
let player;
let urgapalabra;
var style = { font: "bold 32px Arial", fill: "#fff", backgroundColor: "#000"};
var styleActive ={ font: "bold 20px Arial", fill: "#FFAA00", backgroundColor: "#000"};
var arraypalabras = [];
var arrayOwps = [];
let inicio;
let activeword = -1;
let activeletter = 0;


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

    game.input.keyboard.addCallbacks(this, null, null, keyPress);


    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0,0,600,800);
    game.add.image(0,0,'fondo');

    player = game.add.image(260,730,'player');
    player.scale.setTo(0.04,0.04);
    game.physics.arcade.enable(player);

    enemies = game.add.group();
    enemies.enableBody = true;
    game.physics.arcade.enable(enemies);



    //palabras = game.add.group();
   

    function spawn(image, palabra){
        urga = enemies.create(Phaser.Math.between(0,600),10,image);
        urga.scale.setTo(0.05,0.05);
        arrayOwps.push(urga);

        urgapalabra = game.add.text(urga.x,urga.y + urga.width,palabra, style);
        urgapalabra.enableBody = true;
        game.physics.arcade.enable(urgapalabra);
        arraypalabras.push(urgapalabra);
        console.log(arraypalabras[0]);

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
    spawn('owp', 'pedroflop');


    cursors = game.input.keyboard.createCursorKeys();

}

function enemyFollows() {

    
}

function gameUpdate(){
    //for(urgapalabra in urgapalabra){
        game.physics.arcade.moveToXY(arraypalabras[0], arrayOwps[0].x, arrayOwps[0].y + arrayOwps[0].width, 30);
   // }



}

function keyPress(char){
    //inicio = char;

    if (activeword == -1){
        for(let i = 0; i < arraypalabras.length; i++){
            if(arraypalabras[0].text.charAt(0) == char){
                activeletter++;
                console.log(arraypalabras[0].text.charAt(activeletter));
                arraypalabras[0].addColor("#000000", 0);
                arraypalabras[0].addColor("#ff0000", activeletter);
                activeword = i;
                break;
            }
        }
    }
    else if (arraypalabras[activeword].text.charAt(activeletter) == char){
        console.log(arraypalabras[0].text.charAt(activeletter));
        arraypalabras[activeword].addColor("#000000", activeletter);
        arraypalabras[activeword].addColor("#ff0000", activeletter + 1);
        activeletter++;
    }
    else{
        //cuando fallas /cambiar active word a -1
        // bombardear la palabra
    }
}