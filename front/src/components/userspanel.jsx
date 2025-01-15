import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser, getMe } from '../utils/API';
import Auth from '../utils/auth';

const UsersPanel = () => {
  const [users, setUsers, setUserData] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null); // Usuario en edición
  const [editedFields, setEditedFields] = useState({}); // Campos editados temporalmente

  const loggedInUser = Auth.getProfile();

  console.log("USUARIO LOGGEADO: ", loggedInUser);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setUsers(result); // Guardar datos en el estado
      } catch (err) {
        console.log("error: ", err);
      }
    };
    // const getUserData = async() => {
    //   try {
    //     const token = Auth.loggedIn() ? Auth.getToken() : null;

    //     if (!token) {
    //       return false;
    //     }

    //     const response = await getMe(token);

    //     if (!response.ok) {
    //       throw new Error('something went wrong!');
    //     }

    //     const user = await response.json();
    //     setUserData(user);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
    // getUserData();
    fetchUsers(); // Llamar la función al cargar el componente
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id); // Llama a la API para eliminar al usuario
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Actualiza el estado local
    } catch (err) {
      console.log("Error al eliminar el usuario: ", err);
    }
  };

  const handleDoubleClick = (userId, field, currentValue) => {
    if (loggedInUser.isAdmin) {
      setEditingUserId(userId);
      setEditedFields({ ...editedFields, [field]: currentValue });
    }
  };

  const handleFieldChange = (e, field) => {
    setEditedFields({ ...editedFields, [field]: e.target.value });
  };

  const handleBlur = async (userId) => {
    if (userId === null) return; // Asegurarse de no guardar si no hay usuario en edición
    try {
      const response = await updateUser(userId, editedFields); // Actualiza los campos en la API
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, ...editedFields } : user
        )
      );
      setEditingUserId(null); // Finaliza la edición
    } catch (err) {
      console.log("Error al actualizar el usuario: ", err);
      setEditingUserId(null); // Finaliza la edición aunque ocurra un error
    }
  };

  const handleKeyDown = (e, userId) => {
    if (e.key === "Enter") {
      handleBlur(userId);
    }
  };

  const deleteCell = (user) => {
    if (loggedInUser.isAdmin) {
      return (
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
        <button
          onClick={() => handleDelete(user.id)}
          style={{
            padding: '5px 10px',
            color: 'white',
            backgroundColor: 'red',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Eliminar
        </button>
      </td>
      )
    }
  }

  if (users.length > 0) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Users Panel</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
              {loggedInUser.isAdmin ? (
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
              ) : (
                <></>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.id}</td>
                <td
                  style={{ border: '1px solid #ddd', padding: '8px' }}
                  onDoubleClick={() => handleDoubleClick(user.id, "user_name", user.user_name)}
                >
                  {editingUserId === user.id && editedFields.user_name !== undefined ? (
                    <input
                      type="text"
                      value={editedFields.user_name}
                      onChange={(e) => handleFieldChange(e, "user_name")}
                      onBlur={() => handleBlur(user.id)}
                      onKeyDown={(e) => handleKeyDown(e, user.id)}
                      autoFocus
                    />
                  ) : (
                    user.user_name
                  )}
                </td>
                <td
                  style={{ border: '1px solid #ddd', padding: '8px' }}
                  onDoubleClick={() => handleDoubleClick(user.id, "email", user.email)}
                >
                  {editingUserId === user.id && editedFields.email !== undefined ? (
                    <input
                      type="text"
                      value={editedFields.email}
                      onChange={(e) => handleFieldChange(e, "email")}
                      onBlur={() => handleBlur(user.id)}
                      onKeyDown={(e) => handleKeyDown(e, user.id)}
                      autoFocus
                    />
                  ) : (
                    user.email
                  )}
                </td>
                {deleteCell(user)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <div>Cargando usuarios...</div>;
};

export default UsersPanel;
