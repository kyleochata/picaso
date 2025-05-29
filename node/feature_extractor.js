import { constants } from "../common/constants.js";
import { features } from "../common/features.js";
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

    sample.point = [
        features.getPathCount(paths),
        features.getPointCount(paths)
    ]
}

const featureNames = ["Path Count", "Point Count"]

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

console.log("EXTACTING FTS END. Check /dataset/features.json")