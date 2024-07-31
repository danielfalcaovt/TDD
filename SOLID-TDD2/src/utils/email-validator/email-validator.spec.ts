import { EmailValidator } from "./email-validator"
import validator from "validator"

describe('EmailValidator', () => {
    it ('Should return true if isEmail returns true', async () => {
        const sut = new EmailValidator()
        const response = sut.isValid('any_mail@mail.com')
        expect(response).toBe(true)
    })
    it('Should return false if isEmail returns false', async () => {
        const sut = new EmailValidator()
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
        const response = sut.isValid('any_mail')
        expect(response).toBe(false)
    })
})