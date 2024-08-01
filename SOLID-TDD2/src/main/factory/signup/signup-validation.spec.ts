import { ValidationComposite } from "../../../presentation/helpers"
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation"
import { PasswordValidation } from "../../../presentation/helpers/validators/password-validation"
import { RequiredFieldValidator } from "../../../presentation/helpers/validators/required-field-validator"
import { IEmailValidator, IValidation } from "../../../presentation/protocols"
import { makeSignUpValidation } from "./signup-validation"

jest.mock('../../../presentation/helpers')

describe('Make Signup Validation', () => {
    it('Should call Validation Composite with correct values', async () => {
        const minimumPasswordLength = 8
        makeSignUpValidation(minimumPasswordLength)
        class EmailValidatorStub implements IEmailValidator {
            isValid(email: string): boolean {
                return true
            }
        }
        const emailValidatorStub = new EmailValidatorStub()
        const validations: IValidation[] = []
        for (const pos of ['name', 'email', 'password', 'confirmPassword']) {
            validations.push(new RequiredFieldValidator(pos))
        }
        validations.push(new EmailValidation(emailValidatorStub))
        validations.push(new PasswordValidation(minimumPasswordLength))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})