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
let arraypalabras2 = [];
let arrayOwps2 = [];
let activeword2 = -1;
let activeletter2 = 0;
let  checker2 = false;
let maxforWave = 5;
let x2 = 0;
let contwaves2 = 0;
let rnde;
let waves2 = 3;
let letras2 = [/*'h','b','c','d','f','w','e','q'*/];
let numberletterstospawn = 4;
let numberletterstospawn2 = 4;
let palabrasFangenerator = [/*'stimulation', 'linternation'*/];
let palabrasOWPReplicator = [/*'computer', 'juegosweb'*/ ];
let palabras2 = [/*'pedroflop', 'adrianaflop', 'izanflop', 'urga', 'ejhgs', 'nuriolachola', 'lola', 'meme', 'titi', 'chula','fabulous', 'sharpay', 'orto', 'hebe','yolo', 'polo', 'wapo'*/];
let generateFan = 0;
let generateMin = 0;
let generateOWPReplicator = 0;
let generateletters = 0;
let cont = 0;
let cont2 = 0;
let angulo = -45;
let angulo2 = -45;
let rate2 = 1;


function loadAssets2(){
    game.load.image('fondo','assets/imgs/Space.png');
    game.load.image('player','assets/imgs/OWPReplicator.png');
    game.load.spritesheet('owp2','assets/imgs/asteroide.png');
    game.load.text('info', 'partA.json', true);
    game.load.image('fangenerator','assets/imgs/FanGenerator.png');
    game.load.spritesheet('owpreplicator','assets/imgs/player.png');
}

function initialiseGame2(){
    levelConfig = JSON.parse(game.cache.getText('info'));
    levelConfig.words.medium2.p.forEach(p => almacenaPalabra2(p, 1));
    levelConfig.words.short.p.forEach(p => almacenaPalabra2(p, 2));
    levelConfig.words.large.p.forEach(p => almacenaPalabra2(p, 3));
    levelConfig.words.extralarge.p.forEach(p => almacenaPalabra2(p, 4));
    

    game.input.keyboard.addCallbacks(this, null, null, keyPress2);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0,0,600,800);
    game.add.image(0,0,'fondo');

    player = game.add.image(260,700,'player');
    player.scale.setTo(0.2,0.2);
    player.enableBody = true;
    game.physics.enable(player,Phaser.Physics.ARCADE);

    enemies2 = game.add.group();
    enemies2.enableBody = true;
    game.physics.arcade.enable(enemies2);

    enemiesMin = game.add.group();
    enemiesMin.enableBody = true;
    game.physics.arcade.enable(enemiesMin);
    game.add.text(10, 10, 'Puntos:', style);
    

    cursors = game.input.keyboard.createCursorKeys();


}

function gameUpdate2(){
    if (checkOverlap2(player , enemies2) && checker2 ){
        gameOver2();
        console.log('loose');
    }
    if (checkOverlap2(player , enemiesMin) && checker2 ){
        gameOver2();
        console.log('loose');
    }

    enemiesMin.forEach(element => {
        if ((0 > element.x || element.x > 800 || element.y > 600) && checker2){
            element.destroy();
            console.log('destruyo');
        }
    });

    if (!checker2 ){
        getWordsInScreen2();
        enemies2.timer = setInterval(() => {
            createWave2(x2);
            //x++;
        }, 1000/rate2);;
    }
    
    game.add.text(150, 10, puntos, style);
   checker2 = true;



}

function spawnOWP2(image, palabra){
    urga = enemies2.create(Phaser.Math.between(100,500),50,image);
    if (image == 'fangenerator'){ urga.scale.setTo(0.2,0.2);}
    else if (image == 'owpreplicator'){ 
        urga.scale.setTo(0.2,0.2);
    }
    else {
        urga.scale.setTo(0.06,0.06);
    }
    arrayOwps2.push(urga);

    let urgapalabra = game.add.text(urga.x,urga.y + urga.width,palabra, style);
    urgapalabra.enableBody = true;
    game.physics.arcade.enable(urgapalabra);
    arraypalabras2.push(urgapalabra);

    urga.body.bounce.x = urga.body.bounce.y = 1;
    urga.body.setBounds = Phaser.CANVAS.x, Phaser.CANVAS.y;
    urga.enableBody = true;

    let anguloG = Phaser.Math.between(-10,10);
    let tangente = Math.tan(anguloG*Math.PI/180);
    let distancia = Phaser.Math.distance(urga.x,urga.y, player.x, player.y);

    game.physics.arcade.moveToXY(urga, player.x + (player.width/2) + (tangente*distancia), player.y + 100, 10 );
    game.physics.arcade.moveToXY(urgapalabra, player.x + (player.width/2) + (tangente*distancia), player.y + urga.width, 10);
    
    if (image == 'owpreplicator'){
        if (cont2 == numberletterstospawn) {numberletterstospawn += 4;}
        urgapalabra.timer = setInterval(() => {
            if (cont2 < numberletterstospawn){
                spawnOwpFromGenerator2(urga.x + urga.width/2,urga.y + urga.height/2, palabras2[cont2], angulo2, anguloG);
                cont2++; 
                generateMin++;
                angulo2 += 15;
            }else{
                clearInterval( urgapalabra.timer);
                angulo2 = -45;
                
            }
        }, 1000/5);;
        //numberletterstospawn += 4;
    }
    else if (image == 'fangenerator'){
        if (cont == numberletterstospawn2) {numberletterstospawn2 += 4;}
        urga.timer = setInterval(() => {
            if (cont < numberletterstospawn2){
                spawnOwpFromGenerator2(urga.x + urga.width/2,urga.y + urga.height/2, letras2[cont], angulo, anguloG);
                cont++; 
                angulo += 15;
            }else{
                clearInterval(urga.timer);
                angulo = -45;
                
                //numberletterstospawn2 += 4;
            }
        }, 1000/5);;
        //numberletterstospawn2 += 4;
    }
    

}

function spawnOwpFromGenerator2( x, y, palabra, angle, anguloG){
    
    let urgaMin = enemiesMin.create(x, y,'owp2');
    urgaMin.scale.setTo(0.05,0.05);
    arrayOwps2.push(urgaMin);

    urgapalabra = game.add.text(urgaMin.x,urgaMin.y + urgaMin.width,palabra, style);
    urgapalabra.enableBody = true;
    game.physics.arcade.enable(urgapalabra);
    arraypalabras2.push(urgapalabra);

    let tangent = Math.tan((anguloG - angle)*Math.PI/180);
    let distan = Phaser.Math.distance(urgaMin.x,urgaMin.y, player.x, player.y);
    let h = tangent*distan;

   //if (angle < 0){
    game.physics.arcade.moveToXY(urgaMin, 300 + h, distan + 50, 60);
    game.physics.arcade.moveToXY(urgapalabra, 300 + h, distan + 50 + urgaMin.width, 60);
   // }
   console.log(angle,tangent, 300 + h, distan + 50);
 
}

function chooseRndEnemy(y2){
    console.log(contwaves2);
    if (contwaves2 > 1){
        if (y2 == maxforWave - 3){
            spawnOWP2('fangenerator', palabrasFangenerator[generateFan]);
            generateFan++;
        }
        else if (y2 == maxforWave -1){
            spawnOWP2('owpreplicator', palabrasOWPReplicator[generateOWPReplicator]);
            generateOWPReplicator++;
        }
        else spawnOWP2('owp2', palabras2[generateMin]); generateMin++;
    }
    else { 
        if (y2 == maxforWave - 2) {
            if (contwaves2 == 0) {
                spawnOWP2('fangenerator', palabrasFangenerator[generateFan]);
                generateFan++;
            }
            else if (contwaves2 == 1){
                spawnOWP2('owpreplicator', palabrasOWPReplicator[generateOWPReplicator]);
                generateOWPReplicator++;
            }
        }
        else{
            spawnOWP2('owp2', palabras2[generateMin]); generateMin++; 
        }
    }
    
    /*if(rnde < 2) rnde = 2;
    else rnde = game.rnd.integerInRange(0,2);
    console.log(rnde);
    switch (rnde){
        case 0:  if (generateFan < palabrasFangenerator.length && cont != numberletterstospawn) {
                    spawnOWP2('fangenerator', palabrasFangenerator[generateFan]); generateFan++;
                    break;
                }
                else rnde = 2;

        case 1:  if (generateFan < palabrasFangenerator.length) {
                    spawnOWP2('OWPReplicator', palabrasOWPReplicator[generateOWPReplicator]);generateOWPReplicator++;
                    break;
                 }
                else rnde = 2;

        case 2:  if ( generateMin < palabras2.length){
                    spawnOWP2('owp', palabras2[generateMin]); generateMin++;
                    break;
                }
                 
    }*/

}


function createWave2(y2){
    if (y2 < maxforWave){
        
        chooseRndEnemy(y2);
        x2++;
       
    }
    else{
        clearInterval(enemies2.timer);
       
        maxforWave+=5;
        contwaves2++;
        checker2 = true;
        
    }
    
}

function getWordsInScreen2(){
    //palabrasEnpantalla2 = [];
    arraypalabras2 = [];
    arrayOwps2 = [];
   // let cont = 0;
    /*for (let d = x; d < number; d++){
        palabrasEnpantalla2.push(palabras2[d]);
        //cont++;
    }*/
    //return palabrasEnpantalla;
}

function keyPress2(char){
    if (activeword2 == -1){
        for(let i = 0; i < arraypalabras2.length; i++){
            if([i] != null && arraypalabras2[i].text.charAt(0) == char){
                activeletter2++;
                activeword2 = i;
                //console.log([i].text.charAt(activeletter));
                arraypalabras2[activeword2].addColor("#000000", 0);
                arraypalabras2[activeword2].addColor("#ff0000", activeletter2);
                puntos++;
                break;
            }
        }
    }
    else if (arraypalabras2[activeword2].text.charAt(activeletter2) == char){
        //console.log([0].text.charAt(activeletter));
        arraypalabras2[activeword2].addColor("#000000", activeletter2);
        arraypalabras2[activeword2].addColor("#ff0000", activeletter2 + 1);
        activeletter2++;
        puntos++;
       
    }
    if ( activeword2 != -1 && arraypalabras2[activeword2].text.length  == activeletter2){
        arraypalabras2[activeword2].destroy();
        arrayOwps2[activeword2].destroy();
        activeword2 = -1;
        activeletter2 = 0;

        //console.log();
        if (palabrasEmpty2() && contwaves2 < waves2){
            
            getWordsInScreen2();
            enemies2.timer = setInterval(() => {
                //console.log(x);
                createWave2(x2);
                //x++;
            }, 1000/rate2);;
            //contwaves++;
            
        }
        if(contwaves2 == waves2 && palabrasEmpty2()/*&& x2 == palabras2.length*/){
            winGame2();
            console.log('win');
        }
    }

    //console.log(char, contwaves2, x);
}

function palabrasEmpty2(){
    
    if (enemies2.length == 0){
        return true;
    }
    else {
        /*for(let i = 0; i < arraypalabras2.length; i++){
            if(arraypalabras2[i].text.length > 1){
                return false;
            }
        }*/
        return false;
    }
}

function checkOverlap2(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function gameOver2(){

    reset2();
    game.state.start('menu');

}

function winGame2(){
    reset2();
    game.state.start('main3');
}


function reset2(){
    arraypalabras2 = [];
    arrayOwps2 = [];
    activeword2 = -1;
    activeletter2 = 0;
    checker2 = false;
    maxforWave = 5;
    x2 = 0;
    contwaves2 = 0;
    rnde = -1;
}

function almacenaPalabra2(palabra, size3)
{
    if(size3 == 1)
    {
        palabras2.push(palabra);
    }
    else if (size3 == 2){
        letras2.push(palabra);

    }
    else if (size3 == 3){
        palabrasOWPReplicator.push(palabra);
    }
    else if (size3 == 4){
        palabrasFangenerator.push(palabra);
    }
}