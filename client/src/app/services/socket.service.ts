import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket;

  activeRoomArray: string[] = []

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  getPlayers(){
    return new Observable((observer) => {
      this.socket.on('players', (message) => {
        observer.next(message);
      })
    })
  }

  getPlayer1(){
    return new Observable((observer) => {
      this.socket.on('player1', (message) => {
        observer.next(message)
      })
    })
  }

  getPlayer2(){
    return new Observable((observer) => {
      this.socket.on('player2', (message) => {
        observer.next(message)
      })
    })
  }

  joinRoom(userName: string, roomName: string) {
    this.socket.emit('join room', roomName, userName);
  }

  createRoom(roomName: string, userName: string) {
    this.socket.emit('create room', roomName, userName);
    this.socket.emit('Active Rooms');
  }

  receiveJoinedPlayers() {
    return new Observable((observer) => {
      this.socket.on('userJoined', (message) => {
        observer.next(message);
      });
    });
  }

  getUpdatedChessBoardState() {
    return new Observable((observer) => {
      this.socket.on("getUpdatedChessBoardState", (message) => {
        observer.next(message);
      })
    })
  }

  sendUpdatedChessBoardState(roomName:string, chessBoardStateMatrix: Array<Array<string>>, chessBoardAttributes: any) {
    this.socket.emit("updateChessboardState",roomName, chessBoardStateMatrix, chessBoardAttributes);
  }

  sendUpdatedMovementsTable(roomName: string, updatedMovementList: any){
    this.socket.emit('movementTable', roomName, updatedMovementList);
  }

  receiveUpdatedMovementsTable(){
    return new Observable((observer) => {
      this.socket.on('updatedMovement', (message) => {
        observer.next(message);
      })
    })
  }

  disconnect() {
    this.socket.emit('disconnect');
  }

  
}
