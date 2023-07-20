import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormGroup, FormLabel, FormControl, Alert } from 'react-bootstrap';
import { Button, Modal } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductNom, setSelectedProductNom] = useState('');
  const [selectedProductPrix, setSelectedProductPrix] = useState('');
  const [selectedProductQuantite, setSelectedProductQuantite] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);


  //pagination variables
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentProducts = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);



  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };




  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  const fetchProducts = async () => {
    try {
      const url = searchTerm
        ? `http://localhost:5000/api/search?nom=${searchTerm}`
        : 'http://localhost:5000/api/products';
      const response = await axios.get(url);
      setProducts(response.data);
      setNoResults(response.data.length === 0);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  };

  const handleDelete = (id) => {
    setProductIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setShowDeleteAlert(true);
      setShowConfirmation(false);
      fetchProducts();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${selectedProductId}`, {
        nom: selectedProductNom,
        prix: selectedProductPrix,
        quantite: selectedProductQuantite,
      });
      setShowUpdateAlert(true);
      handleCloseModal();
      fetchProducts();
    } catch (error) {
      console.error('Erreur lors de la modification du produit:', error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProductId(product._id);
    setSelectedProductNom(product.nom);
    setSelectedProductPrix(product.prix);
    setSelectedProductQuantite(product.quantite);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
    setSelectedProductNom('');
    setSelectedProductPrix('');
    setSelectedProductQuantite('');
    setShowModal(false);
  };

  useEffect(() => {
    if (showDeleteAlert) {
      const timer = setTimeout(() => {
        setShowDeleteAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showDeleteAlert]);

  return (
    <div>
      <br />
      <h1 style={{ textAlign: 'center' }}>Liste des produits</h1>
      <br />
      <br />
      {showDeleteAlert && (
        <Alert variant="success" onClose={() => setShowDeleteAlert(false)} dismissible>
          Produit supprimé avec succès.
        </Alert>
      )}
      {showUpdateAlert && (
        <Alert variant="success" onClose={() => setShowUpdateAlert(false)} dismissible>
          Produit modifié avec succès.
        </Alert>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un produit"
          style={{ marginRight: '10px' }}
        />
        <button onClick={fetchProducts}>Rechercher</button>
      </div>
      {noResults && (
        <p style={{ fontStyle: 'italic', color: 'gray', textAlign: 'center' }}>
          Aucun produit trouvé avec ce nom.
        </p>
      )}
      {products.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: 'gray', textAlign: 'center' }}>
          {noResults ? 'Aucun produit trouvé' : 'Aucun produit disponible'}
        </p>
      ) : (
        <div style={{ width: '80%', margin: '0 auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', padding: '10px', textAlign: 'center' }}>
                  Nom
                </th>
                <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', padding: '10px', textAlign: 'center' }}>
                  Prix
                </th>
                <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', padding: '10px', textAlign: 'center' }}>
                  Quantité
                </th>
                <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', padding: '10px', textAlign: 'center' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product._id}>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{product.nom}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{product.prix}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{product.quantite}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <Button variant="primary" size="sm" onClick={() => handleEdit(product)}>
                      Modifier
                    </Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
          <ReactPaginate
          //to do : use class names to configure style
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
        </div>
      )}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir supprimer ce produit ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={() => handleConfirmDelete(productIdToDelete)}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <FormLabel>Nom :</FormLabel>
            <FormControl type="text" value={selectedProductNom} onChange={(e) => setSelectedProductNom(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Prix :</FormLabel>
            <FormControl
              type="number"
              value={selectedProductPrix}
              onChange={(e) => setSelectedProductPrix(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Quantité :</FormLabel>
            <FormControl
              type="number"
              value={selectedProductQuantite}
              onChange={(e) => setSelectedProductQuantite(e.target.value)}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
