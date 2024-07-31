import app from "../../config/app"
import { Request, Response } from 'express'
import request from 'supertest'

describe('BodyParser', () => {
    it('Should parse body as json', async () => {
        app.post('/body_parser_test', (req: Request, res: Response) => {
            return res.send(req.body)
        })
        await request(app)
        .post('/body_parser_test')
        .send({ hello: 'world' })
        .expect({ hello: 'world' })
    })
})