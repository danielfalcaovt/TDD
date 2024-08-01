import { IAddAccountModel } from "../../../../data/protocols/db/add-account"
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
    describe('add', () => {

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
    describe('LoadByEmail', () => {
        it('Should call query with correct values', async () => {
            const sut = makeSut()
            const querySpy = jest.spyOn(PgHelper, 'query')
            await sut.load('any_mail@mail.com')
            expect(querySpy).toHaveBeenCalledWith(expect.anything(), ['any_mail@mail.com'])
        })
        it('Should not return if query return null', async () => {
            const sut = makeSut()
            const response = await sut.load('any_mail@mail.com')
            expect(response).toBeFalsy()
        })
        it('Should return an account if query returns an account', async () => {
            PgHelper.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3)', ['any_name', 'any_mail@mail.com', 'hashed_password'])
                .then(async () => {
                    const sut = makeSut()
                    const response = await sut.load('any_mail@mail.com')
                    expect(response?.id).toBeTruthy()
                    expect(response?.email).toBe('any_mail@mail.com')
                })
        })
    })

    describe('UpdateAccessToken', () => {
        it('Should call query with correct values', async () => {
            const sut = makeSut()
            const querySpy = jest.spyOn(PgHelper, 'query')
            PgHelper.query('SELECT * FROM users WHERE email = $1', ['any_mail@mail.com']).then(async (user) => {
                await sut.update('any_id', 'any_token')
                expect(querySpy).toHaveBeenLastCalledWith(expect.anything(), [user?.rows[0].id, 'any_token'])
            })
        })
    })
})