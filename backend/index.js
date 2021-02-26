
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const user = require('./models/user');
const products = require('./models/products')
const db = require ('./database');

const app = express();

db();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.set('port',process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, 'build')));

//routes


app.get("/api/products",async(req,res) => {
    const productos = await products.find()
    return res.status(200).json(productos)
});


app.post('/api/signup',async(req,res)=>{
    const {
        name,email,password
    } = req.body;
   

    const exist = await user.exists({
        email:email
    })

    if(exist){
        return res.status(400).json(
            {
                mensaje:"Ya existe usuario"
            }
        );
    }
    
    const {_id} = await user.create({name,email,password});

    return res.status(200).json({name,email,_id})
});


app.post('/api/signin',async(req,res) => {
    const {email,password} = req.body;
    const usuario = await user.findOne({
        email:email
    })

    if(!usuario){
        return res.status(401).json({
            mensaje:"No existe"
        })
    }
    if(usuario.password != password){
        return res.status(401).json({
            mensaje:"No existe"
        })
    }

    return res.status(200).json({
        _id:usuario._id,
        email:usuario.email,
        name:usuario.name
    })
});


//Listen to Server
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'))
});

app.get('*', (req, res) => {
    res.redirect("/")
  });
