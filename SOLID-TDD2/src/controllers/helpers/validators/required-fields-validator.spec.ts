import { MissingParamError } from "../../errors"
import { RequiredFieldValidator } from "./required-field-validator"

describe('RequiredFields Validator', () => {
    it('Should return an error if no name was provide', () => {
        const sut = new RequiredFieldValidator('name')
        const httpRequest = {
            body: {
                email: 'any_mail',
                password: 'any_password',
                confirmPassword: 'any_password'
            }
        }
        const error = sut.validate(httpRequest)
        expect(error).toEqual(new MissingParamError('name'))
    })
})