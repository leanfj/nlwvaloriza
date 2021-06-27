import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { ErroHandler } from "../util/ErrorHandler"

interface IComplimentRequest {
  tag_id: string
  user_sender: string
  user_receiver: string
  message: string
}

class CreateComplimentService {

  async execute ({tag_id, user_sender, user_receiver, message}:IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
    const userRepositories = getCustomRepository(UsersRepositories)

    if(user_sender === user_receiver) {
      throw new ErroHandler({errorStatus: 400 , errorMessage: "Usuário de destino inválido"})
    }

    const userReceiverExists = await userRepositories.findOne(user_receiver)

    if(!userReceiverExists) {
      throw new ErroHandler({errorStatus: 400, errorMessage: "Usuário de destino não cadastrado!"})
    }

    const compliment = complimentsRepositories.create({
      tag_id, user_sender, user_receiver, message
    })
    
    await complimentsRepositories.save(compliment)

    return compliment

  }
}

export {CreateComplimentService}