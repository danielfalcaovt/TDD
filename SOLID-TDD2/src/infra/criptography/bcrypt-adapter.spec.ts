import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
    hash() {
        return new Promise(resolve => resolve('hashed_value'))
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
})