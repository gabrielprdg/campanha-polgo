import { Validation } from '../../presentation/protocols/validation';
export declare class ValidationComposite implements Validation {
    private readonly validations;
    constructor(validations: Validation[]);
    validate(input: any): Error | null;
}
//# sourceMappingURL=validation-composite.d.ts.map