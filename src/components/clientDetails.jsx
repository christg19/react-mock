import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Paper, TextField } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import background from './square.svg'
import axios from 'axios';
import '../styles/clientDetails.css'



function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [editing, setEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const styles = {
    backgroundImage: `url(${background})`
  };
  const [editedClient, setEditedClient] = useState({
    name: '',
    last_name: '',
    email: '',
    tel: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/client/${id}`)
      .then(response => {
        setClient(response.data);
        setEditedClient(response.data);
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
    axios.put(`http://localhost:3000/client/${id}`, editedClient)
      .then(response => {
        setClient(response.data);
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
    navigate('/client');
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:3000/client/${id}`)
      .then(() => {
        closeDialog();
        navigate('/');
      })
      .catch(error => {
        console.error('Error al eliminar el cliente', error);
        closeDialog();
      });
  };

  if (!client) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='container' style={styles}>
      <h2 className='detailsTitle'>Detalles del Cliente</h2>
      {editing ? (
        <Paper className="paper" elevation={3}>
          <TextField
            label="Nombre"
            fullWidth
            value={editedClient.name}
            onChange={e => setEditedClient({ ...editedClient, name: e.target.value })}
          />
          <TextField
            label="Apellido"
            fullWidth
            value={editedClient.last_name}
            onChange={e => setEditedClient({ ...editedClient, last_name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            value={editedClient.email}
            onChange={e => setEditedClient({ ...editedClient, email: e.target.value })}
          />
          <TextField
            label="Teléfono"
            fullWidth
            value={editedClient.tel}
            onChange={e => setEditedClient({ ...editedClient, tel: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Paper>
      ) : (
        <Paper className="paper" elevation={3}>
          <p>
            <span className="labelStyles">ID:</span> {client.id}
          </p>
          <p>
            <span className="labelStyles">Nombre:</span> {client.name}
          </p>
          <p>
            <span className="labelStyles">Apellido:</span> {client.last_name}
          </p>
          <p>
            <span className="labelStyles">Email:</span> {client.email}
          </p>
          <p>
            <span className="labelStyles">Teléfono:</span> {client.tel}
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
                ¿Estás seguro de que quieres eliminar este cliente?
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

export default ClientDetails;

