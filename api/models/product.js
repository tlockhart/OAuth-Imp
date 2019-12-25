const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    // Assign a serial string type to mongoose _id
    _id: mongoose.Schema.Types.ObjectId,
    name: { 
        type: String, 
        required: true 
    },
    value: { 
        type: Number, 
        required: true 
    },
    productImage: {
        type: String,
        required: true
        // required: false
    }
});
// Schema is layout.  
// The model is the object itself, base on the schema that you can create a record for.

//Export model, as Product (Not capital letter, because you create an instance of it)
const Product = mongoose.model('Product', productSchema);

module.exports = Product;