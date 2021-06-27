import { getCustomRepository } from "typeorm"
import {hash} from "bcryptjs"

import { UsersRepositories } from "../repositories/UsersRepositories"

import {ErroHandler} from "../util/ErrorHandler"

interface IUserRequest {
  name: string
  email: string
  password: string
  admin?: boolean
}

class CreateUserServices {
  async execute({name, email, password, admin}: IUserRequest) {
    const userRepository = getCustomRepository(UsersRepositories)

    if(!email) {      
      throw new ErroHandler({errorStatus: 400, errorMessage: "Email inválido"}) 
    }

    const userAlreadyExits = await userRepository.findOne({
      email
    })

    if(userAlreadyExits) {
      throw new ErroHandler({errorStatus: 409, errorMessage: "Usuário já esta cadastrado"})
    }

    const passwordHash = await hash(password, 8)
    
    const user = userRepository.create({
      name,
      email,
      password: passwordHash,
      admin
    })

    await userRepository.save(user)

    return user
  }
}

export {CreateUserServices}