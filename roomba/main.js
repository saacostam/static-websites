const WIDTH = 800;
const HEIGHT = 450;

const SQUARE_WIDTH = 25;
const SQUARE_HEIGHT = 25;

const env = {
    width : WIDTH, 
    height : HEIGHT,
    backgroundColor : '',
}

let SCENE = [];

function buildSand(){
    SCENE = [];

    const squareWidth = SQUARE_WIDTH;
    const squareHeight = SQUARE_HEIGHT;

    const nWidth    = Math.ceil(WIDTH  / squareWidth);
    const nHeight   = Math.ceil(HEIGHT / squareHeight);

    for (let j = 0; j < nHeight; j++){
        let temp = [];
        
        for (let i = 0; i < nWidth; i++){
            const x = squareWidth*i;
            const y = squareHeight*j;

            temp.push( new Sand(x, y, squareWidth, squareHeight) );
        }

        SCENE.push( temp );
    }
}

const ROOMBA = new Roomba(WIDTH/2, HEIGHT/2, 15, env);

function setup(){
    buildSand();
    const canvas = createCanvas(WIDTH, HEIGHT);
    canvas.style('width', '100%');
    canvas.style('height', 'auto');
    background(env.backgroundColor);
}

function update(){
    ROOMBA.update();
    SCENE.forEach( 
        ROW => {
            ROW.forEach(
                AGENT => AGENT.update()
            )
        }
    )
}

function draw(){
    update()
    clear();
    SCENE.forEach(
        ROW => {
            ROW.forEach(
                AGENT => AGENT.draw()
            )
        }
    )
    ROOMBA.draw();
}