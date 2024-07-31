import { Request, Response } from "express"
import app from "../../config/app"
import request from 'supertest'

describe('cors', () => {
    it('Should access-control-allow-origin be *', async () => {
        app.get('/cors_test', (req: Request, res: Response) => {
            res.send('')
        })

        await request(app)
            .get('/cors_test')
            .expect("access-control-allow-origin", '*')
            .expect("access-control-allow-headers", '*')
            .expect("access-control-allow-methods", '*')
    })
})