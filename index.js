const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { verificarCadastro } = require('./functions/cadastro');
const { exibirServicos, processarServico } = require('./functions/servicos');
const { exibirDiasDisponiveis } = require('./functions/agendamento');
const { confirmarAgendamento, salvarAgendamento } = require('./functions/confirmacao');

const client = new Client({
  authStrategy: new LocalAuth(),
});

// Carrega config
function carregarConfig() {
  if (fs.existsSync('./config.json')) {
    return JSON.parse(fs.readFileSync('./config.json', 'utf8'));
  }
  return null;
}

let clientesAtivos = {}; // Armazena temporariamente estado dos clientes

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('Escaneie o QR Code');
});

client.on('ready', () => {
  console.log('✅ Bot conectado!');
  const config = carregarConfig();
  if (config) {
    console.log(`🤖 ${config.empresa} iniciado`);
  }
});

client.on('message', async (message) => {
  const numero = message.from;
  const texto = message.body.trim().toLowerCase();
  const config = carregarConfig();

  if (!clientesAtivos[numero]) {
    const cliente = await verificarCadastro(numero, message, client);
    clientesAtivos[numero] = { etapa: 'servico', cliente };
    await message.reply(`👋 Olá ${cliente.nome}! Bem-vindo(a) ao ${config.empresa}!`);
    exibirServicos(message);
    return;
  }

  const estado = clientesAtivos[numero];

  if (estado.etapa === 'servico') {
    const servicoIndex = processarServico(message.body); // CORRIGIDO AQUI
    if (servicoIndex === -1) {
      await message.reply('❓ Não entendi o serviço. Pode repetir com os nomes corretos?');
      return;
    }
    estado.servico = servicoIndex;
    estado.etapa = 'dia';
    exibirDiasDisponiveis(message);
    return;
  }

  if (estado.etapa === 'dia') {
    const dia = texto.charAt(0).toUpperCase() + texto.slice(1);
    const diasValidos = ['Hoje', 'Amanhã', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];

    if (!diasValidos.includes(dia)) {
      await message.reply('❌ Dia inválido. Envie algo como "hoje", "amanhã", ou "terça-feira".');
      return;
    }

    estado.dia = dia;
    estado.etapa = 'horario';
    await message.reply('⏰ Agora diga o horário desejado (ex: 09:00, 14:00)');
    return;
  }

  if (estado.etapa === 'horario') {
    const horarioValido = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(texto);
    if (!horarioValido) {
      await message.reply('❌ Horário inválido. Envie no formato 09:00 ou 14:30');
      return;
    }

    estado.horario = texto;
    estado.etapa = 'confirmacao';

    const nomeServico = ['Corte de Cabelo', 'Barba', 'Sobrancelha'][estado.servico];
    await confirmarAgendamento(message, estado.cliente.nome, nomeServico, estado.dia, estado.horario);
    return;
  }

  if (estado.etapa === 'confirmacao') {
    if (texto === 'sim') {
      const nomeServico = ['Corte de Cabelo', 'Barba', 'Sobrancelha'][estado.servico];
      await salvarAgendamento(estado.cliente.id, nomeServico, estado.dia, estado.horario);
      await message.reply('✅ Agendamento confirmado com sucesso! Obrigado 😊');
      delete clientesAtivos[numero];
    } else {
      await message.reply('❌ Agendamento cancelado. Se quiser recomeçar, envie uma nova mensagem.');
      delete clientesAtivos[numero];
    }
    return;
  }
});

client.initialize();
