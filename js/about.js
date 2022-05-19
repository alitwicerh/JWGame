let aboutState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

function loadAssets(){
    game.load.image('fondo','/assets/imgs/fondoAbout.png');
    game.load.image('backButton', '/assets/imgs/buttonBack.png');
}

function initialiseGame(){
    game.add.image(0,0,'fondo');
    backButton = game.add.button(200, 590, 'backButton', playBack, this).scale.setTo(0.2, 0.2);
}

function gameUpdate(){

}

function playBack(){
    this.state.start('menu');
}