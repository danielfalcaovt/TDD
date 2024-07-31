import { Express } from 'express'
import bodyParser from '../middlewares/body-parser/body-parser'

export default function middlewares (app: Express): void {
    app.use(bodyParser)
}