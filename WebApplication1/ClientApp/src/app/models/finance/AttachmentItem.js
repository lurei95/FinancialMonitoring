"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An attachement to a financial item or category
 */
var AttachmentItem = /** @class */ (function () {
    function AttachmentItem() {
    }
    Object.defineProperty(AttachmentItem.prototype, "attachmentItemId", {
        /**
         * @returns {string} The id of the attachment
         */
        get: function () { return this._attachmentItemId; },
        /**
         * @param {string} value The id of the attachment
         */
        set: function (value) { this._attachmentItemId = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachmentItem.prototype, "title", {
        /**
         * @returns {string} The title of the attachment
         */
        get: function () { return this._title; },
        /**
         * @param {string} value The title of the attachment
         */
        set: function (value) { this._title = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachmentItem.prototype, "attachment", {
        /**
         * @returns {string} The actual attachment
         */
        get: function () { return this._attachment; },
        /**
         * @param {string} value The actual attachment
         */
        set: function (value) { this._attachment = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachmentItem.prototype, "addedDate", {
        /**
         * @returns {Date} Date when the item was due
         */
        get: function () { return this._addedDate; },
        /**
         * @param {Date} value Date when the item was due
         */
        set: function (value) { this._addedDate = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachmentItem.prototype, "parentId", {
        /**
         * @returns {string} The id of the parent entity
         */
        get: function () { return this._parentId; },
        /**
         * @param {string} value The id of the parent entity
         */
        set: function (value) { this._parentId = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachmentItem.prototype, "userId", {
        /**
         * @returns {string} The id of the user
         */
        get: function () { return this._userId; },
        /**
         * @param {string} value The id of the user
         */
        set: function (value) { this._userId = value; },
        enumerable: true,
        configurable: true
    });
    return AttachmentItem;
}());
exports.AttachmentItem = AttachmentItem;
//# sourceMappingURL=AttachmentItem.js.map