import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if (!httpRequest.body.name) {
            return new Promise(resolve =>{
                resolve({
                    body: 'missing param: name',
                    statusCode: 400
                })
            })
        }
        return new Promise(resolve => resolve(null))
    }
}