import { InvalidParamError } from "../../errors/invalid-param-error";
import { IValidation } from "../../protocols";

export class CompareFieldsValidation implements IValidation {
    constructor (
        private readonly firstField: string,
        private readonly secondField: string
    ){}

    validate(data: any): Error | null {
        if (data[this.firstField] !== data[this.secondField]) {
            return new InvalidParamError(this.secondField)
        }
        return null
    }
}