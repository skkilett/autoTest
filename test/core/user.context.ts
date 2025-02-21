export class UserContext {
  playFabId: string = '';
  sessionTicket: string = '';
  titleId: string = '';
  xsollaToken: string = ''; 
  characterId: string = ''; 
  
  update(data: Partial<UserContext>) {
    Object.assign(this, data);
  }
}
