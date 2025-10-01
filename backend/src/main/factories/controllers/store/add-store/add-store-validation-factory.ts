import { RequiredFieldsValidation } from '../../../../../validation/validators/required-fields-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'
import { Validation } from '../../../../../presentation/protocols'

export const makeAddStoreValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'cnpj', 'state', 'city', 'address']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
