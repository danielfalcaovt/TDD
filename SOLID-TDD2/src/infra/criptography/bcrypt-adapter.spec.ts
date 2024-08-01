import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
    hash() {
        return new Promise(resolve => resolve('hashed_value'))
    },
    compare() {
        return new Promise(resolve => resolve(true))
    }
}))

const salt = 12

describe('Bcrypt Adapter', () => {
    it('Should call hash with correct values', async () => {
        const sut = new BcryptAdapter(salt)
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.hash('any_value')
        expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })
    it('Should throw if hash throws', async () => {
        const sut = new BcryptAdapter(salt)
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
            throw new Error()
        })
        const promise = sut.hash('any_value')
        expect(promise).rejects.toThrow()
    })
    it('Should return hashed value on succeed', async () => {
        const sut = new BcryptAdapter(salt)
        const hash = await sut.hash('any_value')
        expect(hash).toBe('hashed_value')
    })
    it('Should call compare with correct values', async () => {
        const sut = new BcryptAdapter(salt)
        const compareSpy = jest.spyOn(bcrypt, 'compare')
        await sut.compare('any_value', 'hashed_value')
        expect(compareSpy).toHaveBeenCalledWith('any_value', 'hashed_value')
    })
    it('Should return false if compare fails', async () => {
        const sut = new BcryptAdapter(salt)
        jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
            return new Promise(resolve => resolve(false))
        })
        const comparison = await sut.compare('any_value', 'another_value')
        expect(comparison).toBe(false)
    })
})