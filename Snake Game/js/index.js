let direction = {x:0,y:0};
const board = document.querySelector("#board");
const scorebox = document.querySelector('#scoreBox');
const highscoreBox = document.querySelector("#highscoreBox");
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");

let speed = 10  ;
let lastPaintTime = 0;
let snakeArr = [
    {
        x:13,
        y:15
    }
];
let score = 0;
let highScore = 0;
food = {x:6,y:7}
let snakeElement;
let foodElement;
let  inputDir = {x:0,y:0};
//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime -lastPaintTime) / 1000 < 1/speed){
        return
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //snake booms into itself
    for (let index = 1; index < snakeArr.length; index++) {
        if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
            return true;        
        }
    }
    //if snake collides     with boundry of the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y  <= 0)
        return true;  
}
function gameEngine(){
//Part 1: Updating the snake array and food
    if(isCollide(snakeArr)){
     
        gameOverSound.play();
        inputDir =  {x:0,y:0};
            alert("Game over, Press any key to play again!!");
        snakeArr = [
                {
                    x:13,
                    y:15
                    }
                ];          
        score = 0;
        scorebox.innerHTML = "Score: "+score;
    }

//if a snake has eaten food,increement 
    if(snakeArr[0].y == food.y && snakeArr[0].x == food.x){
        score+=1;
        if(score > highScore){
            highScore = score;
            localStorage.setItem("highscore",highScore);
            highscoreBox.innerHTML = "High Score: "+ highScore;
            
        }
        scorebox.innerHTML = "Score :" +score;
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y});
        let  a = 2;
        let  b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()),y:Math.round(a + (b-a)* Math.random())}
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
//Part 2: Display snake and food
//Display snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{

    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    
    if(index == 0){
        snakeElement.classList.add('head');
    }else {
        snakeElement.classList.add('snake');
    }        
    board.appendChild(snakeElement);
})
foodElement = document.createElement('div');
foodElement.style.gridRowStart = food.y;
foodElement.style.gridColumnStart = food.x;
foodElement.classList.add('food')
board.appendChild(foodElement);
}
//Main logic starts  here
highScore = localStorage.getItem("highscore");
//console.log(highScore);
if(highScore === null){
    highscoreBox.innerHTML = "High Score: 0";    
}else {
    highscoreBox.innerHTML = "High Score: "+ highScore;
}

window.requestAnimationFrame(main);

window.addEventListener ('keydown',(e) =>{
    
    inputDir = {x:0,y:1};  
    //console.log(e.key);
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    
    }
    //console.log(inputDir);
})