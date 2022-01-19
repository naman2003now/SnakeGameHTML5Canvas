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

    clear = () => {
        this.context.fillStyle = this.colors.background
        this.context.fillRect(0, 0, this.resolution.x, this.resolution.y)
    }

    draw = () => {
        this.snake.elements.forEach(element => {
            this.drawRect(element, this.colors.snake)
        });
        this.drawRect(this.food.position, this.colors.food)
    }

    nextMove = () => {
        let pathQueue = []
        let checkedLocation = []
        if(this.check(this.gridsize, {x:this.snake.elements[0].x + 1, y:this.snake.elements[0].y})){
            pathQueue.push({path:'r', weight:1})
        }
        if(this.check(this.gridsize, {x:this.snake.elements[0].x, y:this.snake.elements[0].y + 1})){
            pathQueue.push({path:'d', weight:1})
        }
        if(this.check(this.gridsize, {x:this.snake.elements[0].x, y:this.snake.elements[0].y - 1})){
            pathQueue.push({path:'u', weight:1})
        }
        if(this.check(this.gridsize, {x:this.snake.elements[0].x - 1, y:this.snake.elements[0].y})){
            pathQueue.push({path:'l', weight:1})
        }
        while(pathQueue.length != 0){
            let min = 1000000000
            let pathIndex = 0
            let currentPath = 0
            for(let i = 0; i < pathQueue.length; i++){
                let element = pathQueue[i]
                if(min > element.weight){
                    currentPath = element.path
                    min = element.weight
                    pathIndex = i
                }
            }
            pathQueue.splice(pathIndex, 1)
            let currentLocation = {x: this.snake.elements[0].x, y: this.snake.elements[0].y}
            for(let i = 0; i < currentPath.length; i++){
                switch(currentPath[i]){
                case 'r':
                    currentLocation.x += 1
                    break
                case 'l':
                    currentLocation.x -= 1
                    break
                case 'u':
                    currentLocation.y -= 1
                    break
                case 'd':
                    currentLocation.y += 1
                    break
                }
            }
            this.drawRect(currentLocation, "rgb(51, 53 , 51)")
            if(currentLocation.x == this.food.position.x && currentLocation.y == this.food.position.y){
                this.snake.direction = currentPath[0]
                return currentPath
            }
            if(this.check(this.gridsize, {x:currentLocation.x + 1, y:currentLocation.y}) && !checkedLocation.some((element) => (currentLocation.x == element.x && currentLocation.y == element.y))){
                pathQueue.push({path: currentPath + 'r', weight: Math.abs(currentLocation.x - this.food.position.x) + Math.abs(currentLocation.y - this.food.position.y)})
            }
            if(this.check(this.gridsize, {x:currentLocation.x, y:currentLocation.y + 1}) && !checkedLocation.some((element) => (currentLocation.x == element.x && currentLocation.y == element.y))){
                pathQueue.push({path: currentPath + 'd', weight: Math.abs(currentLocation.x - this.food.position.x) + Math.abs(currentLocation.y - this.food.position.y)})
            }
            if(this.check(this.gridsize, {x:currentLocation.x, y:currentLocation.y - 1}) && !checkedLocation.some((element) => (currentLocation.x == element.x && currentLocation.y == element.y))){
                pathQueue.push({path: currentPath + 'u', weight: Math.abs(currentLocation.x - this.food.position.x) + Math.abs(currentLocation.y - this.food.position.y)})
            }
            if(this.check(this.gridsize, {x:currentLocation.x - 1, y:currentLocation.y}) && !checkedLocation.some((element) => (currentLocation.x == element.x && currentLocation.y == element.y))){
                pathQueue.push({path: currentPath + 'l', weight: Math.abs(currentLocation.x - this.food.position.x) + Math.abs(currentLocation.y - this.food.position.y)})
            }
            checkedLocation.push(currentLocation)
        }
        return "randi"
    }

    check = (gridSize, coord) => {

        if(this.snake.elements.slice(1, this.snake.elements.length).some((element) => (coord.x == element.x && coord.y == element.y))){
            return false
        }else if(
            coord.x < 0 || 
            coord.y < 0 ||
            coord.x >= gridSize.x || 
            coord.y >= gridSize.y){

            return false
        }
        return true
    }
    
    colorPath = (path) =>{
        let currentLocation = {x: this.snake.elements[0].x, y: this.snake.elements[0].y}
        for(let i = 0; i < path.length; i++){
            switch(path[i]){
            case 'r':
                currentLocation.x += 1
                break
            case 'l':
                currentLocation.x -= 1
                break
            case 'u':
                currentLocation.y -= 1
                break
            case 'd':
                currentLocation.y += 1
                break
            }
            if(currentLocation.x == this.food.position.x && currentLocation.y == this.food.position.y){
                break
            }
            this.drawRect(currentLocation, "#403255")
        }
        this.drawRect(this.food.position, this.colors.food)
    }

    gameLoop = () => {
        if(this.playing){
            this.clear()
            let V_path = this.nextMove()
            this.colorPath(V_path)
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

