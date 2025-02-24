export class UserContext {
  playFabId: string = '';
  sessionTicket: string = '';
  titleId: string = '';
  xsollaToken: string = ''; 
  characterId: string = ''; 
  username: string = '';
  password: string = '';

  update(data: Partial<UserContext>) {
    Object.assign(this, data);
  }
}
