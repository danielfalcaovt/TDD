/* import { ValidationComposite } from "../../../controllers/helpers"
import { SignUpController } from "../../../controllers/signup/signup"
import { DbAddAccount } from "../../../data/usecases/add-account/db-add-account-protocols"
import { PgAccountRepository } from "../../../infra/db/postgres/account/account-repository"
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'

export const makeEmailValidator = () => {
    const salt = 12
    const pgRepository = new PgAccountRepository()
    const hasher = new BcryptAdapter(salt)
    const addAccount = new DbAddAccount(hasher, pgRepository)
    const signupController = new SignUpController(validator, addAccount)
} */