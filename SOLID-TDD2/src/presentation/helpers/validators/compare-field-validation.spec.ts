import { InvalidParamError } from "../../errors/invalid-param-error"
import { CompareFieldsValidation } from "./compare-field-validation"

describe('CompareFields Validation', () => {
    it('Should return an error if fields are distinct', () => {
        const sut = new CompareFieldsValidation('firstField', 'secondField')
        const request = {
            firstField: 'any_value',
            secondField: 'distinct_value'
        }
        const response = sut.validate(request)
        expect(response).toEqual(new InvalidParamError('secondField'))
    })
    it ('Should not return if fields are equal', () => {
        const sut = new CompareFieldsValidation('firstField', 'secondField')
        const request = {
            firstField: 'any_value',
            secondField: 'any_value'
        }
        const response = sut.validate(request)
        expect(response).toBeFalsy()
    })
})