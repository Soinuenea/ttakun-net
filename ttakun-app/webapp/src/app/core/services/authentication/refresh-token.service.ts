import { Injectable } from '@angular/core';
import { AuthApiService } from '../api/auth-api.service';

@Injectable()
export class RefreshTokenService {
  constructor(
    private authApiService: AuthApiService
  ) { }

  refreshToken() {
    return this.authApiService.refreshToken();
  }
}
