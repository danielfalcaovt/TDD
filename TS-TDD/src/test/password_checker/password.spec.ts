import { PasswordChecker } from "../../app/password_checker/password"

describe('Password Checker', () => {
    let sut: PasswordChecker

    beforeEach(() => {
        sut = new PasswordChecker()
    })

    it('Should return false if password has less than 8 characters', () => {
        const request = '1234567'
        const actual = sut.check(request)
        expect(actual).toBe(false)
    })
    
    it('Should return false if password has not uppercase letter', () => {
        const request = 'invalid_password'
        const actual = sut.check(request)
        expect(actual).toBe(false)
    })
})