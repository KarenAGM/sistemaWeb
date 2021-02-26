const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    name : {type: String, required: true},
    image: {type: String, required: true},
    price : {type: String, required:true}
    
});

module.exports = mongoose.model('Product', productSchema);