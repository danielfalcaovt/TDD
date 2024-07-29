import { MissingParamError } from "../errors/missing-param-error"
import { badRequest } from "../helpers/http/http-helpers"
import { IValidation } from "../protocols/validator"
import { SignUpController } from "./signup"

interface SutTypes {
    sut: SignUpController
    validatorStub: IValidation
}

const makeSut = (): SutTypes => {
    const validatorStub = makeValidatorStub()
    const sut = new SignUpController(validatorStub)
    return {
        sut,
        validatorStub
    }
}

const makeValidatorStub = (): IValidation => {
    class ValidatorStub implements IValidation {
        validate(data: any): Error | null {
            return null
        }
    }
    return new ValidatorStub()
}

const makeFakeRequest = () => ({
    body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password'
    }
})
describe('SignUp CTL', () => {
    it('Should return error if validation returns an error', async () => {
        const { sut, validatorStub }= makeSut()
        jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('name'))
        const httpRequest = await sut.handle(makeFakeRequest())
        expect(httpRequest).toEqual(badRequest(new MissingParamError('name')))
    })
})