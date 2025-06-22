const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port= process.env.PORT|| 5000;

const corsConfig ={
origin : "*",
credential : true,
 methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}

app.use(cors(corsConfig));
app.use(express.json());
app.options("", cors(corsConfig))




const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.4kc4xcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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
  
     const  Comment = client.db("ExpressoDB").collection("Comment");
      const  FirstReplay = client.db("ExpressoDB").collection("FirstReplay");
       const  SecondReplay = client.db("ExpressoDB").collection("SecondReplay");
        const  LikedInfo = client.db("ExpressoDB").collection("LikedInfo");
    


  //..........................................................................................
   //all Post are from here

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
   const SecondReplayResponse = await SecondReplay.insertOne(req.body);
 
   console.log(`${SecondReplayResponse.insertedCount} documents were inserted.`);
   res.send(SecondReplayResponse)
   })




   //Like Post

   app.post('/like', async (req, res) => {
    const { pid, uid } = req.body;

    if (!pid || !uid) {
        return res.status(400).send({ error: 'Missing pid or uid' });
    }

    const alreadyLiked = await LikedInfo.findOne({ pid, uid });
    if (alreadyLiked) {
        return res.status(409).send({ message: 'Already liked' });
    }

    await LikedInfo.insertOne({ pid, uid });

    // Optional: increment like count in products/famouscoffee collection
    await ExpressoCollection.updateOne(
        { _id: pid },
        { $inc: { likes: 1 } }
    );

    res.status(200).send({ message: 'Liked successfully' });
});




//..........................................................................................................

//All updates are here

//Comment Update
app.patch('/CommentUpdate/:id', async (req, res) => {
   const id = req.params.id;
  const  commentdata  = req.body;
 

  try {
    const result = await Comment.updateOne(
      { _id: new ObjectId(id) },
      { $set: { comment: commentdata.comment } } 
    );

    res.send(result);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update likes' });
  }
});


//First Replay Update

app.patch('/FirstUpdate/:id', async (req, res) => {
   const id = req.params.id;
  const replayData  = req.body;
 

  try {
    const result = await FirstReplay.updateOne(
      { _id: new ObjectId(id) },
      { $set: { replay: replayData.replay } } 
    );

    res.send(result);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update likes' });
  }
});


//Second Replay Update

app.patch('/SecondUpdate/:id', async (req, res) => {
   const id = req.params.id;
  const  replayData  = req.body;


  try {
    const result = await SecondReplay.updateOne(
      { _id: new ObjectId(id) },
      { $set: { replay: replayData.replay } } 
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


//Likes count update

app.patch('/LikeCount/:id', async (req, res) => {
    const id = req.params.id;
    const { likes } = req.body;

    try {
        const result = await ExpressoCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { likes: likes } }
        );

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to update like count' });
    }
});







// .........................................................................................................
   

   //All get are from here

   //AllCoffee
   app.get('/AllCoffees', async(req,res)=>
  {
        const allCoffees = await ExpressoCollection.find().toArray();
        res.send(allCoffees);

  })
  


   

 //GeneralCoffe by Id
  app.get('/OneCoffee/:id', async(req,res)=>
  {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
    
        const coffee = await ExpressoCollection.findOne(query);
        
        res.send(coffee)
  })

  //All Comments 
    app.get('/AllComment', async(req,res)=>
  {
        const AllLikedData = await Comment.find().toArray();
        res.send(AllLikedData);

  })

  //All Fist Replay

    app.get('/AllFirst', async(req,res)=>
  {
        const AllLikedData = await FirstReplay.find().toArray();
        res.send(AllLikedData);

  })

  //All Second Replay

    app.get('/AllSecond', async(req,res)=>
  {
        const AllLikedData = await SecondReplay.find().toArray();
        res.send(AllLikedData);

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
    
        const replies = await SecondReplay.find(query).toArray();
      
        res.send(replies)
  })

  //Like check
  app.get('/hasLiked/:pid/:uid', async (req, res) => {
    const { pid, uid } = req.params;

    const liked = await LikedInfo.findOne({ pid, uid });
    res.send({ hasLiked: !!liked });
});

  //....................................................................

  //All delete ares here


  // Delete comment by ID
app.delete('/DeteleComment/:id', async (req, res) => {
  console.log("inside delete");
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }; // Use ObjectId for MongoDB _id

  const deleteRes = await Comment.deleteOne(query);
  res.send(deleteRes);
});

// Delete First Replay by ID
app.delete('/DeleteFirst/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };

  const deleteRes = await FirstReplay.deleteOne(query);
  res.send(deleteRes);
});

// Delete Second Replay by ID
app.delete('/DeteleSecond/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };

  const deleteRes = await SecondReplay.deleteOne(query);
  res.send(deleteRes);
});

  // ...............................................................................

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