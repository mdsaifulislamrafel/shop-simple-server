const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


//middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
app.use(express.json());



const uri = `mongodb+srv://simpleShop:AvTv12YEscTpEENU@cluster0.2lraink.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        const productsCollection = client.db('simpleShop').collection('products');
        const orderCollection = client.db('simpleShop').collection('order');

        app.get('/products', async (req, res) => {
          const products = await productsCollection.find().toArray();
          res.send(products);
        });
        app.get('/products/:id', async (req, res) => {
            const product = await productsCollection.findOne({ _id: new ObjectId(req.params.id) });
            res.send(product);
        });

        app.get('/order', async (req, res) => {
            const orders = await orderCollection.find().toArray();
            res.send(orders);
        });

        app.post('/order', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        });
       




        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})