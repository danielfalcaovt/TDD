import { PgHelper } from "../../../infra/db/helpers/pg-helper"
import { ValidationComposite } from "../../../presentation/helpers"
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation"
import { PasswordValidation } from "../../../presentation/helpers/validators/password-validation"
import { RequiredFieldValidator } from "../../../presentation/helpers/validators/required-field-validator"
import { IEmailValidator, IValidation } from "../../../presentation/protocols"
import { makeLoginValidation } from "./login-validation"

jest.mock('../../../presentation/helpers')

describe('Make Login Validation', () => {
    beforeAll(async () => {
        PgHelper.connect().then(() => {
            return
        })
    })
    beforeEach(async () => {
        PgHelper.query('DELETE FROM users').then(() => {
            return
        })
    })
    afterAll(async () => {
        PgHelper.disconnect().then(() => {
            return
        })
    })
    it('Should call Validation Composite with correct values', async () => {
        makeLoginValidation()
        class EmailValidatorStub implements IEmailValidator {
            isValid(email: string): boolean {
                return true
            }
        }
        const emailValidatorStub = new EmailValidatorStub()
        const validations: IValidation[] = []
        for (const pos of ['email', 'password']) {
            validations.push(new RequiredFieldValidator(pos))
        }
        validations.push(new EmailValidation(emailValidatorStub))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})