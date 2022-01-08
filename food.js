export class Food{
    constructor(gridSize){
        this.gridSize = gridSize
        this.position = {x: 12, y: 10}
        // this.position = {x: Math.floor(gridSize.x * Math.random()), y: Math.floor(gridSize.y * Math.random())}
    }

    compare = (elements) => {
        console.log(elements)
        elements.forEach(element => {
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
        while(elements.some((element) => (this.position.x == element.x && this.position.y == element.y))){
        // while(this.compare(elements)){
            this.position = {x: Math.floor(this.gridSize.x * Math.random()), y: Math.floor(this.gridSize.y * Math.random())}
        }
    }

}