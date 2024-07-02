const { MongoClient } = require('mongodb');
async function main() {    
   const uri = "mongodb://localhost:27017/";
   const client = new MongoClient(uri);
   try {
      await client.connect();
      const adminDb = client.db().admin();
      const result = await adminDb.listDatabases();
      result.databases.forEach(db => console.log(` - ${db.name}`));
   } catch (e) {
      console.error(e);
   } finally {
      await client.close();
   }
}
main()
