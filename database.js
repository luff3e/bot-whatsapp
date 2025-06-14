const sqlite3 = require('sqlite3').verbose();

// Cria ou abre o banco de dados (bot.db)
const db = new sqlite3.Database('./bot.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Criação da tabela de clientes caso não exista
db.run(
  `CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    numero_whatsapp TEXT NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`
);

// Função para adicionar um cliente
function adicionarCliente(nome, numero_whatsapp) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO clientes (nome, numero_whatsapp) VALUES (?, ?)';
    db.run(query, [nome, numero_whatsapp], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); // Retorna o ID do cliente inserido
      }
    });
  });
}

// Função para buscar todos os clientes
function buscarClientes() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM clientes', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows); // Retorna todos os clientes encontrados
      }
    });
  });
}

module.exports = { adicionarCliente, buscarClientes };
