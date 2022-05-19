let stage1State = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

//Variables

function loadAssets(){
    //game.load.image...
}

function initialiseGame(){

}

function gameUpdate(){

}

function startGame(){
    game.input.keyboard.addCallbacks(this, null, null, keyPress); //Lee las teclas y hace el metodo keyPress
}

//Le tienes que pasar el argumento char, que es la letra que has escrito
function keyPress(char){
    
}