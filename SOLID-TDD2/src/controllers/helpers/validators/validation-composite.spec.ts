import { MissingParamError } from "../../errors/missing-param-error"
import { IValidation } from "../../protocols/validator"
import { ValidationComposite } from "./validation-composite"

interface SutTypes {
    validators: IValidation[]
    sut: ValidationComposite
}

const makeSut = (): SutTypes => {
    const validators: IValidation[] = []
    validators.push(makeValidationStub())
    validators.push(makeValidationStub())
    const sut = new ValidationComposite(validators)
    return {
        sut,
        validators
    }
}

const makeValidationStub = (): IValidation => {
    class ValidationStub implements IValidation {
        validate(data: any): Error | null {
            return null
        }
    }
    return new ValidationStub()
}

describe('Validation Composite', () => {
    it('Should return an error if any validation fail', () => {
        const { sut, validators } = makeSut()
        jest.spyOn(validators[0], 'validate').mockReturnValueOnce(new Error())
        const error = sut.validate({ field: 'any_field' })
        expect(error).toEqual(new Error())
    })
    it('Should return the first error if more than one validation fails', () => {
        const { sut, validators } = makeSut()
        jest.spyOn(validators[0], 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
        jest.spyOn(validators[1], 'validate').mockReturnValueOnce(new Error())
        const error = sut.validate({ field: 'any_field' })
        expect(error).toEqual(new MissingParamError('any_param'))
    })
    it('Should throw if any validation throws', () => {
        const { sut, validators } = makeSut()
        jest.spyOn(validators[0], 'validate').mockImplementationOnce(() => {
            throw new Error()
        })
        expect(sut.validate).toThrow()
    })
})