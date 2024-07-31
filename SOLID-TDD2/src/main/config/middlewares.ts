import { Express } from 'express'
import bodyParser from '../middlewares/body-parser/body-parser'
import contentType from '../middlewares/body-parser/content-type'
import { limiter } from '../middlewares/body-parser/rate-limiter'
import cors from '../middlewares/body-parser/cors'

export default function middlewares (app: Express): void {
    app.use(contentType)
    app.use(bodyParser)
    app.use(limiter)
    app.use(cors)
}