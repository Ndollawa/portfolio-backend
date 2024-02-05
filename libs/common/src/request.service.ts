import { Injectable, Scope } from '@nestjs/common';
import { User } from '@app/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private user: User;

  setUser(user: User) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
}
