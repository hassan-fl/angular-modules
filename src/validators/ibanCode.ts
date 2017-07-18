import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import * as Iban from 'iban';

@Directive({
    selector: '[ibanCode]',
    providers: [{ provide: NG_VALIDATORS, useExisting: IbanCodeValidatorDirective, multi: true }]
})
export class IbanCodeValidatorDirective implements Validator, OnChanges {

    constructor() {
    }

    @Input() ibanCode: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {

        const change = changes['ibanCode'];

        if (change) {
            const val: string | RegExp = change.currentValue;
            const re = val instanceof RegExp ? val : new RegExp(val, 'i');

            this.valFn = ibanCodeValidator(re);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}

function ibanCodeValidator(codeRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const code = control.value;
        const no = !Iban.isValid(code);
        return no ? { 'ibanCode': { code } } : null;
    };
}
