import {Snake} from "./snake.js"
import {Food} from "./food.js"

export class Game{
    constructor(settings){
        this.gridsize = settings.gridsize
        this.resolution = {x:settings.canvas.width, y:settings.canvas.height}
        this.colors = settings.colors
        this.context = settings.canvas.getContext("2d")
        this.snake = new Snake()
        this.controls = settings.controls
        this.food = new Food(this.gridsize)
        this.availableForEvents = true
    }

    drawRect = (coordinates, color) => {
        let x = coordinates.x * this.resolution.x / this.gridsize.x
        let y = coordinates.y * this.resolution.y / this.gridsize.y
        this.context.fillStyle = color
        this.context.fillRect(x, y, this.resolution.x/this.gridsize.x, this.resolution.y/this.gridsize.y)
    }

    clear = () => {
        this.context.fillStyle = this.colors.background
        this.context.fillRect(0, 0, this.resolution.x, this.resolution.y)
    }

    draw = () => {
        this.clear()
        this.snake.elements.forEach(element => {
            this.drawRect(element, this.colors.snake)
        });
        this.drawRect(this.food.position, this.colors.food)
    }

    gameLoop = () => {
        this.availableForEvents = true
        this.snake.update()
        if(this.snake.check(this.gridsize, this.food)){
            console.log("GameOver")
        }
        this.draw()
    }

    eventLoop = (event) => {
        if(this.availableForEvents){
            if(this.controls.left.includes(event.which)){
                this.snake.left()   
            }else if(this.controls.right.includes(event.which)){
                this.snake.right()   
            }else if(this.controls.up.includes(event.which)){
                this.snake.up()   
            }else if(this.controls.down.includes(event.which)){
                this.snake.down()   
            }
            this.availableForEvents = false
        }
    }
}

