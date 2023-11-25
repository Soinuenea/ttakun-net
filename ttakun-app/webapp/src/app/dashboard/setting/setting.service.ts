import { Injectable } from '@angular/core';
import { UserApiService } from '../../core/services/api/user-api.service';

@Injectable()
export class SettingService {
  constructor(private userApiService: UserApiService) { }

  updatePassword(password: string, passwordRepeat: string) {
    return this.userApiService.updatePassword(password, passwordRepeat).toPromise();
  }
}
