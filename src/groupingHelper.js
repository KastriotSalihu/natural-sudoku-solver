import { BOX_HEIGHT, BOX_WIDTH } from "./constants/constants.js";

export const getBoxIndex = (row, column) => {
    const baseColumn = Math.floor(column / BOX_HEIGHT);
    const baseRow = Math.floor(row / BOX_WIDTH) * BOX_WIDTH;
    return baseRow + baseColumn;
};

const getStartingColumnIndexForBox = (boxLength, box) => {
    return boxLength * (box % boxLength);
};
const getStartingRowIndexForBox = (boxHeight, box) => {
    return Math.floor(box / boxHeight) * boxHeight;
};

export const getBox = (matrix, box, callback) => {
    callback = callback || (e => e);
    const startingRowIndex = getStartingRowIndexForBox(BOX_HEIGHT, box);
    const endingRowIndex = startingRowIndex + BOX_HEIGHT;
    const startingColumnIndex = getStartingColumnIndexForBox(BOX_WIDTH, box);
    const endingColumnIndex = startingColumnIndex + BOX_WIDTH;
    let iterationCount = 0;
    const values = [];
    for (let i = startingRowIndex; i < endingRowIndex; i++) {
        for (let j = startingColumnIndex; j < endingColumnIndex; j++) {
            values.push(callback(matrix[i][j], i, j, iterationCount++));
        }
    }
    return values;
};

export const setBox = (matrix, box, values) => {
    getBox(matrix, box, (_, i, j, valueIndex) => {
        matrix[i][j] = values[valueIndex];
    });
};

export const getColumn = (matrix, column) => {
    return matrix.map(x => x[column]);
};

export const setColumn = (matrix, column, values) => {
    matrix.forEach((row, index) => {
        row[column] = values[index];
    });
};

export const getRow = (matrix, row) => {
    return matrix[row];
};
export const setRow = (matrix, row, values) => {
    matrix[row] = values;
};
