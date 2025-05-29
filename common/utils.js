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

//for getting the nearest neighbor(s) when using the dynamicPoint for classification!
utils.distance = (p1, p2) => {
   return Math.sqrt(
      (p1[0] - p2[0]) ** 2 +
      (p1[1] - p2[1]) ** 2
   );
}

//loc = dynamicPoint while drawing. Points == all the extracted data height and widths. Returns the index of the
//nearest point's index to the dynamicPoint
utils.getNearest = (loc, points) => {
   let minDist = Number.MAX_SAFE_INTEGER;
   let nearestIndex = 0;

   for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const d = utils.distance(loc, point);

      if (d < minDist) {
         minDist = d;
         nearestIndex = i;
      }
   }
   return nearestIndex;
}

if (typeof module !== 'undefined') {
    module.exports = { utils }
}