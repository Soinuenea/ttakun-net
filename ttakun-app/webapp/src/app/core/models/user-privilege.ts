export class UserPrivilege {
  constructor(
    public hash?: string,
    public code?: string,
    public privilegeHash?: string,
  ) { }

  clone() {
    return new UserPrivilege(
      this.hash,
      this.code,
      this.privilegeHash
    );
  }
}
