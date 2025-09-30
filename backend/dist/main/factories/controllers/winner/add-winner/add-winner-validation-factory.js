"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddWinnerValidation = void 0;
const required_fields_validation_1 = require("../../../../../validation/validators/required-fields-validation");
const validation_composite_1 = require("../../../../../validation/validators/validation-composite");
const makeAddWinnerValidation = () => {
    const validations = [];
    for (const field of ['name', 'state', 'city', 'prize', 'date']) {
        validations.push(new required_fields_validation_1.RequiredFieldsValidation(field));
    }
    return new validation_composite_1.ValidationComposite(validations);
};
exports.makeAddWinnerValidation = makeAddWinnerValidation;
//# sourceMappingURL=add-winner-validation-factory.js.map