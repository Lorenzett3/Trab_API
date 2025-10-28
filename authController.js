const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const data = require('./data');
const { SECRET_KEY } = require('./middlewares/auth');

const saltRounds = 10;

const register = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const existingUser = data.usuarios.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ error: 'Usuário já cadastrado.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        const newUser = {
            id: data.usuarios.length + 1,
            nome,
            email,
            senha: hashedPassword
        };

        data.usuarios.push(newUser);

        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', usuario: { id: newUser.id, nome: newUser.nome, email: newUser.email } });

    } catch (error) {
        return res.status(500).json({ error: 'Erro interno ao registrar usuário.' });
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    const user = data.usuarios.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ error: 'Email ou senha inválidos.' });
    }

    try {
        const isMatch = await bcrypt.compare(senha, user.senha);

        if (!isMatch) {
            return res.status(401).json({ error: 'Email ou senha inválidos.' });
        }

        const payload = {
            id: user.id,
            email: user.email,
            nome: user.nome
        };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso.',
            token
        });

    } catch (error) {
        return res.status(500).json({ error: 'Erro interno ao logar.' });
    }
};

module.exports = {
    register,
    login
};