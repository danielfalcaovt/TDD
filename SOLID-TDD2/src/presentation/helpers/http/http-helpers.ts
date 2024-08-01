import { ServerError } from "../../errors/server-error";
import { Unauthorized } from "../../errors/unauthorized";
import { HttpResponse } from "../../protocols/http";

export const badRequest = (error: Error): HttpResponse => {
    return {
        body: error,
        statusCode: 400
    }
}

export const serverError = (): HttpResponse => ({
    body: new ServerError(),
    statusCode: 500
})

export const ok = (data: any): HttpResponse => ({
    body: data,
    statusCode: 200
})

export const unauthorized = (): HttpResponse => ({
    body: new Unauthorized(),
    statusCode: 401
})