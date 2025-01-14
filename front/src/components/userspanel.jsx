// import React from 'react';
// import { useState, useEffect } from 'react';
// import { getUsers } from '../utils/API';
// import { deleteUser } from '../utils/API';
// const UsersPanel = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await getUsers();
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const result = await response.json();
//         setUsers(result); // Guardar datos en el estado
//       } catch (err) {
//         console.log("error: ", err);
//       }
//     };

//     fetchUsers(); // Llamar la función al cargar el componente
//   }, []); //
//   const handleDelete = async (id) => {
//     try {
//       const response = await deleteUser(id); // Llama a la API para eliminar al usuario
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Actualiza el estado local
//     } catch (err) {
//       console.log("Error al eliminar el usuario: ", err);
//     }
//   };

//   if (users.length > 0) {
//     return (
//       <div style={{ padding: '20px' }}>
//         <h1>Users Panel</h1>
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
//               <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
//               <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
//               <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.id}</td>
//                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.user_name}</td>
//                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
//                 <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
//                   <button onClick={() => handleDelete(user.id)} style={{ padding: '5px 10px', color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '4px' }}>
//                     Eliminar
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };
//   }
  
 

// export default UsersPanel;
import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser } from '../utils/API';

const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null); // Usuario en edición
  const [editedName, setEditedName] = useState(''); // Nombre temporal durante la edición

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

  const handleDoubleClick = (userId, currentName) => {
    setEditingUserId(userId);
    setEditedName(currentName);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleBlur = async (userId) => {
    if (userId === null) return; // Asegurarse de no guardar si no hay usuario en edición
    try {
      const response = await updateUser(userId, { user_name: editedName }); // Actualiza el nombre en la API
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, user_name: editedName } : user
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
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.id}</td>
                <td
                  style={{ border: '1px solid #ddd', padding: '8px' }}
                  onDoubleClick={() => handleDoubleClick(user.id, user.user_name)}
                >
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={handleNameChange}
                      onBlur={() => handleBlur(user.id)} // Guarda los cambios al perder el foco
                      onKeyDown={(e) => handleKeyDown(e, user.id)} // Guarda los cambios al presionar Enter
                      autoFocus
                    />
                  ) : (
                    user.user_name
                  )}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
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
