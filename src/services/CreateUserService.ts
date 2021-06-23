import { getCustomRepository } from "typeorm"

import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest {
  name: string
  email: string
  admin?: boolean
}

class CreateUserServices {
  async execute({name, email, admin}: IUserRequest) {
    const userRepository = getCustomRepository(UsersRepositories)

    if(!email) {
      throw new Error("Email incorreto")
    }

    const userAlreadyExits = await userRepository.findOne({
      email
    })

    if(userAlreadyExits) {
      throw new Error("Usuário já cadastrado")
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