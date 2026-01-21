/*import { type SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [],
}*/
import { post } from './post'
import { category } from './category'
import { subcategory } from './subcategory'
import {author} from './author'
import { questionOfTheWeek } from './questionOfTheWeek'
import { comment } from './comment'
import { newsletter } from './newsletter'

export const schema = {
    types: [post, category, subcategory, author, questionOfTheWeek, comment, newsletter],
}
