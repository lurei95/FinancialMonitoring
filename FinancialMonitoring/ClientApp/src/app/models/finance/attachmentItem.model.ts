/**
 * An attachement to a financial item or category
 */
export class AttachmentItemModel
{
  private _attachmentItemId: string;
  /**
   * @returns {string} The id of the attachment
   */
  get attachmentItemId(): string { return this._attachmentItemId; }
  /**
   * @param {string} value The id of the attachment
   */
  set attachmentItemId(value: string) { this._attachmentItemId = value; }

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

  private _parentId: string;
  /**
   * @returns {string} The id of the parent entity
   */
  get parentId(): string { return this._parentId; }
  /**
   * @param {string} value The id of the parent entity
   */
  set parentId(value: string) { this._parentId = value; }

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
