export class Snake{

    constructor(){
        this.direction = 'r'
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

}