let menuState = {
    preload: loadAssetsm,
    create: initialiseGamem,
    update: gameUpdatem
};
game.state.add("menu", menuState);
game.state.add("main", mainState);
game.state.add("main2", stage2State);
game.state.add("main3", stage3State);
game.state.add("about", aboutState);
game.state.start('menu');

function loadAssetsm(){
    game.load.image('fondo','/assets/imgs/Space.png');
    game.load.image('stage1Button', '/assets/imgs/buttonA.png');
    game.load.image('stage2Button', '/assets/imgs/buttonB.png');
    game.load.image('stage3Button', '/assets/imgs/buttonC.png');
    game.load.image('aboutButton', '/assets/imgs/buttonAbout.png');
}

function initialiseGamem(){
    game.add.image(0,0,'fondo');
    stage1Button = game.add.button(50, 200, 'stage1Button', playStage1, this).scale.setTo(0.1, 0.1);
    stage2Button = game.add.button(250, 200, 'stage2Button', playStage2, this).scale.setTo(0.1, 0.1);
    stage3Button = game.add.button(450, 200, 'stage3Button', playStage3, this).scale.setTo(0.1, 0.1);
    aboutButton = game.add.button(150, 450, 'aboutButton', playAbout, this).scale.setTo(0.3, 0.3);
}

function gameUpdatem(){

}

function playStage1(){
    this.state.start('main');
}

function playStage2(){
    this.state.start('main2');
}

function playStage3(){
    this.state.start('main3');
}

function playAbout(){
    this.state.start('about');
}