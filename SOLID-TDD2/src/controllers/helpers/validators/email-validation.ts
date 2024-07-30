import { InvalidParamError } from "../../errors/invalid-param-error";
import { IEmailValidator, IValidation } from "../../protocols";

export class EmailValidator implements IValidation {
    constructor(private readonly emailValidator: IEmailValidator) {}
    validate(data: any): Error | null {
        if (!this.emailValidator.isValid(data)) {
            return new InvalidParamError('email')
        }
        return null
    }
}