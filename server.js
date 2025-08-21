const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta raíz para que Render sepa que el servidor está activo
app.get('/', (req, res) => {
  res.send('Chatbot BIOTECNO CHILE funcionando correctamente');
});

// Ruta principal del chatbot
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error al conectar con OpenAI:', error.response?.data || error.message);
    res.status(500).json({ reply: 'Lo siento, hubo un error al procesar tu mensaje.' });
  }
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor BIOTECNO CHILE activo en puerto ${PORT}`);
});