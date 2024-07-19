interface IPasswordChecker {
    check(password: string): boolean
}

export class PasswordChecker implements IPasswordChecker {
    check(password: string): boolean {
        if (password.length < 8) {
            return false
        }

        if (password === password.toLowerCase()) {
            return false
        }

        if (password === password.toUpperCase()) {
            return false
        }
    }
}