const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    // Assign a serial string type to mongoose _id
    _id: mongoose.Schema.Types.ObjectId,
    product: { 
                type:mongoose.Schema.Types.ObjectId,
                ref: 'Product', 
                required: true
        }, 
    quantity: {
        type: Number, 
        default: 1 
    },
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      }
});
// Schema is layout.  
// The model is the object itself, base on the schema that you can create a record for.

//Export model, as Product (Not capital letter, because you create an instance of it)
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;