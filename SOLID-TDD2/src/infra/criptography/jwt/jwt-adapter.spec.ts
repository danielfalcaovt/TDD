import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

describe('JwtAdapter', () => {
    const jwtSecret = 'secret'
    it ('Should call sign with correct values', async () => {
        const sut = new JwtAdapter(jwtSecret)
        const signSpy = jest.spyOn(jwt, 'sign')
        await sut.generate('any_id')
        expect(signSpy).toHaveBeenCalledWith({id: 'any_id'}, jwtSecret)
    })
})