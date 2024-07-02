const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const graphqlSchema = require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolver')

const app = express()

app.use('/graphql', graphqlHTTP ({
    schema:graphqlSchema,
    rootValue:graphqlResolvers,
    graphiql: true
}))
module.exports=app;