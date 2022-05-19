let menuState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};



function loadAssets(){
    game.load.image('fondo','/assets/imgs/Space.png');
    game.load.image('stage1Button', '/assets/imgs/buttonA.png');
    game.load.image('stage2Button', '/assets/imgs/buttonB.png');
    game.load.image('stage3Button', '/assets/imgs/buttonC.png');
    game.load.image('aboutButton', '/assets/imgs/buttonAbout.png');
}

function initialiseGame(){
    game.add.image(0,0,'fondo');
    stage1Button = game.add.button(50, 200, 'stage1Button', playStage1, this).scale.setTo(0.1, 0.1);
    stage2Button = game.add.button(250, 200, 'stage2Button', playStage2, this).scale.setTo(0.1, 0.1);
    stage3Button = game.add.button(450, 200, 'stage3Button', playStage3, this).scale.setTo(0.1, 0.1);
    aboutButton = game.add.button(150, 450, 'aboutButton', playAbout, this).scale.setTo(0.3, 0.3);
}

function gameUpdate(){

}

function playStage1(){
    this.state.start('main');
}

function playStage2(){
    this.state.start('main');
}

function playStage3(){
    this.state.start('main');
}

function playAbout(){
    this.state.start('about');
}