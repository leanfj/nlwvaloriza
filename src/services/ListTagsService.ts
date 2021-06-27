import { getCustomRepository } from "typeorm"
import { classToPlain } from "class-transformer"
import { TagsRepositories } from "../repositories/TagsRepositories"

class ListTagsService {
  async execute () {
    const tagRepositories = getCustomRepository(TagsRepositories)

    const tags = await tagRepositories.find()

    return classToPlain(tags)
  }
}

export {ListTagsService}