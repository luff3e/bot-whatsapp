// Função para mostrar a agenda completa
function mostrarAgendaCompleta(message) {
  const diasDisponiveis = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
  let agendaMessage = "📅 Aqui estão todos os dias disponíveis para agendamento:\n";
  diasDisponiveis.forEach(dia => {
    agendaMessage += `\n- ${dia}`;
  });
  message.reply(agendaMessage);
}

module.exports = { mostrarAgendaCompleta };
