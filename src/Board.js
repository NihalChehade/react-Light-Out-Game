import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { renderToReadableStream } from "react-dom/server";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      const row = [];
      for (let j = 0; j < ncols; j++) {
        // Generate true or false randomly
        const randomValue = Math.random() < chanceLightStartsOn;
        row.push(randomValue);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.

    // Loop through each row in the board
    for (let row of board) {
      // Check if any value in the row is not false
      for (let cell of row) {
        if (cell !== false) {
          return false; // If any value is not false, the player has not won
        }
      }
    }

    // If no non-false values are found, the player has won
    return true;

  }

  //function to recursively deep copy an array
  const deepCopy = (arr) => {
    let copy = [];
    arr.forEach(elem => {
      if (Array.isArray(elem)) {
        copy.push(deepCopy(elem))
      } else {
        copy.push(elem)
      }
    })
    return copy;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it(true-> false and false-> true)

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = deepCopy(oldBoard);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y, x + 1, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y - 1, x, newBoard);

      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  // TODO
  // make table board
  // TODO
  return (
    <div>
      {hasWon() ? (
        <h1>You have Won!</h1>
      ) : (
        <table className="Board">
          <tbody>
            {board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <Cell
                    key={`${rowIndex}-${cellIndex}`}
                    flipCellsAroundMe={() => flipCellsAround(`${rowIndex}-${cellIndex}`)}
                    isLit={cell}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Board;
