import { IAddAccount, IAddAccountModel } from "../../../data/protocols/db/add-account"
import { IAccountModel } from "../../../domain/models/account"
import { MissingParamError, badRequest, ok, serverError, IValidation } from "./signup-protocols"
import { SignUpController } from "./signup"
import { PgHelper } from "../../../infra/db/helpers/pg-helper"

interface SutTypes {
    sut: SignUpController
    validatorStub: IValidation
    addAccountStub: IAddAccount
}

const makeSut = (): SutTypes => {
    const validatorStub = makeValidatorStub()
    const addAccountStub = makeAddAccountStub()
    const sut = new SignUpController(validatorStub, addAccountStub)
    return {
        sut,
        validatorStub,
        addAccountStub
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

const makeAddAccountStub = (): IAddAccount => {
    class AddAccountStub implements IAddAccount {
        constructor(private readonly salt: number) {}
        add(account: IAddAccountModel): Promise<IAccountModel> {
            return new Promise(resolve => resolve({
                id: 'valid_id',
                name: 'any_name',
                email: 'valid_mail@mail.com',
                password: 'valid_password'
            }))
        }
    }
    return new AddAccountStub(12)
}

const makeFakeAccount = (): IAddAccountModel => ({
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password'
})

const makeFakeRequest = () => ({
    body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password'
    }
})
describe('SignUp CTL', () => {
    beforeAll(async () => {
        PgHelper.connect().then(() => {
            return
        })
    })

    afterEach(async () => {
        PgHelper.query('DELETE FROM users').then(() => {
            return
        })
    })
    
    afterAll(async () => {
        PgHelper.disconnect().then(() => {
            return
        })
    })

    it('Should return error if validation returns an error', async () => {
        const { sut, validatorStub } = makeSut()
        jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('name'))
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
    })
    it('Should return 500 if validation throws', async () => {
        const { sut, validatorStub } = makeSut()
        jest.spyOn(validatorStub, 'validate').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError())
    })
    it('Should call addAccount with correct values', async () => {
        const { sut, addAccountStub } = makeSut()
        const addSpy = jest.spyOn(addAccountStub, 'add')
        await sut.handle(makeFakeRequest())
        expect(addSpy).toHaveBeenCalledWith(makeFakeAccount())
    })
    it('Should return an account on addAccount succeed', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok({
            id: 'valid_id',
            name: 'any_name',
            email: 'valid_mail@mail.com',
            password: 'valid_password'
        }))
    })
    it('Should return 500 if addAccount throws', async () => {
        const { sut, addAccountStub } = makeSut()
        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError())
    })
})