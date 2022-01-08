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
        this.scoreBoard = settings.scoreBoard
        this.availableForEvents = true
        this.playing = true
    }

    drawRect = (coordinates, color) => {
        let x = coordinates.x * this.resolution.x / this.gridsize.x
        let y = coordinates.y * this.resolution.y / this.gridsize.y
        this.context.fillStyle = color
        this.context.fillRect(x + 2, y + 2, (this.resolution.x/this.gridsize.x) - 4, (this.resolution.y/this.gridsize.y) - 4)
    }
waw
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
        if(this.playing){
            this.availableForEvents = true
            this.snake.update()
            if(this.snake.check(this.gridsize, this.food)){
                this.snake = new Snake();
            }
            this.draw()
            this.scoreBoard.innerHTML = "Score: " + this.snake.elements.length
        }
    }

    togglePause = () => {
        console.log("Toggle Pause")
        this.playing = !this.playing
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

