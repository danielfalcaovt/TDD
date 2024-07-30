import { InvalidParamError } from "../../errors/invalid-param-error"
import { IEmailValidator, IValidation } from "../../protocols"
import { EmailValidator } from "./email-validation"

interface SutTypes {
    sut: IValidation
    emailValidatorStub: IEmailValidator
}

const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidatorStub()
    const sut = new EmailValidator(emailValidatorStub)
    return {
        sut,
        emailValidatorStub
    }
}

const makeEmailValidatorStub = () => {
    class EmailValidatorStub implements IEmailValidator {
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

describe('EmailValidator', () => {
    const randomMail = { email: 'any_mail@mail.com' }
    it('Should call validate with correct values', () => {
        const { sut, emailValidatorStub } = makeSut()
        const validateSpy = jest.spyOn(emailValidatorStub, 'isValid')
        sut.validate(randomMail)
        expect(validateSpy).toHaveBeenCalledWith(randomMail)
    })
    it('Should return an error if emailValidator fails', () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const error = sut.validate(randomMail)
        expect(error).toEqual(new InvalidParamError('email'))
    })
    it('Should throw if emailValidator throws', () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error()
        })
        expect(sut.validate).toThrow()
    })
})