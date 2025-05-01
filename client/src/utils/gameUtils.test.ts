
import { XorO } from '../types';
import { checkRowWinner, checkColumnWinner, checkDiagonalWinner, checkAntiDiagonalWinner, checkDraw } from './gameUtils';

describe('Tic Tac Toe Winner Checks', () => {
  const X: XorO = 'X';
  const O: XorO = 'O';

  describe('checkRowWinner', () => {
    it('returns true when the row is filled with the player symbol', () => {
      const board = [
        [X, X, X],
        [O, undefined, O],
        [O, X, O],
      ];
      expect(checkRowWinner(board, 0, X)).toBe(true);
    });

    it('returns false when the row is not filled with the player symbol', () => {
      const board = [
        [X, O, X],
        [O, undefined, O],
        [O, X, O],
      ];
      expect(checkRowWinner(board, 0, X)).toBe(false);
    });
  });

  describe('checkColumnWinner', () => {
    it('returns true when the column is filled with the player symbol', () => {
      const board = [
        [X, O, O],
        [X, X, O],
        [X, undefined, O],
      ];
      expect(checkColumnWinner(board, 0, X)).toBe(true);
    });

    it('returns false when the column is not filled with the player symbol', () => {
      const board = [
        [X, O, O],
        [O, X, O],
        [X, undefined, O],
      ];
      expect(checkColumnWinner(board, 0, X)).toBe(false);
    });
  });

  describe('checkDiagonalWinner', () => {
    it('returns true when the main diagonal is filled with the player symbol', () => {
      const board = [
        [O, X, X],
        [X, O, X],
        [X, X, O],
      ];
      expect(checkDiagonalWinner(board, 2, 2, O)).toBe(true);
    });

    it('returns false if not on the main diagonal', () => {
      const board = [
        [X, O, X],
        [O, O, O],
        [X, X, X],
      ];
      expect(checkDiagonalWinner(board, 0, 1, X)).toBe(false);
    });

    it('returns false when the diagonal does not match the player symbol', () => {
      const board = [
        [X, O, X],
        [O, X, O],
        [O, X, O],
      ];
      expect(checkDiagonalWinner(board, 2, 2, O)).toBe(false);
    });
  });

  describe('checkAntiDiagonalWinner', () => {
    it('returns true when the anti-diagonal is filled with the player symbol', () => {
      const board = [
        [X, O, O],
        [O, O, X],
        [O, X, X],
      ];
      expect(checkAntiDiagonalWinner(board, 0, 2, O, 3)).toBe(true);
    });

    it('returns false if not on the anti-diagonal', () => {
      const board = [
        [X, O, X],
        [O, X, O],
        [X, O, X],
      ];
      expect(checkAntiDiagonalWinner(board, 0, 1, X, 3)).toBe(false);
    });

    it('returns false when the anti-diagonal does not match the player symbol', () => {
      const board = [
        [O, X, X],
        [X, X, O],
        [X, O, O],
      ];
      expect(checkAntiDiagonalWinner(board, 2, 0, O, 3)).toBe(false);
    });
  });

  describe('checkDraw', () => {
    it('returns true when the board is full and there is no winner', () => {
      const board = [
        [X, O, X],
        [O, O, X],
        [X, X, O],
      ];
      expect(checkDraw(board, null)).toBe(true);
    });

    it('returns false when the board is not full', () => {
      const board = [
        [X, O, undefined],
        [O, O, X],
        [X, X, O],
      ];
      expect(checkDraw(board, null)).toBe(false);
    });

    it('returns false when there is a winner', () => {
      const board = [
        [X, O, X],
        [O, X, O],
        [O, X, X],
      ];
      expect(checkDraw(board, X)).toBe(false);
    });
  });
});
