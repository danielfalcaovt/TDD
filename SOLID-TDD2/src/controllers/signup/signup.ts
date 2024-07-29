import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http-helpers";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if (!httpRequest.body.name) {
            return new Promise(resolve => resolve(badRequest(new MissingParamError('name'))))
        }
        return new Promise(resolve => resolve({statusCode: 200}))
    }
}