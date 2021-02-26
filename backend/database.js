const mongoose = require('mongoose');
require('dotenv').config();

function conectar() { 
    mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://Karen:Metallica@cluster0.e2gxf.mongodb.net/sistemaFrutas?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology:true
})

.then(db => console.log('DB is connected'))
.catch(err => console.log(err));
}

module.exports=conectar;

