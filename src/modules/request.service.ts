import { Injectable, Scope } from '@nestjs/common';
import { UserInterface } from './user';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private user: UserInterface;

  setUser(user: UserInterface) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
}
