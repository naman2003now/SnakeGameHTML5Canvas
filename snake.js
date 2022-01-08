export class Snake{

    constructor(){
        this.direction = 'r'
        this.grow = false
        this.elements = [
            {x: 10, y: 10},
            {x: 10, y: 11},
            {x: 10, y: 12}
        ]
    }

    left = () => {
        if(this.direction != 'r'){this.direction = 'l'}
    }
    right = () => {
        if(this.direction != 'l'){this.direction = 'r'}
    }
    down = () => {
        if(this.direction != 'u'){this.direction = 'd'}
    }
    up = () => {
        if(this.direction != 'd'){this.direction = 'u'}
    }

    update = () => {
        if(this.grow){
            this.grow = false
            this.elements.push({x:this.elements[this.elements.length-1].x, y:this.elements[this.elements.length-1].y})
        }
        for(let i = this.elements.length - 1; i > 0; i--){
            this.elements[i] = {x: this.elements[i - 1].x, y: this.elements[i -1].y}
        }
        switch(this.direction){
            case 'r':
                this.elements[0].x += 1
                break;
            case 'l':
                this.elements[0].x -= 1
                break
            case 'd':
                this.elements[0].y += 1
                break
            case 'u':
                this.elements[0].y -= 1
                break
        }
    }

    check = (gridSize, food) => {

        if(this.elements.slice(1, this.elements.length).includes(this.elements[0])){
            console.log("AteAway")
            return true
        }else if(
            this.elements[0].x < 0 || 
            this.elements[0].y < 0 ||
            this.elements[0].x >= gridSize.x || 
            this.elements[0].y > gridSize.y){

            return true
        }
        if(food.position.x == this.elements[0].x && food.position.y == this.elements[0].y){
            this.grow = true
            food.relocate(this.elements)
        }
        return false
    }

}