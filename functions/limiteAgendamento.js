// Função para verificar se o agendamento é mais de 7 dias úteis
function verificarLimiteAgendamento(diaEscolhido) {
  const diasUteis = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
  if (diasUteis.indexOf(diaEscolhido) >= 7) {
    return true; // Agendamento para mais de 7 dias úteis
  }
  return false;
}

// Função para cancelar o agendamento 1h antes se não confirmado
async function cancelarAgendamentoSeNecessario(clienteId, diaEscolhido, horarioEscolhido) {
  const agora = new Date();
  const horaAgendada = new Date();
  horaAgendada.setHours(parseInt(horarioEscolhido.split(':')[0]), parseInt(horarioEscolhido.split(':')[1]), 0);
  
  const diff = horaAgendada - agora;
  const umaHoraAntes = 60 * 60 * 1000;

  if (diff < umaHoraAntes) {
    console.log(`Agendamento de ${clienteId} cancelado. Horário não confirmado.`);
  }
}

module.exports = { verificarLimiteAgendamento, cancelarAgendamentoSeNecessario };
