export class Food{
    constructor(gridSize){
        this.gridSize = gridSize
        this.position = {x: 12, y: 10}
    }

    relocate = (elements) => {
        while(elements.some((element) => (this.position.x == element.x && this.position.y == element.y))){
        // while(this.compare(elements)){
            this.position = {x: Math.floor(this.gridSize.x * Math.random()), y: Math.floor(this.gridSize.y * Math.random())}
        }
    }

}