import React, { useState } from 'react';
import { createUser } from '../utils/API';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(formData);
      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }
      alert('Usuario creado con éxito');
    } catch (err) {
      console.error(err);
      alert('Error al crear el usuario');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Crear Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Correo Electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CreateUser;
