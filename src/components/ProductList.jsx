import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import backIcon from '../styles/back.svg'
import '../styles/clientlist.css'

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/product')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const tableHeaderCellStyle = {
    fontWeight: 'bold', 
    backgroundColor: '#f5f5f5'
  };

  return (
    <div className='homeContainer'>
      <Link to="/">
        <img src={backIcon} className='backIcon' />
      </Link>
      <div className='list'>
        <Container>
          <TableContainer component={Paper} className='table-container'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={tableHeaderCellStyle}>ID</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Nombre de Producto</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Precio</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Stock</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Link to={`/product/${product.id}`}>
                        <Button variant="contained" color="primary">
                          Ver Detalles
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </div>
  );
}

export default ProductList;
