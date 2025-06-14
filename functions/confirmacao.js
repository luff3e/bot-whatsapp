const { adicionarCliente, buscarClientes } = require('../database');

// Função para confirmar o agendamento
function confirmarAgendamento(message, clienteNome, servico, dia, horario) {
  const mensagemConfirmacao = `📌 ${clienteNome}, confirme seu agendamento de *${servico}* para *${dia}* às *${horario}*.\nResponda com *sim* para confirmar ou *não* para cancelar.`;
  message.reply(mensagemConfirmacao);
}

// Função para salvar o agendamento no banco de dados (exemplo, precisa de tabela agendamentos criada)
async function salvarAgendamento(clienteId, servico, dia, horario) {
  // Aqui você pode implementar a lógica para salvar no banco, ex:
  console.log(`✅ Agendamento salvo: Cliente ${clienteId}, Serviço: ${servico}, Dia: ${dia}, Horário: ${horario}`);
  // Exemplo de insert (se sua tabela existir):
  /*
  const query = `INSERT INTO agendamentos (cliente_id, servico, dia, horario) VALUES (?, ?, ?, ?)`;
  db.run(query, [clienteId, servico, dia, horario], function(err) {
    if (err) {
      console.error("Erro ao salvar agendamento:", err.message);
    } else {
      console.log("Agendamento salvo com sucesso.");
    }
  });
  */
}

module.exports = { confirmarAgendamento, salvarAgendamento };
