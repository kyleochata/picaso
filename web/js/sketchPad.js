class SketchPad{
    constructor(container, size=400) {
        this.canvas = document.createElement("canvas")
        this.canvas.width=size
        this.canvas.height=size
        this.canvas.style=`
            background-color: white;
            box-shadow: 0px 0px 10px 2px black;
        `
        container.appendChild(this.canvas)

        //to draw in canvas
        this.ctx = this.canvas.getContext("2d")
        this.path = []
        this.isDrawing = false

        this.#addEventListeners();
        
    }

    #addEventListeners(){
        this.canvas.onmousedown = (event) => {
            const mouse = this.#getMouse(event)
            this.path=[mouse]
            this.isDrawing=true
        }

        this.canvas.onmousemove = (event) => {
            if (this.isDrawing) {
                const mouse = this.#getMouse(event)
                this.path.push(mouse)

                this.#redraw();
            }
        }

        this.canvas.onmouseup = () => {
            this.isDrawing = false
        }
    }

    #redraw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        draw.path(this.ctx, this.path);
    }
    
    //Private method to return x, y coords in relation to canvas box
    #getMouse = (event) => {
        const rectangle = this.canvas.getBoundingClientRect();
        return [
            // x,y coordinates in relation to the canvas box
            Math.round(event.clientX - rectangle.left),
            Math.round(event.clientY - rectangle.top),
        ]

    }

}