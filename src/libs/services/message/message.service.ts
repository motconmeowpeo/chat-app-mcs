import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { store } from './message.store';
import { select } from '@ngneat/elf';
import {
  addEntities,
  selectAllEntities,
  setEntities,
} from '@ngneat/elf-entities';
import { IUser } from 'src/libs/models';
import { ICreateMessage, IMessage } from 'src/libs/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages$ = store.pipe(selectAllEntities());
  constructor(private socket: Socket) {}

  getAllMessages(authorId: string, receivedId: string) {
    this.socket.emit(
      'findAllMessages',
      { authorId, receivedId },
      (res: IMessage[]) => {
        console.log(res);
        if (res && res.length) {
          store.update(setEntities(res));
        } else {
          store.update(setEntities([]));
        }
      }
    );

    this.socket.on('resMessage', (res: IMessage) => {
      store.update(addEntities(res));
    });
  }

  createMessage(payload: Partial<ICreateMessage>) {
    this.socket.emit(
      'createMessage',
      {
        content: payload.content,
        authorId: payload.authorId,
        receivedId: payload.receivedId,
        replyFor: payload.replyFor,
      },
      (res: IMessage) => {
        // store.update(addEntities(res));
      }
    );
  }
}
