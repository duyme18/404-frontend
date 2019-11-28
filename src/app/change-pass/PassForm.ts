export class PassForm {
  id: any;
  username: string;
  newPassword: string;
  currentPassword: string;

  constructor(username: string, newPassword: string, currentPassword: string, id: number) {
    this.username = username;
    this.newPassword = newPassword;
    this.currentPassword = currentPassword;
    this.id = id;
  }
}
