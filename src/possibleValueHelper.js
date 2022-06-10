import { EMPTY_CELL, MAX_NUMBER } from "./constants/constants.js";
import * as groupingHelper from "./groupingHelper.js";

/**
 * Array containing all values from 1 to MAX_NUMBER
 */
const allValues = Array(MAX_NUMBER).fill(0).map((_, index) => index + 1);
/**
 * Get the elements that are in this but arent in array
 * @param {Array} array 
 * @returns 
 */
Array.prototype.notIn = function (array) {
    return this.filter(x => !array.includes(x));
};

export const getPossibleValues = (sudoku, row, column) => {
    // if this cell has a predefined value, it is already solved
    if (sudoku[row][column] != EMPTY_CELL) return [sudoku[row][column]];

    // get box index based on row and column
    const box = groupingHelper.getBoxIndex(row, column);

    // get the values that are present or not present in the groups: row, column, box
    const { available: rowAvailable, notAvailable: rowNotAvailable } = getPossibilitiesFromGroup(groupingHelper.getRow(sudoku, row));
    const { available: columnAvailable, notAvailable: columnNotAvailable } = getPossibilitiesFromGroup(groupingHelper.getColumn(sudoku, column));
    const { available: boxAvailable, notAvailable: boxNotAvailable } = getPossibilitiesFromGroup(groupingHelper.getBox(sudoku, box));

    // get all the possible values for this cell
    const allPossibleValues = Array.from(new Set([
        rowAvailable,
        columnAvailable,
        boxAvailable
    ].flat()));

    // get all the values wich are not allowed in this cell
    const unavailableValues = Array.from(new Set([
        rowNotAvailable,
        columnNotAvailable,
        boxNotAvailable
    ].flat()));

    const availableValues = allPossibleValues.notIn(unavailableValues);
    return availableValues;
};

const getPossibilitiesFromGroup = group => {
    const groupValues = group.filter(x => x !== EMPTY_CELL);
    return {
        available: allValues.notIn(groupValues),
        notAvailable: groupValues,
    };
};
