import fs from 'fs'
import path from 'path'
import {makeExecutableSchema} from 'graphql-tools'

const data = fs.readdirSync(__dirname)

const keys = data.filter(
  file => file !== 'index.js' && path.extname(file) === '.js'
)
const rootQueryString = keys.reduce((accum, value) => {
  const file = value.replace('.js', '')
  return `${accum} ${file}: ${file}`
}, '')

const RootQuery = `
  type RootQuery {
    ${rootQueryString}
  }
`
const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`

const files = keys.map(file => require(`./${file}`).default)

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, ...files],
})
