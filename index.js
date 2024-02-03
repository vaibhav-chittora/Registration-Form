var express = require("express")
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
// Connect to MongoDB Database:-

mongoose.connect('mongodb://localhost:27017/Database');

var db = mongoose.connection;

db.on('error', (err) => console.log("Error in connecting to DataBase.")),
db.once('open', () => console.log("Connected to DataBase")),

    app.post("/sign_up", (req, res) => {
        var name = req.body.name
        var age = req.body.age
        var email = req.body.email
        var phno = req.body.phno
        var gender = req.body.gender
        var password = req.body.password

        var data = {
            "name": name,
            "age": age,
            "email": email,
            "phno": phno,
            "gender": gender,
            "password": password
        }

        db.collection('users').insertOne(data, (err, collection) => {
            if (err) {
                throw err;
            }
            console.log("Record Inserted Successfully")
        })
        return res.redirect('signup_successful.html')

    });


    app.get("/", (req, res) => {
        res.set({
            "Allow-access-Allow_Origin": '*'
        })

        return res.redirect('index.html')
    }).listen(3000);
    
    console.log("Listening on port 3000");
