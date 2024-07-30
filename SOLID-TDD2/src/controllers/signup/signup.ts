import { IAddAccount } from "../../domain/models/add-account";
import { Controller, HttpRequest, HttpResponse, IValidation, badRequest, ok, serverError } from './signup-protocols'

export class SignUpController implements Controller {
    constructor(
        private readonly validator: IValidation,
        private readonly addAccount: IAddAccount
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)
            if (error) {
                return new Promise(resolve => resolve(badRequest(error)))
            }
            const { confirmPassword, ...account } = httpRequest.body
            const user = await this.addAccount.add(account)
            return new Promise(resolve => resolve(ok(user)))
        } catch(err) {
            return new Promise(resolve => resolve(serverError()))
        }
    }
}