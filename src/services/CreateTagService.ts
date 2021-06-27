import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"
import { ErroHandler } from "../util/ErrorHandler"

class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories)

    if (!name) {
      //Pesquisar biblioteca de validação de campo!!!!
      throw new ErroHandler({errorStatus: 400,errorMessage: "Nome incorreto!"})

    }

    const tagAlreadyExists = await tagsRepositories.findOne({name})
    
    if (tagAlreadyExists) {
      throw new ErroHandler({errorStatus: 400,errorMessage:"Tag já está cadastrada!!!"})
    }

    const tag = tagsRepositories.create({name})
    await tagsRepositories.save(tag)

    return tag
  }
}

export {CreateTagService}