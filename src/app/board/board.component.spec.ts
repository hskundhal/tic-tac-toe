/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BoardComponent } from './board.component';
let board: any = [
  { value: '' }, { value: '' }, { value: '' },
  { value: '' }, { value: '' }, { value: '' },
  { value: '' }, { value: '' }, { value: '' }
];
let PLAYER_COMPUTER = { name: 'Computer', symbol: 'o' };
let PLAYER_HUMAN = { name: 'You', symbol: 'x' };
describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('return empty board for computer to make a defensive move', () => {
    component.board[0].value = PLAYER_HUMAN.symbol;
    component.board[1].value = PLAYER_HUMAN.symbol;
    component.board[2].value = '';
    expect(component.placehere()).toEqual({value: ''});
  });

  it('return random board value for computer to make second move', () => {
    board[0].value = PLAYER_HUMAN.symbol;
    board[1].value = '';
    board[2].value = '';
    expect(component.placehere()).toEqual({value: ''});
  });

  it('decide winner', () => {
    component.board[0].value = PLAYER_HUMAN.symbol;
    component.board[1].value = PLAYER_HUMAN.symbol;
    component.board[2].value = PLAYER_HUMAN.symbol;
    expect(component.isWinner(PLAYER_HUMAN.symbol)).toEqual(true);
  });
});
