import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import backIcon from '../styles/back.svg'
import '../styles/clientlist.css'

function ClientList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/client')
      .then(response => setClients(response.data))
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
                  <TableCell style={tableHeaderCellStyle}>Nombre</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Apellido</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Email</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Teléfono</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map(client => (
                  <TableRow key={client.id}>
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.last_name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.tel}</TableCell>
                    <TableCell>
                      <Link to={`/client/${client.id}`}>
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

export default ClientList;




