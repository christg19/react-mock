import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import backIcon from '../styles/back.svg';
import '../styles/clientlist.css';

function ClientList() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    last_name: '',
    email: '',
    tel: '',
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/client')
      .then(response => setClients(response.data))
      .catch(error => console.error(error));
  }, []);

  const tableHeaderCellStyle = {
    fontWeight: 'bold', 
    backgroundColor: '#f5f5f5'
  };

  const handleAddClient = () => {
    if (newClient.name === '' || newClient.last_name === '' || newClient.email === '' || newClient.tel === '') {
      setOpenDialog(true);
      return;
    }

    axios.post('http://localhost:3000/client', newClient)
      .then(response => {
        console.log('Nuevo cliente agregado:', response.data);
        setClients([...clients, response.data]);
        setNewClient({ name: '', last_name: '', email: '', tel: '' });
      })
      .catch(error => {
        console.error('Error al agregar el cliente:', error);
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Nombre"
                      value={newClient.name}
                      onChange={e => setNewClient({ ...newClient, name: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Apellido"
                      value={newClient.last_name}
                      onChange={e => setNewClient({ ...newClient, last_name: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Email"
                      value={newClient.email}
                      onChange={e => setNewClient({ ...newClient, email: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Teléfono"
                      value={newClient.tel}
                      onChange={e => setNewClient({ ...newClient, tel: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={handleAddClient}>
                      Agregar Cliente
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Campos Vacíos</DialogTitle>
        <DialogContent>
          Complete todos los campos antes de agregar un cliente.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ClientList;





