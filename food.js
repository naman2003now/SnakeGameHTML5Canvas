export class Food{
    constructor(gridSize){
        this.gridSize = gridSize
        this.position = {x: Math.floor(gridSize.x * Math.random()), y: Math.floor(gridSize.y * Math.random())}
    }

    compare = (elements) => {
        console.log(elements)
        elements.forEach((element) => {
            // These objects are undefined 😭 
            console.log("x: " + toString(element.x) + ", " + toString(this.position.x))
            console.log("y: " + toString(element.y) + ", " + toString(this.position.y))
            if(toString(element.x) == toString(this.position.x) && toString(element.y) == toString(this.position.y)){
                return true
            }
        });
        return false
    }

    relocate = (elements) => {

        // I know I will be able to find some kind of work around... but I wanna know why is this is not working
        // Goal is that if the location of food is equal to one of the elements in the snake's tail generate a new position of food
        while(elements.includes(this.position)){
        // while(this.compare(elements)){
            this.position = {x: Math.floor(this.gridSize.x * Math.random()), y: Math.floor(this.gridSize.y * Math.random())}
        }
    }

}