import { EmailValidation } from "../../controllers/helpers/validators/email-validation"
import { EmailValidator } from "./email-validator"

describe('EmailValidator', () => {
    it ('Should return true if isEmail returns true', async () => {
        const sut = new EmailValidator()
        const response = sut.isValid('any_mail@mail.com')
        expect(response).toBe(true)
    })
})