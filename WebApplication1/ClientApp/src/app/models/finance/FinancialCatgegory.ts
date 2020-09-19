import { FinancialItem } from "./FinancialItem";
import { AttachmentItem } from "./AttachmentItem";

/**
* A catgory in which multiple financial items can be organized
*/
export class FinancialCategory {

  private _financialCategoryId: string;
  /**
   * @returns {string} The id of the category
   */
  get financialCategoryId(): string { return this._financialCategoryId; }
  /**
   * @param {string} value The id of the category
   */
  set financialCategoryId(value: string) { this._financialCategoryId = value; }

  private _title: string;
  /**
   * @returns {string} The title of the category
   */
  get title(): string { return this._title; }
  /**
   * @param {string} value The title of the category
   */
  set title(value: string) { this._title = value; }

  /**
   * @returns {number} The total value of the category
   */
  get value(): number { return 0; }

  private _parentId;
  /**
   * @returns {string} The id of the parent category
   */
  get parentId(): string { return this._parentId; }
  /**
   * @param {string} value The id of the parent category
   */
  set parentId(value: string) { this._parentId = value; }

  private _userId;
  /**
   * @returns {string} The id of the user
   */
  get userId(): string { return this._userId; }
  /**
   * @param {string} value The id of the user
   */
  set userId(value: string) { this._userId = value; }

  private _parent: FinancialCategory;
  /**
   * @returns {FinancialCategory} The parent category
   */
  get parent(): FinancialCategory { return this._parent; }
  /**
   * @param {FinancialCategory} value The parent category
   */
  set parent(value: FinancialCategory) { this._parent = value; }

  private _childCategories: FinancialCategory[];
  /**
   * @returns {FinancialCategory[]} The child categories
   */
  get childCategories(): FinancialCategory[] { return this._childCategories; }
  /**
   * @param {FinancialCategory[]} value The child categories
   */
  set childCategories(value: FinancialCategory[]) { this._childCategories = value; }

  private _items: FinancialItem[];
  /**
   * @returns {FinancialItem[]} The items within the category
   */
  get items(): FinancialItem[] { return this._items; }
  /**
   * @param {FinancialItem[]} value The items within the category
   */
  set items(value: FinancialItem[]) { this._items = value; }

  private _attachments: AttachmentItem[];
  /**
   * @returns {AttachmentItem[]} The attachments to the category
   */
  get attachments(): AttachmentItem[] { return this._attachments; }
  /**
   * @param {AttachmentItem[]} value The attachments to the category
   */
  set attachments(value: AttachmentItem[]) { this._attachments = value; }
}
