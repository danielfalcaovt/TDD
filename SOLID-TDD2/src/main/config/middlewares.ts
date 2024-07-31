import { Express } from 'express'
import bodyParser from '../middlewares/body-parser/body-parser'
import contentType from '../middlewares/body-parser/content-type'

export default function middlewares (app: Express): void {
    app.use(bodyParser)
    app.use(contentType)
}