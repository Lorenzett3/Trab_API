//data.js

const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET || 'segredissimo'; 
const PORT = process.env.PORT || 3000; 

let authors = [];
let publishers = [];
let books = [];
let devolutions = []; 

let clientTypes = [
    { id: '1a', name: 'Graduação', maxBooks: 3 },
    { id: '2b', name: 'Pós-Graduação', maxBooks: 5 },
];

let clients = [
    { id: 1, matricula: '2023001', name: 'João Silva', clientTypeId: '1a', email: 'joao@mail.com', phone: '9999-0000', borrowedCount: 0 },
];

let users = [
    { id: 1, nome: "Admin", email: "admin@mail.com", senha: "123456" }
];

let loans = []; 


module.exports = {
    JWT_SECRET,
    PORT,
    data: { 
        authors,
        publishers,
        books,
        clientTypes,
        clients,
        users,
        loans,
        devolutions
    }
};