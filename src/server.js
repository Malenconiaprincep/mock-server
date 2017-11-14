import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import {graphqlKoa, graphiqlKoa} from 'graphql-server-koa'
import {addMockFunctionsToSchema} from 'graphql-tools'

import schema from './schemas'

const app = new Koa()
const router = new KoaRouter()
const PORT = 3000

app.use(koaBody())

const mocks = {
  Post: () => ({
    id: () => 10,
    title: () => 'hahah',
    views: () => 100,
  }),
}

addMockFunctionsToSchema({schema, mocks})

router.all('/graphql', graphqlKoa({schema}))
router.get('/graphiql', graphiqlKoa({endpointURL: '/graphql'}))

app.use(router.routes())
app.use(router.allowedMethods())

const server = app.listen(PORT, () => {
  const {port} = server.address()
  console.log('GraphQL listening at http://localhost:%s/graphiql', port)
})
