const Product = require('../models/Product');

// Enregistrement d'un produit
exports.createProduct = async (req, res) => {
  try {
    const { nom, prix, quantite } = req.body;
    const product = new Product({ nom, prix, quantite });
    await product.save();
    res.status(201).json({ message: 'Produit enregistré avec succès', product });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement du produit' });
  }
};

// Modification d'un produit
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prix, quantite } = req.body;
    const product = await Product.findByIdAndUpdate(id, { nom, prix, quantite }, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.json({ message: 'Produit modifié avec succès', product });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la modification du produit' });
  }
};

// Affichage d'un produit
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du produit' });
  }
};

// Affichage de la liste des produits
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des produits' });
  }
};

// Suppression d'un produit
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du produit' });
  }
};

// Recherche d'un produit par nom
exports.searchProduct = async (req, res) => {
    try {
      const { nom } = req.query;
      const regex = new RegExp(nom, 'i');
      const products = await Product.find({ nom: regex });
      
      if (products.length === 0) {
        return res.status(404).json({ error: 'Aucun produit trouvé' });
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la recherche des produits' });
    }
  };
  
