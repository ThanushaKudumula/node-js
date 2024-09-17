// const express=require('express');
const {ApolloServer}=require('apollo-server');
// const app=express()
const typeDefs=require('./schemas/typedef');
const resolvers=require('./schemas/resolvers');


const apserver=new ApolloServer({typeDefs, resolvers})
// app.listen(2000, ()=>{
//     console.log("server has started");
// })
apserver.listen().then(({url})=>{console.log(url)})