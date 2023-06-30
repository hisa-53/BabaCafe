import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as BaseLocalStrategy } from 'passport-local';
import { Account } from 'src/account/entities/account.entity';
import { AuthService, PasswordOmitAccount } from './auth.service';

/**
 * @description accountEmailとpasswordを使った認証処理を行うクラス
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(BaseLocalStrategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // passport-localは、デフォルトで accountEmail と password をパラメーターで受け取る
  async validate(email: Account['email'], pass: Account['password']): Promise<PasswordOmitAccount> {
    // 認証して結果を受け取る
    const account = await this.authService.validateAccount(email, pass);

    if (!account) {
      throw new UnauthorizedException(); // 認証失敗
    }

    return account;
  }
}
