/**
 * Model for api reply
 */
export class ApiReply<TResult>
{
  /**
   * @returns {TResult} The reply
   */
  get result(): TResult { return this._result; }
  /**
   * @param {TResult} value The reply
   */
  set result(value: TResult)  { this._result = value; }

  /**
   * @returns {boolean} Whether the operation was successful
   */
  get successful(): boolean { return this._successful; }
  /**
   * @param {boolean} value Whether the operation was successful
   */
  set successful(value: boolean)  { this._successful = value; }

  /**
   * @returns {string} Response message
   */
  get message(): string { return this._message; }
  /**
   * @param {string} value Response message
   */
  set message(value: string)  { this._message = value; }

  /**
   * Constructor
   * 
   * @param {TResult} value The reply
   * @param {boolean} value Whether the operation was successful
   * @param {string} value Response message
   */
  constructor(private _result: TResult, private _successful: boolean, private _message: string)
  { }
}