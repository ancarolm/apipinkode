const express = require("express");
const port = process.env.PORT || 9000;
const mongo = require("mongodb").MongoClient;
const url = "mongodb+srv://pinkodedigital:pinkode2020LM@pinkode.mwxkd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

let db, resources;

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err);
      return
    }
    db = client.db("Pinkode");
    resources = db.collection("Resources");

  }
)

const app = express();
app.use(express.json());

app.get("/resources", async (req, res) => {
  
    resources.find().toArray((err, items) => {
        if (err){
            console.error(err);
            res.status(500).json({err: err});
            return;
        }

        res.status(200).json(items);
    })


});

app.get("/resources/:typeId", async (req, res) => {
    const id = req.params.typeId;

    resources.find({Type: id}).toArray((err, items) => {
        if (err){
            console.error(err);
            res.status(500).json({err: err});
            return;
        }

        res.status(200).json(items);
    })

})

app.listen(port, () => console.log("Server ready on port:" + port));