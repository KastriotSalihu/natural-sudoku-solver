import { getBox, getColumn, setColumn, setBox, setRow, getRow } from "./groupingHelper.js";

export const removeRedundantPossibilities = (solution, solvedRows, solvedColumns, solvedBoxes) => {
    // if didn't remove any values (didn't find any redundant possibilities) that means the sudoku is either solved or it is not solvable
    if (!removePickedValuesFromGroup(solution, solvedRows, getRow, setRow))
        return false;

    if (!removePickedValuesFromGroup(solution, solvedColumns, getColumn, setColumn))
        return false;

    if (!removePickedValuesFromGroup(solution, solvedBoxes, getBox, setBox))
        return false;

    return true;
};

const removePickedValuesFromGroup = (solution, solvedGroup, getValuesCallback, setValuesCallback) => {
    let didClean = false;
    for (let i = 0; i < solvedGroup.length; i++) {
        if (solvedGroup[i])
            continue;
        const groupValues = getValuesCallback(solution, i);
        const cleanedUpArray = removePickedValuesFromPossibilities(groupValues);
        if (cleanedUpArray == groupValues) {
            solvedGroup[i] = true;
        }
        else {
            setValuesCallback(solution, i, cleanedUpArray);
            didClean = true;
        }
    }
    return didClean;
};

const removePickedValuesFromPossibilities = (group) => {
    // find all cells which have only one possible value (are solved)
    const solvedCells = group.filter(x => x.length === 1).flat();

    // this group is already solved because all the cells have one possibility
    if (solvedCells.length == group.length)
        return group;

    // iterate the entire group of values (row, column or box)
    return group.map(cell => {
        // filter each cell of the group such that:
        // if it has only one possible value, it is solved and it remains as such
        // else the values are updated to remove the values which are already chosen as solutions in other cells
        return cell.filter(possibleValue => {
            if (cell.length === 1) {
                // this cell has only one value so keep that value
                return true;
            }
            if (solvedCells.includes(possibleValue)) {
                // this value should be removed from the cell because it already is a solution to some cell
                return false;
            }
            // this value should be kept as a possible future solution
            return true;
        });
    });
};
