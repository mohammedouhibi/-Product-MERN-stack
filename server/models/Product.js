const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nom: { 
       type: String,
        required: true 
    },
  prix: { 
    type: Number, 
    required: true
     },
  quantite: { 
    type: Number, 
    required: true
     },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
