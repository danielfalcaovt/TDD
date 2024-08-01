import validator from "validator";
import { IEmailValidator } from "../../presentation/protocols";

export class EmailValidator implements IEmailValidator {
    isValid(email: string): boolean {
        return validator.isEmail(email)
    }
}