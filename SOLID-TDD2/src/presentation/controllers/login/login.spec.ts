import { AuthenticationModel, IAuthentication } from "../../../domain/usecases/authentication"
import { MissingParamError } from "../../errors"
import { badRequest, ok, serverError, unauthorized } from "../../helpers"
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
    it('Should return 401 if invalid credentials', async () => {
        const { sut, authenticationStub } = makeSut()
        jest.spyOn(authenticationStub, 'authenticate').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(unauthorized())
    })
    it('Should return 500 if authentication throws', async () => {
        const { sut, authenticationStub } = makeSut()
        jest.spyOn(authenticationStub, 'authenticate').mockReturnValueOnce(new Promise((resolve, reject) => {
            reject(new Error())
        }))
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError())
    })
    it('Should return an token if authentication succeed', async () => {
        const { sut, authenticationStub } = makeSut()
        const response = await sut.handle(makeFakeRequest())
        expect(response).toEqual(ok('any_token'))
    })
})