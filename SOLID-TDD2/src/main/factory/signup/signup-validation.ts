import { ValidationComposite } from "../../../presentation/helpers"
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation"
import { PasswordValidation } from "../../../presentation/helpers/validators/password-validation"
import { RequiredFieldValidator } from "../../../presentation/helpers/validators/required-field-validator"
import { IValidation } from "../../../presentation/protocols"
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