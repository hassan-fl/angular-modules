import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn, Validators } from '@angular/forms';

@Directive({
    selector: '[nationalCode]',
    providers: [{ provide: NG_VALIDATORS, useExisting: NationalCodeValidatorDirective, multi: true }]
})
export class NationalCodeValidatorDirective implements Validator, OnChanges {

    constructor() {
    }

    @Input() nationalCode: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {

        const change = changes['nationalCode'];

        if (change) {
            const val: string | RegExp = change.currentValue;
            const re = val instanceof RegExp ? val : new RegExp(val, 'i');

            this.valFn = nationalCodeValidator(re);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}

function nationalCodeValidator(codeRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const code = control.value;
        const no = !isValidNationalCode(code);
        return no ? { 'nationalCode': { code } } : null;
    };
}


function isValidNationalCode(meli_code) {
    if (!meli_code || !meli_code.length) return true;
    if (meli_code != "1111111111" &&
        meli_code != "0000000000" &&
        meli_code != "2222222222" &&
        meli_code != "3333333333" &&
        meli_code != "4444444444" &&
        meli_code != "5555555555" &&
        meli_code != "6666666666" &&
        meli_code != "7777777777" &&
        meli_code != "8888888888" &&
        meli_code != "9999999999"
    ) {

        let c = parseInt(meli_code.charAt(9));
        let n = parseInt(meli_code.charAt(0)) * 10 +
            parseInt(meli_code.charAt(1)) * 9 +
            parseInt(meli_code.charAt(2)) * 8 +
            parseInt(meli_code.charAt(3)) * 7 +
            parseInt(meli_code.charAt(4)) * 6 +
            parseInt(meli_code.charAt(5)) * 5 +
            parseInt(meli_code.charAt(6)) * 4 +
            parseInt(meli_code.charAt(7)) * 3 +
            parseInt(meli_code.charAt(8)) * 2;

        let r = n - parseInt((n / 11).toString()) * 11;
        if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
            return true;
        }
    }
    return false;
}
