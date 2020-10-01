import { OccurenceKind } from './occurenceKind';
import { FinancialCategoryModel } from "./financialCatgegory.model";
import { AttachmentItemModel } from "./attachmentItem.model";

/**
 * A fiancial item
 */
export class FinancialItemModel
{
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

  private _value: number = 0.00;
  /**
   * @returns {number} The value of the item
   */
  get value(): number { return this._value; }
  /**
   * @param {number} value The value of the item
   */
  set value(value: number) { this._value = value; }

  private _dueDate: Date = new Date(Date.now());
  /**
   * @returns {Date} Date when the item was due
   */
  get dueDate(): Date { return this._dueDate; }
  /**
   * @param {Date} value Date when the item was due
   */
  set dueDate(value: Date){ this._dueDate = value; }

  private _occurenceKind: OccurenceKind;
  /**
   * @returns {OccurenceKind} The occurence kind of the item
   */
  get occurenceKind(): OccurenceKind { return this._occurenceKind; }
  /**
   * @param {OccurenceKind} value The occurence kind of the item
   */
  set occurenceKind(value: OccurenceKind) { this._occurenceKind = value; }

  private _userId: string;
  /**
   * @returns {string} The id of the user
   */
  get userId(): string { return this._userId; }
  /**
   * @param {string} value The id of the user
   */
  set userId(value: string) { this._userId = value; }

  private _category: FinancialCategoryModel;
  /**
   * @returns {FinancialCategoryModel} The category
   */
  get category(): FinancialCategoryModel { return this._category; }
  /**
   * @param {FinancialCategoryModel} value The  category
   */
  set category(value: FinancialCategoryModel) { this._category = value; }

  private _attachments: AttachmentItemModel[];
  /**
   * @returns {AttachmentItemModel[]} The attachments to the item
   */
  get attachments(): AttachmentItemModel[] { return this._attachments; }
  /**
   * @param {AttachmentItemModel[]} value The attachments to the item
   */
  set attachments(value: AttachmentItemModel[]) { this._attachments = value; }
}
