import { IAddAccount } from "../../domain/models/add-account";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http/http-helpers";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { IValidation } from "../protocols/validator";

export class SignUpController implements Controller {
    constructor(
        private readonly validator: IValidation,
        private readonly addAccount: IAddAccount
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const error = this.validator.validate(httpRequest.body)
        if (error) {
            return new Promise(resolve => resolve(badRequest(error)))
        }

        const { confirmPassword, ...account } = httpRequest.body
        await this.addAccount.add(account)
        return new Promise(resolve => resolve({statusCode: 200}))
    }
}