export default class CustomerModel {
    constructor(c_id, nic, name, phoneNo) {
        this._c_id = c_id;
        this._nic = nic;
        this._name = name;
        this._phoneNo = phoneNo;
    }
    set c_id(c_id) {
        this._c_id = c_id;
    }
    get c_id() {
        return this._c_id;
    }
    set nic(nic) {
        this._nic = nic;
    }
    get nic() {
        return this._nic;
    }
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set phoneNo(phoneNo) {
        this._phoneNo = phoneNo;
    }
    get phoneNo() {
        return this._phoneNo;
    }
}