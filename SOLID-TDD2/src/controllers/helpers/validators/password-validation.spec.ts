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
    it('Should return an error if password has not lowercase letter', () => {
        const sut = new PasswordValidation(8)
        const request = {
            password: 'INVALID_PASSWORD'
        }
        const response = sut.validate(request)
        expect(response).toEqual(new InvalidParamError('password lowercase'))
    })
    it('Should return an error if password has not special character', () => {
        const sut = new PasswordValidation(8)
        const request = {
            password: 'Invalidpassword'
        }
        const response = sut.validate(request)
        expect(response).toEqual(new InvalidParamError('password scharacter'))
    })
    it('Should return true if password has special character', () => {
        const sut = new PasswordValidation(8)
        const request = {
            password: 'Valid_Password@'
        }
        const response = sut.validate(request)
        expect(response).toBeFalsy()
    })
})