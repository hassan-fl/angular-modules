import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NationalCodeValidatorDirective } from './validators/nationalCode';


import {CommonModule} from '@angular/common';


@NgModule({
    imports: [CommonModule
    ],
    declarations: [
        NationalCodeValidatorDirective
    ],
    providers: [
        DatePipe
    ],
    entryComponents: [],
    exports: [
        NationalCodeValidatorDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class GwSharedModule { }
