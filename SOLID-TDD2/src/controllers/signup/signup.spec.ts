import { MissingParamError } from "../errors/missing-param-error"
import { badRequest } from "../helpers/http-helpers"
import { SignUpController } from "./signup"

const makeSut = () => {
    const sut = new SignUpController()
    return sut
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
    it("Should return 400 if no name was provide", async () => {
        const sut = makeSut()
        const httpRequest = {
            body: {
                email: 'any_mail@mail.com',
                password: 'any_password',
                confirmPassword: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
    })
})