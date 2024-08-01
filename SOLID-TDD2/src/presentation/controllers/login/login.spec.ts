import { AuthenticationModel, IAuthentication } from "../../../domain/usecases/authentication"
import { MissingParamError } from "../../errors"
import { badRequest, serverError } from "../../helpers"
import { HttpRequest, IValidation } from "../../protocols"
import { LoginController } from "./login"

interface SutTypes {
    sut: LoginController
    authenticationStub: IAuthentication
    validationStub: IValidation
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidationStub()
    const authenticationStub = makeAuthenticationStub()
    const sut = new LoginController(validationStub, authenticationStub)
    return {
        sut,
        validationStub,
        authenticationStub
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

const makeAuthenticationStub = (): IAuthentication => {
    class AuthenticationStub implements IAuthentication {
        authenticate(account: AuthenticationModel): Promise<string> {
            return new Promise(resolve => resolve('any_token'))
        }
    }
    return new AuthenticationStub()
}

const makeFakeRequest = (): HttpRequest => ({
    body: {
        email: 'any_name',
        password: 'any_password'
    }
})

describe('Login', () => {
    it('Should return an error if validation fail', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('param'))
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(badRequest(new MissingParamError('param')))
    })
    it('Should call validation with correct parameters', async () => {
        const { sut, validationStub } = makeSut()
        const validationSpy = jest.spyOn(validationStub, 'validate')
        await sut.handle(makeFakeRequest())
        expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest().body)
    })
    it('Should return 500 if validation throws', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError())
    })
    it('Should call authentication with correct values', async () => {
        const { sut, authenticationStub } = makeSut()
        const authSpy = jest.spyOn(authenticationStub, 'authenticate')
        await sut.handle(makeFakeRequest())
        expect(authSpy).toHaveBeenCalledWith(makeFakeRequest().body)
    })
})