const express = require('express')
const app = express()
const port = process.env.PORT || 8000
var cors = require('cors')
app.use(cors())
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://assignmet-12:assignmet-12@cluster0.q8zloev.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const Userscollection = client.db("assignmet-12").collection("Users");
const Servicescollection = client.db("assignmet-12").collection("Services");
const Causescollection = client.db("assignmet-12").collection("Causes");

async function run(){
    try{

        app.post('/jwt',async(req,res)=>{
            const email = req.query.email;
           
            const body = req.body;
           console.log(body)
        
            const filter = {
                email : body.email,
                period : body.period,
                number : body.number,
                hNumber : body.hNumber,
                hname:body.hname,
                name : body.name
            };
           
            const result = await Userscollection.insertOne(filter);
            res.send(result)
        });
        app.get('/reqested/:email',async(req,res)=>{
            const email = req.params.email;
       
            const query = {email : email};
            const result = await Userscollection.find(query).toArray();
            res.send(result)
        });
        app.get('/services',async(req,res)=>{
            const filter = {}
            const result = await Servicescollection.find(filter).toArray()
            res.send(result)
        })
        app.get('/causes',async(req,res)=>{
            const filter = {}
            const result = await Causescollection.find(filter).toArray()
            res.send(result)
        })
        app.get('/causes/:id',async(req,res)=>{
            const id = req.params.id;
            const filter = {_id : id}
            const result = await Causescollection.find(filter).toArray()
            res.send(result)
        })
        app.get('/services/:id',async(req,res)=>{
            const id = req.params.id;
            const filter = {_id : id}
            const result = await Servicescollection.findOne()
            res.send(result)
        })
           
    }
    finally{

    }
}



app.get('/', (req, res) => {
  res.send('8000 is running')
})

app.listen(port, () => {
  console.log(`Goodly running port is ${port}`)
})
run().catch(err => console.error(err));