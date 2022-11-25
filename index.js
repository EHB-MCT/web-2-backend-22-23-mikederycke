const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3001

let users = [];

app.use(express.urlencoded({
    extended: false
}));
app.use(cors())
app.use(express.json())

app.post('/register', async (req, res) => {
    try {
        // making a user //
        let user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        //validation//
        if (!user.password || !user.username || !user.email) {
            res.status(404).send('fields are not filled in, try again')
        }

        // push user in the users array// 
        users.push(user)
        console.log(users)

        // respons //
        res.send("The user has been added to a global variable!")

    } catch (error) {
        console.log(error), res.send("did not work")
    }

})

app.post("/login", async (req, res) => {
    try {
        //bestaande user ophalen///
        let user = users.find(u => {
            return u.email == req.body.email
        })
        console.log(users)
        //Als user gevonden is, vergelijk password
        if(user){
            //compare password
            if(user.password == req.body.password){
                res.status(200).send({message:"you are logged in "})
            }else{
                res.status(400).send({message:"wrong pasword"}) 
            }
        }else{
            res.status(400).send({message: "The user does not exist (Email not found)"})
        }



    } catch (err) {
        res.status(500).send({
            status: "Tis kapot",
            error: err.message
        })
    }

})

app.listen(port);
console.log(`app running at http://localhost:${port}`);