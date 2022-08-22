// const bodyParser = require('body-parser')
// const http = require('http');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const saltRounds = 10;

const app = express();

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "registerdatabase"
});

const sessionStore = new MySQLStore({
    createDatabaseTable: true, 
    clearExpired: true,
    checkExpirationInterval: 10000,
    expiration: 60000
}, db);

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(cookies());

app.use(express.urlencoded({extended: true}));

app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: 'ProjectReact',
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60,
        sameSite: true,
        secure: false
    }
    

}))

app.post("/register", (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const mailAddress = req.body.mailAddress;
    const password = req.body.password;

    console.log(res);

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err){
            console.log(err);
        }

        const sqlInsert = "INSERT INTO user_registered (firstname, lastname, mail, password) VALUES (?,?,?,?)";
        db.query(sqlInsert, [firstName, lastName, mailAddress, hash], (err, result) => {
            if(err){
                console.log(err);
            }
            else if(result){
                console.log(result);
            }
        })
    })

    
})

app.get("/", (req, res) => {
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user});
    }
    else {
        // res.send({loggedIn: false});
        req.session.destroy();
    }

})

app.post("/", (req, res) => {

     const mailAddress = req.body.mailAddress;
     const password = req.body.password;


     const sqlInsert = "SELECT * FROM user_registered WHERE mail = ?;";
     db.query(sqlInsert, mailAddress, (err, result) => {
          if(err) {
                  res.send({err: err});
                  console.log(err);
          } else if (result.length > 0) {
                  bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response){
                         req.session.user = result;
                         console.log(req.session.user)
                         res.send({message: "Success", name: result[0].firstname});
                    }
                    else if(error) {
                        res.send({message: "Wrong mail/password combination"});
                        console.log(error);
                    }
                  })
          } else {
            res.send({message: "User doesn't exist"});
          }
      })
 })

app.listen(3001, () => {
    console.log("running server");
})