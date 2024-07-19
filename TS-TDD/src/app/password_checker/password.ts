interface IPasswordChecker {
    check(password: string): CheckResult
}

export enum PasswordErrors {
    SHORT='Password should have more than 8 characters.',
    LOWERCASE='Password should have a lowercase.',
    UPPERCASE='Password should have a uppercase.'
}

interface CheckResult {
    valid: boolean
    reasons: PasswordErrors[]
}

export class PasswordChecker implements IPasswordChecker {
    check(password: string): CheckResult {
        const reasons: PasswordErrors[] = []
        if (password.length < 8) {
            reasons.push(PasswordErrors.SHORT)
        }

        if (password === password.toLowerCase()) {
            reasons.push(PasswordErrors.UPPERCASE)
        }

        if (password === password.toUpperCase()) {
            reasons.push(PasswordErrors.LOWERCASE)
        }

        return {
            valid: reasons.length > 0 ? false : true,
            reasons
        }
    }
}