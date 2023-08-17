import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import axios from 'axios';
import backIcon from '../styles/back.svg'
import '../styles/clientlist.css'

function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({
    username: '',
    password: '',
    rol: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3000/profile')
      .then(response => setProfiles(response.data))
      .catch(error => console.error(error));
  }, []);

  const tableHeaderCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  };

  const handleAddProfile = () => {
    axios.post('http://localhost:3000/profile', newProfile)
      .then(response => {
        console.log('Nuevo perfil agregado:', response.data);
        setProfiles([...profiles, response.data]);
        setNewProfile({ username: '', password: '', rol: '' });
      })
      .catch(error => {
        console.error('Error al agregar el perfil:', error);
      });
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
                  <TableCell style={tableHeaderCellStyle}>Nombre de usuario</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Clave</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Rol</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profiles.map(profile => (
                  <TableRow key={profile.id}>
                    <TableCell>{profile.id}</TableCell>
                    <TableCell>{profile.username}</TableCell>
                    <TableCell>{profile.password}</TableCell>
                    <TableCell>{profile.rol}</TableCell>
                    <TableCell>
                      <Link to={`/profile/${profile.id}`}>
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
                      placeholder="Nombre de usuario"
                      value={newProfile.username}
                      onChange={e => setNewProfile({ ...newProfile, username: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="password"
                      placeholder="Clave"
                      value={newProfile.password}
                      onChange={e => setNewProfile({ ...newProfile, password: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Rol"
                      value={newProfile.rol}
                      onChange={e => setNewProfile({ ...newProfile, rol: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={handleAddProfile}>
                      Agregar Perfil
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </div>
  );
}

export default ProfileList;
