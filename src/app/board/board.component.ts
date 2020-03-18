import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  PLAYER_COMPUTER = { name: 'Computer', symbol: 'o' };
  PLAYER_HUMAN = { name: 'You', symbol: 'x' };
  DRAW = { name: 'Draw' };

  board: any[];
  currentPlayer = this.PLAYER_HUMAN;
  lastWinner: any;
  gameOver: boolean;
  boardLocked: boolean;

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  square_click(square) {
    if (square.value === '' && !this.gameOver) {
      square.value = this.PLAYER_HUMAN.symbol;
      this.completeMove(this.PLAYER_HUMAN);
    }
  }

  newGame() {
    this.board = [
      { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' }
    ];

    this.gameOver = false;
    this.boardLocked = false;

    if (this.currentPlayer === this.PLAYER_COMPUTER) {
      this.boardLocked = true;
      this.computerMove(true);
    }
  }

  computerMove(firstMove: boolean = false) {
    this.boardLocked = true;

    setTimeout(() => {
      const square = firstMove ?  this.getRandomAvailableSquare() : this.placehere();
      square.value = this.PLAYER_COMPUTER.symbol;
      this.completeMove(this.PLAYER_COMPUTER);
      this.boardLocked = false;
    }, 600);
  }

  getRandomAvailableSquare(): any {
    const availableSquares = this.board.filter(s => s.value === '');
    const squareIndex = this.getRndInteger(0, availableSquares.length - 1);

    return availableSquares[squareIndex];
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  placehere(): any {
    const availableSquares = this.board;
    for (const pattern of this.winningIndexes) {
      const expected1 = this.board[pattern[0]].value === this.PLAYER_HUMAN.symbol ;
      const opponent1 = this.board[pattern[0]].value === this.PLAYER_COMPUTER.symbol ;
      const expected2 = this.board[pattern[1]].value === this.PLAYER_HUMAN.symbol ;
      const opponent2 = this.board[pattern[1]].value === this.PLAYER_COMPUTER.symbol ;
      const expected3 = this.board[pattern[2]].value === this.PLAYER_HUMAN.symbol ;
      const opponent3 = this.board[pattern[2]].value === this.PLAYER_COMPUTER.symbol ;
      if (expected1 &&  expected2 && !expected3 && !opponent3) {
        const squareIndex = pattern[2];
        return availableSquares[squareIndex];
      }
      if (expected2 &&  expected3 && !expected1 && !opponent1) {
        const squareIndex = pattern[0];
        return availableSquares[squareIndex];
      }
      if (expected1 &&  expected3 && !expected2 && !opponent2) {
        const squareIndex = pattern[1];
        return availableSquares[squareIndex];
      }
    }
    for (const pattern of this.winningIndexes) {
      const expected1 = this.board[pattern[0]].value === this.PLAYER_HUMAN.symbol ;
      const opponent1 = this.board[pattern[0]].value === this.PLAYER_COMPUTER.symbol ;
      const expected2 = this.board[pattern[1]].value === this.PLAYER_HUMAN.symbol ;
      const opponent2 = this.board[pattern[1]].value === this.PLAYER_COMPUTER.symbol ;
      const expected3 = this.board[pattern[2]].value === this.PLAYER_HUMAN.symbol ;
      const opponent3 = this.board[pattern[2]].value === this.PLAYER_COMPUTER.symbol ;

      if (expected1 &&  !expected2 && !expected3 && !opponent3) {
        const squareIndex = pattern[2];
        return availableSquares[squareIndex];
      }
      if (expected2 &&  !expected3 && !expected1 && !opponent1) {
        const squareIndex = pattern[0];
        return availableSquares[squareIndex];
      }
      if (expected1 &&  !expected3 && !expected2 && !opponent3) {
        const squareIndex = pattern[2];
        return availableSquares[squareIndex];
      }
    }

    return  this.getRandomAvailableSquare();
  }


  completeMove(player) {
    if (this.isWinner(player.symbol)) {
      this.showGameOver(player);
    } else if (!this.availableSquaresExist()) {
      this.showGameOver(this.DRAW);
    } else {
      this.currentPlayer = (this.currentPlayer === this.PLAYER_COMPUTER ? this.PLAYER_HUMAN : this.PLAYER_COMPUTER);
      if (this.currentPlayer === this.PLAYER_COMPUTER) {
        this.computerMove();
      }
    }
  }

  availableSquaresExist(): boolean {
    return this.board.filter(s => s.value === '').length > 0;
  }

  showGameOver(winner) {
    this.gameOver = true;
    this.currentPlayer = this.PLAYER_HUMAN;
    this.lastWinner = winner;
  }

  get winningIndexes(): any[] {
    return [
      [0, 1, 2],  //top row
      [3, 4, 5],  //middle row
      [6, 7, 8],  //bottom row
      [0, 3, 6],  //first col
      [1, 4, 7],  //second col
      [2, 5, 8],  //third col
      [0, 4, 8],  //first diagonal
      [2, 4, 6]   //second diagonal
    ];
  }

  isWinner(symbol): boolean {
    for (const pattern of this.winningIndexes) {
      const foundWinner = this.board[pattern[0]].value === symbol
        && this.board[pattern[1]].value === symbol
        && this.board[pattern[2]].value === symbol;

      if (foundWinner) {
        for (const index of pattern) {
          this.board[index].winner = true;
        }
        return true;
      }
    }
    return false;
  }




}
