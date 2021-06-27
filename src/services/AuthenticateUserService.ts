import { getCustomRepository } from "typeorm"
import { compare } from 'bcryptjs'

import { UsersRepositories } from "../repositories/UsersRepositories"
import { ErroHandler } from "../util/ErrorHandler"
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
  email: string
  password: string
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest) {

    const userRepositories = getCustomRepository(UsersRepositories)
    
    const user = await userRepositories.findOne({email})

    if (!user) {
      throw new ErroHandler({errorStatus: 401, errorMessage: "Usuário/Senha inválido"})
    }

    const passwordVerification = await compare(password, user.password)

    if (!passwordVerification) {
      throw new ErroHandler({errorStatus: 401, errorMessage: "Usuário/Senha inválido"})
    }

    const token = sign({email: user.email}, "leanfjnlwvaloriza", {
      subject: user.id,
      expiresIn: "1d"
    })

    return token
  }
}

export {AuthenticateUserService}