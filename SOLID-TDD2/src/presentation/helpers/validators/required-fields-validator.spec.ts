import { MissingParamError } from "../../errors"
import { RequiredFieldValidator } from "./required-field-validator"

describe('RequiredFields Validator', () => {
    it('Should return an error if no field was provide', () => {
        const sut = new RequiredFieldValidator('field')
        const request = {
            email: 'any_mail',
            password: 'any_password',
            confirmPassword: 'any_password'
        }
        const error = sut.validate(request)
        expect(error).toEqual(new MissingParamError('field'))
    })
    it('Should return null if field was provide', () => {
        const sut = new RequiredFieldValidator('field')
        const request = {
            field: 'any_field'
        }
        const error = sut.validate(request)
        expect(error).toBeFalsy()
    })
})