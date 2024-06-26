import { Injectable } from '@angular/core';
import { WhiteService } from './white.service';
import { GenericRuleService } from './generic-rule.service';

@Injectable({
  providedIn: 'root'
})
export class BlackService {

  constructor(private genRule: GenericRuleService) { }

  // Black Pieces
  blackPawnMovement(
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ) {
    const piece = this.genRule.chess_Board[fromRow][fromCol];

    //Attacking White Pieces
    if (
      toRow == fromRow + 1 &&
      (toCol == fromCol - 1 || toCol == fromCol + 1) &&
      this.genRule.IsWhitePiece(toRow, toCol) &&
      !this.genRule.IsInvalidMove(piece, fromRow, fromCol, toRow, toCol)
    ) {
      let piece = this.genRule.chess_Board[fromRow][fromCol]; //black_pawn
      this.genRule.chess_Board[toRow][toCol] = piece;
      this.genRule.chess_Board[fromRow][fromCol] = '';
      this.genRule.toggleCurrentPlayer();
    }

    // If the tile is empty
    if (this.genRule.IsEmptyTile(toRow, toCol)) {
      if (this.genRule.IsInvalidMove(piece, fromRow, fromCol, toRow, toCol)) {
        this.genRule.resetToPreviousPosition(fromRow, fromCol, toRow, toCol);
      }

      // If Valid Move is played
      if (!this.genRule.IsInvalidMove(piece, fromRow, fromCol, toRow, toCol)) {
        if (fromRow == 1 && toRow <= fromRow + 2 && toRow > fromRow) {
          this.genRule.chess_Board[toRow][toCol] = piece;
          this.genRule.chess_Board[fromRow][fromCol] = '';
          this.genRule.toggleCurrentPlayer();
        } else if (fromRow != 1 && toRow <= fromRow + 1 && toRow > fromRow) {
          this.genRule.chess_Board[toRow][toCol] = piece;
          this.genRule.chess_Board[fromRow][fromCol] = '';
          this.genRule.toggleCurrentPlayer();
        }
      }
    }
  }

  blackRookMovement(
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ) {
    const piece = this.genRule.chess_Board[fromRow][fromCol];
    //Attacking White Pieces
    if (
      this.genRule.IsWhitePiece(toRow, toCol) &&
      !this.genRule.IsInvalidMove(piece, fromRow, fromCol, toRow, toCol)
    ) {
      this.genRule.chess_Board[toRow][toCol] = piece;
      this.genRule.chess_Board[fromRow][fromCol] = '';
      this.genRule.toggleCurrentPlayer();
    }
    // If the tile is empty
    if (this.genRule.IsEmptyTile(toRow, toCol)) {
      //Invalid Move
      if (this.genRule.IsInvalidMove(piece, fromRow, fromCol, toRow, toCol)) {
        alert('Invalid Rook Move');
        this.genRule.resetToPreviousPosition(fromRow, fromCol, toRow, toCol);
        return;
      }

      // legal Move
      if (
        (toRow != fromRow && toCol == fromCol) ||
        (toRow == fromRow && toCol != fromCol)
      ) {
        this.genRule.chess_Board[toRow][toCol] = piece;
        this.genRule.chess_Board[fromRow][fromCol] = '';
        this.genRule.toggleCurrentPlayer();
      }
    }
  }

  blackKnightMovement(
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ) {
    const piece = this.genRule.chess_Board[fromRow][fromCol];

    // Attacking White Pieces
    if (
      ((toRow == fromRow - 2 &&
        (toCol == fromCol + 1 || toCol == fromCol - 1)) ||
        (toRow == fromRow + 2 &&
          (toCol == fromCol + 1 || toCol == fromCol - 1)) ||
        (toCol == fromCol - 2 &&
          (toRow == fromRow + 1 || toRow == fromRow - 1)) ||
        (toCol == fromCol + 2 &&
          (toRow == fromRow + 1 || toRow == fromRow - 1))) &&
      this.genRule.IsWhitePiece(toRow, toCol)
    ) {
      this.genRule.chess_Board[toRow][toCol] = piece;
      this.genRule.chess_Board[fromRow][fromCol] = '';
      this.genRule.toggleCurrentPlayer();
    }

    // If the tile is empty
    if (this.genRule.IsEmptyTile(toRow, toCol)) {
      // Invalid Move
      if (this.genRule.IsInvalidMove(piece, fromRow, fromCol, toRow, toCol)) {
        this.genRule.resetToPreviousPosition(fromRow, fromCol, toRow, toCol);
        return;
      }

      // legal Moves
      if (
        (toRow == fromRow - 2 &&
          (toCol == fromCol + 1 || toCol == fromCol - 1)) ||
        (toRow == fromRow + 2 &&
          (toCol == fromCol + 1 || toCol == fromCol - 1)) ||
        (toCol == fromCol - 2 &&
          (toRow == fromRow + 1 || toRow == fromRow - 1)) ||
        (toCol == fromCol + 2 && (toRow == fromRow + 1 || toRow == fromRow - 1))
      ) {
        this.genRule.chess_Board[toRow][toCol] = piece;
        this.genRule.chess_Board[fromRow][fromCol] = '';
        this.genRule.toggleCurrentPlayer();
      }
    }
  }

  blackBishopMovement(
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ) {
    const piece = this.genRule.chess_Board[fromRow][fromCol];
    // Attack White Pieces
    if (
      this.genRule.IsWhitePiece(toRow, toCol) &&
      !this.genRule.IsInvalidMove(piece, fromRow, fromCol, toRow, toCol)
    ) {
      this.genRule.chess_Board[toRow][toCol] = piece;
      this.genRule.chess_Board[fromRow][fromCol] = '';
      this.genRule.toggleCurrentPlayer();
    }

    // If the tile is Empty
    if (this.genRule.IsEmptyTile(toRow, toCol)) {
      /*
      legal Moves
      1. Towards Up and Left
      2. Towards Up and Right
      3, Towards Down and left
      4. Towards Down and Right
      */

      for (let i = 1; i <= 7; i++) {
        if (!this.genRule.IsInvalidMove(piece, fromRow, fromCol, toRow, toCol)) {
          if (
            (toRow == fromRow - i && toCol == fromCol - i) ||
            (toRow == fromRow - i && toCol == fromCol + i) ||
            (toRow == fromRow + i && toCol == fromCol - i) ||
            (toRow == fromRow + i && toCol == fromCol + i)
          ) {
            this.genRule.chess_Board[toRow][toCol] = piece;
            this.genRule.chess_Board[fromRow][fromCol] = '';
            this.genRule.toggleCurrentPlayer();
          }
        }
      }
    }
  }

  blackQueenMovement(
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ) {
    const piece = this.genRule.chess_Board[fromRow][fromCol];
    // Attack White Pieces
    if (
      this.genRule.IsWhitePiece(toRow, toCol) &&
      !this.genRule.IsInvalidMove(piece, fromRow, fromCol, toRow, toCol)
    ) {
      this.genRule.chess_Board[toRow][toCol] = piece;
      this.genRule.chess_Board[fromRow][fromCol] = '';
      this.genRule.toggleCurrentPlayer();
    }

    // If Tile is Empty
    if (this.genRule.IsEmptyTile(toRow, toCol)) {
      for (let i = 1; i <= 7; i++) {
        if (!this.genRule.IsInvalidMove(piece, fromRow, fromCol, toRow, toCol)) {
          if (
            (toRow == fromRow - i && toCol == fromCol - i) ||
            (toRow == fromRow - i && toCol == fromCol + i) ||
            (toRow == fromRow + i && toCol == fromCol - i) ||
            (toRow == fromRow + i && toCol == fromCol + i) ||
            (toRow != fromRow && toCol == fromCol) ||
            (toRow == fromRow && toCol != fromCol)
          ) {
            this.genRule.chess_Board[toRow][toCol] = piece;
            this.genRule.chess_Board[fromRow][fromCol] = '';
            this.genRule.toggleCurrentPlayer();
          }
        }
      }
    }
  }

  blackKingMovement(
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ) {
    const piece = this.genRule.chess_Board[fromRow][fromCol];

    // Attack White Pieces
    if (
      this.genRule.IsWhitePiece(toRow, toCol) &&
      !this.genRule.IsInvalidMove(piece, fromRow, fromCol, toRow, toCol)
    ) {
      this.genRule.chess_Board[toRow][toCol] = piece;
      this.genRule.chess_Board[fromRow][fromCol] = '';
      this.genRule.hasBlackKingMoved = true;
      this.genRule.toggleCurrentPlayer();
    }

    if (this.genRule.IsEmptyTile(toRow, toCol)) {
      // legal Moves
      if (
        ((toRow == fromRow - 1 && toCol == fromCol - 1) ||
          (toRow == fromRow - 1 && toCol == fromCol) ||
          (toRow == fromRow - 1 && toCol == fromCol + 1) ||
          (toRow == fromRow && toCol == fromCol - 1) ||
          (toRow == fromRow && toCol == fromCol + 1) ||
          (toRow == fromRow + 1 && toCol == fromCol - 1) ||
          (toRow == fromRow + 1 && toCol == fromCol) ||
          (toRow == fromRow + 1 && toCol == fromCol + 1)) &&
        !this.genRule.IsInvalidMove(piece, fromRow, fromCol, toRow, toCol)
      ) {
        this.genRule.chess_Board[toRow][toCol] = piece;
        this.genRule.chess_Board[fromRow][fromCol] = '';
        this.genRule.hasBlackKingMoved = true;
        this.genRule.toggleCurrentPlayer();
        return;
      }
    }

    // Castling
    if (
      this.genRule.chess_Board[0][4] == 'k' &&
      this.genRule.chess_Board[0][0] == 'r' &&
      this.genRule.IsEmptyTile(0, 1) &&
      this.genRule.IsEmptyTile(0, 2) &&
      this.genRule.IsEmptyTile(0, 3) &&
      !this.genRule.hasBlackKingMoved
    ) {
      if (toRow == fromRow && toCol == fromCol - 2) {
        this.genRule.chess_Board[toRow][toCol] = 'k';
        this.genRule.chess_Board[toRow][toCol + 1] = 'r';
        this.genRule.chess_Board[fromRow][fromCol] = '';
        this.genRule.chess_Board[0][0] = '';
        this.genRule.hasBlackKingMoved = true;
        this.genRule.toggleCurrentPlayer();
        return;
      }
    } else if (
      this.genRule.chess_Board[0][4] == 'k' &&
      this.genRule.chess_Board[0][7] == 'r' &&
      this.genRule.IsEmptyTile(0, 5) &&
      this.genRule.IsEmptyTile(0, 6) &&
      !this.genRule.hasBlackKingMoved
    ) {
      if (toRow == fromRow && toCol == fromCol + 2) {
        this.genRule.chess_Board[toRow][toCol] = 'k';
        this.genRule.chess_Board[toRow][toCol - 1] = 'r';
        this.genRule.chess_Board[fromRow][fromCol] = '';
        this.genRule.chess_Board[0][7] = '';
        this.genRule.hasBlackKingMoved = true;
        this.genRule.toggleCurrentPlayer();
        return;
      }
    }
  }
}
