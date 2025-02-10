export class UserContext {
    playFabId: string = '';
    entityToken: string = '';
    titleId: string = '';
    sessionTicket: string = '';
    stripeSubscriptionId: string = '';
  
    update(data: Partial<UserContext>) {
      Object.assign(this, data);
    }
  }
  