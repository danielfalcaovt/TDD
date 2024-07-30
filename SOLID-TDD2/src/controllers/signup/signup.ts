import { IAddAccount } from "../../domain/models/add-account";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest, ok, serverError } from "../helpers/http/http-helpers";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { IValidation } from "../protocols/validator";

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