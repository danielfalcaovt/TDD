import { ValidationComposite } from "../../../controllers/helpers"
import { EmailValidation } from "../../../controllers/helpers/validators/email-validation"
import { PasswordValidation } from "../../../controllers/helpers/validators/password-validation"
import { RequiredFieldValidator } from "../../../controllers/helpers/validators/required-field-validator"
import { IValidation } from "../../../controllers/protocols"
import { EmailValidator } from "../../../utils/email-validator/email-validator"

export const makeSignUpValidation = (minimumPasswordLength: number): ValidationComposite => {
    const validations: IValidation[] = []
    for (const pos of ['name', 'email', 'password', 'confirmPassword']) {
        validations.push(new RequiredFieldValidator(pos))
    }
    const emailValidator = new EmailValidator()
    validations.push(new EmailValidation(emailValidator))
    validations.push(new PasswordValidation(minimumPasswordLength))
    return new ValidationComposite(validations)
}