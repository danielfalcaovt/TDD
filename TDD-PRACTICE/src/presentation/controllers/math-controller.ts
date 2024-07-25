import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class MathController implements Controller {
    handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        for (const pos of ['num1', 'num2']) {
            if (!httpRequest.body[pos]) {
                return new Promise(resolve => resolve({
                    statusCode: 400,
                    body: new Error('Missing param.')
                }))
            }
        }
    }
}