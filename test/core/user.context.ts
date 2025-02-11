export class UserContext {
  playFabId: string = '';
  sessionTicket: string = '';
  titleId: string = '';
  xsollaToken: string = ''; 
  
  update(data: Partial<UserContext>) {
    Object.assign(this, data);
  }
}
