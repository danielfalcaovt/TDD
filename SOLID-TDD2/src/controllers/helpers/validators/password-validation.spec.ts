import { InvalidParamError } from "../../errors/invalid-param-error"
import { PasswordValidation } from "./password-validation"

describe('PasswordValidation', () => {
    it ('Should return an error if password has not enough length', () => {
        const sut = new PasswordValidation(8)
        const request = {
            password: 'invalid'
        }
        const response = sut.validate(request)
        expect(response).toEqual(new InvalidParamError('password length'))
    })
    it('Should return an error if password has not uppercase letter', () => {
        const sut = new PasswordValidation(8)
        const request = {
            password: 'invalid_password'
        }
        const response = sut.validate(request)
        expect(response).toEqual(new InvalidParamError('password uppercase'))
    })
})