import validator from "validator";
import { IEmailValidator } from "../../controllers/protocols";

export class EmailValidator implements IEmailValidator {
    isValid(email: string): boolean {
        return validator.isEmail(email)
    }
}