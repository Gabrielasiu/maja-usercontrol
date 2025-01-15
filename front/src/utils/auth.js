import { jwtDecode } from 'jwt-decode'; // Importar jwtDecode correctamente

class AuthService {
  // Obtener los datos del usuario
  getProfile() {
    return jwtDecode(this.getToken()); // Usar jwtDecode en lugar de decode
  }

  // Verificar si el usuario está logueado
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Verifica que el token exista y no haya expirado
  }

  // Verificar si el token ha expirado
  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token); // Usar jwtDecode en lugar de decode
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // Obtener el token almacenado en localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Iniciar sesión y guardar el token
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/users');
  }

  // Cerrar sesión y eliminar el token
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
