let lastrenderTime = 0
let speed = 1
let grid = document.querySelector('.container')
const snakeBody = [{x:5, y:5},{x:5, y:5},{x:5, y:5}]
let inputDirection = { x:0, y:0}
let lastInputDirection = { x:0, y:0}
const food = { x:10, y:10}
let z = 0
let scoreNumber = 0
let score = document.querySelector('.scoreR')
let f = document.querySelector('food')


function main(x){
    if(z == 1){
        const game = document.createElement('div')
        game.classList.add("gameover")
        game.innerText = "GameOver\n"+ scoreNumber 
        grid.appendChild(game)
        setTimeout(function(){
            game.style.fontSize = "1500%"
            game.style.transition = "all 1s"
        })
        return}
    window.requestAnimationFrame(main)
    const secondSinceLastRender = (x - lastrenderTime)/200
    if(secondSinceLastRender < 1/speed){ return}
    lastrenderTime = x

    updateFood()
    update()
    draw()
    drawFood()

}


let inter = setInterval(window.requestAnimationFrame(main), 1000)




function draw(){
    grid.innerHTML = ''
    snakeBody.forEach(element => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = element.y
        snakeElement.style.gridColumnStart = element.x
        snakeElement.classList.add('snakePart')
        grid.appendChild(snakeElement)
    });
    
}
function update(){  
    const direction = getInputDirection()
    for(let i = 3; i<snakeBody.length; i++){
        if(snakeBody[0].x == snakeBody[i].x && snakeBody[0].y == snakeBody[i].y){
            return gameOver()
        }
    }
    if(sortieGrid()){ 
        return gameOver()
    }
    for (let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
    snakeBody[0].x += direction.x
    snakeBody[0].y += direction.y
}


function getInputDirection(){
    lastInputDirection = inputDirection
    return inputDirection
}

window.addEventListener("keydown", function(e){
    switch(e.key){
        case "ArrowUp": if(lastInputDirection.y !== 1) {inputDirection = {x: 0, y:-1};} break;
        case "ArrowLeft": if(lastInputDirection.x !== 1) {inputDirection = {x: -1, y:0}}; break;
        case "ArrowRight": if(lastInputDirection.x !== -1) {inputDirection = {x: 1, y:0}}; break;
        case "ArrowDown": if(lastInputDirection.y !== -1) {inputDirection = {x: 0, y:1}}; break;
    }
})
let positionFoodL = 0
let positionFoodT = 0
function drawFood(){
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add("food")
    grid.appendChild(foodElement)
    positionFoodL = foodElement.offsetLeft
    positionFoodT = foodElement.offsetTop
}
let positionRandomX
let positionRandomY

function updateFood(){
    if(snakeBody[0].x == food.x && snakeBody[0].y == food.y){
        let j = 0;

        do{
            j = 0
            positionRandomX = Math.floor((Math.random())*20 +1)
            positionRandomY = Math.floor((Math.random())*20 +1)
            let arr = [{x : 0, y : 0}]
            arr[0].x = positionRandomX
            arr[0].y = positionRandomY
            for(let i = 0; i< snakeBody.length; i++){
                if(snakeBody[i].x == arr[0].x && snakeBody[i].y == arr[0].y){
                    j += 1
                } 
            }
        }while(j !=0)
        scoreNumber += 1
        score.innerText = scoreNumber
        circle()
        food.x = positionRandomX
        food.y = positionRandomY
        expandSnake()
        speed += 0.05
    }
}
function expandSnake (){
    snakeBody[snakeBody.length] = snakeBody[snakeBody.length - 1]
}
function sortieGrid(){
    return(snakeBody[0].x <1 || snakeBody[0].x > 20 || snakeBody[0].y <1 || snakeBody[0].y > 20)
}
function gameOver(){
    clearInterval(inter)
    z=1
}
function circle(){
    let positionGridL = grid.offsetLeft
    let positionGridT = grid.offsetTop
    const cir = document.createElement('div');
    cir.classList.add('circle')
    document.body.appendChild(cir)
    cir.style.left = positionGridL + positionFoodL + "px"
    cir.style.top = positionGridT + positionFoodT + "px"
    setTimeout(function(){
        cir.style.transition = "transform 0.4s, opacity 0.4s"
        cir.style.opacity = '0'       
        cir.style.transform = 'scale(3)'       
    },0)

    setTimeout(function(){
        cir.remove()
    }, 1000)
}


