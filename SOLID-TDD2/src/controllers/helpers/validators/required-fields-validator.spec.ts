import { MissingParamError } from "../../errors"
import { RequiredFieldValidator } from "./required-field-validator"

describe('RequiredFields Validator', () => {
    it('Should return an error if no name was provide', () => {
        const sut = new RequiredFieldValidator('name')
        const httpRequest = {
            email: 'any_mail',
            password: 'any_password',
            confirmPassword: 'any_password'
        }
        const error = sut.validate(httpRequest)
        expect(error).toEqual(new MissingParamError('name'))
    })
    it('Should return an error if no email was provide', () => {
        const sut = new RequiredFieldValidator('email')
        const httpRequest = {
            name: 'any_name',
            password: 'any_password',
            confirmPassword: 'any_password'
        }
        const error = sut.validate(httpRequest)
        expect(error).toEqual(new MissingParamError('email'))
    })
})