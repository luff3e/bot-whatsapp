// Função para perguntar se o cliente deseja repetir o último serviço
function repetirUltimoServico(message, ultimoServico) {
  message.reply(`Você gostaria de repetir o último serviço agendado: ${ultimoServico}? Responda com *sim* ou *não*.`);
}

module.exports = { repetirUltimoServico };
