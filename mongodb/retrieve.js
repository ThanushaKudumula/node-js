const { MongoClient } = require('mongodb');
async function main() {    
   const uri = "mongodb://localhost:27017/";
   const client = new MongoClient(uri);
   try {
      await client.connect();
      const database = client.db('app'); 
      const mycoll=database.collection('employee');
      const query={name:"pavani"};
      const cursor= await mycoll.findOne(query);
      console.log(cursor);
    //   await cursor.forEach(doc => console.log(doc));
   } catch (e) {
      console.error(e);
   } finally {
      await client.close();
   }
}
main()
