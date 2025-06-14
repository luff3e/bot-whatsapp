require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Função para extrair intenção da mensagem do cliente (sem responder)
async function processarEntrada(texto) {
  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Você é um classificador de intenção. Receberá frases como "quarta", "corte e barba", "hje" ou perguntas como "vocês estão funcionando?". Extraia apenas a intenção direta, como: "quarta-feira", "corte e barba", "status" etc. Nunca gere explicações ou mensagens completas. Só retorne a intenção principal com clareza.'
        },
        {
          role: 'user',
          content: texto
        }
      ],
      temperature: 0.2,
    });

    return res.choices[0].message.content.trim().toLowerCase();
  } catch (error) {
    console.error('Erro na IA:', error);
    return 'erro';
  }
}

module.exports = { processarEntrada };
