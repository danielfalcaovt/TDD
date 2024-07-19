interface IPasswordChecker {
    check(password: string): boolean
}

export class PasswordChecker implements IPasswordChecker {
    private readonly uppercaseRegex = /[A-Z]/g
    private readonly lowercaseRegex = /[a-z]/g
    check(password: string): boolean {
        if (password.length < 8) {
            return false
        }

        if (!this.uppercaseRegex.test(password)) {
            return false
        }

        if (!this.lowercaseRegex.test(password)) {
            return false
        }
    }
}