const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post('/send', async (req, res) => {
  const text = req.body.text?.trim();
  if (!text) return res.status(400).json({error: 'Empty message'});
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `📢 Сообщение в эфир:\n${text}`
      })
    });
    res.json({status: 'ok'});
  } catch (e) {
    console.error(e);
    res.status(500).json({error: 'Telegram API error'});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
