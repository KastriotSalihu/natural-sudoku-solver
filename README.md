# Sudoku Solver
## Sudoku
---

[Sudoku](https://en.wikipedia.org/wiki/Sudoku) is a logic-based, combinatorial number-placement puzzle. 

In classic Sudoku, the objective is to fill a 9 × 9 grid with digits so that each column, each row, and each of the nine 3 × 3 subgrids that compose the grid (also called "boxes", "blocks", or "regions") contain all of the digits from 1 to 9. The puzzle setter provides a partially completed grid, which for a well-posed puzzle has a single solution

## Algorithm 
---

The algorithm implemented in this project represents a very natural and straightforward way to solve a sudoku.

Find all the values allowed in a particular cell based on all the *groups* (row, column or box) it belongs to. 

The way this is calculated is by starting from the total set of available values (numbers 1 - 9), and then removing from that set the values which are not allowed in that particular cell, (because the value is already present in another cell in the group).

If a cell is left with only one possible value, that value is "bound" to that cell, and the value is removed as a possible candidate in the remaining cells of the groups.

## How to Use
---
You can run this code using **[node](https://nodejs.org/en/)**.
Simply go to the root directory and run 
```
node index.js
```
This will run the default sudoku found at
```
examples/eazy.js
```
and then print the solved sudoku.

A very simple previewer is available at:
```
index.html
```
Simply copy the result from the solver (or any sudoku with that format),
then open your browsers console.

Run:
```
populateTable(sudoku)
```

## Sudoku Terms:
---
Same value represents members of the same grouping

### **Row**

0 0 0 | 0 0 0 | 0 0 0

1 1 1 | 1 1 1 | 1 1 1

2 2 2 | 2 2 2 | 2 2 2

\- - - | - - - | - - - 

3 3 3 | 3 3 3 | 3 3 3

4 4 4 | 4 4 4 | 4 4 4

5 5 5 | 5 5 5 | 5 5 5

\- - - | - - - | - - -  

6 6 6 | 6 6 6 | 6 6 6

7 7 7 | 7 7 7 | 7 7 7

8 8 8 | 8 8 8 | 8 8 8

### **Column**


0 1 2 | 3 4 5 | 6 7 8

0 1 2 | 3 4 5 | 6 7 8

0 1 2 | 3 4 5 | 6 7 8

\- - - | - - - | - - - 

0 1 2 | 3 4 5 | 6 7 8

0 1 2 | 3 4 5 | 6 7 8

0 1 2 | 3 4 5 | 6 7 8

\- - - | - - - | - - -  

0 1 2 | 3 4 5 | 6 7 8

0 1 2 | 3 4 5 | 6 7 8

0 1 2 | 3 4 5 | 6 7 8

### **Box**

0 0 0 | 1 1 1 | 2 2 2   0

0 0 0 | 1 1 1 | 2 2 2   1

0 0 0 | 1 1 1 | 2 2 2   2

\- - - | - - - | - - - 

3 3 3 | 4 4 4 | 5 5 5   3

3 3 3 | 4 4 4 | 5 5 5   4

3 3 3 | 4 4 4 | 5 5 5   5

\- - - | - - - | - - -  

6 6 6 | 7 7 7 | 8 8 8   6

6 6 6 | 7 7 7 | 8 8 8   7

6 6 6 | 7 7 7 | 8 8 8   8


### ***Group***

Row, Column or Box

