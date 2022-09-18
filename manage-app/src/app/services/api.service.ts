import { Tasks } from 'src/app/modules/interfacies';
import { StorageService } from './storage.service';
import { Auth } from 'src/app/modules/enums';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../modules/enums';
import { Signup, Signin, Board, Column } from '../modules/interfacies';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  createUser(body: Signup) {
    return this.http.post(`${Api.url}${Auth.signup}`, body);
  }

  loginUser(body: Signin) {
    this.storageService.password = body.password;
    return this.http.post(`${Api.url}${Auth.singin}`, body);
  }

  getUser(id: string) {
    return this.http.get(`${Api.url}${Api.user}${id}`);
  }

  changeUser(id: string, body: Signup) {
    return this.http.put(`${Api.url}${Api.user}${id}`, body);
  }

  removeUser(id: string) {
    this.http.delete(`${Api.url}${Api.user}${id}`);
  }

  getBoards() {
    return this.http.get(`${Api.url}${Api.boards}`);
  }

  addBoard(body: Board) {
    return this.http.post(`${Api.url}${Api.boards}`, body);
  }

  changeBoard(boardId: string, body: Board) {
    return this.http.put(`${Api.url}${Api.board}${boardId}`, body);
  }

  removeBoard(boardId: string) {
    return this.http.delete(`${Api.url}${Api.board}${boardId}`);
  }

  getColumns(boardId: string) {
    return this.http.get(`${Api.url}${Api.board}${boardId}/${Api.columns}`);
  }

  addColumn(boardId: string, body: Column) {
    return this.http.post(`${Api.url}${Api.board}${boardId}/${Api.columns}`, body);
  }

  changeColumn(boardId: string, columnId: string, body: Column) {
    return this.http.put(`${Api.url}${Api.board}${boardId}/${Api.column}${columnId}`, body);
  }

  removeColumn(boardId: string, columnId: string) {
    return this.http.delete(`${Api.url}${Api.board}${boardId}/${Api.column}${columnId}`);
  }

  getTasks(boardId: string, columnId: string) {
    return this.http.get(`${Api.url}${Api.board}${boardId}/${Api.column}${columnId}/${Api.tasks}`)
  }

  addTask(boardId: string, columnId: string, body: Tasks) {
    return this.http.post(`${Api.url}${Api.board}${boardId}/${Api.column}${columnId}/${Api.tasks}`, body);
  }

  changeTask(boardId: string, columnId: string, taskId: string, body: Tasks) {
    return this.http.put(`${Api.url}${Api.board}${boardId}/${Api.column}${columnId}/${Api.task}${taskId}`, body);
  }

  removeTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete(`${Api.url}${Api.board}${boardId}/${Api.column}${columnId}/${Api.task}${taskId}`);
  }
}
