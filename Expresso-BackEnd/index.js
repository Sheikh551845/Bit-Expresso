const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port= process.env.PORT|| 5000;

//middleware

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.4kc4xcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const ExpressoCollection = client.db("ExpressoDB").collection("Expresso");;
    

   app.post('/Json', async(req,res)=>{
   const insertManyresult = await ExpressoCollection.insertMany(req.body);
 
   console.log(`${insertManyresult.insertedCount} documents were inserted.`);
   res.send(insertManyresult)
   })
   
   app.get('/AllCoffees', async(req,res)=>
  {
        const allCoffees = await ExpressoCollection.find().toArray();
        res.send(allCoffees);

  })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
   
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
   res.send('This is first server')
})

app.listen(port,()=>{
    console.log(`Server is runing on port ${port}`)
})