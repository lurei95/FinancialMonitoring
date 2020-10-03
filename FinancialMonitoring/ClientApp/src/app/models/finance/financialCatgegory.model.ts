import { FinancialItemModel } from "./financialItem.model";
import { AttachmentItemModel } from "./attachmentItem.model";

/**
* A catgory in which multiple financial items can be organized
*/
export class FinancialCategoryModel
{

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
  get value(): number 
  { 
    return this.items.reduce((sum, current) => sum + current.value, 0)
      + this.childCategories.reduce((sum, current) => sum + current.value, 0); 
  }

  private _parentId: string;
  /**
   * @returns {string} The id of the parent category
   */
  get parentId(): string { return this._parentId; }
  /**
   * @param {string} value The id of the parent category
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

  private _parent: FinancialCategoryModel;
  /**
   * @returns {FinancialCategoryModel} The parent category
   */
  get parent(): FinancialCategoryModel { return this._parent; }
  /**
   * @param {FinancialCategoryModel} value The parent category
   */
  set parent(value: FinancialCategoryModel) { this._parent = value; }

  private _childCategories: FinancialCategoryModel[] = [];
  /**
   * @returns {FinancialCategoryModel[]} The child categories
   */
  get childCategories(): FinancialCategoryModel[] { return this._childCategories; }
  /**
   * @param {FinancialCategoryModel[]} value The child categories
   */
  set childCategories(value: FinancialCategoryModel[]) { this._childCategories = value; }

  private _items: FinancialItemModel[] = [];
  /**
   * @returns {FinancialItemModel[]} The items within the category
   */
  get items(): FinancialItemModel[] { return this._items; }
  /**
   * @param {FinancialItemModel[]} value The items within the category
   */
  set items(value: FinancialItemModel[]) { this._items = value; }

  private _attachments: AttachmentItemModel[] = [];
  /**
   * @returns {AttachmentItemModel[]} The attachments to the category
   */
  get attachments(): AttachmentItemModel[] { return this._attachments; }
  /**
   * @param {AttachmentItemModel[]} value The attachments to the category
   */
  set attachments(value: AttachmentItemModel[]) { this._attachments = value; }
}
