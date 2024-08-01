import { hash } from "bcrypt"
import { AuthenticationModel } from "../../../domain/usecases/authentication"
import { PgHelper } from "../../../infra/db/helpers/pg-helper"
import { HttpRequest } from "../../../presentation/protocols"
import { IHashComparer } from "../../protocols/criptography/icomparer"
import { ITokenGenerator } from "../../protocols/criptography/itoken-generator"
import { ILoadByEmail } from "../../protocols/db/load-by-email"
import { IUpdateAccessToken } from "../../protocols/db/update-access-token"
import { IAccountModel } from "../add-account/db-add-account-protocols"
import { DbAuthentication } from "./db-authentication"

interface SutTypes {
    sut: DbAuthentication
    LoadByEmail: ILoadByEmail
    HashComparer: IHashComparer
    TokenGenerator: ITokenGenerator
    UpdateAccessToken: IUpdateAccessToken
}

const makeSut = (): SutTypes => {
    const LoadByEmail = makeLoadByEmailStub()
    const HashComparer = makeHashComparer()
    const TokenGenerator = makeTokenGeneratorStub()
    const UpdateAccessToken = makeUpdateAccess()
    const sut = new DbAuthentication(LoadByEmail, HashComparer, TokenGenerator, UpdateAccessToken)
    return {
        sut,
        LoadByEmail,
        HashComparer,
        TokenGenerator,
        UpdateAccessToken
    }
}

const makeLoadByEmailStub = (): ILoadByEmail => {
    class LoadByEmailStub implements ILoadByEmail {
        load(email: string): Promise<IAccountModel | null> {
            return new Promise(resolve => resolve({
                email: 'any_mail@mail.com',
                id: 'any_id',
                name: 'any_name',
                password: 'hashed_password'
            }))
        }
    }
    return new LoadByEmailStub()
}

const makeHashComparer = (): IHashComparer => {
    class HashComparerStub implements IHashComparer {
        compare(value: string, valueToCompare: string): Promise<boolean> {
            return new Promise(resolve => resolve(true))
        }
    }
    return new HashComparerStub()
}

const makeTokenGeneratorStub = (): ITokenGenerator => {
    class TokenGeneratorStub implements ITokenGenerator {
        generate(id: string): Promise<string> {
            return new Promise(resolve => resolve('any_token'))
        }
    }
    return new TokenGeneratorStub()
}

const makeUpdateAccess = (): IUpdateAccessToken => {
    class UpdateAccessTokenStub implements IUpdateAccessToken {
        update(id: string, token: string): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new UpdateAccessTokenStub()
}

const makeFakeRequest = (): AuthenticationModel => ({
    email: "any_mail",
    password: "any_password"
})

describe('DbAuthentication', () => {
    beforeAll(async () => {
        PgHelper.connect()
    })

    afterAll(async () => {
        PgHelper.disconnect()
    })

    it('Should call loadByEmail with correct value', async () => {
        const { sut, LoadByEmail } = makeSut()
        const loadSpy = jest.spyOn(LoadByEmail, 'load')
        await sut.authenticate(makeFakeRequest())
        expect(loadSpy).toHaveBeenCalledWith(makeFakeRequest().email)
    })
    it('Should not return if loadByEMail return null', async () => {
        const { sut, LoadByEmail } = makeSut()
        jest.spyOn(LoadByEmail, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const response = await sut.authenticate(makeFakeRequest())
        expect(response).toBeFalsy()
    })
    it('Should throw if loadByEmail throws', async () => { 
        const { sut, LoadByEmail } = makeSut()
        jest.spyOn(LoadByEmail, 'load').mockImplementationOnce(() => {
            throw new Error()
        })
        const promise = sut.authenticate(makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })
    it('Should call HashComparer with correct values', async () => {
        const { sut, HashComparer } = makeSut()
        const compareSpy = jest.spyOn(HashComparer, 'compare')
        await sut.authenticate(makeFakeRequest())
        expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
    })
    it('Should not return if HashComparer returns false', async () => {
        const { sut, HashComparer } = makeSut()
        jest.spyOn(HashComparer, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
        const response = await sut.authenticate(makeFakeRequest())
        expect(response).toBeFalsy()
    })
})