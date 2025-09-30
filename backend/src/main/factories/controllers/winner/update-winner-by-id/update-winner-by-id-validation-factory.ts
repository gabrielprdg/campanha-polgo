import { ValidationComposite } from '../../../../../validation/validators/validation-composite'
import { Validation } from '../../../../../presentation/protocols'

export const makeUpdateWinnerByIdValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  // All fields are optional for update
  return new ValidationComposite(validations)
}