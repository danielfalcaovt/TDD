import { MissingParamError } from "../errors/missing-param-error"
import { badRequest } from "../helpers/http-helpers"

const makeSut = () => {
    const sut = new SignUpController()
    return sut
}

const makeFakeRequest = () => ({
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password',
    confirmPassword: 'any_password'
})
describe('SignUp CTL', () => {
    it("Should return 400 if no name was provide", async () => {
        const sut = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
    })
})