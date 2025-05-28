export const draw = {}

draw.path = (ctx, path, color="black") => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    //moveTo takes 2 args. path arr has x,y tuples so spread them
    ctx.moveTo(...path[0])
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(...path[i])
    }

    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    ctx.stroke()
}

//draw multiple paths (so we dont have to one shot the drawing)
draw.paths = (ctx, paths, color="black") => {
    for (const path of paths) {
        draw.path(ctx, path, color)
    }
}
