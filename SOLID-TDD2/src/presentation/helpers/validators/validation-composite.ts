import { IValidation } from "../../protocols/validator";

export class ValidationComposite implements IValidation {
    constructor(private readonly validations: IValidation[]) {}

    validate(data: any): Error | null {
        for (const validation of this.validations) {
            const error = validation.validate(data)
            if (error !== null) {
                return error
            }
        }
        return null
    }
}