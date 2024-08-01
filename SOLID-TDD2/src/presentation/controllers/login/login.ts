import { IAuthentication } from "../../../domain/usecases/authentication";
import { badRequest, serverError } from "../../helpers";
import { Controller, HttpRequest, HttpResponse, IValidation } from "../../protocols";

export class LoginController implements Controller {
    constructor(
        private readonly validation: IValidation,
        private readonly authenticator: IAuthentication
    ){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = await this.validation.validate(httpRequest.body)
            if (error) {
                return new Promise(resolve => resolve(badRequest(error)))
            }
            return new Promise(resolve => resolve({statusCode:200}))
        } catch(err: any) {
            console.log(err)
            return serverError()
        }
    }
}