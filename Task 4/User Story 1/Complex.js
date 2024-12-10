export class Complex {
    constructor(real = 0, imaginary = 0) {
        if (typeof real === 'object') {
            this._real = real.real;
            this._imaginary = real.imaginary;
        } else {
            this._real = real;
            this._imaginary = imaginary;
        }
    }

    get real() {
        return this._real;
    }

    set real(value) {
        this._real = value;
    }

    get imaginary() {
        return this._imaginary;
    }

    set imaginary(value) {
        this._imaginary = value;
    }

    add(realvalue, imaginaryvalue = 0) {
        const temp = new Complex(realvalue, imaginaryvalue);

        this._real = this._real + temp.real;
        this._imaginary = this._imaginary + temp.imaginary;

        return this;
    }

    toString() {
        const realStr = this._real.toString();
        const imagStr = (this._imaginary >= 0 ? "+" : "") + this._imaginary.toString() + "i";
        return realStr + imagStr;
    }

    static equals(c1, c2) {
        return c1.real === c2.real && c1.imaginary === c2.imaginary;
    }
}