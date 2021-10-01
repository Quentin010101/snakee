let lastrenderTime = 0
let speed = 1
let grid = document.querySelector('.container')
const snakeBody = [{x:5, y:5},{x:5, y:5},{x:5, y:5}]
let inputDirection = { x:0, y:0}
let lastInputDirection = { x:0, y:0}
const food = { x:10, y:10}

function main(x){
    window.requestAnimationFrame(main)
    const secondSinceLastRender = (x - lastrenderTime)/500
    if(secondSinceLastRender < 1/speed){ return}
    lastrenderTime = x

    updateFood()
    update()
    draw()
    drawFood()
    console.log(snakeBody[0])
    console.log(food)

}


setInterval(window.requestAnimationFrame(main), 1000)




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
    for (let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += direction.x
    snakeBody[0].y += direction.y
    console.log(snakeBody[0].x)
    console.log(snakeBody[0].y)
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

function drawFood(){
    const foodElement = document.createElement('div')
    foodElement.classList.add("food")
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    grid.appendChild(foodElement)
    console.log(food.x + "   " + food.y)
}
let positionRandomX
let positionRandomY
function updateFood(){
    if(snakeBody[0].x == food.x && snakeBody[0].y == food.y){
        let j;
        do{
            j=0
            positionRandomX = Math.floor((Math.random())*20 +1)
            positionRandomY = Math.floor((Math.random())*20 +1)
            let arr = {x:positionRandomX, y:positionRandomY}
            for(let i = 0; i< snakeBody.length; i++){
                if(snakeBody[i] == arr[0]){
                    j += 1
                } 
            }
            food.x = positionRandomX
            food.y = positionRandomY
        }while(j !=0)
        expandSnake()
    }
}
function expandSnake (){
    snakeBody[snakeBody.length] = snakeBody[snakeBody.length - 1]
}