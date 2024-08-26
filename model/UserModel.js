export default class UserModel {
    constructor(userName, password, email, phoneNo) {
        this._userName = userName;
        this._password = password;
        this._email = email;
        this._phoneNo = phoneNo;
    }

    get userName() {
        return this._userName;
    }

    set userName(value) {
        this._userName = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get phoneNo() {
        return this._phoneNo;
    }

    set phoneNo(value) {
        this._phoneNo = value;
    }
}