import { TextWrite } from '../modules/text.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../modules/interfacies';

interface BgBoard {
  boardId: string,
  imageSrc: string
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public token: string | null = localStorage.getItem('token');
  public user: User | null = JSON.parse(localStorage.getItem('user') as string);
  public password: string | null = localStorage.getItem(`${this.token}`);
  public boardImages: BgBoard[] = JSON.parse(localStorage.getItem('background') as string) || [];
  public textWrite = new TextWrite();

  constructor(
    private router: Router
  ) {}

  setToken(value: string) {
    localStorage.setItem('token', value);
    this.token = value;
  }

  serPassword(value: string) {
    localStorage.setItem(`${this.token}`, value);
  }

  logoutUser() {
    localStorage.removeItem(`${this.token}`);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token = null;
    this.user = null;
    this.password = null;
    this.router.navigate(['/']);
  }

  hasToken() {
    return this.token !== null ? true : false;
  }

  setUser(body: User) {
    this.user = body;
    localStorage.setItem('user', JSON.stringify(body));
  }

  setImage(boardId: string, imageSrc: string) {
    const boardBg: BgBoard = {
      boardId,
      imageSrc
    }
    this.boardImages = this.boardImages.map(board => {
      if (board.boardId === boardId) {
        board.imageSrc = imageSrc;
      }
      return board;
    });
    if (!(this.boardImages.find(i => i.boardId === boardId))) {
      this.boardImages.push(boardBg);
    }
    localStorage.setItem('background', JSON.stringify(this.boardImages));
  }

}
