const features = {}

features.getPathCount = (paths) => {
    return paths.length
}

features.getPointCount = (paths) => {
    //converts the [][int] to just one big [int]
    const points = paths.flat();
    return points.length
}

if (typeof module !== 'undefined') {
    module.exports = {features}
}