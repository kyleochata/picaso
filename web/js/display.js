function createRow(container, username, samples) {
    const row = document.createElement("div")
    row.classList.add("row")
    container.appendChild(row)

    const rowLabel = document.createElement("div")
    rowLabel.innerHTML = username
    rowLabel.classList.add("rowLabel")
    row.appendChild(rowLabel)

    for (let sample of samples) {
        const { id, label, user_id } = sample;

        const sampleContainer = document.createElement("div")
        sampleContainer.id = "sample_" + id
        sampleContainer.onclick = () => handleClick(sample, false)
        sampleContainer.classList.add("sampleContainer")

        const sampleLabel = document.createElement("div")
        sampleLabel.innerHTML = label
        sampleContainer.appendChild(sampleLabel)

        const img = document.createElement('img')
        img.src = constants.IMG_DIR + "/" + id + ".png"
        img.classList.add("thumb")
        if (utils.flaggedUsers.includes(user_id)) {
            img.classList.add("blur")
        }
        sampleContainer.appendChild(img)
        row.appendChild(sampleContainer)
    }
}

function handleClick(sample, doScroll = true) {
    //sample is null when clicking on the chart dead space.
    if (sample === null) {
        [...document.querySelectorAll('.emphasize')].
            forEach((element) => element.classList.remove('emphasize'))
        return
    }
    const element = document.getElementById("sample_" + sample.id)

    //when clicking the image already emphasized
    if (element.classList.contains("emphasize")) {
        element.classList.remove("emphasize")
        chart.selectSample(null)
        return
    }

    [...document.querySelectorAll('.emphasize')].
        forEach((element) => element.classList.remove('emphasize'))
    element.classList.add("emphasize")
    //scroll screen to the image and user who created it when clicking in the chart
    if (doScroll) {
        element.scrollIntoView({
            behavior: 'auto',
            block: 'center',
        })
    }
    //will select the icon in the chart, when clicking on the image in the list
    chart.selectSample(sample)
}

function toggleInput() {
    // inputContainer.style.display == "none"
    // ? inputContainer.style.display = "block"
    // : inputContainer.style.display = "none"
    if (inputContainer.style.display === "none") {
        inputContainer.style.display = "block"
        sketchPad.triggerUpdate()
    } else {
        inputContainer.style.display = "none"
        chart.hideDynamicPoint()
    }
}