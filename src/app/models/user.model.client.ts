export class User {
  _id: string;
  username: string;
  password: string;
  role: string;

  firstName: string;
  lastName: string;
  email: string;

  constructor(_id = 'undefined', username, password, firstName = '', lastName = '', email, role) {
    this._id = _id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
  }

}
