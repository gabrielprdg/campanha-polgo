import { RequiredFieldsValidation } from '../../../../../validation/validators/required-fields-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'
import { Validation } from '../../../../../presentation/protocols'

export const makeAddWinnerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'state', 'city', 'prize', 'date']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}