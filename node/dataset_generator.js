import { draw } from "../common/draw.js";
import fs from 'fs'
import { createCanvas } from "canvas";
import { constants } from "../common/constants.js";
import { utils } from "../common/utils.js";

// const draw = require("../common/draw")

const canvas = createCanvas(400, 400)
const ctx = canvas.getContext('2d')


const fileNames = fs.readdirSync(constants.RAW_DIR)
const samples = []

let id = 1

//read raw json files and parse data
fileNames.forEach(file => {
    const content = fs.readFileSync(
        constants.RAW_DIR + '/' + file
    )

    const {session, student, drawings} = JSON.parse(content)
    for (let label in drawings) {
        //creates a summary of each raw file submission
        samples.push({
            id,
            label,
            username: student,
            user_id: session,
        })

        const paths = drawings[label]
        //writes data from the raw files. Data is all points needed to make that submissions drawing
        fs.writeFileSync(
            constants.JSON_DIR + "/" + id + ".json",
            JSON.stringify(paths)
        )

        //image representation of above data points
        generateImageFile(constants.IMG_DIR + "/" + id + ".png", paths)
        //each file contains 8 drawings;
        utils.printProgress(id, fileNames.length*8)

        id++
    }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples))
fs.writeFileSync(constants.SAMPLES_JS, "const samples = " + JSON.stringify(samples)+";")

function generateImageFile(outFile, paths) {
    //uses same canvas for each of the samples, so need to clear canvase after each drawing input
    ctx.clearRect(0,0, canvas.width, canvas.height)

    draw.paths(ctx, paths);

    const buffer = canvas.toBuffer("image/png")
    fs.writeFileSync(outFile, buffer)
}