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
import { announcement } from './announcement'
import { postIdea } from './postIdea'
import { product } from './product'
import { productCategory } from './productCategory'

export const schema = {
  types: [post, category, subcategory, author, questionOfTheWeek, comment, newsletter, announcement, postIdea, product, productCategory],
}
