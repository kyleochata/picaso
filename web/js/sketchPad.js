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

        const lineBreak = document.createElement("br")
        container.appendChild(lineBreak)

        //undo button to reset drawing
        this.undoBtn = document.createElement("button")
        this.undoBtn.innerHTML = "UNDO"
        this.undoBtn.disabled=true
        container.appendChild(this.undoBtn)

        //to draw in canvas
        this.ctx = this.canvas.getContext("2d")
        //paths is [][int, int]
        this.paths = []
        this.isDrawing = false

        this.#addEventListeners();
        
    }

    #addEventListeners(){
        this.canvas.onmousedown = (event) => {
            const mouse = this.#getMouse(event)
            this.paths.push([mouse])
            this.isDrawing=true
        }

        this.canvas.onmousemove = (event) => {
            if (this.isDrawing) {
                const mouse = this.#getMouse(event)
                const lastPath = this.paths[this.paths.length -1]
                lastPath.push(mouse)

                this.#redraw();
            }
        }

        this.canvas.onmouseup = () => {
            this.isDrawing = false
        }

        this.canvas.ontouchstart = (event) => {
            const location = event.touches[0];
            this.canvas.onmousedown(location)
        }
        this.canvas.ontouchmove = (event) => {
            const location = event.touches [0];
            this.canvas.onmousemove(location)
        }
        this.canvas.ontouchend = () => {
            this.canvas.onmouseup()
        }

        this.undoBtn.onclick = () => {
            this.paths.pop()
            this.#redraw();
        }
    }

    #redraw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        draw.paths(this.ctx, this.paths);

        //if no more paths exist, disable undo button
        this.paths.length > 0 
            ? this.undoBtn.disabled = false 
            : this.undoBtn.disabled = true

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