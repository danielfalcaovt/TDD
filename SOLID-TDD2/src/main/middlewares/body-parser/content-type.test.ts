import { Request, Response } from "express"
import app from "../../config/app"
import request from 'supertest'

describe('ContentType', () => {
    it('Should default type be json', async () => {
        app.get('/content_type_json', (req: Request, res: Response) => {
            res.send('')
        })
        await request(app)
        .get('/content_type_json')
        .expect('content-type', /json/)
    })
})