
//importacion del hook 
import React, { useState } from 'react';
import Auth from '../utils/auth'

// llamamos a la funcion/ comopnente login, y se utlizan los hooks useState en los valores email y password 
// useState. Cada que el usuario ingrese un character en el campo de email o password, se recargará el componente 
// y la variable va a cambiar al valor ingreaso. 
const Login = () => {
  console.log("componente LOGIN")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ya que le de clicl en el boton submit del componente, se realizará la
  // funcion handle submit, es una funcion asincronica que espera el evento (dar click en el noton submit)
  //al dar click se realiza un fetch a nuestra api. de metodo post en donde se envia el email y password para
  //donde el backend recibe esos valores y lee si el usuario existe y si la contraseña del usauario es correct

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email && password) {
      // se hace una peticion al backend mediante fetch .las peticiones van hacia el archiuvou routas del back
      // fetch toma como parametro la url y un objeto de configuracion de la peticion 
      // await porque tenemos qye esperar a la respesta del servidor 
      try {
        const response = await fetch('http://localhost:3001/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }, // no se por que pero se pone 
          body: JSON.stringify({ email, password }), // objecto que se envia en el cuerpo de la solicitud del front al server
        });
        // si fueron correctas, se loggea el usuario 
        if (response.ok) {
          console.log('Redirigiendo al panel de usuarios...');
          const resp = await response.json();
          console.log("response LOGIN: ", resp);
          Auth.login(resp.token);
        } else {
          alert('Invalid credentials.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div className="mb-3">
        <label>Email Address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // on change es el evento de teclear algo en el campo de email. Entonces cada que pase el evento, se acutlizatá el valor de email por el hook setState qu ehace que se recargue el compomente 
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input  // tag input tiene el atributo on change. el cual recibe una funcion qu edetermina l que pasa cuando el valor cambie.
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
