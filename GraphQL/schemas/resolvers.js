
const {userdetails}=require('./fakedata');

const resolvers={
    Query:{
        users:()=>{
            return userdetails
        }
    }
}
module.exports=resolvers