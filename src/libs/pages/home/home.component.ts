import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Socket, SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { Message, STATUSES } from './models';
import { USERS } from './data';
import { map, tap } from 'rxjs';
import { MessageService } from '../../services/message/message.service';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { format } from 'date-fns';
import { UserService } from '../../services/user/user.service';
import { IUser } from 'src/libs/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewChecked {
  received!: IUser;

  constructor(
    private socket: Socket,
    private messageService: MessageService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  messages$ = this.messageService.messages$;

  user$ = this.authService.user$;
  users$ = this.userService.users$;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  ngOnInit() {
    // this.messageService.getAllMessages([
    //   '2af7ec8f-df86-4136-b5b4-139a180cec83',
    //   'ca248145-2045-4304-99e7-e0050b098c0d',
    //   'fcee4077-21af-41c9-abe4-287695ece21b',
    // ]);
    this.userService.getAll().subscribe();
  }
  ngAfterViewChecked() {
    this.messages$.subscribe(() => {
      this.scrollToBottom();
    });
  }

  findChat(authorId: string, received: IUser) {
    this.received = received;
    this.messageService.getAllMessages(authorId, received.id);
  }

  async addNewMessage(inputField: HTMLTextAreaElement, userId: string) {
    const val = inputField?.value.trim();
    if (val.length) {
      this.messageService.createMessage({
        authorId: userId,
        receivedId: this.received.id,
        content: val,
      });

      // this.activeUser.messages.push({ type: 'sent', message: val })
      // this.activeUser.ws.send(
      //   JSON.stringify({ id: this.activeUser.id, message: val })
      // );
    }
    inputField.value = '';
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  formatDate(date: Date | string) {
    return format(new Date(date), 'HH:mm dd-MM-yyyy');
  }
}
