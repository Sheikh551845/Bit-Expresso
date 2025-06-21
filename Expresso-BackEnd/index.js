const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    const ExpressoCollection = client.db("ExpressoDB").collection("Expresso");
    const  FamousCoffeCollection = client.db("ExpressoDB").collection("FamousProducts");
     const  Comment = client.db("ExpressoDB").collection("Comment");
      const  FirstReplay = client.db("ExpressoDB").collection("FirstReplay");
       const  SencondReplay = client.db("ExpressoDB").collection("SecondReplay");
        const  LikedData = client.db("ExpressoDB").collection("Liked");
    


  //...............................................................................................
   //all Post are from here
   //liked post
    app.post('/Like', async(req,res)=>{
   const LikeResponse = await LikedData.insertOne(req.body);
 
   console.log(`${LikeResponse.insertedCount} documents were inserted.`);
   res.send(LikeResponse)
   })

   //Comment Post
   app.post('/Comment', async(req,res)=>{
   const CommentResponse = await Comment.insertOne(req.body);
 
   console.log(`${CommentResponse.insertedCount} documents were inserted.`);
   res.send(CommentResponse)
  

   })

   //Firs Replay Post

   app.post('/FirstReplay', async(req,res)=>{
   const FirstReplayRespose = await FirstReplay.insertOne(req.body);
 
   console.log(`${FirstReplayRespose.insertedCount} documents were inserted.`);
   res.send(FirstReplayRespose)
 
   })

   //Second Replay Post

   app.post('/SecondReplay', async(req,res)=>{
   const SencondReplayResponse = await SencondReplay.insertOne(req.body);
 
   console.log(`${SencondReplayResponse.insertedCount} documents were inserted.`);
   res.send(SencondReplayResponse)
   })

   //All coffee oost

   app.post('/Json', async(req,res)=>{
   const insertManyresult = await ExpressoCollection.insertMany(req.body);
 
   console.log(`${insertManyresult.insertedCount} documents were inserted.`);
   res.send(insertManyresult)
   })


//..........................................................................................................

//All updates are here
//Famous product Comments count update.
app.patch('/FamousCommentCount/:id', async (req, res) => {
   const id = req.params.id;
  const { comments } = req.body;
 

  try {
    const result = await FamousCoffeCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { comments: comments } } 
    );

    res.send(result);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update likes' });
  }
});

//Comments count update.
app.patch('/CommentCount/:id', async (req, res) => {
   const id = req.params.id;
  const { comments } = req.body;
  

  try {
    const result = await ExpressoCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { comments: comments } } 
    );

    res.send(result);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update likes' });
  }
});

//Famous products Likes count update
app.patch('/FamousLikeCount/:id', async (req, res) => {
   const id = req.params.id;
  const { likes } = req.body;

  try {
    const result = await FamousCoffeCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { likes: likes } } 
    );

    res.send(result);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update likes' });
  }
});

//Likes count update
app.patch('/LikeCount/:id', async (req, res) => {
   const id = req.params.id;
  const { likes } = req.body;

  try {
    const result = await ExpressoCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { likes: likes } } 
    );

    res.send(result);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update likes' });
  }
});






// .........................................................................................................
   

   //All get are from here

   //All Liked data
   app.get('/Like', async(req,res)=>
  {
        const AllLikedData = await LikedData.find().toArray();
        res.send(AllLikedData);

  })

  //Users Like data
app.get('/Like/:uid', async(req,res)=>
  {
        const userid = req.params.uid;
        const query = {uid: userid}
        
        const userLiked = await FamousCoffeCollection.find(query).toArray();;
        
        res.send(userLiked)
  })



   //AllCoffee
   app.get('/AllCoffees', async(req,res)=>
  {
        const allCoffees = await ExpressoCollection.find().toArray();
        res.send(allCoffees);

  })
  

  //FamousCoffe
  app.get('/FamousCoffee', async(req,res)=>
  {
        const FamousCoffees = await FamousCoffeCollection.find().toArray();
        res.send(FamousCoffees);

  })

   //FamousCoffe by Id
  app.get('/FamousOne/:id', async(req,res)=>
  {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        
        const coffee = await FamousCoffeCollection.findOne(query);
        
        res.send(coffee)
  })


 //GeneralCoffe by Id
  app.get('/GeneralOne/:id', async(req,res)=>
  {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
    
        const coffee = await ExpressoCollection.findOne(query);
        
        res.send(coffee)
  })


  //Comment by product id get
  app.get('/comment/:id', async(req,res)=>
  {
        const id = req.params.id;
        const query = {pid: id}
    
        const coffee = await Comment.find(query).toArray();

        res.send(coffee)
  })

   //Comment by comment id get
  app.get('/specific/:id', async(req,res)=>
  {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        
    
        const coffee = await Comment.findOne(query);

        res.send(coffee)
  })
  //1st replay get

 app.get('/FirstReplay/:id', async(req,res)=>
  {
        const id = req.params.id;
        const query = {cid: id}
    
        const replies = await FirstReplay.find(query).toArray();
        
        res.send(replies)
  })

  //2nd replay get
  
 app.get('/SecondReplay/:id', async(req,res)=>
  {
        const id = req.params.id;
        const query = {rid: id}
    
        const replies = await SencondReplay.find(query).toArray();
      
        res.send(replies)
  })

  //....................................................................

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