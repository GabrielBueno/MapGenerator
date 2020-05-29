## Cave Generator

This project is an example of the application of cellular automata concepts to procedurally generate a cave-like, tile-based, map.

![Example image](/img/example.png)

## Rules

The matrix is initially filled randomly with a 0 or an 1. Each value of the matrix is called a _cell_. A 0 value means a _dead cell_, and an 1 value means a _living cell_.
Then, we iterate over each cell _c_, verifying the number of _living cells_ that neighbours _c_ vertical, horizontal or diagonally. If _c_ is a _dead cell_, then it becomes alive if it has more than 4 neighbours; otherwise, it remains dead. If it is a _living cell_, than it becomes dead if it has less than 4 neighbours; otherwise, it remains living.

## Map display

The matrix will be drawn on the screen after the iteration. You generate random maps and tweak values like the size of the map or the number of iterations to run before drawing. You can run an iteration on the existing map, without generating another one.

## Run

Just clone the repository and open _index.html_ on your browser. No deps needed.