export class User {

  // eslint-disable @typescript-eslint/no-unused-vars
  constructor(
    private email: string,
    private token: string,
    private localId: string,
    private expirationDate: Date
  ) {
  }

}