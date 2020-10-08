/**
 * An attachement to a financial item or category
 */
export class AttachmentItemModel
{
  private _attachmentItemId: number;
  /**
   * @returns {number The id of the attachment
   */
  get attachmentItemId(): number { return this._attachmentItemId; }
  /**
   * @param {string} value The id of the attachment
   */
  set attachmentItemId(value: number) { this._attachmentItemId = value; }

  private _title: string;
  /**
   * @returns {string} The title of the attachment
   */
  get title(): string { return this._title; }
  /**
   * @param {string} value The title of the attachment
   */
  set title(value: string) { this._title = value; }

  private _attachment: string;
  /**
   * @returns {string} The actual attachment
   */
  get attachment(): string { return this._attachment; }
  /**
   * @param {string} value The actual attachment
   */
  set attachment(value: string) { this._attachment = value; }

  private _addedDate: Date;
  /**
   * @returns {Date} Date when the item was due
   */
  get addedDate(): Date { return this._addedDate; }
  /**
   * @param {Date} value Date when the item was due
   */
  set addedDate(value: Date) { this._addedDate = value; }

  private _financialCategoryId: number;
  /**
   * @returns {number} The id of the category
   */
  get financialCategoryId(): number { return this._financialCategoryId; }
  /**
   * @param {number} value The id of the category
   */
  set financialCategoryId(value: number) { this._financialCategoryId = value; }

  private _financialItemId: number;
  /**
   * @returns {number} The id of the item
   */
  get financialItemId(): number { return this._financialItemId; }
  /**
   * @param {number} value The id of the item
   */
  set financialItemId(value: number) { this._financialItemId = value; }

  private _userId: string;
  /**
   * @returns {string} The id of the user
   */
  get userId(): string { return this._userId; }
  /**
   * @param {string} value The id of the user
   */
  set userId(value: string) { this._userId = value; }
}
