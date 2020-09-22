/**
 * Model for a user
 */
export class UserModel
{
  private _userId: string;
  /**
   * @returns {string} id of the user
   */
  get userId(): string { return this._userId; }
  /**
   * @param {string} value id of the user
   */
  set userId(value: string) { this._userId = value; }

  private _email: string;
  /**
   * @returns {string} email address of the user
   */
  get email(): string { return this._email; }
  /**
   * @param {string} value email address of the user
   */
  set email(value: string) { this._email = value; }

  private _password: string;
  /**
   * @returns {string} password of the user
   */
  get password(): string { return this._password; }
  /**
   * @param {string} value password of the user
   */
  set password(value: string) { this._password = value; }

  private _accessToken: string;
  /**
   * @returns {string} the access token
   */
  get accessToken(): string { return this._accessToken; }
  /**
   * @param {string} value the access token
   */
  set accessToken(value: string) { this._accessToken = value; }

  private _refreshToken: string;
  /**
   * @returns {string} the refresh token
   */
  get refreshToken(): string { return this._refreshToken; }
  /**
   * @param {string} value the refresh token
   */
  set refreshToken(value: string) { this._refreshToken = value; }
} 