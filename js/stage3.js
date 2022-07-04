let stage3State = {
    preload: loadAssets3,
    create: initialiseGame3,
    update: gameUpdate3
};

//Variables
let checker3 = false;
let introEscondida = false;
let palabraAhorcado;
let textoPalabraAhorcado;
let palabraVacia = "__________";
let intentos = "";
let textoIntentos;
let introduccion;
let guess;
let guessAnterior = palabraVacia;
let letraNueva = true;

//JSON
let palabra3;
let palabrasPartC = [];
let size3;
let datosJ3;
//JSON

function loadAssets3()
{
    game.load.image('fondo','assets/imgs/Space.png');
    game.load.image('player3','assets/imgs/player.png');
    game.load.image('fangenerator','assets/imgs/FanGenerator.png');
    
    //JSON
    game.load.text('datos', 'partA.json', true);
    //JSON
}

function initialiseGame3()
{
    game.input.keyboard.addCallbacks(this, null, null, keyPress3);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0,0,600,800);
    game.add.image(0,0,'fondo');

    player3 = game.add.image(250,700,'player3');
    player3.scale.setTo(0.06,0.06);
    player3.x = (game.world.width/2 - player3.width/2)
    player3.enableBody = true;
    game.physics.enable(player3,Phaser.Physics.ARCADE);

    enemy3 = game.add.image(260,-300,'fangenerator');
    enemy3.x = (game.world.width/2 - enemy3.width/2)
    enemy3.enableBody = true;
    game.physics.enable(enemy3,Phaser.Physics.ARCADE);

    introduccion = game.add.text(0, 400, "This is a hangman of 10 letters", style);
    introduccion.x = (game.world.width/2 - introduccion.width/2);
    
    //JSON
    datosJ3 = JSON.parse(game.cache.getText('datos'));
    datosJ3.words.partC.p.forEach(p => almacenaPalabra3(p, 5));
    //JSON

    eligePalabra();
}

function gameUpdate3()
{
    if(checkOverlap3(player3 , enemy3) && checker3){
        //gameOver2();
        console.log('lose');
    }
    checker3 = true;
}


function keyPress3(char)
{
    for(let i = 0; i < intentos.length; i++)
    {
        if(intentos[i] != " ")
        {
            if(char != intentos[i])
            {
                letraNueva = true;
            }
            else
            {
                letraNueva = false;
                break;
            }
        }
    }
    console.log(letraNueva);

    if(letraNueva == false)
    {
        for(let i = 0; i < palabraVacia.length; i++)
        {
            if(palabraVacia[i] != "_")
            {
                if(char != palabraVacia[i])
                {
                    letraNueva = true;
                }
                else
                {
                    letraNueva = false;
                    break;
                }
            }
        }
    }

    if(letraNueva)
    {
        if(introEscondida == false)
        {
            introduccion.destroy();
            introEscondida = true;
        }

        let letraEncontrada = false;
        guess = "";

        for(let i = 0; i < palabraAhorcado.length; i++)
        {
            if(char == palabraAhorcado[i])
            {
                guess += char;
                letraEncontrada = true;
            }
            else
            {
                guess += "_";
            }
        }

        if(letraEncontrada == false)
        {
            intentos += char + " ";
            textoIntentos.destroy();
            textoIntentos = game.add.text(20, 700, intentos, style);
            enemy3.y += 50;
        }

        if(letraEncontrada)
        {
            comporbarGuess();
            actualizaPalabra();
        }
    }
    letraNueva = false;
}

function checkOverlap3(spriteA, spriteB)
{
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function eligePalabra()
{
    var rand = game.rnd.integerInRange(0, palabrasPartC.length-1);
    palabraAhorcado = palabrasPartC[rand];
    textoPalabraAhorcado = game.add.text(400, 700, palabraVacia, style);
    textoIntentos = game.add.text(20, 700, intentos, style);
    console.log(palabraAhorcado);
}

function comporbarGuess()
{
    palabraVacia = "";

    for(let i = 0; i < palabraAhorcado.length; i++)
    {
        if(guess[i] != "_" || guessAnterior[i] != "_")
        {
            if(guess[i] != "_")
            {
                palabraVacia += guess[i];
            }
            if(guessAnterior[i] != "_")
            {
                palabraVacia += guessAnterior[i];
            }
        }
        if(guess[i] == "_" && guessAnterior[i] == "_")
        {
            palabraVacia += "_";
        }
    }
    guessAnterior = palabraVacia;
}

function actualizaPalabra()
{
    textoPalabraAhorcado.destroy();
    textoPalabraAhorcado = game.add.text(400, 700, palabraVacia, style);
}

//JSON
function almacenaPalabra3(palabra3, size3)
{
    if(size3 == 5)
    {
        palabrasPartC.push(palabra3);
    }
}