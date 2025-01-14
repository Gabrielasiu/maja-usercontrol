//ejemplo de jwt authentication En el signtoken en la linea 
// 8 dce role: user.role pero eso no lo tengo en el Model. lo tengo como isAdmin

const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const signToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET, // Clave secreta para firmar el token
    { expiresIn: '2h' } // El token expira en 2 horas
  );
};

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.isCorrectPassword(password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token
    const token = signToken(user);
    res.json({ token });
  },
};
