export class PassForm {
  // id: any;
  userId: string;
  username: string;
  newPassword: string;
  currentPassword: string;

  constructor(userId: string , username: string, newPassword: string, currentPassword: string) {
    this.userId = userId;
    this.username = username;
    this.newPassword = newPassword;
    this.currentPassword = currentPassword;

  }
}
