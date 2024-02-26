export const createTuples = (list: any[], tupleSize: number= 2) => {
    const tuples = [];
    for (let i = 0; i < list.length; i += tupleSize) {
        tuples.push(list.slice(i, i + tupleSize));
    }
    return tuples;
};