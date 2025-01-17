
//importacion de REACT y de los componenetes y necesarios 
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/login.component';
import SignUp from './components/signup.component';
import UsersPanel from './components/userspanel'; // Asegúrate de que la ruta sea correcta
import CreateUser from './components/createuser';
import Auth from './utils/auth'

//compomemte app es mi pagina base, aqui es donde se recargará el componente que sea llamado dependiendo 
// la ruta que se utilice (/'sign-up, /'users, etc )
//router es un tag importado de react dom 
function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              My App
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">

            {/* rutas para cada componente  */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              {/* Nueva ruta para el panel de usuarios */}
              <Route path="/users" element={Auth.loggedIn() ? <UsersPanel /> : <Login />} />
              <Route path="/create-user" element={Auth.loggedIn() ? <CreateUser /> : <Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
