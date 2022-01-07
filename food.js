export class Food{
    constructor(gridSize){
        this.gridSize = gridSize
        this.position = {x: Math.floor(gridSize.x * Math.random()), y: Math.floor(gridSize.x * Math.random())}
    }

    relocate = (snake) => {
        while(snake.elements.include(this.position)){
            this.position = {x: Math.floor(gridSize.x * Math.random()), y: Math.floor(gridSize.x * Math.random())}
        }
    }
}