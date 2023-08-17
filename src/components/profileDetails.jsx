import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Paper, TextField } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import background from './square.svg'
import axios from 'axios';
import '../styles/clientDetails.css'



function ProfileDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const styles = {
    backgroundImage: `url(${background})`
  };
  const [editedProfile, setEditedProfile] = useState({
    username: '',
    passwprd: '',
    rol: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/profile/${id}`)
      .then(response => {
        setProfile(response.data);
        setEditedProfile(response.data);
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
    axios.put(`http://localhost:3000/profile/${id}`, editedProfile)
      .then(response => {
        setProfile(response.data);
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
    navigate('/profile');
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:3000/profile/${id}`)
      .then(() => {
        closeDialog();
        navigate('/home');
      })
      .catch(error => {
        console.error('Error al eliminar el producto', error);
        closeDialog();
      });
  };

  if (!profile) {
    return <div style={styles}>Cargando...</div>;
  }

  return (
    <div className='container' style={styles}>

      <h2 className='detailsTitle'>Detalles del Perfil</h2>
      {editing ? (
        <Paper className="paper" elevation={3}>
          <TextField
            label="Nombre de usuario"
            fullWidth
            value={editedProfile.username}
            onChange={e => setEditedProfile({ ...editedProfile, username: e.target.value })}
          />
          <TextField
            label="Clave"
            fullWidth
            value={editedProfile.password}
            onChange={e => setEditedProfile({ ...editedProfile, password: e.target.value })}
          />
          <TextField
            label="Rol"
            fullWidth
            value={editedProfile.rol}
            onChange={e => setEditedProfile({ ...editedProfile, rol: e.target.value })}
          />

          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Paper>
      ) : (
        <Paper className="paper" elevation={3}>
          <p>
            <span className="labelStyles">ID:</span> {profile.id}
          </p>
          <p>
            <span className="labelStyles">Nombre de Usuario:</span> {profile.username}
          </p>
          <p>
            <span className="labelStyles">Clave:</span> {profile.password}
          </p>
          <p>
            <span className="labelStyles">Rol:</span> {profile.rol}
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
                ¿Estás seguro de que quieres eliminar este perfil?
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

export default ProfileDetails;