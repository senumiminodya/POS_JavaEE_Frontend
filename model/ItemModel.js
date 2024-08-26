export default class ItemModel {
    constructor(item_code, item_name, price, quantity) {
        this._item_code = item_code;
        this._item_name = item_name;
        this._price = price;
        this._quantity = quantity;
    }

    get item_code() {
        return this._item_code;
    }

    set item_code(item_code) {
        this._item_code = item_code;
    }

    get item_name() {
        return this._item_name;
    }

    set item_name(item_name) {
        this._item_name = item_name;
    }

    get price() {
        return this._price;
    }

    set price(price) {
        this._price = price;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(quantity) {
        this._quantity = quantity;
    }
}