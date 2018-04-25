export class Utils {
    static merge = arrayOrArrays => arrayOrArrays.reduce(Utils.flatten, []);

    static flatten(acc, array) {
        return !array || array.length === 0 ? acc : acc.concat(array);
    }

    static removeDuplicates(array) {
        return array.filter((elem, pos, arr) => {
            return arr.indexOf(elem) === pos;
        });
    }

    static objectKeys(object) {
        return object ? Object.keys(object) : object;
    }
}