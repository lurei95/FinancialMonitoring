import { FinancialCategory } from "./FinancialCatgegory";
import { AttachmentItem } from "./AttachmentItem";

/**
 * A fiancial item
 */
export class FinancialItem {

  private _financialItemId: string;
  /**
   * @returns {string} The id of the item
   */
  get financialItemId(): string { return this._financialItemId; }
  /**
   * @param {string} value The id of the item
   */
  set financialItemId(value: string) { this._financialItemId = value; }

  private _categoryId: string;
  /**
   * @returns {string} The id of the category
   */
  get categoryId(): string { return this._categoryId; }
  /**
   * @param {string} value The id of the category
   */
  set categoryId(value: string) { this._categoryId = value; }

  private _title: string;
  /**
   * @returns {string} The title of the item
   */
  get title(): string { return this._title; }
  /**
   * @param {string} value The title of the item
   */
  set title(value: string) { this._title = value; }

  private _value: number;
  /**
   * @returns {number} The value of the item
   */
  get value(): number { return this._value; }
  /**
   * @param {number} value The value of the item
   */
  set value(value: number) { this._value = value; }

  private _dueDate: Date;
  /**
   * @returns {Date} Date when the item was due
   */
  get dueDate(): Date { return this._dueDate; }
  /**
   * @param {Date} value Date when the item was due
   */
  set dueDate(value: Date){ this._dueDate = value; }

  private _userId;
  /**
   * @returns {string} The id of the user
   */
  get userId(): string { return this._userId; }
  /**
   * @param {string} value The id of the user
   */
  set userId(value: string) { this._userId = value; }

  private _category: FinancialCategory;
  /**
   * @returns {FinancialCategory} The category
   */
  get category(): FinancialCategory { return this._category; }
  /**
   * @param {FinancialCategory} value The  category
   */
  set category(value: FinancialCategory) { this._category = value; }

  private _attachments: AttachmentItem[];
  /**
   * @returns {AttachmentItem[]} The attachments to the item
   */
  get attachments(): AttachmentItem[] { return this._attachments; }
  /**
   * @param {AttachmentItem[]} value The attachments to the item
   */
  set attachments(value: AttachmentItem[]) { this._attachments = value; }
}
