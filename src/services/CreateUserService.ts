import { getCustomRepository } from "typeorm"

import { UsersRepositories } from "../repositories/UsersRepositories"
import { ErroHandler } from "../util/errorHandler"

interface IUserRequest {
  name: string
  email: string
  admin?: boolean
}

class CreateUserServices {
  async execute({name, email, admin}: IUserRequest) {
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

    const user = userRepository.create({
      name,
      email,
      admin
    })

    await userRepository.save(user)

    return user
  }
}

export {CreateUserServices}