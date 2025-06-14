const servicosDisponiveis = [
  { nome: 'Corte de Cabelo', valor: 'R$ 30,00', duracao: 20 },
  { nome: 'Barba', valor: 'R$ 20,00', duracao: 10 },
  { nome: 'Sobrancelha', valor: 'R$ 15,00', duracao: 10 }
];

// Função para exibir os serviços disponíveis
function exibirServicos(message) {
  let resposta = "📋 Aqui estão os serviços disponíveis:\n\n";
  servicosDisponiveis.forEach((servico, index) => {
    resposta += `${index + 1}. ${servico.nome} - ${servico.valor} (${servico.duracao}min)\n`;
  });
  resposta += `\nEnvie o número ou nome do(s) serviço(s), ex: 1 ou "Corte e Barba".`;
  message.reply(resposta);
}

// Função para processar a resposta do cliente e retornar os serviços escolhidos
function processarServico(texto) {
  const nomes = texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/,| e |\/|\+|;/).map(x => x.trim());
  const encontrados = [];

  nomes.forEach(item => {
    const porIndice = parseInt(item);
    if (!isNaN(porIndice) && servicosDisponiveis[porIndice - 1]) {
      encontrados.push(servicosDisponiveis[porIndice - 1]);
    } else {
      const servico = servicosDisponiveis.find(s =>
        s.nome.toLowerCase().includes(item)
      );
      if (servico && !encontrados.includes(servico)) {
        encontrados.push(servico);
      }
    }
  });

  return encontrados;
}

module.exports = { exibirServicos, processarServico, servicosDisponiveis };
