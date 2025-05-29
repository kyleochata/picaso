const utils = {}

utils.flaggedUsers = [1663882102141, 1663900040545, 1664485938220, 1663859212298]

utils.styles={
   car:{color:'gray',text:'🚗'},
   fish:{color:'red',text:'🐠'},
   house:{color:'yellow',text:'🏠'},
   tree:{color:'green',text:'🌳'},
   bicycle:{color:'cyan',text:'🚲'},
   guitar:{color:'blue',text:'🎸'},
   pencil:{color:'magenta',text:'✏️'},
   clock:{color:'lightgray',text:'🕒'},
};

utils.formatPercent = (num) => {
    return (num * 100).toFixed(2) + "%"
}

//visual progress calculations for dataset generation
utils.printProgress = (count, max) => {
    process.stdout.clearLine()
    //delete line in console
    process.stdout.cursorTo(0)
    const percent = utils.formatPercent(count / max)
    process.stdout.write(count + "/" + max + " (" + percent + ")")

}

//in: user_id will be the key
utils.groupBy = (objArr, key) => {
    const groups = {}
    for (let obj of objArr) {
        const val = obj[key]
        //have the user_id init, but no drawings yet
        if (groups[val] == null) {
            groups[val] = []
        }
        groups[val].push(obj)
    }
    return groups
}

if (typeof module !== 'undefined') {
    module.exports = { utils }
}