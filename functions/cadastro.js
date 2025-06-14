const { buscarClientes, adicionarCliente } = require('../database');

// Verifica e cadastra cliente, se necessário
async function verificarCadastro(clienteNumero, message, client) {
  const clientes = await buscarClientes();
  const clienteExistente = clientes.find(c => c.numero_whatsapp === clienteNumero);

  if (clienteExistente) {
    return clienteExistente;
  } else {
    await message.reply('Olá! Qual o seu nome completo para realizar seu cadastro?');

    return new Promise((resolve) => {
      const coletarNome = async (resposta) => {
        if (resposta.from === message.from) {
          const nome = resposta.body.trim();
          const id = await adicionarCliente(nome, clienteNumero);
          await resposta.reply(`Obrigado, ${nome}! Você foi cadastrado com sucesso.`);
          client.removeListener('message', coletarNome);
          resolve({ id, nome, numero_whatsapp: clienteNumero });
        }
      };

      client.on('message', coletarNome);
    });
  }
}

module.exports = { verificarCadastro };
