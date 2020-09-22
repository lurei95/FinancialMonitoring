/**
 * Model for a request for refreshing the access token
 */
export class RefreshRequest
{
  /**
   * @returns The access token
   */
  get accessToken(): string { return this._accessToken; }

  /**
   * @returns The refresh token
   */
  get refreshToken(): string { return this._refreshToken; }

  /**
   * Constructor
   * 
   * @param _accessToken The access token
   * @param _refreshToken The access token
   */
  constructor(private _accessToken: string, private _refreshToken: string) { }
}