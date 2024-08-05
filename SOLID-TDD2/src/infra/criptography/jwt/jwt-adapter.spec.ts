import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'
import { PgHelper } from '../../db/helpers/pg-helper'

jest.mock('jsonwebtoken', () => ({
    sign() {
        return new Promise(resolve => resolve('any_token'))
    }
}))

describe('JwtAdapter', () => {
    const jwtSecret = 'secret'
    beforeAll(async () => {
        PgHelper.connect().then(() => {
            return
        })
    })

    beforeEach(async () => {
        PgHelper.query('DELETE FROM users').then(() => {
            return
        })
    })

    afterAll(async () => {
        PgHelper.disconnect().then(() => {
            return
        })
    })
    it ('Should call sign with correct values', async () => {
        const sut = new JwtAdapter(jwtSecret)
        const signSpy = jest.spyOn(jwt, 'sign')
        await sut.generate('any_id')
        expect(signSpy).toHaveBeenCalledWith({id: 'any_id'}, jwtSecret)
    })
    it('Should throw if sign throws', async () => {
        const sut = new JwtAdapter(jwtSecret)
        jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                reject(new Error())
            })
        })
        const response =  sut.generate('any_id')
        await expect(response).rejects.toThrow()
    })
    it('Should return an token on succeed', async () => {
        const sut = new JwtAdapter(jwtSecret)
        const response = await sut.generate('any_id')
        expect(response).toBe('any_token')
    })
})