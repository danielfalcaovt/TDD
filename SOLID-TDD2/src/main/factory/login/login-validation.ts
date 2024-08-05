import { ValidationComposite } from "../../../presentation/helpers";
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation";
import { RequiredFieldValidator } from "../../../presentation/helpers/validators/required-field-validator";
import { IValidation } from "../../../presentation/protocols";
import { EmailValidator } from "../../../utils/email-validator/email-validator";

export const makeLoginValidation = (): IValidation => {
    const validations: IValidation[] = []
    for (const pos of ['email', 'password']) {
        validations.push(new RequiredFieldValidator(pos))
    }
    validations.push(new EmailValidation(new EmailValidator()))
    const validation = new ValidationComposite(validations)
    return validation
}