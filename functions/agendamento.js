const diasDisponiveis = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
const horariosDisponiveis = ['09:00', '10:00', '11:00', '14:00', '15:00'];

// Exibir dias disponíveis a partir do dia atual
function exibirDiasDisponiveis(message) {
  let resposta = "📆 Dias disponíveis para agendamento:\n\n";
  diasDisponiveis.forEach((dia, index) => {
    resposta += `${index + 1}. ${dia}\n`;
  });
  resposta += `\nEnvie o número ou nome do dia.`;
  message.reply(resposta);
}

// Exibir horários disponíveis (pode evoluir depois com controle do banco de dados)
function exibirHorariosDisponiveis(message) {
  let resposta = "⏰ Horários disponíveis:\n\n";
  horariosDisponiveis.forEach((hora, index) => {
    resposta += `${index + 1}. ${hora}\n`;
  });
  resposta += `\nEnvie o número ou o horário desejado.`;
  message.reply(resposta);
}

// Processar escolha de dia
function processarDia(texto) {
  const index = parseInt(texto) - 1;
  if (!isNaN(index) && diasDisponiveis[index]) {
    return diasDisponiveis[index];
  }

  const textoNormalizado = texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const diaEncontrado = diasDisponiveis.find(dia =>
    dia.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(textoNormalizado)
  );

  return diaEncontrado || null;
}

// Processar escolha de horário
function processarHorario(texto) {
  const index = parseInt(texto) - 1;
  if (!isNaN(index) && horariosDisponiveis[index]) {
    return horariosDisponiveis[index];
  }

  const horarioFormatado = texto.trim();
  const horarioEncontrado = horariosDisponiveis.find(h => h === horarioFormatado);
  return horarioEncontrado || null;
}

module.exports = {
  exibirDiasDisponiveis,
  exibirHorariosDisponiveis,
  processarDia,
  processarHorario,
  diasDisponiveis,
  horariosDisponiveis
};
