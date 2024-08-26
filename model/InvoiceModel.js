class InvoiceModel {
    constructor(o_id, date, cus_id, cus_name, cus_phoneNo, item_description, price, qty, total) {
        this._o_id = o_id;
        this._date = date;
        this._cus_id = cus_id;
        this._cus_name = cus_name;
        this._cus_phoneNo = cus_phoneNo;
        this._item_description = item_description;
        this._price = price;
        this._qty = qty;
        this._total = total;
    }

    get o_id() {
        return this._o_id;
    }

    set o_id(value) {
        this._o_id = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get cus_id() {
        return this._cus_id;
    }

    set cus_id(value) {
        this._cus_id = value;
    }

    get cus_name() {
        return this._cus_name;
    }

    set cus_name(value) {
        this._cus_name = value;
    }

    get cus_phoneNo() {
        return this._cus_phoneNo;
    }

    set cus_phoneNo(value) {
        this._cus_phoneNo = value;
    }

    get item_description() {
        return this._item_description;
    }

    set item_description(value) {
        this._item_description = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}