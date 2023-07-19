
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormGroup, FormLabel, FormControl, Button, Alert } from 'react-bootstrap';

const AddProduct = () => {
 
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [quantite, setQuantite] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'nom') {
      setNom(value);
    } else if (name === 'prix') {
      setPrix(value);
    } else if (name === 'quantite') {
      setQuantite(value);
    }
  };
   
  useEffect(() => {
    if (setShowAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/AddProduct', { nom, prix, quantite });
      console.log(response.data);

      setNom('');
      setPrix('');
      setQuantite('');
      setShowAlert(true);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du produit:', error);
    }
  };

  return (
    <div>
         <br></br>
      <h1 style={{ textAlign: 'center' }}>Ajouter un produit</h1>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Produit enregistré avec succès.
        </Alert>
      )}
      <form onSubmit={handleSubmit} style={{ width: '50%', margin: '0 auto' }}>
        <FormGroup>
        <br></br>
          <FormLabel>Nom :</FormLabel>
          <FormControl type="text" name="nom" value={nom} onChange={handleInputChange} required style={{ width: '100%' }} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Prix :</FormLabel>
          <FormControl type="number" name="prix" value={prix} onChange={handleInputChange} required style={{ width: '100%' }} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Quantité :</FormLabel>
          <FormControl type="number" name="quantite" value={quantite} onChange={handleInputChange} required style={{ width: '100%' }} />
        </FormGroup> <br></br> <br></br>
        <Button type="submit" style={{ display: 'block', margin: '0 auto' }}>Enregistrer</Button>


        
        
      </form>
    </div>
  );
};

export default AddProduct;
