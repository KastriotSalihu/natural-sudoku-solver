import { EMPTY_CELL, MAX_NUMBER } from "./constants/constants.js";
import * as groupingHelper from "./groupingHelper.js";

/**
 * Array containing all values from 1 to MAX_NUMBER
 */
const allPossibleValues = Array(MAX_NUMBER).fill(0).map((_, index) => index + 1);

export const getPossibleValues = (sudoku, row, column) => {
    // if this cell has a predefined value, it is already solved
    if (sudoku[row][column] != EMPTY_CELL) return [sudoku[row][column]];

    // get box index based on row and column
    const box = groupingHelper.getBoxIndex(row, column);

    // get all the values wich are not allowed in this cell
    const unavailableValues = Array.from(new Set([
        // get the values that are present in the row of the cell
        ...groupingHelper.getRow(sudoku, row).filter(x => x !== EMPTY_CELL),
        // get the values that are present in the column of the cell
        ...groupingHelper.getColumn(sudoku, column).filter(x => x !== EMPTY_CELL),
        // get the values that are present in the box of the cell
        ...groupingHelper.getBox(sudoku, box).filter(x => x !== EMPTY_CELL)
    ]));

    // filter the values that are not in the array unavailableValues
    const availableValues = allPossibleValues.filter(x => !unavailableValues.includes(x));
    return availableValues;
};