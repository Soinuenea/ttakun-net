import { UserPrivilege } from './user-privilege';

export class User {
  constructor(
    public hash?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public defaultWarehouseHash?: string,
    public defaultWarehouseName?: string,
    public uid?: string,
    public userPrivileges?: UserPrivilege[]
  ) { }

  clone() {
    return new User(
      this.hash,
      this.firstName,
      this.lastName,
      this.email,
      this.defaultWarehouseHash,
      this.defaultWarehouseName,
      this.uid,
      this.userPrivileges
    );
  }

  get fullName() {
    return `${ this.firstName } ${ this.lastName }`;
  }
}
