import { PasswordChecker, PasswordErrors } from "../../app/password_checker/password"

describe('Password Checker', () => {
    let sut: PasswordChecker

    beforeEach(() => {
        sut = new PasswordChecker()
    })

    it('Should return false if password has less than 8 characters', () => {
        const request = '1234567'
        const actual = sut.check(request)
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.SHORT)
    })
    
    it('Should return false if password has not uppercase letter', () => {
        const request = 'invalid_password'
        const actual = sut.check(request)
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.UPPERCASE)
    })

    it ('Should return false if password has not lowercase letter', () => {
        const request = 'INVALID_PASSWORD'
        const actual = sut.check(request)
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.LOWERCASE)
    })

    it('Should return true if password is ok', () => {
        const request = 'valid_Password1'
        const actual = sut.check(request)
        expect(actual.valid).toBe(true)
        expect(actual.reasons).toHaveLength(0)
    })

})