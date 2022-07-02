//const { Point } = require("phaser-ce");

//const { Point } = require("phaser-ce");

let stage2State = {
    preload: loadAssets2,
    create: initialiseGame2,
    update: gameUpdate2
};

//game.state.add("main", mainState);
//game.state.add("menu", menuState);
//game.state.add("main2", stage2State);

//Variables
/*arraypalabras = [];
arrayOwps = [];
activeword = -1;
activeletter = 0;
checker = false;
number = 5;
x = 0;
contwaves = 0;*/
let letras2 = ['a','b', 'C', 'D','F'];
let generate = 5;
let orlo = 0;
let angulo = -45;

function loadAssets2(){
    game.load.image('fondo','assets/imgs/Space.png');
    game.load.image('player','assets/imgs/player.png');
    game.load.spritesheet('owp','assets/imgs/asteroide.png');
    //game.load.text('info', 'partA.json');
    game.load.image('fangenerator','assets/imgs/FanGenerator.png');
    //game.load.image('OWPReplicator','assets/imgs/OWPReplicator.png');
}

function initialiseGame2(){
    //levelConfig = JSON.parse(game.cache.getText('info'));

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
    cursors = game.input.keyboard.createCursorKeys();

    spawnOWP2('fangenerator', 'urgapalabra');
    /*urga.timer = setInterval(() => {
        spawnOwpFromGenerator2(300,400, urga, letras[o] );
        o++;
        
    }, 1000/1);;*/

}

function gameUpdate2(){
   /* if (checkOverlap2(player , enemies) && checker){
        gameOver2();
    }

    /*if (!checker ){
        getWordsInScreen();
        enemies.timer = setInterval(() => {
            createWave(x);
            //x++;
        }, T);;
    }*/
    
  // checker = true;


}

function spawnOWP2(image, palabra){
    urga = enemies.create(Phaser.Math.between(0,600),10,image);
    urga.scale.setTo(0.06,0.06);
    arrayOwps.push(urga);

    urgapalabra = game.add.text(urga.x,urga.y + urga.width,palabra, style);
    urgapalabra.enableBody = true;
    game.physics.arcade.enable(urgapalabra);
    arraypalabras.push(urgapalabra);

    urga.body.bounce.x = urga.body.bounce.y = 1;
    urga.body.setBounds = Phaser.CANVAS.x, Phaser.CANVAS.y;
    urga.enableBody = true;
    //console.log("ojhLSHEGWFBLOvs");
    
    

    let angle = Phaser.Math.between(-10,10);
    let tangente = Math.tan(angle*Math.PI/180);
    let distancia = Phaser.Math.distance(urga.x,urga.y, player.x, player.y);
    //console.log("playerpos " ,player.x, player.y);
    //console.log("urgapos " ,urga.x,urga.y);
    game.physics.arcade.moveToXY(urga, player.x + (player.width/2) + (tangente*distancia), player.y + 100, 0.1, 30);
    game.physics.arcade.moveToXY(urgapalabra, player.x + (player.width/2) + (tangente*distancia), player.y + urga.width, 0.1,30);
    //console.log("tangente*distancia= " ,tangente*distancia , tangente, distancia);

    if (image == 'fangenerator'){
        urga.timer = setInterval(() => {
            if (orlo < generate){
                spawnOwpFromGenerator2(300,400, letras2[orlo], angulo);
                orlo++; 
                angulo = angulo +15;
            }else{
                clearInterval(urga.timer);
                angulo = -45;
            }
        }, 1000/1);;
    }

}

function spawnOwpFromGenerator2( x, y, palabra, angle){
    //console.log("YAAAS");
    //if (o < generate){
    let pointr = new Phaser.Point(x,y);
    pointr.rotate(x,y,angle,true);
    let urgaMin = enemies.create(pointr.x, pointr.y,'owp');
    urgaMin.scale.setTo(0.05,0.05);
     arrayOwps.push(urgaMin);

    urgapalabra = game.add.text(urgaMin.x,urgaMin.y + urgaMin.width,palabra, style);
    urgapalabra.enableBody = true;
    game.physics.arcade.enable(urgapalabra);
    arraypalabras.push(urgapalabra);

        //game.physics.arcade.moveToXY(urgaMin, player.x + (player.width/2) + (tangente*distancia), player.y + 100, 30);
        //game.physics.arcade.moveToXY(urgapalabra, player.x + (player.width/2) + (tangente*distancia), player.y + urgaMin.width, 30);
    //game.physics.arcade.velocityFromAngle(angle,30, pointr);
        //urgaMin.rotate(x,y,20);
    //let v = game.physics.arcade.velocityFromAngle(angle,30,pointr);
    

    let tangente = Math.tan(angle*Math.PI/180);
    //CALCULAR
    game.physics.arcade.moveToXY(urgaMin, angle , tangente);
    console.log(angle, tangente);
    //angle = angle + 15;
    //}
}

/*function getWordsInScreen2(){
    palabrasEnpantalla = [];
    arraypalabras = [];
    arrayOwps = [];
   // let cont = 0;
    for (let d = x; d < number; d++){
        palabrasEnpantalla.push(palabras[d]);
        //cont++;
    }
    //return palabrasEnpantalla;
}*/

/*nction createWave(y){
    //for(let i = 0; i < palabras.length; i++){
    if (y < number){
        console.log(x);
        spawnOWP2('owp',palabras[y]);
        x++;
       // console.log(arraypalabras);
    }
    /*else if (x < palabras.length && palabrasEmpty()) {
        //clearInterval(enemies.timer);
        //x = 0;
        number = number*2;
    }*/
   /* else{
        clearInterval(enemies.timer);
       
        console.log( arraypalabras);
       /* for(let i = 0; i< palabrasEnpantalla.length; i++){
            console.log(palabrasEnpantalla[i].text);
        }*/
       /* number = number + 5;
        //x = 0;
        contwaves++;
        checker = true;
        //console.log()
    }
    
}*/

//Le tienes que pasar el argumento char, que es la letra que has escrito
//function keyPress(char){
    /*if (activeword == -1){
        for(let i = 0; i < arraypalabras.length; i++){
            if(arraypalabras[i] != null && arraypalabras[i].text.charAt(0) == char){
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
    if ( activeword != -1 && arraypalabras[activeword].text.length  == activeletter){
        arraypalabras[activeword].destroy();
        arrayOwps[activeword].destroy();
        activeword = -1;
        activeletter = 0;

        //console.log(arraypalabras);
        if (palabrasEmpty() && contwaves <= waves){
            getWordsInScreen2();
            /*enemies.timer = setInterval(() => {
                console.log(x);
                createWave(x);
                //x++;
            }, T);;*/
            //contwaves++;
            /*if(contwaves == waves && x == palabras.length){
                winGame2();
                
            }
        }
    }

    console.log(char, contwaves, x);
}*/

/*function checkOverlap2(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}*/

/*function gameOver2(){

    reset2();
    game.state.start('menu');

}

function winGame2(){
    reset2();
    game.state.start('menu');
}


function reset2(){
    arraypalabras = [];
    arrayOwps = [];
    activeword = -1;
    activeletter = 0;
    checker = false;
    number = 5;
    x = 0;
    contwaves = 0;
}*/