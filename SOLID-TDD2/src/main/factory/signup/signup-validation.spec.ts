import { ValidationComposite } from "../../../controllers/helpers"
import { EmailValidation } from "../../../controllers/helpers/validators/email-validation"
import { PasswordValidation } from "../../../controllers/helpers/validators/password-validation"
import { RequiredFieldValidator } from "../../../controllers/helpers/validators/required-field-validator"
import { IEmailValidator, IValidation } from "../../../controllers/protocols"
import { makeSignUpValidation } from "./signup-validation"

jest.mock('../../../controllers/helpers')

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