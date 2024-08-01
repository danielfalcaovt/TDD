import { InvalidParamError } from "../../errors/invalid-param-error";
import { IEmailValidator, IValidation } from "../../protocols";

export class EmailValidation implements IValidation {
    constructor(private readonly emailValidator: IEmailValidator) {}
    validate(data: any): Error | null {
        if (!this.emailValidator.isValid(data.email)) {
            return new InvalidParamError('email')
        }
        return null
    }
}