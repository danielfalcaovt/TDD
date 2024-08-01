import { AuthenticationModel, IAuthentication } from "../../../domain/usecases/authentication"
import { MissingParamError } from "../../errors"
import { badRequest } from "../../helpers"
import { IValidation } from "../../protocols"
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

describe('Login', () => {
    it('Should return an error if validation fail', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('param'))
        const httpRequest = {
            body: {
                email: 'any_name',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('param')))
    })
})