import { Express } from 'express'
import bodyParser from '../middlewares/body-parser/body-parser'
import contentType from '../middlewares/content-type/content-type'
import { limiter } from '../middlewares/rate-limiter/rate-limiter'
import cors from '../middlewares/cors/cors'

export default function middlewares (app: Express): void {
    app.use(contentType)
    app.use(bodyParser)
    app.use(limiter)
    app.use(cors)
}