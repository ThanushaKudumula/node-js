const {gql}= require('apollo-server');

const typedefs=gql`
    type User{
        id:Int!
        name:String!
        age:Int!
        isMarried:Boolean
    }
     type Query{
        users:[User!]!
     }
    `;
    module.exports=typedefs