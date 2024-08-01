import { IAddAccountModel } from "../../../../data/protocols/add-account"
import { PgHelper } from "../../helpers/pg-helper"
import { PgAccountRepository } from "./account-repository"
import pg from 'pg'

const makeSut = (): PgAccountRepository => {
    const sut = new PgAccountRepository()
    return sut
}

const makeFakeAccount = (): IAddAccountModel => ({
    email: 'any_mail@mail.com',
    name: 'any_name',
    password: 'hashed_password'
})

describe('PgAccountRepository', () => {
    beforeAll(async () => {
        PgHelper.connect()
    })
    afterEach(async () => {
        await PgHelper.query('DELETE FROM users')
    })
    afterAll(async () => {
        PgHelper.disconnect()
    })
    it('Should return an account on succeed', async () => {
        const sut = makeSut()
        const account = await sut.add(makeFakeAccount())
        expect(account.id).toBeTruthy()
        expect(account.email).toBe('any_mail@mail.com')
        expect(account.name).toBe('any_name')
        expect(account.password).toBe('hashed_password')
    })
    it('Should throw if query throws', async () => {
        const sut = makeSut()
        jest.spyOn(pg, 'Pool').mockImplementationOnce(() => {
            throw new Error()
        })
        const promise = sut.add(makeFakeAccount())
        expect(promise).rejects.toThrow()
    })
})