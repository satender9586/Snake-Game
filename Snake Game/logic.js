const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")

let fooX, foody;
let snax=5, snaky=10;
let snakeBody = [];
let velocityX = 0, velocity=0;
let gameover =false;
let setInterid;
let score = 0;

let highscore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText =`High Score : ${highscore}`
   


const changeFoodPosition = ()=>{
    fooX = Math.floor(Math.random()*30) + 1;
    foody = Math.floor(Math.random() * 30) + 1;
    console.log(fooX, foody)
}
const handleGameover = ()=>{
    clearInterval(setInterid)
    alert(`Game Over: This is your score : ${score}`)
    location.reload();
}

const changeDirection = (e)=>{
    if(e.key==="ArrowUp" && velocity != 1){
        velocityX = 0;
        velocity = -1;
    }else if(e.key === "ArrowDown" && velocity != -1){
        velocityX = 0;
        velocity = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocity = 0;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocity = 0
    }
    initGame()
}

const initGame = () =>{
    if(gameover) return handleGameover();
    let htmlMakup =`<div class="food" style="grid-area: ${foody}/ ${fooX}"></div>`
    
    if(snax === fooX && snaky === foody){
        changeFoodPosition();
        snakeBody.push([fooX, foody])
        score ++ ;

        highscore = score>= highscore ? score : highscore;
        localStorage.setItem("high-score", highscore)

        scoreElement.innerText =`Score : ${score}`
        highScoreElement.innerText =`High Score : ${highscore}`
    }
    if(snax < 0 || snax > 30 || snaky < 0 || snaky > 30){
        gameover = true;
    }

    

    for(let i= snakeBody.length-1 ; i > 0; i--){
        snakeBody[i] = snakeBody[i -1]
    }

    snakeBody[0] = [snax, snaky]
    for(let i=0; i< snakeBody.length ; i++){
        htmlMakup +=`<div class="head" style="grid-area: ${snakeBody[i][1]}/ ${snakeBody[i][0]}"></div>`
        
       
    
    }

    snax += velocityX;
    snaky += velocity;
   
    playBoard.innerHTML=htmlMakup;
    
}

changeFoodPosition();
setInterid =setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection)