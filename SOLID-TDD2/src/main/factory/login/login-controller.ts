import { SignUpController } from "../../../presentation/controllers/signup/signup"
import { DbAddAccount } from "../../../data/usecases/add-account/db-add-account-protocols"
import { PgAccountRepository } from "../../../infra/db/postgres/account/account-repository"
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/bcrypt-adapter'
import { LoginController } from "../../../presentation/controllers/login/login"
import { makeLoginValidation } from "./login-validation"
import { ValidationComposite } from "../../../presentation/helpers"
import { IValidation } from "../../../presentation/protocols"
import { RequiredFieldValidator } from "../../../presentation/helpers/validators/required-field-validator"
import { DbAuthentication } from "../../../data/usecases/authentication/db-authentication"
import { JwtAdapter } from "../../../infra/criptography/jwt/jwt-adapter"
import env from "../../config/env"

export const makeLoginController = (): LoginController => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const pgRepository = new PgAccountRepository()
    const tokenGenerator = new JwtAdapter(env.SECRET_KEY)
    const authenticator = new DbAuthentication(pgRepository, bcryptAdapter, tokenGenerator, pgRepository)
    const loginController = new LoginController(makeLoginValidation(), authenticator)
    return loginController
}
