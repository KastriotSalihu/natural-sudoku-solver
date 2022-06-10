import { BOX_HEIGHT, BOX_WIDTH, COLUMN_SIZE, ROW_SIZE } from "./src/constants/constants.js";
import { eazy } from "./src/eazy.js";
import * as solveMethods from "./src/solveMethods.js";
import * as possibleValueHelper from "./src/possibleValueHelper.js";

/**
 * Method to call to solve the sudoku
 * @param {*} sudoku 
 * @returns 
 */
const solve = (sudoku) => {
    const naivePossibleValues = Array(sudoku.length).fill(null).map(() => Array(sudoku.length));

    // used as "bit-map" to mark solved groups 
    const solvedRows = Array(ROW_SIZE).fill(false);
    const solvedColumns = Array(COLUMN_SIZE).fill(false);
    const solvedBoxes = Array(BOX_HEIGHT * BOX_WIDTH).fill(false);

    // fill the solution matrix with all the possible values that could potentially be in each cell
    for (let i = 0; i < sudoku.length; i++)
        for (let j = 0; j < sudoku[i].length; j++)
            naivePossibleValues[i][j] = possibleValueHelper.getPossibleValues(sudoku, i, j);

    // based on the constraints remove the values from the cells 
    // which have been already set as the only value for some other cell in that group
    // e.g. row, column or box
    while (true) {
        // if during some iteration of removing values from the matrix
        // no value was removed that means that it either has been completed
        // or this sudoku is not solvable
        if (!solveMethods.removeRedundantPossibilities(naivePossibleValues, solvedRows, solvedColumns, solvedBoxes))
            break;
    }

    const flattened = naivePossibleValues.map(row => row.flat());
    return flattened;
};

console.log(solve(eazy));
