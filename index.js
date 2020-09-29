const express =require('express'); 
const bodyParser = require('body-parser'); 
const MongoClient = require('mongodb').MongoClient;
 const ObjectdID =require('mongodb').ObjectID;

const password ='4E6giVKY2haTdVU';


const uri = "mongodb+srv://abs:4E6giVKY2haTdVU@cluster0.n8dqd.mongodb.net/Organic?retryWrites=true&w=majority"; 
const client = new MongoClient(uri , { useUnifiedTopology: true } , { useNewUrlParser: true }); 

  
const app = express(); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false}));  



//also send a file
app.get('/',(req,res) =>{
    res.sendFile(__dirname +'/index.html') 
});



client.connect(err => {
    const productsCollection = client.db("Organic").collection("products");
   
 app.get('/products', (req,res)=>{ 
    productsCollection.find({})
    .toArray((err,documents)=>{
        res.send(documents);
    }) 
 })
 
 app.get('/product/:id', (req,res) =>{
    productsCollection.find({_id: ObjectdID(req.params.id)})
   .toArray ((err,document) =>{ 
       res.send(documents); 
   }) 
  })
     





    app.post('/addProduct', (req,res)=>{
        const product=req.body;
        productsCollection.insertOne(product)
       
        .then(result=>{
            console.log('data added successfully');
            res.send('success')
        })
  
    })
   app.delete('/delete/:id',(req,res) =>{ 
       //console.log(req.params.id);
       productsCollection.deleteOne({_id: ObjectdID(req.params.id)})
       .then(  result => {
        console.log(result);

       })
   })
 


  });
  
  
  app.listen(4200, ()=>{
      console.log("the server wiill be start on port 3000");
  });    