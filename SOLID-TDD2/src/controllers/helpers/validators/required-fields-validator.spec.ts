import { MissingParamError } from "../../errors"
import { RequiredFieldValidator } from "./required-field-validator"

describe('RequiredFields Validator', () => {
    it('Should return an error if no field was provide', () => {
        const sut = new RequiredFieldValidator('field')
        const httpRequest = {
            email: 'any_mail',
            password: 'any_password',
            confirmPassword: 'any_password'
        }
        const error = sut.validate(httpRequest)
        expect(error).toEqual(new MissingParamError('field'))
    })
})