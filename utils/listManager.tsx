export const createTuples = (list: any[]) => {
    var tuples = [];
    for (var i = 0; i < list.length; i += 2) {
        if (i + 1 < list.length) {
            tuples.push([list[i], list[i + 1]]);
        } else {
            tuples.push([list[i]]);
        }
    }
    return tuples;
}