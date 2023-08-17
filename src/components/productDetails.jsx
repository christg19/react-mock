import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Paper, TextField } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import background from './square.svg'
import axios from 'axios';
import '../styles/clientDetails.css'



function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [editing, setEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const styles = {
    backgroundImage: `url(${background})`
  };
  const [editedProduct, setEditedProduct] = useState({
    productName: '',
    price: '',
    stock: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/product/${id}`)
      .then(response => {
        setProduct(response.data);
        setEditedProduct(response.data);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleSave = () => {
    axios.put(`http://localhost:3000/product/${id}`, editedProduct)
      .then(response => {
        setProduct(response.data);
        setEditing(false);
        refreshPage()
      })
      .catch(error => {
        console.error('Error al guardar los cambios', error);
      });
  };

  const handleDelete = () => {
    openDialog();
  };

  const handleBackClick = () => {
    navigate('/product');
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:3000/product/${id}`)
      .then(() => {
        closeDialog();
        navigate('/');
      })
      .catch(error => {
        console.error('Error al eliminar el producto', error);
        closeDialog();
      });
  };

  if (!product) {
    return <div style={styles}>Cargando...</div>;
  }

  return (
    <div className='container' style={styles}>

      <h2 className='detailsTitle'>Detalles del Producto</h2>
      {editing ? (
        <Paper className="paper" elevation={3}>
          <TextField
            label="Nombre del producto"
            fullWidth
            value={editedProduct.productName}
            onChange={e => setEditedProduct({ ...editedProduct, productName: e.target.value })}
          />
          <TextField
            label="Precio"
            fullWidth
            value={editedProduct.price}
            onChange={e => setEditedProduct({ ...editedProduct, price: e.target.value })}
          />
          <TextField
            label="Stock"
            fullWidth
            value={editedProduct.stock}
            onChange={e => setEditedProduct({ ...editedProduct, stock: e.target.value })}
          />

          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Paper>
      ) : (
        <Paper className="paper" elevation={3}>
          <p>
            <span className="labelStyles">ID:</span> {product.id}
          </p>
          <p>
            <span className="labelStyles">Nombre del Producto:</span> {product.productName}
          </p>
          <p>
            <span className="labelStyles">Precio:</span> {product.price}
          </p>
          <p>
            <span className="labelStyles">Stock:</span> {product.stock}
          </p>
          <div className='buttons'>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Editar
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDelete}>
              Eliminar
            </Button>
            <Button className="red-button" variant='contained' color="error" onClick={handleBackClick}>
              Atrás
            </Button>
          </div>
          <Dialog open={dialogOpen} onClose={closeDialog}>
            <DialogTitle>Confirmación</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que quieres eliminar este producto?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} color="primary">
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  handleConfirmDelete();
                  closeDialog();
                }}
                color="secondary"
              >
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      )}
    </div>

  );
}

export default ProductDetails;