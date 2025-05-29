const featureFunctions = {}

featureFunctions.getPathCount = (paths) => {
    return paths.length
}

featureFunctions.getPointCount = (paths) => {
    //converts the [][int] to just one big [int]
    const points = paths.flat();
    return points.length
}

featureFunctions.getWidth = (paths) => {
    const points = paths.flat()
    //grab all x coordinates in the points [x, y]
    const x = points.map(point => point[0])
    const minX = Math.min(...x)
    const maxX = Math.max(...x)
    return maxX - minX
}

featureFunctions.getHeight = (paths) => {
    const points = paths.flat();
    const y = points.map(point => point[1])
    const minY = Math.min(...y)
    const maxY = Math.max(...y)

    return maxY-minY
}

featureFunctions.inUse = [
    //{name: "Path Count", function: featureFunctions.getPathCount},
    //{name: "Point Count", function: featureFunctions.getPointCount},
    {name: "Width", function: featureFunctions.getWidth},
    {name: "Height", function: featureFunctions.getHeight}
]

if (typeof module !== 'undefined') {
    module.exports = {featureFunctions}
}