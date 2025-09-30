import { Validation } from '../../presentation/protocols/validation';
export declare class RequiredFieldsValidation implements Validation {
    private readonly fieldName;
    constructor(fieldName: string);
    validate(input: any): Error | null;
}
//# sourceMappingURL=required-fields-validation.d.ts.map