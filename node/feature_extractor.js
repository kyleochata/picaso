import { constants } from "../common/constants.js";
import { utils } from "../common/utils.js";
import { featureFunctions } from "../common/featureFunctions.js";
import fs from 'fs'

console.log("EXTRACTING FEATURES START")

//read the /data/dataset/sample.json file
const samples = JSON.parse(
    fs.readFileSync(constants.SAMPLES)
)

for (const sample of samples) {
    const paths = JSON.parse(
        fs.readFileSync(
            constants.JSON_DIR + "/" + sample.id + ".json"
        )
    )

    const functions = featureFunctions.inUse.map(func => func.function)
    sample.point = functions.map(f => f(paths))
    // sample.point = [
    //     featureFunctions.getPathCount(paths),
    //     featureFunctions.getPointCount(paths)
    // ]
}

const minMax = utils.normalizePoints(
    samples.map(sample => sample.point)
)

const featureNames = featureFunctions.inUse.map(ft => ft.name)

fs.writeFileSync(constants.FEATURES, 
    JSON.stringify({
        featureNames,
        samples: samples.map(sample => {
            return {
                point: sample.point,
                label: sample.label
            }
        })
    })
)

fs.writeFileSync(constants.FEATURES_JS,
    `const features = ${JSON.stringify({featureNames, samples})};`

)

fs.writeFileSync(constants.MIN_MAX_JS, 
    `const minMax = ${JSON.stringify(minMax)}`
)

console.log("EXTACTING FTS END. Check /dataset/features.json")