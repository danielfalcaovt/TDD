import { InvalidParamError } from "../../errors/invalid-param-error";
import { IValidation } from "../../protocols";

export class PasswordValidation implements IValidation {
    constructor(private readonly minLength: number) {}
    validate(data: any): Error | null {
        if (data.password.length < this.minLength) {
            return new InvalidParamError('password length')
        }

        if (data.password.toLowerCase() ===  data.password) {
            return new InvalidParamError('password uppercase')
        }

        if (data.password.toUpperCase() === data.password) {
            return new InvalidParamError('password lowercase')
        }

        return null
    }
}