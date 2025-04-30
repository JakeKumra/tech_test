import { checkRowWinner, checkColumnWinner, checkDiagonalWinner, checkAntiDiagonalWinner, checkDraw } from "./yourFile";
import { XorO } from "../types";

describe("Tic Tac Toe Game Logic", () => {
  const emptyBoard = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];

  const xBoard = [
    [XorO.X, XorO.X, XorO.X],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];

  const oBoard = [
    [XorO.O, XorO.O, XorO.O],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];

  const diagonalBoard = [
    [XorO.X, undefined, undefined],
    [undefined, XorO.X, undefined],
    [undefined, undefined, XorO.X],
  ];

  const antiDiagonalBoard = [
    [undefined, undefined, XorO.X],
    [undefined, XorO.X, undefined],
    [XorO.X, undefined, undefined],
  ];

  describe("checkRowWinner", () => {
    it("should return true if the entire row matches the player", () => {
      expect(checkRowWinner(xBoard, 0, XorO.X)).toBe(true);
    });

    it("should return false if the row doesn't match the player", () => {
      expect(checkRowWinner(oBoard, 0, XorO.X)).toBe(false);
    });
  });

  describe("checkColumnWinner", () => {
    it("should return true if the entire column matches the player", () => {
      expect(checkColumnWinner(oBoard, 0, XorO.O)).toBe(true);
    });

    it("should return false if the column doesn't match the player", () => {
      expect(checkColumnWinner(xBoard, 0, XorO.O)).toBe(false);
    });
  });

  describe("checkDiagonalWinner", () => {
    it("should return true if the diagonal matches the player", () => {
      expect(checkDiagonalWinner(diagonalBoard, 0, 0, XorO.X)).toBe(true);
    });

    it("should return false if the diagonal doesn't match the player", () => {
      expect(checkDiagonalWinner(emptyBoard, 0, 0, XorO.X)).toBe(false);
    });

    it("should return false if the diagonal condition doesn't match", () => {
      expect(checkDiagonalWinner(antiDiagonalBoard, 0, 2, XorO.X)).toBe(false);
    });
  });

  describe("checkAntiDiagonalWinner", () => {
    it("should return true if the anti-diagonal matches the player", () => {
      expect(checkAntiDiagonalWinner(antiDiagonalBoard, 0, 2, XorO.X, 3)).toBe(true);
    });

    it("should return false if the anti-diagonal doesn't match the player", () => {
      expect(checkAntiDiagonalWinner(diagonalBoard, 0, 0, XorO.X, 3)).toBe(false);
    });
  });

  describe("checkDraw", () => {
    it("should return true if the board is full and there is no winner", () => {
      const drawBoard = [
        [XorO.X, XorO.O, XorO.X],
        [XorO.O, XorO.X, XorO.O],
        [XorO.O, XorO.X, XorO.O],
      ];
      expect(checkDraw(drawBoard, null)).toBe(true);
    });

    it("should return false if the board is not full", () => {
      expect(checkDraw(emptyBoard, null)).toBe(false);
    });

    it("should return false if there is a winner", () => {
      expect(checkDraw(xBoard, XorO.X)).toBe(false);
    });
  });
});
